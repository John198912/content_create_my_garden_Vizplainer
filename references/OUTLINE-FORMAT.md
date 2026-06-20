# `outline.md` 格式 spec

视频章节规划的产出文件。**用户可以直接编辑**，所以格式必须人类友好
（用 markdown 不用 JSON / YAML）。

!重要：阅读此文件后必须继续阅读 [`CHAPTER-CRAFT.md`](CHAPTER-CRAFT.md) 的全部内容，了解对网页效果的真实需求，然后再开始编写 outline

> ## ⚠️ outline 是开发计划，不是视觉规划
>
> outline 只规划**节奏 + 内容 + 信息密度**：
>
> - 章节切分 / 每章 step 数 / 每步估时
> - 每步屏幕内容（hero / 标语 / 数据 / 列表项）
> - 章节级**信息池**（从 article 抽的数字 / 引用 / 案例 / 标签）
>
> **outline 里的 step 数是初始预估**。最终 step 数以章节实现时的
> `narrations.ts` 为准——后者既是 step 数源，也是音频合成源
> （详见 [`CHAPTER-CRAFT.md`](CHAPTER-CRAFT.md) 「代码层最小约束」+
> [`AUDIO.md`](AUDIO.md)）。如果实现时章节 step 数和 outline 不一致，
> 回过来同步 outline 即可，不需要纠结"对得严丝合缝"。

> **写 outline 前必读**（双源原则，[CHAPTER-CRAFT.md Part 0 原则 10](CHAPTER-CRAFT.md#10-双源原则scriptmd-定节拍--articlemd-定画面密度)）：
>
> - **`script.md`** —— 决定**节拍**：按 `---` 切节拍，每节拍 1~2 step、估时
> - **`article.md`**（如有）—— 决定**画面信息密度**：每章首段抽**信息池**

---

## 抽象示例（看格式）

````markdown
# Video Outline

> **主题**：`<theme-id>`（Checkpoint Plan 已选定）—— <一句话风格描述>
> **总时长**：约 <T> 分 <S> 秒（口播 ~<X> 字 ÷ 4 字/秒）
> **章节数**：<N> 章 / <M> 步

---

## 1. <chapter-id> — <章节标题>（<S> steps · ~<T>s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- <类型：数字 / 引用 / 出处 / 案例 / 词义 / 时间 / 对比 / ...>：<内容> —— <来源 article §X / Lxx>
- ...

**开发计划**：

- step 1 (~Ts) — <屏幕内容>
- ...

口播节选：
> <1~3 句节选，对应到 script.md 完整文本>

---

## 2. <chapter-id> — ...
````

> **关于时长**：outline 里**只**写 step 的 `(~Ts)` 口播估时（音画对齐
> 用），**绝对不写**动画时长 / 错峰量 / keyframe 数值。这些都在章节开发
> 阶段决定（[`CHAPTER-CRAFT.md`](CHAPTER-CRAFT.md) Part 3 时长参考）。

> **想看具象示例**：
> - 钩子型开场结构 → [`EXAMPLES/hook-chapter/`](EXAMPLES/hook-chapter/)
> - 列举型章节结构 → [`EXAMPLES/list-reveal/`](EXAMPLES/list-reveal/)
> - 科技测评类（实测 / 对比 / 跑分） → [`EXAMPLES/case-tech-review/`](EXAMPLES/case-tech-review/)

---

## 字段约定

### 顶部 metadata block

用引用块（`>`）形式，方便扫一眼整体规模：

| 字段 | 必填 | 说明 |
|---|---|---|
| **主题** | ✓ | Checkpoint Plan 必须已选定。chapter agent 实现时按主题颜色 / 字体 token 走，动画 / 节奏 / 视觉演示由章节自由发挥 |
| **总时长** | ✓ | 估算口播时长（中文 ~ 250 字 / 分钟） |
| **章节数** | ✓ | `N 章 / M 步` |

### 章节标题：`## N. <id> — <title>（<S> steps · ~<T>s）`

| 部分 | 规则 |
|---|---|
| `N` | 1-indexed 顺序，对齐 `chapters.ts` 的注册顺序 |
| `<id>` | **小写 + 连字符**。会成为 React `key` / 文件夹名 (`src/chapters/0N-<id>/`) / 音频子目录 (`public/audio/<id>/`) |
| `<title>` | 给人看的中文标题。**不会**进 React 代码 |
| `<S> steps` | 该章 step 总数 |
| `~<T>s` | 该章口播总估时（中文 ~ 4 字/秒） |

合法 id：`coldopen`、`hook`、`why-good`、`why-good-text-render`。
不合法：`why_good`（用连字符）、`Hook`（小写）、`第一章`（拉丁字符）。

### 章节首段「信息池」（**双源原则核心落地**）

每章独立列出从 `article.md` 抽的细节集合，**让 chapter agent 实现每步
画面时按需取用**——可能挂成右下角 mono 角标 / 副标小字 /
pull-quote 引用 / 数据浮层。

#### 信息池条目格式

```
- <类型>：<具体内容> —— <来源 article §X / Lxx 或简注>
```

> **没 article（用户直接给 script）**：信息池退化为"主动设计画面信息
> 密度"——靠数字 / 对比 / 元数据等让画面比口播信息密。可以列"画面
> 装饰元素池"而非"article 抽取池"。

### Step 列表：每步 **1 行**

```
- step N (~Ts) — <屏幕内容>
```

| 规则 | 原因 |
|---|---|
| `step N` 1-indexed | agent 实现时 `if (step === N - 1) ...`（注意零基偏移） |
| **`(~Ts)`** 必填 | 按 script.md 本步对应口播段字数 ÷ 4 估算（中文 ~ 4 字/秒）。范围 3~10s |
| **屏幕内容** | 一句话讲清楚这一步舞台上有什么：hero / 标语 / 数据 / 装饰元素。**≤ 1 行**，再多就该拆 step |
| **不写动画** | 写死 = 翻译机化（详见本文件顶部框） |
| **不写时长数值 / 错峰量** | 这些在章节开发阶段决定 |
| **不写实现手段** | filter / SVG / Canvas 选型留给 chapter agent |


### 口播节选（每章末尾，可选但推荐）

精炼 1~3 句，**不是完整稿子**，仅供章节规划阶段对照"这章在讲什么"。
完整文本回 `script.md`。`outline.md` 章节 = `script.md` 中两个明显
主题切换之间的段落。

> 音频合成（[`AUDIO.md`](AUDIO.md)）会**回到 `script.md`** 切分完整
> 文本，**不**用 outline 节选。

---

## 命名规则速查

| 对象 | 规则 | 示例 |
|---|---|---|
| 章节 id | 小写 + 连字符 | `coldopen`, `why-good` |
| 章节文件夹 | `0N-<id>` | `src/chapters/01-coldopen/` |
| 章节组件 | PascalCase | `Coldopen.tsx`, `WhyGood.tsx` |
| 章节 CSS 类前缀 | 章节缩写（避免跨章冲突） | `.cd-` / `.wg-` / `.mg-` |
| 音频子目录 | `<id>/` | `public/audio/coldopen/` |
| 音频文件 | `<step-N>.mp3` (1-indexed) | `public/audio/coldopen/1.mp3` |

---

## 章节切分的经验法则

- **每章 3~8 步**。少于 3 步太薄；多于 8 步观众会忘记这章在讲啥
- **总时长 ÷ 30 秒** ≈ 章节数（一章约 30~60 秒讲完）
- **每章 = 一个聚焦主题**。"为什么强 + 怎么用" 是两章，不是一章
- **章节边界 = 口播稿里讲者会换语气 / 换主题的位置**。读 `script.md`
  时哪里你下意识想"咳一声接下一段"，那里就是章节边界
- **慢节奏 / 长镜头风主题**（midnight-press / 电影感片头）每章可少到
  2~3 step；**信息密集型**（科技测评 / 对比表）每章可放宽到 8~10 step

---

## 叙事弧线落到 step 分布（Vizplainer 借鉴）

`script.md` 那条「问题 → 铺垫 → 主体 → 收尾」的密度弧线（见
[`SCRIPT-STYLE.md`](SCRIPT-STYLE.md)「整片叙事弧线」），落到 outline 就是
**step 不该均摊到各章**：

```
首章（钩子/问题）   step 少而轻   2~4 step   ~20~30s
铺垫章             step 中       3~5 step   ~30~40s
主体章（解法/演示） step 多而密   6~10 step  ~50~70s   ← 信息最稠
收尾章             step 少而轻   2~3 step   ~15~25s
```

开篇章节别一上来就塞 8 个 step 报参数 —— 观众还没"上钩"。把最稠的
step 密度留给中间的**演示 / 对比 / 数据**章节。切章时如果发现首章
step 反而比主体章还多，多半是叙事弧线倒了，回 `script.md` 重排密度。

## 对比 / 反方独立成章（Vizplainer 借鉴）

Vizplainer 的招牌之一是**把竞品对比 / 反方质疑做成一个独立 section**，
而不是塞在某章末尾一笔带过。凡 `script.md` 里出现「A vs B」「旧办法
vs 新办法」「别人以为 X 其实 Y」「它的短板 / 局限」这类**对比 / 反方
节拍**，outline 应当：

- **单独切成一个章节**（id 如 `vs-others` / `the-catch` / `objection`），
  而不是并进"优点"章
- 这一章的 step 用**逐列 / 逐项揭示**：竞品列先灰着，自家列后用 accent
  点亮（对应 CHAPTER-CRAFT 的 `comparison-frame` 骨架）
- 信息池里**把对比维度逐条列清楚**（价格 / 速度 / 中文支持 …），每条
  标来源，chapter agent 才能填进对比表

```markdown
## 4. vs-others — 跟同类比，差在哪（5 steps · ~45s）

> 信息池
> - 对比维度：出图速度 / 中文字准确率 / 价格 —— 来源 article §3 / L88
> - 竞品 A：速度中、中文常出错、按月订阅 —— 来源 article §3 / L92
> - 本品：3 秒出、中文几乎全对、一次买断 —— 来源 article §3 / L95

1. 摆出三个对比维度（表头，竞品列先灰）（~8s）
2. 点亮"出图速度"行：本品 3 秒 vs 竞品几十秒（~9s）
3. 点亮"中文准确率"行（~9s）
...
```

> 不是每片都需要对比章 —— 只有 `script.md` 里确实有对比 / 反方节拍
> 时才切。但**一旦有，就给它独立章**，别埋没在优点列表里。

---

## 素材清单（outline.md 末尾）

```markdown
## 素材清单

### 1. coldopen
- ✓ <资源 1 描述> （<已就位路径>）
- ⚠️ <资源 2 描述>（待提供）
- ⚠️ <资源 3 描述>（待提供）

---

## 自检（写完 outline **强制**执行，不可跳过）

> ⚠️ **硬性流程**：outline 写完后**必须**走自检 → 修改 → 提交 三步。
> **禁止**写完直接进入 Checkpoint Plan 让用户对齐。
>
> **执行方式**（按能力降级）：
>
> 1. **优先 Agent Teams**：开一个独立 reviewer agent，传入 `outline.md`
>    + 本节自检清单 + `script.md` / `article.md` 路径，让它**逐项核查 +
>    出结论**（哪几条 fail + 证据）。
> 2. **其次 subAgent**：当前 agent 没 Teams 但能开 subagent，用 subagent
>    走同样流程。
> 3. **都没有**：自己**严格逐项**核查。
>
> 拿到结论后**先按 fail 项改 outline，再进入 Checkpoint Plan**。

- [ ] 每个 step 都是**单一句屏幕内容描述**，没有"动画"行 / "手段"行
- [ ] 没有任何 step 写了具体毫秒 / 秒数（除 `(~Ts)` 口播估时）
- [ ] 每章首段都有「信息池」block，至少 3 条 article 抽取项，**每条
      必带来源标注**（`—— 来源 article §X / Lxx`）—— 没标注 chapter agent
      回不到原文
- [ ] **所有 step `(~Ts)` 累加 ≈ 顶部声明的总时长**（误差 < 10%）—— 不
      一致说明节奏规划失真
- [ ] 章节切分符合"每章 3~8 步 / 30~60s 一聚焦主题"经验
- [ ] **step 分布符合叙事弧线**：首章 step 少而轻，中间主体章 step 最
      多最密，收尾章收住 —— 没有"开篇就堆满 step 报参数"
- [ ] **若 `script.md` 有对比 / 反方节拍，已切成独立章**（不是埋在优点
      章末尾），且信息池逐条列了对比维度 + 来源
- [ ] 末尾「素材清单」分章节列出，✓ / ⚠️ 标注清楚
- [ ] 脚本不得包含标题、序号等非口播内容，仅包含人类正常可读的内容

写完看一眼：**outline 是不是干净到 chapter agent 看了能立刻开工 + 还有
设计空间**？是 = 合格。如果你看了都觉得"太空，agent 不知道动画选什么"
