# Token Sovereignty · Outline

```yaml
title: 你每次用ChatGPT，都在交一笔看不见的税
audience: B站知识区观众，18-35岁，对AI工具日常使用，关心个人成长与数字主权
platform: Bilibili
aspect: 16:9
language: zh-CN
estimatedDuration: 720s
```

## 1. opening — 开场钩子：Karp在CNBC说了什么

Purpose: 用Karp CNBC直播的戏剧性场景制造钩子，建立Karp作为可信信源，引出"这对你有直接关系"
Claims: claim-karp-cnbc-2026-07-01
Estimated: ~70s

### Scene 1.1 cnbc-live

- Role: hook
- Message: 一个身家120亿美元的CEO在直播里说"有些东西彻底跑偏了"——这件事跟你每天用的AI工具有直接关系
- Layout relation: centered-figure-with-quotes
- Hero frame: Beat cnbc-reveal
- Focal path: Karp CNBC截图 → 引文弹出 → 阿卷名字 → topic-reveal
- Transition in/out: opening-focus / primary-push

#### Beat cnbc-opening (~8s)

- Narration intent: 建立场景——2026年7月1日CNBC直播
- Screen copy: 2026年7月1日 · CNBC Live
- Claims: claim-karp-cnbc-2026-07-01

#### Beat cnbc-quote-wrong (~8s)

- Narration intent: 呈现Karp开场金句
- Screen copy: "Something has gone completely wrong."
- Secondary: 有些东西已经彻底跑偏了
- Preserve: cnbc-opening

#### Beat cnbc-token-ip (~6s)

- Narration intent: Karp指控核心：token + 零价值 + IP被偷
- Screen copy: "企业花几百万买token → 零价值 + IP被偷"
- Preserve: cnbc-quote-wrong

#### Beat cnbc-dialogue (~12s)

- Narration intent: 呈现CNBC主持人与Karp的对话交锋
- Screen copy: Becky Quick: "你听起来很愤怒。" / Karp: "这是报道。" / Sorkin: "Sounds like shade." / Karp: "No, no. This is reporting."
- Preserve: cnbc-token-ip

#### Beat cnbc-reveal (~8s)

- Narration intent: 揭示这是Palantir CEO Alex Karp
- Screen copy: Alex Karp · Palantir CEO
- Claims: claim-karp-cnbc-2026-07-01
- Preserve: cnbc-dialogue

#### Beat cnbc-connect-you (~10s)

- Narration intent: 建立Karp的话与观众的关联
- Screen copy: 这些话 → 跟你每次打开AI对话框有关
- Preserve: cnbc-reveal

---

## 2. karp-four-arguments — Karp的四个核心论点

Purpose: 完整呈现Karp的四个核心论证，建立证据链
Claims: claim-token-direction-wrong, claim-token-no-value, claim-wealth-tax, claim-means-of-production, claim-karp-four-questions
Estimated: ~230s

### Scene 2.1 argument-one-token

- Role: evidence
- Message: Karp批评token计费与业务价值脱节；这是他的推论，不是通用定价定律
- Layout relation: quote-with-diagram
- Hero frame: Beat token-conclusion
- Focal path: Karp截图 → 论点编号① → 原话英中 → 逻辑推演 → 结论
- Transition in/out: primary-push / morph-dissolve

#### Beat token-quote (~12s)

- Narration intent: 呈现Karp原话——chillax and waste my time with tokens
- Screen copy: "I'm going to chillax and waste my time with tokens, I'm gonna get no value, and they're gonna get my IP."
- Secondary: 我嗑token浪费时间 → 拿到零价值 → 他们拿走我的IP
- Claims: claim-token-no-value

#### Beat token-diagram (~10s)

- Narration intent: 解释不只是贵，是方向性错误
- Screen copy: 不是"贵"的问题 / 是"方向"的问题
- Preserve: token-quote

#### Beat token-logic (~10s)

- Narration intent: 核心逻辑推演——如果真能帮企业一天赚一亿，服务商凭什么不按价值分成？
- Screen copy: "AI能帮企业一天赚$100M → 为什么按token收费而不是分30%？"
- Preserve: token-diagram

#### Beat token-conclusion (~8s)

- Narration intent: 明确区分Karp推论与通用定价事实
- Screen copy: Karp的推论：按用量收费 ≠ 按价值收费
- Claims: claim-token-direction-wrong
- Preserve: token-logic

### Scene 2.2 argument-two-tax

- Role: evidence
- Message: 企业正在被"财富税"抽血——不是服务费，是税
- Layout relation: keyword-zoom
- Hero frame: Beat tax-keyword
- Focal path: 论点编号② → 财富税关键词 → 概念拆解
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat tax-quote (~8s)

- Narration intent: 呈现财富税论点
- Screen copy: ② 不公平的"财富税"
- Secondary: 从亿万富翁开始 → 最终覆盖所有用户
- Claims: claim-wealth-tax

#### Beat tax-keyword (~10s)

- Narration intent: 拆解"税"vs"费"vs"订阅"
- Screen copy: 税 ≠ 服务费 ≠ 订阅费
- Secondary: 税 = 你必须交 · 无法讨价还价 · 无法控制钱怎么用
- Preserve: tax-quote

### Scene 2.3 argument-three-production

- Role: evidence
- Message: 生产资料正在被转移——谁控制模型、权重、企业价值？
- Layout relation: three-pillar
- Hero frame: Beat production-three-questions
- Focal path: 论点编号③ → "生产资料"概念 → 三个问题支柱
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat production-means (~10s)

- Narration intent: 呈现Karp用马克思主义词汇描述商业问题
- Screen copy: "They want to know they own the means of production."
- Secondary: 生产资料 · means of production
- Claims: claim-means-of-production

#### Beat production-three-questions (~12s)

- Narration intent: 三个自主权问题
- Screen copy: 谁控制模型？ → 谁掌控参数权重？ → 谁掌握企业价值？
- Secondary: 缺一个都不能算"拥有"
- Preserve: production-means

### Scene 2.4 argument-four-trust

- Role: evidence
- Message: AI行业需要回答四个底线问题
- Layout relation: four-question-grid
- Hero frame: Beat four-questions-display
- Focal path: 论点编号④ → 四个问题逐条弹出
- Transition in/out: morph-dissolve / primary-push

#### Beat four-questions-display (~15s)

- Narration intent: Karp的四问——他在问你
- Screen copy: ① 谁拥有我的数据？ / ② 数据存储在哪里？ / ③ 我的提示是否安全？ / ④ 是否传输给第三方？
- Claims: claim-karp-four-questions

### Scene 2.5 four-chain

- Role: synthesis
- Message: 四个论点串联——计费与价值脱节→“财富税”批评→生产资料控制权→需要四个答案
- Layout relation: chain-flow
- Hero frame: Beat chain-connect
- Focal path: 四个论点串联动画
- Transition in/out: morph-dissolve / fade-through

#### Beat chain-connect (~12s)

- Narration intent: 串联四个论点形成逻辑链
- Screen copy: 计费与价值脱节 → “财富税”批评 → 生产资料控制权 → 需要回答四问
- Claims: claim-token-direction-wrong, claim-wealth-tax, claim-means-of-production, claim-karp-four-questions

#### Beat chain-tease-individual (~6s)

- Narration intent: 暗示这套逻辑对个人同样适用
- Screen copy: 这套逻辑……只对企业成立？
- Claims: claim-same-logic-enterprise-individual
- Preserve: chain-connect

---

## 3. enterprise-to-individual — 从企业到个人：底层逻辑是同一个

Purpose: 将Karp四个论点逐条映射到个人用户层面，证明个人面临相同的结构性问题
Claims: claim-personal-token-loss, claim-personal-wealth-tax, claim-personal-means-of-production, claim-personal-cant-answer-four, claim-same-logic-enterprise-individual
Estimated: ~150s

### Scene 3.1 personal-token

- Role: parallel-argument
- Message: 你每次用AI——得到结果、少了token额度、但没留下任何东西
- Layout relation: before-after-comparison
- Hero frame: Beat personal-token-what-left
- Focal path: 企业Token问题 → 转换为个人版本 → 追问"你手里多了什么"
- Transition in/out: fade-through / morph-dissolve

#### Beat personal-token-usage (~8s)

- Narration intent: 建立个人版——你也在按用量付费
- Screen copy: ChatGPT月费 · Claude订阅 · API调用次数
- Secondary: 你以为你在买服务
- Claims: claim-personal-token-loss

#### Beat personal-token-what-left (~12s)

- Narration intent: 核心追问——AI帮你之后你手里多了什么
- Screen copy: 多了一个结果 / 少了一堆token额度
- Secondary: 下次不用这个AI的时候——那个东西还在吗？
- Preserve: personal-token-usage

### Scene 3.2 personal-tax

- Role: parallel-argument
- Message: 你付费+交数据→AI更聪明→下一个人免费受益→AI公司赚走一切
- Layout relation: flow-diagram
- Hero frame: Beat personal-tax-flow
- Focal path: 财富税概念 → 个人版流量图 → 谁赚了谁亏了
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat personal-tax-flow (~15s)

- Narration intent: 画出个人版财富税的流动图
- Screen copy: 你付费+交出需求逻辑+判断偏好 → AI吸收变聪明
- Secondary: 下一个人 → 基于你的贡献得到更好回答
- Claims: claim-personal-wealth-tax

#### Beat personal-tax-who-wins (~8s)

- Narration intent: 追问谁赚谁亏
- Screen copy: 你得到：一次服务 / AI公司得到：训练数据+订阅收入+行为图谱
- Secondary: 谁的财富在增值？谁在交税？
- Preserve: personal-tax-flow

### Scene 3.3 personal-production

- Role: parallel-argument
- Message: 你的生产资料——prompt模板、判断标准、审美——散落在AI对话记录里
- Layout relation: scattered-items-converge
- Hero frame: Beat personal-production-where
- Focal path: 企业生产资料 → 个人生产资料定义 → 追问"在哪里"
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat personal-production-define (~10s)

- Narration intent: 定义个人的生产资料
- Screen copy: 你的生产资料 / 问题拆解方式 · 审美判断 · Prompt模板 · "好内容"的定义
- Secondary: 不是GPU
- Claims: claim-personal-means-of-production

#### Beat personal-production-where (~10s)

- Narration intent: 追问这些东西在哪
- Screen copy: 在自己的笔记里？ / 还是散落在几百次AI对话记录里？
- Secondary: ——那些记录你甚至没有导出过
- Preserve: personal-production-define

### Scene 3.4 personal-four-questions

- Role: parallel-argument
- Message: Karp四问的答案因产品与设置而异；无法确认说明控制边界不透明
- Layout relation: question-check-grid
- Hero frame: Beat personal-cant-answer
- Focal path: Karp四问 → 替换为用户版本 → 逐个标出核验入口
- Transition in/out: morph-dissolve / fade-through

#### Beat personal-four-ask (~15s)

- Narration intent: 直接用Karp的四问追问观众
- Screen copy: 你的数据归谁？ → 服务器存了什么？ → Prompt被拿去训练了吗？ → 内容会传输给第三方吗？
- Secondary: 逐一弹出“需查条款 / 需查设置 / 因产品而异”
- Claims: claim-personal-cant-answer-four

#### Beat personal-cant-answer (~8s)

- Narration intent: 把不确定性导向可核验的产品、账户与设置边界
- Screen copy: 如果无法回答，说明控制边界并不透明
- Preserve: personal-four-ask

### Scene 3.5 same-prescription

- Role: synthesis
- Message: 公司与个人的风险尺度不同，但都需要保留控制权；个人资产可迁移能降低平台锁定与替代风险
- Layout relation: mirrored-comparison
- Hero frame: Beat same-prescription-conclusion
- Focal path: CEO处方 → 个人处方 → 并置对比
- Transition in/out: fade-through / primary-push

#### Beat same-prescription-conclusion (~10s)

- Narration intent: Karp给CEO看病，我们拿同一张处方给自己号脉
- Screen copy: 企业：可控生产资料 → 竞争 / 你：可控能力资产 → 降低替代风险
- Secondary: 同一张处方
- Claims: claim-same-logic-enterprise-individual

---

## 4. root-cause — 底层机制：规模化吸收与重组的治理风险

Purpose: 从商业模式深入到模型能力来源，并把技术机制与数据、授权、产品和治理风险分开
Claims: claim-foundation-model-absorption-risk, claim-sharingan-effect, claim-originality-dilution, claim-three-layer-diagnosis
Estimated: ~90s

### Scene 4.1 foundation-model-nature

- Role: mechanism
- Message: 基础模型从大规模公开与授权数据中学习统计模式；规模化吸收与重组带来新的治理风险
- Layout relation: data-lake-diagram
- Hero frame: Beat data-lake-absorption
- Focal path: 数据湖图示 → 模式提取 → "不可逆的吸收"
- Transition in/out: primary-push / morph-dissolve

#### Beat data-lake-absorption (~12s)

- Narration intent: 准确图解数据、训练与生成能力之间的关系，并避免赋予模型主观意图
- Screen copy: 大规模公开与授权数据 → 筛选与训练 → 学习统计模式 → 生成能力
- Secondary: 规模化吸收·重组带来新的治理风险
- Claims: claim-foundation-model-absorption-risk

#### Beat not-evil-by-design (~6s)

- Narration intent: 风险由数据、授权、产品与治理共同塑造
- Screen copy: 不是一句公司“坏”就能解释 / 风险来自数据、授权、产品与治理
- Preserve: data-lake-absorption

### Scene 4.2 sharingan

- Role: evidence
- Message: 写轮眼效应——AI加速时代模仿抄袭速度让原创者都无法分辨
- Layout relation: mirror-comparison
- Hero frame: Beat sharingan-animation
- Focal path: 写轮眼隐喻视觉化 → 原创vs抄袭时间线对比
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat sharingan-metaphor (~10s)

- Narration intent: 写轮眼隐喻
- Screen copy: 写轮眼：复制对手任何招式
- Secondary: 在AI时代 → 模仿抄袭被加速到原创者无法识别
- Claims: claim-sharingan-effect

#### Beat sharingan-reverse (~8s)

- Narration intent: 甚至可能反过来——让人觉得原创者在抄抄袭者
- Screen copy: 原创者 ← 抄袭者 / 谁抄谁已经分不清
- Preserve: sharingan-metaphor

### Scene 4.3 originality-dilution

- Role: evidence
- Message: 原创价值被内容洪流稀释，原创动力被根本性打击
- Layout relation: signal-to-noise-visual
- Hero frame: Beat dilution-wave
- Focal path: 原创内容信号 → 被大批量AI内容淹没 → 价值稀释
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat dilution-personal (~8s)

- Narration intent: 个人创作者视角——作品被洗稿淹没
- Screen copy: 你的原创 → 批量复刻·洗稿·复杂重组 → 消失在内容洪流中
- Claims: claim-originality-dilution

#### Beat dilution-business (~6s)

- Narration intent: 企业同理——竞争壁垒被实时复制
- Screen copy: 原创商业模式 → 竞争对近乎实时复制 → 无尽内卷·价格战
- Preserve: dilution-personal

### Scene 4.4 three-layer-diagnosis

- Role: synthesis
- Message: 三层诊断：症状→病因→诊断结论
- Layout relation: layered-conclusion
- Hero frame: Beat three-layer-reveal
- Focal path: 三层堆叠揭示
- Transition in/out: morph-dissolve / primary-push

#### Beat three-layer-reveal (~10s)

- Narration intent: 完整三层诊断揭示
- Screen copy: 症状：计费与价值可能脱节 / 机制：知识被规模化吸收与重组 / 风险：个人能力资产未被自己留存
- Claims: claim-three-layer-diagnosis

---

## 5. global-sovereignty — 全世界都在筑墙，而个人的处境

Purpose: 将问题放到全球地缘尺度，揭示个人在这场博弈中的位置
Claims: claim-china-ai-regulatory-boundary, claim-swiss-rejection, claim-global-sovereignty-tear, claim-individual-bottom
Estimated: ~60s

### Scene 5.1 three-directions

- Role: context
- Message: 不同背景的国家、机构与企业都在重建AI控制边界
- Layout relation: world-map-three-signals
- Hero frame: Beat three-signals-map
- Focal path: 世界地图三个信号点亮 → 各方向关键信息
- Transition in/out: primary-push / morph-dissolve

#### Beat three-signals-map (~18s)

- Narration intent: 用三类可验证案例呈现共同的控制权主题，同时避免制造“同步对抗”假象
- Screen copy: 美国企业：掌控模型与权重 / 中国：生成式AI服务受安全评估、算法备案等规则约束 / 瑞士：Palantir多年未获推进，军方报告建议替代方案
- Claims: claim-global-sovereignty-tear, claim-china-ai-regulatory-boundary, claim-swiss-rejection

### Scene 5.2 individual-position

- Role: reflection
- Message: 个人通常信息更少、迁移成本更高且很少参与规则制定，因此议价能力相对较弱
- Layout relation: scale-zoom-out
- Hero frame: Beat individual-tiny
- Focal path: 世界博弈 → 缩小到一个人 → 没有武力·经济实力·声量
- Transition in/out: morph-dissolve / fade-through

#### Beat individual-tiny (~12s)

- Narration intent: 缩小到个人——最底层
- Screen copy: 个人 / 没有武力 / 没有经济实力 / 没有声量
- Secondary: 不在任何一张谈判桌上
- Claims: claim-individual-bottom

#### Beat rent-metaphor (~8s)

- Narration intent: 我们关心的是还在交房租而不自知的人
- Screen copy: 那些还不知道自己正在"交房租"的人
- Preserve: individual-tiny

---

## 6. three-principles — 三件你可以今天开始做的事

Purpose: 给出可执行的个人行动方案，三个原则对应Karp四个论点
Claims: claim-principle-1-own-judgment, claim-principle-2-local-assets, claim-principle-3-tool-switch, claim-start-saving-today
Estimated: ~90s

### Scene 6.1 principle-one

- Role: action
- Message: 原则一：你拥有你的判断标准——AI能复制输出，复制不了判断过程
- Layout relation: claim-with-evidence
- Hero frame: Beat principle-one-display
- Focal path: 原则编号① → Karp对应论据 → 个人行动
- Transition in/out: fade-through / morph-dissolve

#### Beat principle-one-display (~12s)

- Narration intent: 原则一 + 对应Karp论点
- Screen copy: ① 你拥有你的判断标准
- Secondary: Karp: 控制权重 = 控制命运 / 你: "为什么这么选"的判断过程
- Claims: claim-principle-1-own-judgment

#### Beat principle-one-action (~8s)

- Narration intent: 具体行动——把判断过程记下来
- Screen copy: AI能复制你的输出 / 复制不了你的判断过程
- Secondary: 前提：你自己把它记下来了
- Preserve: principle-one-display

### Scene 6.2 principle-two

- Role: action
- Message: 原则二：知识资产存在本地，不在平台服务器上
- Layout relation: claim-with-evidence
- Hero frame: Beat principle-two-storage
- Focal path: 原则编号② → 对应Karp四问 → 行动
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat principle-two-storage (~10s)

- Narration intent: 原则二——好对话存本地
- Screen copy: ② 你的知识资产不在平台服务器上
- Secondary: Karp四问 → 你的行动：存本地·建模板
- Claims: claim-principle-2-local-assets

#### Beat principle-two-compare (~6s)

- Narration intent: 纯消耗 vs 积累资产
- Screen copy: 纯消耗：结束后少了一堆token / 积累资产：结束后多了一个文件
- Preserve: principle-two-storage

### Scene 6.3 principle-three

- Role: action
- Message: 原则三：随时切换工具而不损失能力——生产资料跟着你走
- Layout relation: claim-with-evidence
- Hero frame: Beat principle-three-switch
- Focal path: 原则编号③ → 对应Karp → 行动
- Transition in/out: morph-dissolve / morph-dissolve

#### Beat principle-three-switch (~10s)

- Narration intent: 原则三——工具可换，生产资料跟着你
- Screen copy: ③ 你可以随时切换工具而不损失能力
- Secondary: Karp: 生产资料不被转移 / 你: 判断标准·prompt·审美→跟着人走
- Claims: claim-principle-3-tool-switch

### Scene 6.4 simplest-start

- Role: cta
- Message: 最简单的起点——从今天开始，每次好对话存下来
- Layout relation: centered-message
- Hero frame: Beat start-saving
- Focal path: 收束到单一行动
- Transition in/out: morph-dissolve / primary-push

#### Beat start-saving (~10s)

- Narration intent: 最简单的行动——存下来
- Screen copy: 从今天开始 / 每次"这次对话还不错" → 存下来
- Secondary: 不用整理 · 不用分类 · 先存
- Claims: claim-start-saving-today

#### Beat sovereignty-first-step (~8s)

- Narration intent: 这个动作本身是主权化第一步
- Screen copy: 这个动作本身 = 主权化的第一步
- Secondary: 你开始意识到——对话里有"我"的痕迹
- Preserve: start-saving

---

## 7. ending — 结尾：The Jig Is Up

Purpose: 回到Karp的结束语，给出最终落点与互动引导
Claims: claim-jig-is-up
Estimated: ~40s

### Scene 7.1 closing

- Role: resolution
- Message: 你每次打开AI对话框，都在交一份隐形答卷——可以交完就走，也可以存下来
- Layout relation: return-to-center
- Hero frame: Beat closing-choice
- Focal path: Karp结尾 → 你的选择 → CTA
- Transition in/out: primary-push / ending-focus

#### Beat closing-jig (~8s)

- Narration intent: Karp最后的话——The jig is up
- Screen copy: "The jig is up." —— Alex Karp
- Secondary: 骗局曝光了
- Claims: claim-jig-is-up

#### Beat closing-choice (~10s)

- Narration intent: 你每次打开AI对话框都在交答卷
- Screen copy: 每次打开AI对话框 = 交一份隐形答卷
- Secondary: 交完就走？还是存下来变成自己的东西？
- Preserve: closing-jig

#### Beat closing-cta (~10s)

- Narration intent: 互动引导
- Screen copy: 积累资产 vs 纯消耗 —— 你哪种更多？
- Secondary: 弹幕/评论区聊聊

---

## Asset Checklist

| Asset Id | Description | Source | Status |
|---|---|---|---|
| karp-cnbc-screenshot | Alex Karp CNBC直播截图 | 需截取或示意 | TODO |
| world-map-bg | 简化世界地图背景 | CSS/SVG绘制 | TODO |
| data-lake-diagram | 大模型数据湖→涌现示意 | CSS/SVG动效 | TODO |
| sharingan-visual | 写轮眼风格示意 | CSS动效 | TODO |
| signal-to-noise-wave | 原创信号被淹没示意 | CSS动效 | TODO |
