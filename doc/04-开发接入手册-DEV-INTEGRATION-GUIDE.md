# 04 · 开发接入手册 · DEV INTEGRATION GUIDE

> **目标读者**：solo 开发者 / 小团队。
> **本手册做什么**：教你用 v2 动效原语库（`animations.css` §1–§13）+ 三大构图工具箱（`references/EXAMPLES/`），从零创建一个新的「AI 视频分析场景」章节，并保证产出物能通过仓库的双关卡 QA（`qa/check-design-tokens.mjs` 173 条断言 + Playwright 视觉回归）。
> **本手册不做什么**：不替你构思内容（口播稿/outline 走 Phase 1），不讲录屏后期（走 `references/RECORDING.md`），不重复 `CHAPTER-CRAFT.md` 的十条原则（那是单章美学唯一入口，本手册是它的「工程化补充」）。

本手册全部 token 值、原语契约、行号引用均取自当前仓库实跑文件，可回溯验证：
- 动效原语：`templates/src/styles/animations.css`
- 语义 token：`templates/src/styles/base.css`
- 主题动效赋值：`themes/all-themes.css`（27 个 `[data-theme]` 块）
- QA 基准：`qa/design-baseline.json`
- 断言脚本：`qa/check-design-tokens.mjs`

---

## 0. 心智模型：一套「视觉叙事语法」由三层构成

把这套系统当成一门语言来用，它有三层，从下到上：

| 层 | 文件 | 你做什么 | 谁负责保证质量 |
|---|---|---|---|
| **L1 语义 token 层** | `base.css` `:root` + 主题 `[data-theme]` 块 | **几乎不碰**。颜色/间距/字号/动效节奏全部从 token 取值，章节代码里不写魔法数字 | 主题作者 + `design-baseline.json` |
| **L2 动效原语层** | `animations.css` §1–§13（12 个原语 + 拟物窗口） | **组合**。给元素挂 `.cascade` / `.glow-card` / `.window-frame` 等类名，加 `.in` 触发 | 原语契约（本手册第 2 节） |
| **L3 构图工具箱层** | `references/EXAMPLES/`（C1/C2/C3 + 结构 anchor） | **选型 + 改内容**。挑一个最贴近你这一章关系的工具箱，保留它的「形」，换你的内容 | 你自己 + `CHAPTER-CRAFT.md` 完工自检 |

> **铁律**：你在 L3 自由发挥，但**只能通过 L2 原语 + L1 token 表达**。任何「我直接写 `box-shadow: 0 0 32px #ff00aa`」都是 token 纪律的破坏 —— QA 不一定能抓到颜色，但 review 一定会打回。正确写法永远是 `box-shadow: 0 0 32px var(--accent-glow)`，让主题去决定那是什么色。

---

## 1. 五步创建一个新 AI 视频场景（端到端）

下面是把「一段有界面/有流程/有对比的 AI 分析内容」变成一个合格章节的完整路径。

### 步骤 1 · 定关系，选工具箱

先回答一个问题：**这一章在讲什么「关系」？** 关系决定工具箱，不要先想动画。

| 这一章的关系 | 选工具箱 | step 数硬约束 |
|---|---|---|
| 「喂进去 X，吐出来 Y」的流程（脏数据→清洗→干净；prompt→模型→输出；请求→响应） | **C1 `ui-mockup-scene/`** | 4 步（intro / input / process / output） |
| 「一句观点 + 一个证据」（论断+图证明；结论+数据支撑） | **C2 `asymmetric-split/`** | 3 步（论点 / 论据 / 收束） |
| 「我们 vs 同类」（功能对比表；方案选型；为什么不用现成的） | **C3 `comparison-frame/`** | N+1 步（N 列竞品 + 1 设问） |
| 钩子开场 / 列举型 / 数字 hero | 见 `EXAMPLES/hook-chapter/`、`list-reveal/`，数字型见 `CHAPTER-CRAFT.md` Part 3 | 视内容 |

> 这三大工具箱直接落地 Vizplainer 的三个签名手法：C1 = #1 macOS 窗口演示容器 + #2 三段式 UI 流程切换；C2 = 留白哲学 + #6 密度反比；C3 = #8 竞品对比作为独立章节。

### 步骤 2 · 脚手架建章节目录

每章一个目录，三件套，CSS 类名带**独占前缀**（避免并行开发互相污染）：

```
presentation/src/chapters/<NN>-<id>/
├── <Chapter>.tsx      # 视觉实现，step 的纯函数
├── <Chapter>.css      # 章节专属样式，类名前缀如 .um- / .as- / .cf-
└── narrations.ts      # ★ step 数 + 口播文本的唯一真相源
```

### 步骤 3 · 写 narrations.ts（先定 step 数）

`narrations.ts` 是 step 数的唯一真相源。它的长度 = 这一章总 step 数。章节 `.tsx` 里出现的最大 `if (step === N)` 的 `N + 1` 必须等于 `narrations.length`。工具箱的 step 数约束（见步骤 1 表）就是在这里落地的。

```ts
// 例：C1 流程型，必须 4 条
export const narrations = [
  "我们每天要处理几百份这样的原始导出文件。",   // step 0 intro
  "你看这份 raw.csv —— 字段错位、空值、编码全乱。", // step 1 input
  "clean.py 跑起来，逐行规整、补全、去重。",      // step 2 process
  "三秒后，clean.csv —— 一万两千行，零脏数据。",   // step 3 output
];
```

### 步骤 4 · 写 .tsx：step 的纯函数 + 挂原语

核心模式：章节是 `step` 的纯函数，没有定时器，每步独占整屏，靠 `.in` 类名触发原语揭示。

```tsx
export function CleanPipeline({ step }: { step: number }) {
  return (
    <section className="cp-stage">
      <div className="ambient-orbs" />                {/* 持续微动，无 .in */}
      <div className={`window-frame is-mac ${step >= 0 ? "in" : ""}`}>
        <div className="wf-bar">
          <span className="wf-dots" />
          <span className="wf-title">
            {step <= 1 ? "raw.csv" : step === 2 ? "clean.py" : "clean.csv"}
          </span>
        </div>
        <div className="wf-body">
          {/* 三态用同一个窗口换 body，配 .carousel-slide 前翻 */}
          <div className={`carousel-slide ${step === 1 ? "is-active" : ""}`}>…raw…</div>
          <div className={`carousel-slide ${step === 2 ? "is-active" : ""}`}>
            <span className="status-dot" /> RUNNING <div className="spinner" />
          </div>
          <div className={`carousel-slide ${step === 3 ? "is-active" : ""}`}>
            <span className="hero-num count-up">12,000</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 步骤 5 · 跑双关卡，确认全绿

```bash
# 关卡①：token 纪律（173 条断言，EXIT 0 = 全过）
node qa/check-design-tokens.mjs --quiet

# 关卡②：视觉回归（布局快照，6 个动效主题）
cd qa && npx playwright test
# 改了主题动效赋值导致快照基准过期时：npx playwright test --update-snapshots

# 章节本身类型检查
cd presentation && npx tsc --noEmit
```

> 双关卡也是 GitHub Actions CI（`.github/workflows/visual-qa.yml`）的内容。本地绿了再推。

---

## 2. v2 动效原语库使用指南（12 原语 + 拟物窗口）

全部定义在 `templates/src/styles/animations.css`。设计铁律（文件头注释明确）：
- 时长/缓动**永远**从主题 token 取（`--dur-*` / `--ease-*`）—— 同一个原语在「snappy Swiss」和「cinematic 旗舰」主题下气质不同，靠主题拨自己的 token 实现，原语本身不改。
- 颜色**永远**从 `--accent` / `--accent-glow` / `--accent-soft` / `--accent-2` 取 —— 不写死任何 indigo/violet。Vizplainer 的蓝→紫渐变，在每个主题里变成该主题自己的 accent → accent-2。

### 2.1 触发模型：`.in` 阶梯式 vs 持续循环

12 个原语分两类，**这是接入时最容易踩的坑**：

| 类别 | 原语 | 触发方式 | reduced-motion 处理 |
|---|---|---|---|
| **阶梯式（step-driven）** | `.cascade` · `.rise-step` · `.glow-card` · `.accordion-row` · `.tab-underline` · `.window-frame` · `.mask-reveal` · `.rule-grow` | 元素静止在初态，挂 `.in` 时揭示。`.in` 由 `step >= N` 控制 | 自动塌缩到终态（`transform: none`，无位移），录屏不会出现空帧 |
| **持续循环（ambient loop）** | `.ambient-orbs` · `.shimmer` · `.status-dot` · `.spinner` · `.typing-dots` | 无需 `.in`，挂上即循环 `animation` | **必须**被 `@media (prefers-reduced-motion: reduce)` 的 `animation: none` 兜住 |
| **状态切换（特例）** | `.carousel-slide` | 用 `.is-active`（不是 `.in`），同一时刻只有一个 active | —— |
| **JS 配合** | `.count-up` | 仅提供 `tabular-nums` 字形，数字滚动逻辑你在 tsx 里用 `requestAnimationFrame` 写 | —— |

> 接入新原语前先问：**它是「揭示一次」还是「一直动」？** 揭示一次 → 用 `.in`；一直动 → 确认 reduced-motion 块已覆盖它（`animations.css` 第 371–385 行）。如果你新增了一个持续循环装饰却没进 reduced-motion 块，视觉回归在 reduced-motion 录屏下会抖。

### 2.2 阶梯式原语速查（带契约）

| 原语 | 类名 | 关键 token / 变量 | 用法契约 |
|---|---|---|---|
| **1 Cascade** 错峰淡入 | `.cascade > *` + `.in` | `--cascade-rise`(默认 18px) · `--cascade-step`(默认 90ms) · 每个子元素设 `--i: 0,1,2…` | 包 N 个子元素，step 落地时父级加 `.in`，子级按 `--i × --cascade-step` 错峰。Vizplainer hero 签名 |
| **2 Rise-step** 单元素上推 | `.rise-step` + `.in` | `--cascade-rise` · `--dur-base` | 单个元素的 ease-out 上推淡入 |
| **3 Glow card** 霓虹边光晕 | `.glow-card` + `.in` | `--glow-strength`(默认 0.45) · `--accent` · `--accent-2` · `--accent-glow` | `::before` 是 accent→accent-2 渐变模糊光晕；`.in` 提亮边框 + 光晕。光晕透明度 = `--glow-strength`（见第 3 节赋值规范） |
| **6 Accordion row** 高度无关展开 | `.accordion-row` + `.in` | `grid-template-rows 0fr→1fr` · `--dur-base` | 内层包一个 div；`.in` 时展开。不靠 height 动画，无跳动 |
| **11 Tab underline** 进度下划线 | `.tab-underline` + `.in` | `scaleX 0→1` · `--accent` · `--dur-slow` | origin-left 刷出，2px 高 |
| **13 Window frame** 拟物窗口 | `.window-frame` + `.in` | 见第 4 节专章 | `.in` 时上推淡入；Vizplainer #1 签名 |

### 2.3 持续循环原语速查

| 原语 | 类名 | 关键 token | 节制建议 |
|---|---|---|---|
| **4 Ambient orbs** 呼吸氛围 | `.ambient-orbs`（绝对全屏层，z-index:0） | `--orb-opacity`(默认 0.14) · `--accent` · `--accent-2` | 两个大模糊球错峰呼吸。透明度必须**比 glow 更克制**（见第 3 节，区间 0.03–0.20） |
| **5 Shimmer** 扫光 | `.shimmer`（容器 overflow:hidden） | `--accent-soft` | accent 微光 L→R 扫过，2.4s 循环。慎用，多了像加载占位 |
| **7 Status dot** 实时点 | `.status-dot` | `--status-color`(默认 `--accent`) | 9px 点 + 扩散 halo。表示「live / running」 |
| **8 Spinner** AI 处理环 | `.spinner` | `--spinner-size`(默认 22px) · `--accent-soft` · `--accent` | AI 处理中指示，0.8s 转一圈 |
| **9 Typing dots** 打字三点 | `.typing-dots > i ×3` | `--accent` · `--ease-soft` | 三点错峰弹跳，「构建中/思考中」语境 |

> 持续微动是「地板」不是「天花板」，但更要节制：`CHAPTER-CRAFT.md` Part 0 原则 7 要求**先看主导动作够不够多样，不够时回去换主导动作，而不是靠堆持续微动补救**。一章里同时挂三种 ambient loop 几乎一定是过度装饰。

### 2.4 接入一个原语的 4 个检查点

1. **类名挂对层级**：`.cascade` 挂父、`--i` 设在每个子；`.window-frame` 挂容器、`.wf-*` 挂内部。
2. **`.in` 的条件用 `step >= N` 还是 `step === N`**：揭示后应保持的用 `>=`（窗口、cascade）；只在某一步亮的用 `===`（carousel-slide 用 `.is-active`）。
3. **持续循环进 reduced-motion**：新增 loop 装饰要么复用现成原语（已被覆盖），要么自己在 reduced-motion 块加 `animation: none`。
4. **颜色/节奏全走 token**：不写死色值和毫秒数。需要更慢/更快 → 改**主题**的 `--cascade-step`，不是改原语。

---

## 3. 辉光层级 token 赋值规范（核心纪律）

辉光（glow）是这套语法里最容易「AI 味爆表」的地方，因此 `design-baseline.json` 给它建了**强制分档断言**。接入新主题或调辉光时，必须落进档位，否则 `check-design-tokens.mjs` 直接红。

### 3.1 三个辉光相关 token

| token | 含义 | 区间（硬约束） | 出处 |
|---|---|---|---|
| `--glow-strength` | `.glow-card` 光晕 + 霓虹边强度乘子（0~1） | 全主题硬上限 **0.6**（超过即刺眼/AI 味） | `design-baseline.json` `glowStrength.range` |
| `--orb-opacity` | `.ambient-orbs` 呼吸氛围透明度 | **0.03 – 0.20**（必须比 glow 更克制） | `glowStrength.orbOpacity.range` |
| `--accent-2` | accent 的渐变/光晕伙伴色 | 仅作渐变伙伴，**不当二级品牌色** | `accentBudget` |

### 3.2 `--glow-strength` 三档分类（强制断言）

`check-design-tokens.mjs` 据此断言每个动效主题落在它声明的档位（`design-baseline.json` `glowStrength.classification`）：

| 档位 | 阈值 | 适用主题气质 | 当前落档主题（实测值） |
|---|---|---|---|
| **restrained 克制** | ≤ 0.20 | Swiss / 报刊 / 学术等浅色严肃主题 | `swiss-ikb-v2`(0.10) · `newsroom-v2`(0.18) |
| **moderate 适中** | [0.15, 0.30] | 暗色 studio 类（暗底需稍强光晕才看得见层次，但不张扬） | `viz-studio`(0.22) · `electric-studio`(0.16) |
| **expressive 张扬** | ≥ 0.40 | 霓虹 / pitch-deck 旗舰（要做「全场动效标杆」） | `bold-signal-v2`(0.55) · `neon-cyber`(0.50) |

> 给新主题赋 `--glow-strength` 时：先定它的气质（浅色严肃 / 暗色 studio / 霓虹旗舰），再取对应档位的值，最后把主题 id 加进 `design-baseline.json` `classification` 的对应数组。**值和分类不一致 = 断言红。**

### 3.3 配套的节奏 token（cascade）

辉光不是孤立的，它和 cascade 节奏一起定义主题的「动效气质」。`design-baseline.json` 还断言了一条**气质排序**（`motionThemes.ordering.stepAscending`）：`--cascade-step` 必须沿 `swiss-ikb-v2 < viz-studio < bold-signal-v2 < neon-cyber < electric-studio < newsroom-v2` 严格递增（Swiss 最克制最快，newsroom 最稳重）。打破排序 = 气质漂了 = 断言红。

当前 6 个动效主题的完整赋值（格式：`glow / cascade-step / cascade-rise / orb / accent-2`），可作为新主题的参照锚：

| 主题 | glow | step | rise | orb | accent-2 |
|---|---|---|---|---|---|
| `newsroom-v2` | 0.18 | 110ms | 16px | 0.06 | `#1f3a5f` |
| `bold-signal-v2` | 0.55 | 85ms | 22px | 0.16 | `#d81e88` |
| `swiss-ikb-v2` | 0.10 | 70ms | 12px | 0.05 | `#0090c8` |
| `viz-studio` | 0.22 | 80ms | 16px | 0.06 | `#a855f7` |
| `neon-cyber` | 0.50 | 90ms | 20px | 0.14 | `#ff00aa` |
| `electric-studio` | 0.16 | 95ms | 14px | 0.06 | `#6f8cff` |

（`--cascade-step` 合法区间 50–140ms，`--cascade-rise` 8–28px，见 `design-baseline.json`）

### 3.4 accent 预算纪律

`accentBudget` 断言：定义了 `--accent-2` 的主题必须也定义 `--accent`；`--accent-soft` / `--accent-glow` 必须与 `--accent` 或 `--accent-2` 同色相（`neon-cyber` 用 accent-2 色相做签名双色 glow 是合法特例，`glowMayMatchAccent2: true`）。

接入层面记三条：
1. **一屏 1–2 处满格 accent，其余走 ink**（`--text` / `--text-2`）。正文不上 accent，accent 预算留给「状态 / 赢家 / 焦点」。
2. accent-2 只在渐变/光晕里出现（`.glow-card::before` 的 accent→accent-2、`.ambient-orbs::after`），不要拿它当第二个品牌色去染图标/标题。
3. 文字层级走 5 档单调递减：`--text` → `--text-2` → `--text-mute` → `--text-faint` → `--text-ghost`（`--text-ghost` 是最淡的背景脚手架档，A1 新增，用于对比表「无」状态）。

---

## 4. 拟物窗口组件（`.window-frame`）标准化使用指南

`.window-frame`（`animations.css` §13）是 Vizplainer 头号签名，作用是把截图/代码/对话/数据面板**包成一个克制的 macOS 风格窗口**，让观众读成「一块真实产品界面」，而不是 PPT 方框。纯 token 驱动，明暗主题通吃。

### 4.1 标准 DOM 结构（固定四件套）

```html
<div class="window-frame">          <!-- 容器，挂 .in 触发上推淡入 -->
  <div class="wf-bar">              <!-- 标题栏 -->
    <span class="wf-dots"></span>   <!-- 三个红绿灯点（默认单色 ink） -->
    <span class="wf-title">pipeline.py</span>  <!-- 文件名/标题槽，mono 字体 -->
  </div>
  <div class="wf-body">             <!-- 内容区：截图 / 代码 / CSV / 对话 -->
    …your content…
  </div>
</div>
```

四个类名各自的职责与 token（不要自己改这些，全靠 token 适配主题）：

| 类名 | 职责 | 关键 token |
|---|---|---|
| `.window-frame` | 圆角 + 表面 + 边框 + 阴影 + `.in` 上推揭示 | `--r-card` · `--surface-2` · `--bw-1` · `--rule` |
| `.wf-bar` | 38px 高标题栏 | `--surface-3`/`--surface-2` 混色 · `--space-3/4` |
| `.wf-dots` | 三红绿灯点 | 默认从 `--text` 低 alpha 取**单色**点 |
| `.wf-title` | 文件名/标题，mono | `--font-mono` · `--t-micro` · `--text-mute` |
| `.wf-body` | 内容区 | `--space-5` · `--surface-2` · `--text` |

### 4.2 单色点 vs 真彩点：`.is-mac` 开关

**默认是单色点**（从主题 ink 低 alpha 画出三个灰点），这样永不和主题单一 accent 抢色。要真实 macOS 红/黄/绿三点，**显式 opt-in** 加 `.is-mac`：

```html
<div class="window-frame is-mac"> …真彩三点… </div>
```

选择建议：
- **极简/严肃主题**（swiss-ikb / 报刊 / 学术）：保持默认单色点，更克制。
- **产品演示/暗色动效主题**（需要「这是真软件」的实感）：`.is-mac` 给真彩点。

### 4.3 三态流程：一个窗口换 body，不堆三个窗口

C1 工具箱的核心反模式提醒：**不要三个窗口并排 + 箭头连接（退化成 PPT 流程图）**。正确做法是**同一个窗口，body 内三个 `.carousel-slide` 前翻**（input → process → output），配 `.wf-title` 同步换文件名（`raw.csv` → `clean.py` → `clean.csv`），观众才有「在用」的感觉。

```tsx
<div className={`window-frame is-mac ${step >= 0 ? "in" : ""}`}>
  <div className="wf-bar">
    <span className="wf-dots" />
    <span className="wf-title">{titleForStep(step)}</span>
  </div>
  <div className="wf-body">
    <div className={`carousel-slide ${step === 1 ? "is-active" : ""}`}>{/* input */}</div>
    <div className={`carousel-slide ${step === 2 ? "is-active" : ""}`}>{/* process + spinner + status-dot */}</div>
    <div className={`carousel-slide ${step === 3 ? "is-active" : ""}`}>{/* output + hero-num */}</div>
  </div>
</div>
```

### 4.4 窗口内的语境分层：mono = 机器，sans = 人

窗口里区分「机器语境」和「人的旁白」：
- 代码/文件名/状态/命令 → `.sys-label`（`--font-mono` + `--track-caps` 大写字距），机器感。
- 旁白/解说一句话 → `.human-note`（sans），人话。
- accent 只在 UI 状态里满格（标签、进度条、状态点），正文/代码用 `--text-2`，不抢色。
- 真实内容 > 占位：用真的文件名/命令/CSV 行，绝不 `lorem ipsum`、绝不 `data1, data2`。

---

## 5. 不同构图工具箱下的 UI 组件自适应布局

同一个 `.window-frame` / hero 数字 / 对照柱，在三个工具箱里的**位置和密度策略不同**。这是「自适应调整 UI 组件位置」的核心：不是改组件本身，而是改它在**栅格里的位置**和**周围的留白密度**。统一的纵向间距用 `--scene-gap` 系列（A2 新增）：`--scene-gap`（默认对齐 `--stage-pad-y` = 80px）/ `--scene-gap-tight`（×0.5）/ `--scene-gap-loose`（×1.5）。

### 5.1 C1 · ui-mockup-scene（窗口居中主导）

- **布局**：`.window-frame` 居中，占据画面主体。旁白 `.human-note` 在窗口上方或下方单行。
- **组件位置策略**：窗口是绝对主角，其它一切退让。进度条/状态点/spinner 都在窗口**内部**（body 里），不外溢。
- **密度**：窗口内高密度（真实数据/代码填满），窗口外大留白。
- **accent 位置**：只在窗口内的 UI 状态（`.um-slide-tag` 输入/处理/产出标签、进度条、状态点）。

### 5.2 C2 · asymmetric-split（33/67 非对称分屏）

- **布局**：左列 **33%** 放低密度文字（一句观点 + 一个 mono 标签），右栏 **67%** 放高密度视觉（窗口 + 图表填满）。**不是 50/50** —— 对称是 PPT 味，非对称才有杂志/编辑感。
- **组件位置策略**：`.window-frame` 移到**右栏**，不再居中。左列只放论点 + `.sys-label` 数据标签。
- **密度反比（#6）**：左列越空（大留白、两三行字），右栏越实。两边密度反差本身是构图张力。左列**要敢留白**，塞满五行字密度反比就塌了。
- **accent 位置**：左列 accent **只点一个词**（`.as-em`）；右栏 accent 只给「赢家那根柱子」。

### 5.3 C3 · comparison-frame（对比表满屏）

- **布局**：整整一屏一张对比表（独立章节，给它仪式感，不埋进正文角落）。表头 + 行标（能力名）+ 多列（竞品 + 我方）。
- **组件位置策略**：没有 `.window-frame`，主角是**列**。竞品列整列灰态（`--text-faint` / `--text-ghost` 退到背景），我方列 `--accent` 描边 + `--accent-soft` 微底压轴。
- **逐列揭示**：竞品列先一列列刷出 → 我方列最后压轴。**禁一次全亮**（否则观众没有「看着差距拉开」的过程）。每列 1 step。
- **accent 位置**：只在我方列。`✓` / `✕` 用纯字符 + token 色，**禁 emoji `✅❌`**（反 AI 味铁律）。

### 5.4 自适应调整的通用决策

接入新内容时，按这张表决定组件该放哪、留白给谁：

| 你要表达 | 主角组件 | 放哪 | 留白给谁 | accent 给谁 |
|---|---|---|---|---|
| 流程/界面 | `.window-frame` | 居中 | 窗口四周 | 窗口内 UI 状态 |
| 观点+证据 | `.window-frame`/图表 | 右栏 67% | 左列 33% | 左列一个词 + 右栏赢家 |
| 我们 vs 同类 | 对照列 | 满屏表格 | 列间距 | 我方列 |

> 三个工具箱的栅格（居中 / 33-67 / 满屏表）是**构图常量**，切主题时不动；切主题只换**主导动作的形式**（newsroom 印章砸下 → terminal 打字机 → chalk 粉笔自绘），结构、step 切分、字号关系都不动。

---

## 6. 接入前最终自检清单（QA 落地版）

提交前逐项过，对应仓库 173 条断言 + 视觉回归：

- [ ] **step 数一致**：`narrations.length` == 章节 tsx 最大 `step` + 1（工具箱 step 约束已满足）。
- [ ] **token 纪律**：章节 CSS 无写死色值/毫秒数，全走 `var(--*)`。
- [ ] **辉光落档**：若动了 `--glow-strength`，值落进 restrained/moderate/expressive 对应档，且 `design-baseline.json` `classification` 里主题 id 在对的数组。
- [ ] **orb 更克制**：`--orb-opacity` 在 0.03–0.20，且小于同主题 glow。
- [ ] **cascade 排序不破**：改了 `--cascade-step` 后仍满足 `stepAscending` 递增。
- [ ] **持续循环进 reduced-motion**：新增的 loop 装饰被 `animation: none` 兜住。
- [ ] **窗口结构完整**：`.window-frame > .wf-bar(.wf-dots + .wf-title) + .wf-body`，真彩点显式 `.is-mac`。
- [ ] **对比表逐列揭示**：每列 1 step，禁一次全亮，`✓✕` 用字符非 emoji。
- [ ] **accent 预算**：一屏 1–2 处满格，正文走 ink。
- [ ] **双关卡本地全绿**：`node qa/check-design-tokens.mjs --quiet`（EXIT 0）+ `cd qa && npx playwright test`。
- [ ] **类型检查**：`cd presentation && npx tsc --noEmit`。
- [ ] **改了章节注册/step 数**：bump `useStepper.ts` 的 `STORAGE_KEY`。

---

## 附录 A · 文件与命令速查

| 你要 | 去哪 / 跑什么 |
|---|---|
| 看原语定义 | `templates/src/styles/animations.css`（§1–§13） |
| 看语义 token | `templates/src/styles/base.css` `:root` |
| 看主题动效赋值 | `themes/all-themes.css`（搜 `[data-theme="<id>"]`） |
| 展开某主题为 `:root` | `node scripts/extract-theme.mjs themes/all-themes.css <id>` |
| 看辉光/节奏基准 | `qa/design-baseline.json` |
| 跑 token 关卡 | `node qa/check-design-tokens.mjs --quiet` |
| 跑视觉回归 | `cd qa && npx playwright test` |
| 更新快照基准 | `cd qa && npx playwright test --update-snapshots` |
| 单章美学唯一入口 | `references/CHAPTER-CRAFT.md` |
| 三大工具箱 | `references/EXAMPLES/{ui-mockup-scene,asymmetric-split,comparison-frame}/` |

## 附录 B · 12 原语 + 拟物窗口一览

```
阶梯式（.in 揭示）：
  §1  .cascade > *        错峰淡入（hero 签名）
  §2  .rise-step          单元素上推
  §3  .glow-card          霓虹边光晕（--glow-strength）
  §6  .accordion-row      高度无关展开
  §11 .tab-underline      进度下划线
  §13 .window-frame       拟物窗口（#1 签名）
      .mask-reveal        clip-path 文字擦除
      .rule-grow          细线 scaleX 生长

持续循环（无 .in，进 reduced-motion）：
  §4  .ambient-orbs       呼吸氛围球（--orb-opacity）
  §5  .shimmer            扫光
  §7  .status-dot         实时呼吸点
  §8  .spinner            AI 处理环
  §9  .typing-dots        打字三点

状态切换：
  §10 .carousel-slide     三态前翻（.is-active）

JS 配合：
  §12 .count-up           tabular-nums 数字滚动字形
```

---

*本手册随 v2 动效原语库与 `design-baseline.json` 同步演进。任何对原语契约、辉光分档、工具箱 step 约束的修改，都应回写本手册对应小节并重跑双关卡。*
