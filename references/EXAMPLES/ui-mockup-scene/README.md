# ui-mockup-scene —— 「真实产品界面」演示型章节（C1 anchor）

> ⚠️ **结构示意，不是抄袭模板**。看「形」，按你的内容 + 主题换内容选型。

## 适用场景

口播在讲一个**有界面 / 有流程 / 有输入产出的东西**：

- 一段脚本 / 一个工具怎么把脏数据变干净
- 一个 API 请求 → 响应
- 一个 prompt → 模型输出
- 一个命令行操作的前后
- 任何「喂进去 X，吐出来 Y」的过程

凡是观众脑子里该浮现「这是一块真实的产品界面」的时候，用它。

## 核心手段（落地 Vizplainer 两个签名）

| 签名 | 这里怎么用 |
|---|---|
| **#1 macOS 窗口演示容器** | 整章演示对象 = 一个 `.window-frame.is-mac`（标题栏 3 点 + 文件名槽 + body）。观众读它=「真实产品表面」，不是 PPT 方框。 |
| **#2 三段式 UI 流程切换** | 输入 → 处理中 → 产出，用**同一个窗口换 body 内容** + `.carousel-slide` 前翻，**不堆三个箭头流程图**。 |
| **#3 accent 只在 UI 状态里满格** | 橙色只出现在 `.um-slide-tag`（输入/处理/产出标签）、进度条、状态点；正文 / 代码用 `--text-2`，不抢色。 |
| **#5 真实内容 > 占位** | 用**真的文件名 / 真的命令 / 真的 CSV 行**，绝不 `lorem ipsum`、绝不 `data1, data2`。 |
| **#7 mono = 机器语境** | 代码 / 文件名 / 状态用 `.sys-label` + `--font-mono`；旁白用 `.human-note`（sans）。 |

## step 切分

```
step 0  intro    窗口浮现（still 空），human-note 一句话设定场景
step 1  input    raw.csv —— 脏数据，原样
step 2  process  clean.py 跑起来，进度条扫过，状态点 RUNNING 呼吸
step 3  output   clean.csv —— 干净结果 + hero-num 计数
```

→ narrations.ts **必须 4 条**。每态独占一 step（流程禁一次三联画）。

## 用到的全局原语

- `.window-frame` / `.wf-bar` / `.wf-dots` / `.wf-title` / `.wf-body`（animations.css §13）
- `.carousel-slide.is-active`（animations.css §10，前翻三态）
- `.status-dot.is-live`（实时呼吸点）
- `.sys-label` / `.human-note`（base.css，机器 vs 人语境）
- `.hero-num`（产出计数）

## 切到其它主题怎么换

- **窗口本身不动**（token 驱动，明暗通吃）。`.is-mac` 给真彩 3 点；去掉它=主题 ink 单色 3 点（更克制，适合 swiss-ikb / dune 这类极简主题）。
- 暗色动效主题（bold-signal-v2 / neon-cyber）：保留进度条扫光 + 状态点呼吸。
- 浅色编辑主题（newsroom / paper-press）：去掉 glow，进度条用 accent 实色即可；窗口阴影会自动变柔。
- 终端主题（terminal-green / blueprint）：窗口标题栏直接当 shell 提示行，body 全 mono——天生契合。

## 反模式提醒

- ✗ 三个窗口并排 + 箭头连接 → 退化成 PPT 流程图。**一个窗口，三态前翻**才有「在用」的感觉。
- ✗ 代码块写假数据 → 观众一眼出戏。哪怕编，也要编得像真业务。
- ✗ 正文给 accent 上色 → accent 预算应留给「状态」。
