# 设计基准自动化 QA

守护 **本次升级的 12 个通用动效原语 + window-frame** 不被未来的主题/样式
改动悄悄带偏。两道关卡：

| 关卡 | 文件 | 测什么 | 速度 | 需要浏览器 |
|---|---|---|---|---|
| ① 静态设计基准断言 | `check-design-tokens.mjs` | 级联淡入速度 / 辉光强度阈值 / 字体梯度 / 强调色预算 / 对比表叙事格式 | 秒级 | 否 |
| ② 视觉回归 | `visual-regression.spec.mjs` | 4 个核心 v2 模板的布局快照逐像素对比 | ~15s | 是（Chromium） |

唯一真相源是 [`design-baseline.json`](design-baseline.json)。**改设计基准时改它，
不要把数字散落进脚本。** 所有基准值均从 `templates/src/styles/*.css` 与
`themes/all-themes.css` 的真实定义提炼。

---

## 关卡①：静态设计基准断言

无需浏览器，纯解析 CSS 文本断言。覆盖 8 组：

1. **全局动效 token** —— `--dur-*` / `--ease-*` / `--text-ghost` 未漂移
2. **原语存在性 + 步进开关契约** —— 12 原语 + `.window-frame` 都在，且
   靠 `.in` / `.is-active` 步进驱动（保证「一节拍 = 一 step」）
3. **reduced-motion 降级** —— 所有动效原语在 `prefers-reduced-motion` 块里有降级
4. **级联淡入速度** —— `--cascade-step ∈ [50,140]ms`、`--cascade-rise ∈ [8,28]px`，
   各主题与基准一致，且**气质排序**（Swiss 最克制 < newsroom 最稳重）不破
5. **辉光强度阈值** —— `--glow-strength ∈ [0,0.6]`；克制档 ≤0.20 / 中间档
   [0.15,0.30] / 表现档 ≥0.40；`--orb-opacity` 必须比 glow 更克制
6. **字体梯度** —— 5 档文字色相对底色对比度**严格单调递减**，正文 WCAG ≥4.5:1
7. **强调色预算** —— 定义 `--accent-2` 的主题必须定义 `--accent`；
   `--accent-soft` / `--accent-glow` 必须与 `--accent` 同色相（透明度叠层）
8. **对比表叙事格式** —— `comparison-frame` EXAMPLE 的 README 遵守 5 条叙事
   铁律（独立章节 / 竞品列灰态 / 逐列揭示 / `✓✕` 用字符不用 emoji / narrations N+1）

跑：

```bash
node qa/check-design-tokens.mjs          # 详细输出（107 项断言）
node qa/check-design-tokens.mjs --quiet  # 只在 FAIL 时输出
```

退出码 0 = 全过，1 = 有 FAIL（CI 据此卡关）。

---

## 关卡②：视觉回归（布局快照）

对 4 个核心 v2 主题（`newsroom-v2` / `bold-signal-v2` / `swiss-ikb-v2` /
`viz-studio`）在 [`fixture/verify.html`](fixture/verify.html) 上各截一张布局
快照，与 `__snapshots__/<theme>.png` 基准逐像素对比。

fixture 一屏覆盖：12 原语 + window-frame + **5 档文字梯度** + accent→accent-2
渐变 + sys-label/human-note。任何主题改动若让原语落点、字体梯度或强调色渐变
偏移，像素差超过 `maxDiffPixelRatio`（默认 1.2%）即 FAIL。

### 决定性措施（避免误报）

- **屏蔽 Google Fonts 网络请求** → 全平台一致的 fallback 字体度量（测的是
  布局/梯度落点，不是字形渲染）
- **注入 CSS 关掉所有 animation/transition** → 截图取入场终态，不受时序抖动影响
- **固定 viewport 1280×760 @2x** + settle

### 本地跑

```bash
cd qa
npm install            # 首次：装 @playwright/test
npx playwright install chromium   # 首次：装浏览器

npm run test:visual            # 对比
npm run test:visual:update     # 设计基准有意变更后，重写基准快照
```

或从仓库根：

```bash
npx playwright test --config qa/playwright.config.mjs
```

### ⚠ 跨环境基准一致性（重要）

逐像素对比对渲染环境（OS / 字体栈 / 抗锯齿）敏感。**基准快照以官方
Playwright 容器为权威**：CI 的视觉回归 job 跑在
`mcr.microsoft.com/playwright:v1.59.0-noble` 容器里，渲染环境固定。

- 在**本机**重写的基准，可能与 CI 容器有亚像素差异。最稳的更新基准方式是
  **走 CI 的手动重写**（见下）。
- 升级 `@playwright/test` 版本时，**必须同步**更新
  `.github/workflows/visual-qa.yml` 里的容器镜像 tag，并重写基准。

---

## CI：每周一自动巡检

[`.github/workflows/visual-qa.yml`](../.github/workflows/visual-qa.yml)

| 触发 | 说明 |
|---|---|
| `schedule` | **每周一 01:00 UTC（北京时间 09:00）** 定时巡检 |
| `push` / `pull_request` | 改动 `templates/src/styles/**`、`themes/**`、`comparison-frame/**`、`qa/**` 时跑 |
| `workflow_dispatch` | 手动触发；勾选 `update_snapshots` 可在容器内重写基准 |

两个 job：
1. **token-baseline** —— 跑关卡①（秒级，先卡）
2. **visual-regression** —— 在 Playwright 容器内跑关卡②；失败时上传
   diff/actual/expected 三联图工件，便于核查是哪条原语漂了

### 在 CI 里重写基准（推荐的更新姿势）

1. Actions → 本 workflow → **Run workflow** → 勾选
   `重写视觉回归基准快照` → Run
2. 跑完从 **updated-snapshots** 工件下载新的 `__snapshots__/*.png`
3. 替换本地 `qa/__snapshots__/` 并提交

这样基准始终由 CI 容器生成，跨环境零误报。

---

## 文件清单

```
qa/
├── design-baseline.json        # 唯一真相源（所有基准值）
├── check-design-tokens.mjs     # 关卡①：静态断言
├── visual-regression.spec.mjs  # 关卡②：Playwright 快照测试
├── playwright.config.mjs       # 测试运行器配置
├── package.json                # @playwright/test 依赖 + npm scripts
├── README.md                   # 本文件
├── fixture/
│   ├── verify.html             # 12 原语 + 梯度 + 渐变一屏 fixture
│   └── tokens.css              # 当前主题 :root（测时按主题逐个覆写）
└── __snapshots__/              # 视觉回归基准 PNG（提交进仓库）
    ├── newsroom-v2.png
    ├── bold-signal-v2.png
    ├── swiss-ikb-v2.png
    └── viz-studio.png
```

---

## 当设计基准本就该变时

如果你**有意**调整了某个原语的基准（比如把 newsroom 的 cascade-step 从
110ms 改成 95ms）：

1. 改 `themes/all-themes.css`（或对应源 CSS）
2. **同步**改 `qa/design-baseline.json` 里对应的值
3. 跑 `node qa/check-design-tokens.mjs` 确认关卡①通过
4. 走 CI 手动重写视觉回归基准（见上）并提交新快照

基准与实现一旦同步，CI 重新变绿。这套系统的价值在于：**任何「没改基准
却改了实现」的漂移都会被红灯拦下**。
