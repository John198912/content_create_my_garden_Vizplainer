# Vizplainer 借鉴优化项目 · 完整项目说明书

*文档类型：项目总览 / 可回溯审查索引（master overview）*
*整理日期：2026-06-21（最后更新：2026-06-21 落地 O-1/O-2/O-4 + D-2 全量动效升级）| 范围：`web-video-presentation` 工作流借鉴 Vizplainer 的全流程优化 + 设计基准自动化 QA/CI 交付*
*单一目标：让整个项目与优化方案在「调研 → 方案 → 落地 → 验证」四个环节上完整可回溯、可审查、可复现。*

---

## 0. 这份文档是什么 / 怎么用

本项目历经三个阶段产出了三类文档，分散在工作区不同位置。本文档把它们**统一编目、交叉索引并补一张完整溯源矩阵**，使任何审查者无需翻遍全库即可回答：

- 每一条优化是基于哪条调研发现做的？
- 这条优化落到了哪个文件的哪个位置？
- 它有没有被验证过？验证证据在哪？

阅读顺序建议：

1. 先读本节 + §1（项目脉络）建立全局认知；
2. 看 §2（文档清单）知道每份原始文档在哪、讲什么；
3. 审查具体某条优化时，查 §5（溯源矩阵）按 ID 定位；
4. 复核验证是否可信时，读 §6（验证与 QA/CI 交付）+ §7（复现指南）。

> 本文档为**索引与溯源层**，不重复三份源文档的全文。需要细节时按各节给出的相对路径跳读源文档。

---

## 1. 项目脉络（三阶段时间线）

| 阶段 | 时间 | 做了什么 | 关键产出 |
|---|---|---|---|
| **调研** | 2026-06-19 ~ 06-20 | 实地观察 Vizplainer.com，分两个维度沉淀：动效/缓动/CSS 实现层 + 版面/层级/色彩/字体/构图/叙事/拟物等高层设计层 | 两份调研文档（§2 a/b） |
| **方案设计** | 2026-06-21 | 把调研发现抽象成**主题无关的 token / 原语 / 指引**，按工作流 8 个模块归类成 A–G 共 24 条优化机会，排出三阶段路线图，并标注与现有设计哲学的兼容性 | 优化方案文档（§2 c） |
| **落地交付** | 2026-06-21 | (i) 全量实施阶段一→三所有方案条目；(ii) 为防止落地成果被未来改动悄悄带偏，额外交付一套**设计基准自动化 QA + 视觉回归 CI** | 方案文档 §5 落地记录 + `qa/` 全套 + GitHub Actions（§6） |

**核心设计原则（贯穿全程）**：不照搬 Vizplainer 的具体视觉风格（黑底靛蓝），而借鉴其**设计方法论与系统纪律**（留白节奏、层级纪律、拟物演示、叙事结构、克制），并把每条特质抽象成 27 套主题都能受益的**主题无关 token / 原语 / 指引**。详见优化方案 §0。

---

## 2. 文档清单（三类源文档 + 本总览）

所有路径相对工作区根 `/home/user/workspace/`。

### (a) 调研 · 动效实现层
- **文件**：`vizplainer_animation_inventory.md`（约 16.7 KB，英文）
- **方法**：实地浏览器观察 + HTML/CSS 源码检视（2026-06-19）
- **内容骨架**：GLOBAL DESIGN SYSTEM（Color / Typography）→ SECTION 1–7 逐区动效（Navbar / Hero / What-Vizplainer-Does / Comparison-Table / Powerful-Features / Contact / Footer）→ HOVER EFFECTS MASTER LIST → MOTION GRAPHICS VIDEO DEMO STYLE → EASING & TIMING SUMMARY → SCROLL BEHAVIOR → ANIMATED DATA COUNTERS → DEVELOPER IMPLEMENTATION NOTES（含 hero stagger / demo state transitions / shimmer sweep / tab underline slide / glow card 的可复刻 CSS）
- **核心结论**：整体气质 “smooth and cinematic, not springy”，纯 CSS ease-out 曲线；强调色仅出现在 mockup UI 状态内；shimmer/spinner/typing-dots/state-carousel 五类机器语境动效构成 demo 的“活”。

### (b) 调研 · 高层视觉设计层
- **文件**：`vizplainer_visual_design_research.md`（约 27.2 KB，中文）
- **方法**：实地截图 + HTML/CSS class 提取 + 设计判断（2026-06）
- **内容骨架**：1.版面系统 / 2.视觉层级 / 3.信息构图 / 4.色彩系统 / 5.字体设计哲学 / 6.留白与呼吸节奏 / 7.品牌一致性与克制 / 8.叙事-信息流结构 / 9.拟物-UI演示美学 / 10.整体气质关键词（cinematic / restrained / technical / dark-mode-native / premium / systematic / documentary）
- **附录 · Top 8 最值得借鉴特质**（本项目优化的主源头）：
  1. macOS 窗口语法作为通用“演示容器”
  2. 三段式 UI 流程（输入/处理/输出）替代文字步骤说明
  3. 强调色只在 UI 状态内满格，页面级用白/黑
  4. 7 档白色透明度文字层级系统
  5. 真实内容 > placeholder 文字
  6. py-24 单一节奏单元（纵向“电影帧”感）
  7. monospace = 机器/系统语境的视觉语法
  8. 竞品比较表作为独立 Section 的叙事策略

### (c) 优化方案设计 + 落地完成记录
- **文件**：`skills/space/web-video-presentation/references/VIZPLAINER-OPTIMIZATION-PLAN.md`（约 13.6 KB，中文，175 行）
- **结构**：§0 前提（不硬塞 Vizplainer 风格，抽象成主题无关 token/原语）/ §1 优化机会全景（8 模块 A–G，24 条）/ §2 三阶段路线图 / §3 兼容性 / §4 待决策 / **§5 落地完成记录（全部 ✅ 并验证）**
- **决策结论（已确认）**：全做阶段一→三；授权修复 G1 存储不同步；做致敬主题 viz-studio。

### (d) 本总览（你正在读）
- **文件**：`skills/space/web-video-presentation/references/PROJECT-OVERVIEW.md`
- **作用**：统一索引上述三类文档 + 完整溯源矩阵 + QA/CI 交付说明 + 复现指南。

---

## 3. 优化方案全景（8 模块 24 条，按模块速览）

下表为方案 §1 的压缩索引，完整论证见优化方案文档对应模块。落地状态全部为 ✅（详见 §5 溯源矩阵的“落地位置”与“验证证据”列）。

| 模块 | 范围 | 条目 |
|---|---|---|
| **A** token 基建层（`templates/src/styles/`） | 全局 token | A1 `--text-ghost` 第 5 档 · A2 `--scene-gap` 语义档（✅ 本轮 O-2 落地）· A3 `.window-frame` 原语 · A4 `.sys-label`/`.human-note` |
| **B** 章节构图单一入口（`CHAPTER-CRAFT.md`）—**最高杠杆** | 影响每条新视频 | B1 层级三板斧 · B2 拟物 UI 演示 · B3 真实内容>placeholder · B4 强调色预算 · B5 密度反比 · B6 流程优先 UI 轮播 |
| **C** 结构示意（`EXAMPLES/`） | 构图落地骨架 | C1 `ui-mockup-scene` · C2 `asymmetric-split` · C3 `comparison-frame` |
| **D** 主题系统（`themes/`） | 增量主题/token | D1 `viz-studio` 致敬暗色主题 · D2 全量动效升级：给所有定义动效 token 的主题（neon-cyber/electric-studio）补齐完整动效套件（cascade/glow/orb/accent-2），共 6 个动效主题 |
| **E/F** 口播稿/大纲（`SCRIPT-STYLE.md`/`OUTLINE-FORMAT.md`） | 叙事指引 | E1 叙事弧线密度递减 · E2 对比异议独立成段 · E3 问题式 hook |
| **G** 文档治理（横切） | 阻断性修复 | G1 scaffold.sh + THEMES.md 与合并存储模型同步 |

> 注：A2（`--scene-gap`，★★）原为本项目审查发现的唯一溯源断裂（旧 §9 D-1），已于本轮通过 O-2 真实落地——`base.css` `:root` 新增 `--scene-gap`/`--scene-gap-tight`/`--scene-gap-loose` 三档语义间距并纳入静态断言。**至此 24 条全部真实落地并可追溯**。

---

## 4. 12 个动效原语 + window-frame（落地成果词汇表）

这是调研→方案的核心物化成果，全部主题无关、走 token、明暗通吃，是 QA 基准守护的对象（§6）。

| 原语 | 语义 | 步进契约 | 调研源 |
|---|---|---|---|
| `.cascade` | 多项级联淡入 | `.in` 驱动 | hero stagger（动效清单 §Hero）|
| `.rise-step` | 单项上推入场 | `.in` 驱动 | fadeIn + translate |
| `.glow-card` | 发光卡片 | `.in` 驱动 | glow card / ambient blobs（动效清单 §Features）|
| `.ambient-orbs` | 呼吸氛围光斑 | 循环装饰 | indigo/violet blur-80px orbs |
| `.shimmer` | 扫光进度感 | 循环装饰 | shimmer sweep 2s |
| `.accordion-row` | 手风琴展开 | `.in` 驱动 | grid-rows 0fr→1fr |
| `.status-dot` | 状态脉冲点 | 循环装饰 | pulsing green dot |
| `.spinner` | 加载旋转 | 循环装饰 | loader-circle spin |
| `.typing-dots` | 处理中三点 | 循环装饰 | bouncing dots |
| `.carousel-slide` | 多状态轮播 | `.is-active` 驱动 | demo 3-state carousel |
| `.tab-underline` | 标签下划线滑入 | `.in` 驱动 | tab underline slide |
| `.count-up` | 数字滚动 | `.in` 驱动 | （工作流补充，Vizplainer 本身无计数器）|
| `.window-frame`（§13） | macOS 拟物演示容器 | `.in` 驱动 | macOS 窗口语法（视觉调研 §9 / Top8 #1）|

每主题动效 token（6 个动效主题，glow/step/rise/orb/accent-2）：newsroom-v2 0.18/110ms/16px/0.06/#1f3a5f；bold-signal-v2 0.55/85/22/0.16/#d81e88；swiss-ikb-v2 0.10/70/12/0.05/#0090c8；viz-studio 0.22/80/16/0.06/#a855f7；**neon-cyber 0.50/90/20/0.14/#ff00aa**（expressive，洋红 signature glow）；**electric-studio 0.16/95/14/0.06/#6f8cff**（moderate）。完整定义见 `qa/design-baseline.json`。

---

## 5. 溯源矩阵（核心 · 可审查的证据链）

每行 = 一条可独立审查的优化。**调研发现 →（方案条目）→ 落地位置 → 验证证据**。
落地位置路径相对 `skills/space/web-video-presentation/`。验证列：① = 静态断言（`check-design-tokens.mjs`，**173 项**，本轮由 107 扩至 173）；② = 视觉回归快照（Playwright，**6 个动效主题**，本轮由 4 扩至 6）；T = `tsc --noEmit`；P = Playwright 实地脚手架截图自检（方案 §5 验证段）。

### 模块 A — token 基建

| ID | 调研发现（出处） | 落地位置 | 验证证据 |
|---|---|---|---|
| A1 | 7 档白色透明度文字层级（视觉调研 §2 / Top8 #4） | `base.css` 新增 `--text-ghost` 第 5 档（`color-mix` 随主题墨色自适应；viz-studio 显式覆盖 `rgba(244,244,246,0.12)`） | ①字体梯度组：5 档严格单调递减 + WCAG≥4.5；② fixture 含 5 档梯度条；P |
| A2 ✅ | 慷慨留白 / 单一节奏单元（视觉调研 §1/§6 / Top8 #6） | **已落地（本轮 O-2）**：`base.css` `:root` 新增 `--scene-gap: var(--stage-pad-y)` + `--scene-gap-tight: calc(...*0.5)` + `--scene-gap-loose: calc(...*1.5)` 三档语义间距，默认对齐 stage-pad 节奏锚点 | ①§1 新增 scene-gap 存在性断言（3 档均被校验）；P |
| A3 | macOS 窗口语法作为通用演示容器（视觉调研 §9 / Top8 #1） | `animations.css` §13 `.window-frame`（`.wf-bar`/`.wf-dots`/`.wf-title`/`.wf-body`；默认单色三点，`.is-mac` opt-in 真 macOS 红黄绿；`.in` 揭示钩；含减动降级） | ①原语存在性 + 步进契约（`.window-frame.in`）+ reduced-motion 降级；② 6 主题快照含 window-frame；P |
| A4 | mono = 机器语境（视觉调研 §5 / Top8 #7） | `base.css` 新增 `.sys-label`（mono caps · 机器语境）+ `.human-note`（sans · 人声） | ② fixture 含 sys-label/human-note；P |

### 模块 B — 章节构图单一入口（最高杠杆）

| ID | 调研发现（出处） | 落地位置 | 验证证据 |
|---|---|---|---|
| B1 | 尺寸跨度 6:1、字重跳格 700↔300（视觉调研 §2/§5） | `CHAPTER-CRAFT.md`「Vizplainer 借鉴的六条进阶手法」段 · 层级三板斧 | 文档审查（指引类无机器断言，靠人工复核 + EXAMPLES 体现） |
| B2 | 拟物 UI 演示：编辑器=输入/时间轴=过程/视频帧=输出（视觉调研 §3/§9 / Top8 #2） | `CHAPTER-CRAFT.md` 同段 · 拟物 UI 演示工具箱，配 `.window-frame` | 文档审查 + C1 EXAMPLE 物化 |
| B3 | 真实内容 > placeholder（视觉调研 §3/§5 / Top8 #5） | `CHAPTER-CRAFT.md` 同段 · 真实文件名/数据/引用（文字真，图片仍 placeholder） | 文档审查 |
| B4 | 强调色出现预算 ~5 处/全页（视觉调研 §2/§4 / Top8 #3） | `CHAPTER-CRAFT.md` 同段 · 强调色满格 1–2/屏 | ①强调色预算组（`--accent-2` 必伴 `--accent`，soft/glow 同色相） |
| B5 | 信息密度与视觉面积成反比（视觉调研 §3） | `CHAPTER-CRAFT.md` 同段 · 密度反比心法 | 文档审查 |
| B6 | 三段式流程用 UI 轮播非箭头图（视觉调研 §3 / 动效清单 demo carousel） | `CHAPTER-CRAFT.md` 关系→动作决策树补“流程类→`.carousel-slide`” | 文档审查 + C1 EXAMPLE 物化 |

### 模块 C — EXAMPLES 结构骨架

| ID | 调研发现（出处） | 落地位置 | 验证证据 |
|---|---|---|---|
| C1 | macOS 窗口演示容器（视觉调研 §9 / Top8 #1） | `EXAMPLES/ui-mockup-scene/`：用 `.window-frame` 搭输入态/处理态/输出态 + `.carousel-slide` 轮播 | 骨架存在性 + P |
| C2 | 4:8 非对称分栏（视觉调研 §1） | `EXAMPLES/asymmetric-split/`：33% 文窄 + 67% 视宽，已注册 EXAMPLES 索引 | 骨架存在性 |
| C3 | 竞品比较表独立 Section（视觉调研 §8 / Top8 #8） | `EXAMPLES/comparison-frame/`：竞品列置灰（`--text-ghost`/`--text-faint`）+ accent 点亮本品，逐列揭示 | ①对比表叙事组 5 条铁律（独立章节/竞品列灰态/逐列揭示/`✓✕`用字符非 emoji/narrations N+1）；P |

### 模块 D — 主题系统

| ID | 调研发现（出处） | 落地位置 | 验证证据 |
|---|---|---|---|
| D1 | 暗色原生 + 拟物演示极致气质（视觉调研 §10） | `all-themes.css` 追加 viz-studio 纯黑工作台块（`--shell #000`/`--surface #0b0b0e`/靛蓝 `--accent #6366f1`/紫罗兰 `--accent-2 #a855f7`/显式 `--text-ghost`/克制 glow 0.22/电影感 ease-out/径向聚光）；`all-themes-meta.json` 追条目；`THEMES.md` 三处文档（计数 27/深色表/起点表） | ①辉光档（viz-studio 0.22 落 moderate）+ 级联气质排序 + 字体梯度；② viz-studio 快照；全库 27 主题 meta=css 校验同步；T |
| D2 | 全量动效升级：凡定义动效 token 的主题都补齐完整套件（动效清单 §Color / 视觉调研 §4） | `all-themes.css` 给 neon-cyber（cascade-step 90ms/rise 20px/glow 0.50/orb 0.14/accent-2 #ff00aa）+ electric-studio（cascade-step 95ms/rise 14px/glow 0.16/orb 0.06/accent-2 #6f8cff）补齐完整动效套件，连同原 4 个 v2 主题共 6 个动效主题 | ①cascade/glow/orb/accent-2 多组断言（neon-cyber 归 expressive、electric-studio 归 moderate；glow 可与 accent-2 同色相） + §9 coveredThemes 双向强制；② neon-cyber/electric-studio 新增快照 |

### 模块 E/F — 叙事指引

| ID | 调研发现（出处） | 落地位置 | 验证证据 |
|---|---|---|---|
| E1 | 叙事弧线密度递减：冲击→展开→论证→验证→保留（视觉调研 §8） | `SCRIPT-STYLE.md`「整片叙事弧线」+ `OUTLINE-FORMAT.md`「叙事弧线落到 step 分布」 | 文档审查 + OUTLINE 新增 2 条自检 |
| E2 | 竞品异议单独成段（视觉调研 §8 / Top8 #8） | `OUTLINE-FORMAT.md`「对比/反方独立成章」 | 文档审查 + C3 EXAMPLE 物化 |
| E3 | 标题用问题陈述非功能声明（视觉调研 §8） | `SCRIPT-STYLE.md` 金句写法 · 问题式 hook | 文档审查 |

### 模块 G — 文档治理（阻断性）

| ID | 问题（出处） | 落地位置 | 验证证据 |
|---|---|---|---|
| G1 | scaffold.sh + THEMES.md 与合并存储模型不同步（预存在阻断问题） | `scripts/scaffold.sh` 改走 `extract-theme.mjs` 从合并文件抽取 + grep 校验；`THEMES.md` 8 处同步到合并存储模型（无每主题子目录，新主题=追加 CSS 块 + meta 字典条） | `--list-themes` OK；脚手架 viz-studio → T 通过；P |

---

## 6. 验证与 QA/CI 交付（“最终落地交付”）

为保证落地成果**长期不被未来主题/样式改动悄悄带偏**，本项目额外交付一套设计基准自动化 QA + 视觉回归 CI。这是项目“可回溯验证审查”要求在工程上的兜底。

全部位于 `skills/space/web-video-presentation/`。

### 6.1 单一真相源
- **`qa/design-baseline.json`**：所有基准值的唯一真相源，从 `templates/src/styles/*.css` 与 `themes/all-themes.css` 真实定义提炼。覆盖 globalTokens（含本轮新增 `sceneGap`）/ primitives（含步进契约 + reduced-motion 守卫）/ **motionThemes（本轮新增：6 个动效主题名单 + coveredThemesRule）**/ cascadeSpeed（区间 + 气质排序）/ glowStrength（restrained≤0.20 / moderate[0.15,0.30] / expressive≥0.40 + orbOpacity）/ textGradient（5 档单调递减 + WCAG）/ accentBudget（含 `glowMayMatchAccent2`）/ comparisonFrameNarrative（5 条铁律）/ **guidelineAnchors（本轮新增：指引类锚点标题）**/ visualRegression。
  - glow 分类：restrained=[newsroom-v2, swiss-ikb-v2]；moderate=[viz-studio@0.22, electric-studio@0.16]；expressive=[bold-signal-v2@0.55, neon-cyber@0.50]。

### 6.2 关卡①：静态设计基准断言
- **`qa/check-design-tokens.mjs`**：无需浏览器，纯解析 CSS 断言，**173 项全过**（本轮由 107 扩至 173）。10 组覆盖：全局动效 token（含新增 scene-gap）/ 原语存在性 + 步进契约 / reduced-motion 降级 / 级联速度 + 气质排序 / 辉光阈值 + orb / 字体梯度 + WCAG / 强调色预算 + 同色相（本轮放宽：glow/soft 可与 accent 或 accent-2 同色相）/ 对比表叙事 5 铁律 / **§9 coveredThemes 强制（本轮新增：扫 all-themes.css，凡定义 `--cascade-step` 的主题必须出现在 motionThemes + 3 个 perTheme 字典里，双向校验）**/ **§10 guidelineAnchors（本轮新增：校验 CHAPTER-CRAFT/SCRIPT-STYLE/OUTLINE 锚点标题存在）**。
  - 跑：`node qa/check-design-tokens.mjs`（详细）/ `--quiet`（仅 FAIL）。退出码 0=全过，1=有 FAIL（CI 据此卡关）。

### 6.3 关卡②：视觉回归（布局快照）
- **`qa/visual-regression.spec.mjs`** + **`qa/fixture/verify.html`**（一屏覆盖 12 原语 + window-frame + 5 档梯度 + accent→accent-2 渐变 + sys-label/human-note）+ **`qa/fixture/tokens.css`** + **`qa/playwright.config.mjs`**。
- 对 **6 个动效主题**（newsroom-v2 / bold-signal-v2 / swiss-ikb-v2 / viz-studio / **neon-cyber / electric-studio**）逐像素对比基准。
- **决定性措施（避免误报）**：屏蔽 Google Fonts 网络请求（全平台一致 fallback 度量）；注入 CSS 关掉所有 animation/transition（截入场终态）；固定 viewport 1280×760@2x + settle。`maxDiffPixelRatio` 默认 1.2% 给抗锯齿留余量。
- **基准 PNG**：`qa/__snapshots__/{newsroom-v2,bold-signal-v2,swiss-ikb-v2,viz-studio,neon-cyber,electric-studio}.png`（6 张，本轮新增 neon-cyber/electric-studio），提交进仓库；因决定性措施在 sandbox 与 GitHub 官方 Playwright 容器中环境无关。

### 6.4 CI：每周一自动巡检
- **`.github/workflows/visual-qa.yml`**：
  - 触发：`schedule` 每周一 01:00 UTC（北京时间 09:00）；`push`/`pull_request`（改动 `templates/src/styles/**`、`themes/**`、`comparison-frame/**`、`qa/**`，以及本轮新加的 `references/CHAPTER-CRAFT.md`、`references/SCRIPT-STYLE.md`、`references/OUTLINE-FORMAT.md` 时 —— O-1 使指引类也进入 CI 覆盖）；`workflow_dispatch`（可勾选重写基准）。
  - 两 job：token-baseline（关卡①，秒级先卡）→ visual-regression（关卡②，容器 `mcr.microsoft.com/playwright:v1.61.0-noble`，`PLAYWRIGHT_BROWSERS_PATH=/ms-playwright`，`npm install` 而非 ci，失败上传 diff/actual/expected 三联图工件）。

### 6.5 负向漂移拦截测试（证明守卫有效）
- 本轮跑了三组负向测试，全部被正确拦下并还原复绿：(1) neon-cyber glow 0.50→0.75 被同时报为“漂移 + 越界”；(2) 删除 `--scene-gap` 被 O-2 新增断言提住；(3) 给 warm-keynote 加 `--cascade-step` 但不补基准 → 被 §9 coveredThemes（O-4）作为“漏覆盖”拦下。证明这套系统能拦下“没改基准却改了实现”与“加了动效 token 却漏加基准”两类漂移。

### 6.6 方案落地的实地验证（方案 §5 验证段）
- 用 viz-studio（暗）+ swiss-ikb（浅）两套主题脚手架并 Playwright 截图：`.window-frame`（单色 + `.is-mac`）、`.wf-*`、`.sys-label`、`.human-note`、`--text-ghost` 5 档梯度、comparison-frame（ghost 列 + accent 本品列）、`.glow-card`/`.status-dot`/`.spinner`/`.typing-dots`/`.ambient-orbs` 在明暗两主题下均正确渲染；证实明暗通吃（全走 token + `color-mix`，无硬编码色，accent 仅在 UI 状态位置出现）；全项目 `tsc --noEmit` 通过；27 主题 meta/css 同步。

### 6.7 GitHub 落地与 CI 实跑
- **仓库**：`John198912/content_create_my_garden`（PUBLIC，用户明确指定的既有公开仓库），整套 skill 置于仓库根、`main` 分支。
- **CI 实跑全绿**：两个 job 均通过。途中修复两个真实 CI 问题并验证复绿：(a) Playwright 容器/依赖版本不一致 → 统一对齐 1.61.0 + 用容器预装浏览器；(b) `npm ci` lockfile 跨平台 fsevents 严格性 → 改用 `npm install`。本轮动效升级（173 断言 + 6 主题快照）在本地双关卡均实跑全绿后推送。
- Actions：[content_create_my_garden · Actions](https://github.com/John198912/content_create_my_garden/actions)

---

## 7. 复现 / 审查指南（任何人可独立验证）

```bash
# 仓库根
git clone https://github.com/John198912/content_create_my_garden && cd content_create_my_garden

# 关卡①：静态断言（秒级，无需浏览器）—— 应输出 173 项全过、退出码 0
node qa/check-design-tokens.mjs

# 关卡②：视觉回归（需 Chromium）
cd qa && npm install && npx playwright install chromium
npm run test:visual          # 与基准逐像素对比 —— 应 6 passed（6 个动效主题）
npm run test:visual:update   # 仅当有意变更基准时重写

# 主题脚手架冒烟（验证 G1 修复 + viz-studio 可脚手架）
bash scripts/scaffold.sh --list-themes
bash scripts/scaffold.sh ./presentation --theme=viz-studio && cd presentation && npx tsc --noEmit
```

跨环境基准更新的权威姿势：Actions → visual-qa workflow → Run workflow → 勾选“重写视觉回归基准快照” → 下载 `updated-snapshots` 工件替换本地 `qa/__snapshots__/` 提交（详见 `qa/README.md`）。

---

## 8. 可回溯审查 checklist（验收用）

| 审查问题 | 在哪查证 | 状态 |
|---|---|---|
| 每条优化是否都能追到调研发现？ | §5 溯源矩阵“调研发现（出处）”列 | ✅ 24 条均可追到调研出处 |
| 每条优化是否都有明确落地位置？ | §5“落地位置”列 + 方案 §5 | ✅ 24/24 全部落地（A2 `--scene-gap` 本轮 O-2 已补实） |
| 每条优化是否被验证？ | §5“验证证据”列（①②TP）+ §6 | ✅ 机器可断言项 173 项全过；指引类本轮加上 §10 guidelineAnchors 锚点断言（O-1）+ EXAMPLES 物化 |
| 落地成果是否防回退漂移？ | §6.2/6.4/6.5 QA + CI + 负向测试 | ✅ |
| 是否与现有设计哲学冲突？ | 方案 §3 + §5 兼容性复核 | ✅ 全为 opt-in 原语/指引，accent-2 仅渐变伙伴，真实内容仅针对文字 |
| 第三方能否独立复现验证？ | §7 复现指南 | ✅ 公开仓库 + 命令可跑 |
| 文档是否完整可索引？ | §2 文档清单 + 本总览 | ✅ |

---

## 9. 审查结论与本轮整改落地（缺陷与优化点闭环）

本节先呈现上一轮回溯审查的**批判性复查结论**，再标注本轮（2026-06-21）按用户指示对这些缺陷/优化点做的**实际整改与落地证据**。所有结论与整改均可按 §7 命令复现。

### 缺陷整改台账（按严重度分级）

| ID | 严重度 | 原问题 | 本轮整改 | 落地证据 |
|---|---|---|---|---|
| **D-1** | 中（溯源硬伤） | **A2 `--scene-gap` 虚假落地**：方案 §1 列为 ★★ 条目，但 §5 落地记录无此行、base.css 也无 `--scene-gap`，初版总览曾误标“已验证” | ✅ **已修复（采用 O-2 補实方案）**：`base.css` `:root` 新增 `--scene-gap`/`--scene-gap-tight`/`--scene-gap-loose` 三档语义间距，并在关卡① §1 加存在性断言 | `grep -n scene-gap templates/src/styles/base.css` 命中 3 档；关卡① §1 断言通过 |
| **D-2** | 低→已显著缩小 | **视觉回归原仅覆盖 4 个 v2 主题**；动效 token 静态校验也只针对定义了动效 token 的主题 | ✅ **已显著缩小（D-2 全量动效升级 + O-3 + O-4）**：把 neon-cyber / electric-studio 升级为完整动效主题并纳入断言与快照，动效主题由 4→6；视觉回归基准由 4→6 张；并加 O-4 coveredThemes 双向强制，凡定义动效 token 的主题必被基准覆盖 | 关卡① motionThemes=6 + perTheme 三字典齐全；`qa/__snapshots__/` 6 张基准；O-4 §9 断言通过（负向测试给 warm-keynote 加 token 漏基准被拦下） |
| **D-3** | 低→已闭环 | **指引类（B1–B6 / E1–E3）无机器验证**，CI `paths` 也不含三份指引文档，误删不会被拦 | ✅ **已闭环（O-1）**：关卡① 新增 §10 guidelineAnchors，校验 CHAPTER-CRAFT「六条进阶手法/层级三板斧/拟物/密度反比/强调色出现预算」、SCRIPT-STYLE「整片叙事弧线」、OUTLINE「叙事弧线」锚点标题仍存在；并把三份指引加进 CI `push`/`pull_request` paths | 关卡① §10 断言通过；`.github/workflows/visual-qa.yml` paths 含三份 references 文档 |

> 说明：上一轮审查中曾一度疑似“warm-keynote 主题漏覆盖”，经精确括号配对复核为**误报**（正则切分跨块所致）——warm-keynote 原本未定义动效 token，不需被校验。本轮 O-4 落地后，这类“加了动效 token 却漏加基准”的真实风险已被 coveredThemes 双向断言强制兜底（负向测试已证明能拦）。

### 优化点落地台账（按性价比排序）

| ID | 优化点 | 本轮状态 | 落地证据 |
|---|---|---|---|
| **O-1** | 给指引类加结构性存在性断言 + 把三份指引加进 CI paths | ✅ **已落地** | 关卡① §10 guidelineAnchors；CI paths 扩展（见 §6.4） |
| **O-2** | 補 A2：把 stage-pad 抽象为 `--scene-gap` 语义档 + 断言 | ✅ **已落地** | base.css 三档 scene-gap + 关卡① §1 断言（同 D-1） |
| **O-3** | 给视觉回归加非默认 v2 的动效主题快照 | ✅ **已落地（以 D-2 升级覆盖）**：neon-cyber / electric-studio 升级为动效主题后已各生成 1 张基准快照纳入回归 | `qa/__snapshots__/neon-cyber.png`、`electric-studio.png`；关卡② 6 passed |
| **O-4** | `design-baseline.json` 加 `coveredThemes` 字段 + “凡定义动效 token 的主题必在基准里”断言 | ✅ **已落地** | baseline 新增 motionThemes + coveredThemesRule；关卡① §9 双向断言（同 D-2） |

### 总体结论（本轮整改后）

项目质量**总体稳健且本轮进一步收敛**：核心交付（12 原语 + window-frame + QA 双关卡 + CI）真实、一致、可复现。本轮按用户指示完成 **D-2 全量动效升级**（动效主题 4→6，凡定义动效 token 的主题均补齐完整套件并被基准覆盖），并落地 **O-1 / O-2 / O-4**（O-3 由 D-2 升级一并覆盖）：静态断言由 107→**173 项全过**，视觉回归基准由 4→**6 张**，三组负向测试（glow 越界 / 删 scene-gap / 漏覆盖动效主题）均被正确拦下并还原复绿。上一轮唯一真实硬伤 D-1（A2 虚假溯源）已通过 O-2 補实修复——**至此 24 条优化全部真实落地、可追溯、被机器或快照守护**。

---

## 附 · 文件位置速查

| 文档/资产 | 路径（相对工作区根） |
|---|---|
| 调研·动效层 | `vizplainer_animation_inventory.md` |
| 调研·视觉层 | `vizplainer_visual_design_research.md` |
| 优化方案 + 落地记录 | `skills/space/web-video-presentation/references/VIZPLAINER-OPTIMIZATION-PLAN.md` |
| 本总览 | `skills/space/web-video-presentation/references/PROJECT-OVERVIEW.md` |
| QA 真相源 | `skills/space/web-video-presentation/qa/design-baseline.json` |
| QA 静态断言 | `skills/space/web-video-presentation/qa/check-design-tokens.mjs` |
| QA 视觉回归 | `skills/space/web-video-presentation/qa/visual-regression.spec.mjs`（+ `fixture/` + `__snapshots__/`） |
| QA 说明 | `skills/space/web-video-presentation/qa/README.md` |
| CI 工作流 | `skills/space/web-video-presentation/.github/workflows/visual-qa.yml` |
| GitHub 仓库 | https://github.com/John198912/content_create_my_garden |
