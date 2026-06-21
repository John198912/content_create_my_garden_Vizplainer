# 借鉴 Vizplainer 的视频工作流全维度优化方案

*调研日期: 2026-06-21 | 范围: 整套 web-video-presentation 工作流,不局限于主题/章节/构图*

> 本方案基于两份调研:
> - [`vizplainer_animation_inventory.md`] —— 动效/缓动/CSS 实现层
> - [`vizplainer_visual_design_research.md`] —— 版面/层级/色彩/字体/构图/叙事/拟物 等高层设计维度
>
> 已落地的部分(三套 v2 动效主题 + 12 个动效原语)见 [`THEMES.md`](THEMES.md) 的「v2 动效主题 + 动效原语词汇」。本方案是**更上层、覆盖全模块**的优化蓝图。

---

## 0. 一个必须先讲清楚的前提:不要把 Vizplainer 风格硬塞成全局规范

Vizplainer 的气质是 **暗色原生 + 单色靛蓝克制 + 拟物 UI 演示**。而本工作流的核心设计哲学是:

- **26 套多元主题**(暗/浅/暖/复古/瑞士/赛博…),气质各异;
- **章节自由发挥构图/动效**,主题只兜底颜色/字体/性格签名(SKILL 原则 7、9);
- **反 AI 味清单明确禁了蓝紫对角渐变**(CHAPTER-CRAFT.md)。

所以 Vizplainer 有几条特质**不能直接搬**,否则会与现有哲学冲突:

| Vizplainer 特质 | 冲突点 | 正确做法 |
|---|---|---|
| indigo→purple 渐变光晕 | CHAPTER-CRAFT 反 AI 味清单禁蓝紫渐变 | 抽象成 `--accent`→`--accent-2` 的**同/邻色相**渐变,由主题决定色相(v2 已这么做) |
| 暗色原生纯黑底 | 工作流有大量浅色/暖色主题 | 把"两档底色语义分层"抽象成 `--surface`/`--surface-2` 的**相对亮度关系**,明暗都适用 |
| 全站单一 indigo 强调 | 各主题强调色不同 | 借鉴的是"**强调色出现预算**"这个原则,不是具体色值 |

> **本方案的总原则**:借鉴 Vizplainer 的**设计方法论与系统纪律**(留白节奏、层级纪律、拟物演示、叙事结构、克制),而**不是**它的具体视觉风格(黑底靛蓝)。把每条特质抽象成**主题无关的 token / 原语 / 指引**,让 26 套主题都能受益。

---

## 1. 优化机会全景图(按工作流模块归类)

下面把 Vizplainer 的强项逐项映射到工作流的**8 个模块**,标注优化类型、与现有哲学的兼容性、优先级。

### 模块 A — `templates/src/styles/` (token 基建层)

| # | 借鉴特质 | 优化动作 | 兼容性 | 优先级 |
|---|---|---|---|---|
| A1 | 7 档白色透明度文字层级 | 已有 4 档(`--text`/`--text-2`/`--text-mute`/`--text-faint`)。可补 `--text-ghost`(~20%)做"上下文灰化"专用档,让逐步揭示时旧项灰化更有层次 | 高(纯增量 token) | ★★★ |
| A2 | 慷慨留白 / 单一节奏单元 | 在 base.css 暴露 `--scene-gap`(场景内大模块间距)语义档位,默认对齐 stage-pad,让章节有"统一呼吸节奏"的可选锚点 | 高 | ★★ |
| A3 | 拟物 UI 演示容器 | **新增主题无关的 `.window-frame` 原语**(macOS 风窗口:圆角+三点克制+标题栏+文件名槽),走主题 token,明暗皆可 | 高(新原语,opt-in) | ★★★ |
| A4 | mono = 机器语境 | 已有 `--font-mono` + `.label-mono`。可补 `.sys-label`(ALL CAPS + tracking-widest 的"系统/AI 产出"语义标签)与 `.human-note`(sans 人类叙述)的成对语义 class | 中 | ★★ |

### 模块 B — `references/CHAPTER-CRAFT.md` (章节构图/视觉的单一入口) — **最高杠杆**

> 这是影响面最大的地方:构图/视觉/动效的所有决策都在这。Vizplainer 的"信息构图/视觉层级/拟物演示/留白"全部应落在这。

| # | 借鉴特质 | 优化动作 | 优先级 |
|---|---|---|---|
| B1 | 视觉层级:尺寸跨度 6:1、字重跳格(700↔300 不留 semibold) | Part 3「视觉工具箱」补"**层级三板斧**":尺寸跨度拉到 5:1 以上、字重跳格对比、强调色稀缺——给 chapter agent 明确的层级纪律 | ★★★ |
| B2 | 拟物 UI 演示(代码编辑器=输入感/时间轴=过程感/视频帧=输出感) | Part 3 新增"**拟物 UI 演示**"工具箱条目:用专业工具 UI 形态(终端/编辑器/时间轴/文件树/AI 对话窗)演示抽象流程,配 `.window-frame` 原语 | ★★★ |
| B3 | 真实内容 > placeholder | 已有"双源原则"(回 article 抽细节)。强化:**演示用的文件名/数据/引用要真实**(`q3_analysis.md` 而非 `your_file.txt`),与现有"承认缺、用 placeholder"不冲突——placeholder 是给**图片素材**用,文字内容要真 | ★★★ |
| B4 | 强调色出现预算(满格 5 处/全页) | 反 AI 味清单已禁"第二饱和色"。补一条正向纪律:**强调色满格出现要稀缺**(一屏 1~2 处),其余用 soft/glow 透明度版——让强调色"显贵" | ★★ |
| B5 | 信息密度与视觉面积成反比(大 mockup 靠空旷取胜) | Part 3 补"**密度反比**"心法:占屏面积最大的演示元素反而要留空,靠少量发光/高亮元素聚焦 | ★★ |
| B6 | 三段式流程视觉化(输入→处理→输出 用 UI 轮播,不用箭头流程图) | Part 2「关系→动作决策树」补一条:**"流程/步骤"类内容** → 优先用拟物 UI 状态切换(`.carousel-slide`),而非箭头连线图 | ★★ |

### 模块 C — `references/EXAMPLES/` (结构示意) — **强烈建议补**

> 你上一轮问过"构图是否优化"——这里是构图落地的最佳载体。

| # | 借鉴特质 | 优化动作 | 优先级 |
|---|---|---|---|
| C1 | macOS 窗口演示容器 | 新增 `EXAMPLES/ui-mockup-scene/` 骨架:展示如何用 `.window-frame` 搭一个"产品演示"场景(输入态/处理态/输出态),配 `.carousel-slide` 轮播 | ★★★ |
| C2 | 4:8 非对称分栏构图 | 新增 `EXAMPLES/asymmetric-split/` 骨架:左文字窄(33%)+右视觉宽(67%)的"文字轻、视觉重"经典构图 | ★★ |
| C3 | 竞品对比帧 | 新增 `EXAMPLES/comparison-frame/` 骨架:用 `✕`/`✓` + 灰化竞品列 + 高亮己方列做"事实陈述"对比(逐列揭示) | ★★ |

### 模块 D — `themes/` (主题系统)

| # | 借鉴特质 | 优化动作 | 优先级 |
|---|---|---|---|
| D1 | 暗色原生 + 拟物演示的极致气质 | **(可选)新增一套 `viz-studio` 暗色主题**——直接致敬 Vizplainer 气质(纯黑底 + 单强调色 + 拟物窗口签名),给"科技产品/AI 工具演示"类选题一个开箱即用的高级暗色主题 | 中(纯增量主题) | ★★ |
| D2 | `--accent-2` 渐变伙伴已落地 | v2 三主题已有。可考虑给**更多高人气主题**(如 neon-cyber、electric-studio)补 `--accent-2` + glow token,扩大动效原语适用面 | ★★ |

### 模块 E — `references/SCRIPT-STYLE.md` (口播稿) & F — `OUTLINE-FORMAT.md` (大纲)

| # | 借鉴特质 | 优化动作 | 优先级 |
|---|---|---|---|
| E1 | 叙事弧线:密度递减(冲击→展开→论证→验证→保留) | SCRIPT-STYLE / OUTLINE 补一条**整片节奏建议**:开篇高密度抓人 → 中段展开 → 收尾留白,避免全片匀速 | ★ |
| E2 | 竞品异议单独成段(主动回答而非防御) | OUTLINE 的章节切分建议里补:**对比/异议类内容值得独立成章**,用对比帧呈现 | ★ |
| E3 | 标题用"问题陈述"而非"功能声明" | SCRIPT-STYLE 金句写法补:hook 用问题/反常识陈述,比平铺功能更抓人 | ★ |

### 模块 G — 文档治理(横切)

| # | 问题 | 优化动作 | 优先级 |
|---|---|---|---|
| G1 | **scaffold.sh + THEMES.md 与当前存储不同步**(预存在问题) | THEMES.md 多处仍写每主题独立 `themes/<id>/tokens.css`+`theme.json`,但实际是合并的 `all-themes.css`+`all-themes-meta.json`;scaffold.sh 仍按旧模型解析。**需统一**,否则 v2 主题无法被脚手架 | ★★★(阻断性) |

---

## 2. 落地路线图(三阶段,按价值/成本排序)

### 阶段一 · 地基(高杠杆、低风险、纯增量)

1. **G1 修复 scaffold/THEMES 存储不同步**(阻断性,必做)——让所有主题含 v2 都能脚手架。
2. **A3 + C1 拟物 UI 演示容器**——新增 `.window-frame` 原语 + 一个 EXAMPLES 骨架。这是 Vizplainer 最强、最可复用的特质,且明暗主题通吃。
3. **B1 + B2 + B3 CHAPTER-CRAFT 升级**——把"层级三板斧 / 拟物演示 / 真实内容"写进章节单一入口,影响**每一条新视频**。

### 阶段二 · 构图与层级纪律

4. **A1 文字层级补档 + A4 语义 mono class**——token 层补齐。
5. **C2 + C3 构图骨架**——非对称分栏 + 对比帧两个 EXAMPLES。
6. **B4/B5/B6 章节心法补充**——强调色预算、密度反比、流程优先 UI 轮播。

### 阶段三 · 主题与叙事(锦上添花)

7. **D1 新增 `viz-studio` 致敬主题**(可选)。
8. **D2 给高人气主题补 `--accent-2`**。
9. **E/F 叙事弧线 + 对比成段 + 问题式 hook**——口播稿/大纲指引补充。

---

## 3. 与现有设计哲学的兼容性总结

| 现有哲学 | 本方案如何尊重 |
|---|---|
| 章节自由构图,主题只兜底 | 所有新增都是**opt-in 原语 + 指引**,不强制构图;`.window-frame` 走 token,可用可不用 |
| 反 AI 味(禁蓝紫渐变/emoji/假数据) | 借鉴的是方法论;渐变抽象成同色相 accent;真实内容只针对**文字**,图片仍用 placeholder |
| 只能一个饱和色 | `--accent-2` 仅作渐变/光晕伙伴,不当二级品牌色(v2 已遵守) |
| 一个主题一个设计签名 | `viz-studio` 若做,签名就是"拟物窗口",不叠加 |

---

## 4. 待用户决策

- 落地范围:**全做(阶段一→三)** / **只做阶段一地基** / **先做某几条**?
- G1 存储不同步:是否授权一并修复 scaffold.sh + THEMES.md?
- D1 致敬主题 `viz-studio`:要不要做?

> **决策结果**（用户）：全做阶段一→三；G1 授权修复；viz-studio 做。以下为落地记录。

---

## 5. 落地完成记录（阶段一→三 全部交付）

状态图例：✅ 已落地并验证。所有改动均在 `skills/space/web-video-presentation/` 下。

### 阶段一 · 地基

| 项 | 状态 | 落地位置 / 说明 |
|---|---|---|
| **G1** scaffold/THEMES 存储同步 | ✅ | `scripts/scaffold.sh` 改为走 `extract-theme.mjs` 从合并文件抽取 + grep 校验；`references/THEMES.md` 8 处同步到「合并存储模型」（无每主题子目录，新主题=追加 CSS 块 + meta 字典条）。实测：`--list-themes` OK、脚手架 viz-studio → `tsc` 通过。 |
| **A3 + C1** 拟物 UI 演示容器 | ✅ | `animations.css` 新增 §13 `.window-frame`（`.wf-bar`/`.wf-dots`/`.wf-title`/`.wf-body`；默认单色三点，`.is-mac` opt-in 真 macOS 红黄绿；`.in` 揭示钩，含减动降级）；EXAMPLES 骨架 `ui-mockup-scene/`。 |
| **B1+B2+B3** CHAPTER-CRAFT 升级 | ✅ | `CHAPTER-CRAFT.md` 新增「Vizplainer 借鉴的六条进阶手法」段（层级三板斧 / 拟物演示 / 真实内容优于占位）。 |

### 阶段二 · 构图与层级纪律

| 项 | 状态 | 落地位置 / 说明 |
|---|---|---|
| **A1** 文字层级补档 | ✅ | `base.css` 新增 `--text-ghost`（第 5 档，低于 `--text-faint`，`color-mix` 随主题墨色明暗自适应）。 |
| **A4** 语义 mono class | ✅ | `base.css` 新增 `.sys-label`（mono caps · 机器语境）+ `.human-note`（sans · 人声语境）。 |
| **A2** `--scene-gap` 语义间距（本轮 O-2 补实） | ✅ | `base.css` `:root` 新增 `--scene-gap: var(--stage-pad-y)` + `--scene-gap-tight`/`--scene-gap-loose`（×0.5 / ×1.5）三档，默认对齐 stage-pad 节奏锚点；关卡① §1 加存在性断言。补全上一轮唯一溯源断裂（旧 D-1）。 |
| **C2 + C3** 构图骨架 | ✅ | EXAMPLES `asymmetric-split/`（33/67 文轻视重分栏）+ `comparison-frame/`（竞品列置灰 + accent 点亮本品，逐列揭示，用 `--text-ghost`），均已注册进 EXAMPLES 索引。 |
| **B4/B5/B6** 章节心法 | ✅ | `CHAPTER-CRAFT.md` 同段补上：强调色预算（1-2/屏）/ 密度反比 / 流程优先 UI 轮播（不用箭头流程图）。token 清单同步补上新原语。 |

### 阶段三 · 主题与叙事

| 项 | 状态 | 落地位置 / 说明 |
|---|---|---|
| **D1** `viz-studio` 致敬主题 | ✅ | `all-themes.css` 追加纯黑工作台块（`--shell #000` / `--surface #0b0b0e` / 靛蓝 `--accent #6366f1` / 紫罗兰 `--accent-2 #a855f7` / 显式 `--text-ghost` / 克制 glow / 电影感 ease-out / 径向聚光 vignette）；`all-themes-meta.json` 追加条目；`THEMES.md` 追三处文档（计数 27 / 深色表 / 起点表）。全库 **27 主题**（meta=css=27，已校验同步）。 |
| **D2** 全量动效升级（本轮扩充） | ✅ | 不只补 `--accent-2`：凡定义动效 token 的主题都升级为**完整动效主题**。`neon-cyber` 补 cascade-step 90ms/rise 20px/glow 0.50/orb 0.14/accent-2 #ff00aa（expressive）；`electric-studio` 补 cascade-step 95ms/rise 14px/glow 0.16/orb 0.06/accent-2 #6f8cff（moderate）。连同原 4 个 v2 主题共 **6 个动效主题**，均进入静态断言 + 视觉回归快照。 |
| **E/F** 叙事指引 | ✅ | `SCRIPT-STYLE.md` 新增「整片叙事弧线」（问题式 hook / 密度反比 / 对比反方独立成段）；`OUTLINE-FORMAT.md` 新增「叙事弧线落到 step 分布」+「对比 / 反方独立成章」，并补 2 条自检。 |

### 验证

用 `viz-studio`（暗）+ `swiss-ikb`（浅）两套主题脚手架并 Playwright 截图自检：

- `.window-frame`（单色 + `.is-mac` 色）、`.wf-*`、`.sys-label`、`.human-note`、`--text-ghost`（5 档梯度）、`comparison-frame`（ghost 列 + accent 本品列）、`.glow-card`/`.status-dot`/`.spinner`/`.typing-dots`/`.ambient-orbs` **在明暗两主题下都正确渲染**。
- 证实**明暗通吃**：所有原语走 token + `color-mix`，无硬编码色；accent 只在 UI 状态位置出现（状态点 / 本品列 / glow 边），符合强调色预算。
- 全项目 `tsc --noEmit` 通过；27 主题 meta/css 同步。

### 设计哲学兼容性（复核）

所有落地项均为 **opt-in 原语 + 指引**，不强制构图；`--accent-2` 仅作渐变 / 光晕伙伴（不当二级品牌色）；真实内容优先只针对**文字**（图片仍 placeholder）；`viz-studio` 只叠一个设计签名（拟物窗口）。均与现有哲学不冲突。

---

## 6. 本轮整改（第二轮审查后，2026-06-21）

依据上一轮回溯审查结论（见 `PROJECT-OVERVIEW.md` §9），本轮按用户指示完成以下整改。

| 项 | 状态 | 落地 / 证据 |
|---|---|---|
| **D-2 全量动效升级**（用户明确要求） | ✅ | 凡定义动效 token 的主题全部升级为完整动效主题；neon-cyber/electric-studio 补齐 cascade/glow/orb/accent-2，动效主题 4→6 |
| **O-1** 指引类结构性断言 + CI paths | ✅ | `check-design-tokens.mjs` 新增 §10 guidelineAnchors（CHAPTER-CRAFT/SCRIPT-STYLE/OUTLINE 锚点标题）；`visual-qa.yml` paths 加入三份 references 文档 |
| **O-2** 补 A2 `--scene-gap` | ✅ | `base.css` 三档 scene-gap + 关卡① §1 断言（同上） |
| **O-3** 非默认 v2 动效主题快照 | ✅ | 由 D-2 升级一并覆盖：neon-cyber/electric-studio 生成并提交基准快照 |
| **O-4** `coveredThemes` 强制字段 + 断言 | ✅ | `design-baseline.json` 新增 motionThemes + coveredThemesRule；关卡① §9 双向校验（凡定义动效 token 的主题必在基准里） |

**本轮验证**：静态断言 107→**173 项全过**；视觉回归基准 4→**6 张**；三组负向测试（glow 越界 / 删 scene-gap / 动效主题漏覆盖）均被正确拦下并还原复绿。至此 24 条优化全部真实落地。
