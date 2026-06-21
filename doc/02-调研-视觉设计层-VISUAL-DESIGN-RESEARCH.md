# Vizplainer.com — 视觉设计深度调研报告
*观察时间: 2026年6月 | 方法: 实地截图 + HTML/CSS class 提取 + 设计判断*  
*本报告聚焦高层视觉设计维度,不重复已有动效/缓动/CSS实现清单*

---

## 1. 版面系统 (Layout System)

### 观察到的具体做法

**容器宽度体系 (三档)**
- 窄内容区: `max-w-3xl`(768px) — 用于比较表、居中文本段落
- 标准内容区: `max-w-5xl`(1024px) — 用于编辑器 mockup
- 宽布局区: `max-w-7xl`(1280px) — 用于 hero、features、footer 主区域
- 所有区块均 `mx-auto` 水平居中,配合 `px-6` 给移动端留侧边距

**纵向节奏 (垂直留白档位)**
```
py-24 = 96px 上下 → 所有 section 分隔符
py-12 = 48px → footer 内部
py-10 = 40px → hero demo 内部
pt-20 = 80px → hero 顶部(留出 navbar h-20 = 80px)
mb-24 = 96px → section 内部大块之间
gap-12 = 48px → 双列内部间距
```
所有 section 用完全一致的 `py-24` 作为节奏单元,间距档位严格 **4的倍数** (Tailwind 4px 基础单元)。

**栅格策略**
- Hero: `flex-row` 两列,左列 `max-w-2xl flex-1`,右列 `min-h-[600px] w-full`(右侧约占55%)
- Features: `grid lg:grid-cols-12`,左 `lg:col-span-4`(33%) + 右 `lg:col-span-8`(67%)
- Contact: `lg:flex-row` 两列,`flex-1` 均等
- 比较表: `max-w-4xl` 内 5列 table
- **没有** 传统12列栅格,用 CSS grid 直接写分配比例

**对称 vs 非对称**
- 整体: **轴对称** 容器居中
- 局部: **非对称分配** (4:8, 约1:2)是刻意打破平均主义——左侧文字区窄、右侧视觉区宽,制造"文字轻、视觉重"的张力
- Hero 左≈45% / 右≈55%:视觉锚点(mockup)刻意比文字区更宽

**Section 分隔方式**
- 不用卡片组或色块分 section,而是 `border-b border-white/5` — 一条极淡(5%白)横线划分,近乎不可见,节奏感来自留白而非视觉边界

### 为什么这样做好
统一的 `py-24` 使页面在视觉上"呼吸均匀",用户每次滚动一屏感觉"看完了一件事"。4:8 非均等分配制造内容的主次感,不会让功能演示和文字说明平起平坐。

### 可借鉴的精髓
> **"容器宽度分三档 + 垂直节奏用单一档位"**: 所有 section 纵向 padding 用同一个 `py-24` 单位,容器宽度按内容密度选 3xl / 5xl / 7xl 其中一个。让页面看起来是同一套系统造的。

---

## 2. 视觉层级 (Visual Hierarchy)

### 观察到的具体做法

**尺寸对比强度 (同屏最大比)**
- Hero H1: `text-7xl` (72px) + `font-bold` + `leading-[1.05]` + `tracking-tighter`
- 副标题: `text-lg` (18px) + `font-light` + `text-white/60`
- 标签: `text-xs` (12px) + `uppercase` + `tracking-wider`
- 比值: 72px : 18px : 12px ≈ **6 : 1.5 : 1** — 跨度极大,确保一眼就知道哪句话最重要

**色重层级 (同一白色, 用透明度制造等级)**
```
primary text:    text-white       → 100%
heading:         text-white/80    → 80%
body:            text-white/60    → 60%
muted:           text-white/50    → 50%
label:           text-white/40    → 40%
disabled:        text-white/25    → 25%
ghost:           text-white/20    → 20%
```
7个透明度档位,没有任何彩色文字用于层级(只用白色透明度)。强调色(indigo `text-indigo-400`) 只用于 UI 元素内的"状态标注"(如比较表 Vizplainer 列标题、进度条标签),而非主导层级。

**位置引导逻辑**
- Hero: **左到右** — 文字在左,动态 mockup 在右。符合西方阅读习惯:先理解概念(左),再看证据(右)
- 各 section: **Z型** — 宽标题横扫全宽 → 左/中对齐文本 → 右侧 mockup → 下一 section
- 比较表section: 居中标题 → 全宽表格 — 强迫注意力集中到证据本身

**强调色的"出现预算"**
- 全站只有 2 个元素用了实心 indigo: 进度条(`bg-indigo-500`)、比较表 Vizplainer 列的标题文字(`text-[#9aa3ec]`)
- 其他 indigo 全部用 `/10` `/20` `/50` 透明度版本 — 强调色只在"系统状态"和"竞品对比"时才满格出现
- 主 CTA 按钮(`Generate Video`)是**白色实心**,不是 indigo — 白色在黑底上反差最大

### 为什么这样做好
单一色系(白色透明度)做层级,避免了用不同颜色区分文字层级的廉价感。大尺寸对比使层级无需依赖颜色即可建立。

### 可借鉴的精髓
> **"7档透明度白色 + 1个强调色只用于状态/对比"**: 所有文本用 `white/100` → `white/20` 的透明度梯级表达层级,强调色(如 indigo)只在竞品对比表的"我方"列和 UI 进度状态中才满格出现,使其含金量极高。

---

## 3. 信息构图 (Information Composition)

### 观察到的具体做法

**"输入→AI→输出"的三段式视觉化**
Hero 区的三步流程不用箭头图/流程图,而是用 **三个标签页图标**:
- `INPUT CONTENT` (文件图标,激活态 indigo 方块) → `AI AUTO BUILD` (闪电图标,幽灵态) → `EDITABLE VIDEO` (播放图标,幽灵态)
- 三个图标排成一行、等间距、带进度条连线 — 这不是解释流程,而是**直接就是 UI**,流程通过用户实际会操作的界面来传达
- 自动轮播让流程"活起来",用户不需要阅读文字描述就能理解三步

**Hero 如何用一个 mockup 讲清价值主张**
- macOS 风格窗口(`rounded-2xl border border-white/10`) 直接放在 hero 右侧,而非底部或第二屏
- 窗口内第一帧显示的是"输入阶段"— 一个文本编辑器,光标在闪烁(`animate-pulse bg-indigo-500`) — 这比任何文案更直接地传达"它接受文字/语音输入"
- 窗口内有 macOS 三点(红/黄/绿,用 `/20` 透明度让它们很克制)、文件名 `script.txt`、底部状态栏 — 所有这些"真实 UI 细节"让用户相信"这是个真产品"

**卡片/面板的信息密度分级**
- Hero demo mockup: **高密度** — 多层嵌套(窗口→面板→进度条→状态文字),但因全是黑白,视觉不乱
- Features 左侧文字列: **低密度** — h3(标题) + h4(副标题) + p(描述),三行够了
- 比较表: **极低密度** — 每格只有 `✕ no` / `✓ yes` + mono 字体,不多一个字
- **信息密度与视觉面积成反比**: 占屏幕面积最大的 mockup 反而靠"空旷"取胜(大量 `bg-[#0A0A0A]` 暗底衬托少量发光元素)

**"输入内容"的选择**
用 Google Q3 分析文章作为演示脚本——这不是随机选择,而是刻意选取一个**有足够信息密度、非技术人员也能理解**的真实场景,让用户代入"这就是我要做的事"

### 为什么这样做好
不把抽象流程解释给用户听,直接让用户"看见"自己操作的界面,认知负荷从"理解说明"降低为"识别熟悉的 UI 模式"。

### 可借鉴的精髓
> **"用 UI 本身当说明书"**: 不画流程图/步骤图,直接展示产品 UI 的三个状态(输入、处理、输出),让用户靠识别 UI 模式理解价值主张。用真实内容(真正的文章/数据)作为演示素材,比 placeholder text 说服力强10倍。

---

## 4. 色彩系统的设计哲学

### 观察到的具体做法

**底色策略: 两档纯黑的语义区分**
- `bg-[#050505]` — 全局最深底色(几乎纯黑),用于 body 背景
- `bg-[#0A0A0A]` — 稍浅的暗底,用于 mockup 窗口、内容面板内部
- 这 `5px` 的亮度差在暗模式下制造了细腻的**层次感**而不显突兀;在明亮环境下肉眼几乎不可区分,但存在

**透明度分层系统(玻璃层次的完整谱系)**
```
surface 0: bg-[#050505]          背景绝对底
surface 1: bg-white/[0.03]       表头行背景(3% 白) — 几乎透明
surface 2: bg-white/5            navbar、面板标题栏(5% 白)
surface 3: bg-black/40           卡片底色(40% 黑,半透明)
surface 4: bg-black/50           navbar(50% 黑)
glass:     bg-[#0A0A0A]          不透明深暗面板
```
分层原则: 越接近用户操作的元素越"实"(不透明),越是背景装饰越"虚"(低透明)。

**强调色的"出现预算"量化**
全站 indigo 强调色的满格出现点(统计):
1. `bg-indigo-500` — 进度条填充(仅在 demo 状态条,约8px 高)
2. `bg-indigo-600` — hero tab 激活态背景(仅1个激活图标)
3. `text-[#9aa3ec]` — 比较表 Vizplainer 列标题(1个单元格)
4. `text-indigo-400` — demo 内部状态文字(极小字号)
5. `shadow-[0_0_20px_rgba(79,70,229,0.4)]` — 激活 tab 的发光(不可见面积)

其余所有 indigo 均用 `/10` `/20` `/50` 半透明版。**满格强调色出现密度约 5处/全页**,且都在 mockup 窗口内部——用户界面中,不在页面级设计元素中。这让强调色在"品牌象征"和"用户界面状态"之间形成解耦。

**渐变的使用策略**
- Hero H1 "Into Video." 文字: `from-white via-gray-200 to-gray-500` — **白→灰渐变文字**,极克制,是"白色内部的渐变",不是彩色渐变
- Glow 背景: `from-blue-600/20 to-purple-600/20` — 20% 透明度,绝对不会抢主角
- Hero 背景: `radial-gradient(circle_at_center, transparent 20%, #000000 100%)` — 用来在 canvas 粒子上压暗边缘,不是装饰

### 为什么这样做好
强调色极度稀缺 → 当它出现时信噪比极高。用白色透明度而非彩色做层级 → 整体气质统一。两档纯黑底 → 不用 border 也能感知层次。

### 可借鉴的精髓
> **"强调色只出现在 UI 状态内,不出现在页面级元素"**: 导航、section 标题、CTA 按钮全部用白/黑;只有 mockup 内部的进度条、激活状态才用 indigo 满格——这样强调色保持"产品 UI 感"而非"营销色块感"。

---

## 5. 字体设计哲学

### 观察到的具体做法

**双字族分工**
- `font-sans` = **Inter** (Google Fonts) — 所有品牌文字/正文
- `font-mono` = `ui-monospace, SFMono-Regular, Menlo...` — 所有 UI 标签/状态文字

**字重对比策略**
```
display heading:  font-bold (700)   + tracking-tighter (-0.05em)  → H1, 品牌名
section heading:  font-medium (500) + tracking-tight (-0.025em)   → H2
feature heading:  font-bold (700)                                  → H3
body:             font-light (300)  + leading-relaxed              → 正文
nav link:         font-bold (700)   + tracking-wide                → 导航(小号但粗)
label:            font-bold (700)   + tracking-wider / widest      → 小全大写标签
```
**核心策略**: 字重从不用"medium→semibold→bold"的线性过渡,而是**跳格对比** — 标题用 bold/700,正文用 light/300,两者之间几乎没有 semibold/600 出现在可读文字里。这比逐级过渡形成更强的视觉冲击。

**字号跨度**
```
7xl = 72px   → hero H1 (desktop)
5xl = 48px   → section H2 (desktop)
4xl = 36px   → comparison H2 / 次级 H2
2xl = 24px   → "Stay Updated" H3
xl  = 20px   → feature H3 (Explainer Videos)
lg  = 18px   → body, section subtitle
sm  = 14px   → footer, table body
xs  = 12px   → small labels
[10px]       → mono UI 标签 (tracking-widest)
[9px]        → 极小 mono 标签(文件树层级)
```
**跨度: 72px → 9px = 8:1**,但主要阅读文字集中在 18px,极端值(72px 和 9px)都是"装饰/信号"而非阅读内容。

**mono 的分工哲学**
mono 字体不用于正文,只用于以下语境:
1. 文件名 (`script.txt`, `project.vizplainer`)
2. UI 状态标签 (`INPUT:`, `OUTPUT:`)
3. 比较表表头(竞品名)
4. 极小的分类标签(`font-mono text-[10px] tracking-widest uppercase`)

这建立了一套**语义码**: 看到 mono = "这是机器/系统产生的,不是人写的" — 与产品本身(AI自动生成)的叙事完全一致。

**全大写小标签的语法**
- `GET EARLY ACCESS & UPDATES` — `text-xs tracking-wider uppercase` → 区块导语
- `SIGN IN` / `JOIN WAITLIST` — `text-xs tracking-wide uppercase font-bold` → 导航动作
- `INPUT CONTENT` / `AI AUTO BUILD` / `EDITABLE VIDEO` — `text-[10px] tracking-widest uppercase font-mono` → 流程步骤
用途规律: 全大写=系统/UI 术语;小写首字母=人类可读文案。

### 为什么这样做好
Inter + monospace 双轨制在视觉上形成"人类文字 vs 机器文字"的视觉隐喻,完美服务于"AI 工具"的品牌叙事。700 → 300 跳格字重使标题/正文形成戏剧性对比。

### 可借鉴的精髓
> **"字重跳格对比 + mono = 机器语境"**: 标题 700,正文 300,中间不留 semibold 过渡;所有"系统/AI/工具"相关标签用 monospace + ALL CAPS + widest letter-spacing,形成视觉语言的一致性语法。

---

## 6. 留白与呼吸节奏

### 观察到的具体做法

**纵向节奏的三个层级**
```
level 1 (section 间): py-24 = 96px 上下 padding
level 2 (section 内): mb-24 = 96px 大模块底边距
level 3 (组件内):     gap-12 = 48px / gap-8 = 32px / gap-6 = 24px
```
Level 1 和 Level 2 用了**相同值** (96px) — 让 section 内大模块与 section 间距感觉等重,页面节奏均匀。

**卡片内 padding 的"慷慨度"**
- mockup 内文本区: `p-6` (24px) — 比常规 `p-4` 更宽松
- mockup 内容区: `p-8` (32px) custom-scrollbar 区域
- 比较表单元格: `p-4` (16px) — 标准但不拥挤
- 联系区: `gap-16` (64px) 列间距 — 大方

相比大多数 landing page 用 `p-4` 往里塞内容,Vizplainer 的 `p-6~p-8` 让每个面板感觉"贵"。

**负空间作为设计元素的用法**
1. **Hero右侧上下大量空黑**: 三步标签图标之间刻意留空,让 demo mockup 浮在空中而不是塞满
2. **Section 背景无装饰**: 全部 `bg-black`,无背景纹理/网格/渐变 — 黑色空间本身成为"呼吸"
3. **比较表 max-w-4xl 居中**: 表格宽度只有容器的56%,两侧留出大量空白 — 比铺满全宽显档次
4. **Hero H1 两行断行刻意**: `Turn Explanation <br/> Into Video.` 强制换行让每行都不填满容器宽度——负空间在行末

**节奏感 vs 压迫感的边界管控**
比较表的 section heading `max-w-3xl text-center` — 标题收窄并居中,让下方的全宽表格在视觉上有"收紧→放开"的节奏感。

### 为什么这样做好
慷慨的留白在黑色背景上显得尤为重要——黑色会把留白"放大",让空间显得更深、更有层次。用留白代替装饰,让产品 mockup 成为唯一的视觉焦点。

### 可借鉴的精髓
> **"同一 padding 值做 section 间距和 section 内大模块间距"**: `96px` 同时用于 section 内外,使用户无法察觉边界在哪里,页面感觉是一个连续的"空间"而非一个个盒子堆叠。黑色空间不需要填充。

---

## 7. 品牌一致性与克制 (Restraint)

### 观察到的具体做法

**"没有"清单 — 它刻意避免的东西**
| 廉价/AI-味 设计特征 | Vizplainer 的做法 |
|---|---|
| Emoji 在正文/标题中 | 无任何 emoji(连 ✓ ✕ 都用的是 Unicode 字符而非彩色 emoji) |
| 彩色圆角卡片(绿/橙/紫) | 所有卡片 `bg-[#0A0A0A]` 或 `bg-black/40` — 无彩色 |
| 廉价渐变按钮(紫→粉之类) | 主 CTA 按钮是 **白色实心**,次级是 `border border-white/20 bg-transparent` |
| 装饰性插画/图标组 | 无任何插画。图标只用 Lucide(线条图标),且极小、辅助性 |
| 星星/粒子/光晕背景铺满全屏 | Canvas 粒子存在但 `opacity-40 blur-[1px]` — 极其低调 |
| 数字计数统计(10k+ users!) | 无任何数字营销统计 |
| 五星评价/用户头像 testimonial | 无 social proof 组件 |
| Section 背景颜色交替(白/灰) | 全部 `bg-black`,靠 `border-white/5` 区分 |
| 大标题彩色高亮词 | H1 的渐变是 `white→gray-500`(单色渐变),非彩色 |

**品牌元素的一致性**
- Logo: `font-bold tracking-tighter text-xl text-white` — 与 H1 字体参数完全一致(同一字族、同一字重风格)
- Footer 与 Navbar 用完全相同的 logo 展示方式(`h-8 w-8 rounded-lg` 图标 + `VIZPLAINER` 大写文字)
- 品牌色 indigo 在"工具界面"和"品牌标识"中复用,形成语言一致性

**"一句话 tagline 的克制"**
Footer 副标题: *"AI-powered visual explanations for everyone."* — 14字,没有"revolutionary/cutting-edge/next-gen"类过度承诺词。

### 为什么这样做好
去除所有"常见 landing page 装饰"后,只剩下产品本身——这是最有信心的表达方式。用户感受到的是"这个产品足够好,不需要靠视觉把戏来分散注意力"。

### 可借鉴的精髓
> **"让产品 mockup 承担所有说服工作"**: 删掉所有装饰性视觉元素——插画、彩色卡片、统计数字、testimonial——只留 mockup 和文字。一旦删光,剩下的每个元素都必须服务于"展示产品能做什么"这一个目的。

---

## 8. 叙事/信息流结构

### 观察到的具体做法

**五段式说服弧线**
```
Section 1 — HERO         价值主张 + 产品预览 (转化漏斗入口)
Section 2 — WHAT IT DOES 机制解释 + 用例演示 (建立信任)
Section 3 — COMPARISON   竞品对比 + 差异化 (消除疑虑)
Section 4 — FEATURES      功能深度 + 编辑器 (验证能力)
Section 5 — CONTACT/CTA  获取更新 (温和转化)
```

**每个 Section 承担的具体说服任务**

**Section 1 (Hero)**: 
- 任务: 30秒内让用户理解"这个工具把文字/音频变成视频"
- 执行: H1(`Turn Explanation Into Video.`) + demo mockup 并排展示三步流程
- 转化: 双 CTA (`Generate Video` 白色实心 + `View Examples` ghost) + 邮件订阅表单

**Section 2 (What Vizplainer Does)**:
- 任务: 证明"它真的能把真实内容变成真实视频"
- 执行: 左侧真实文章文本 + 右侧嵌入视频播放器,三个用例 tab(金融分析/客户教育/患者指南)
- 选题智慧: 用例横跨 B2B 不同行业,让不同背景用户都能找到自己的使用场景

**Section 3 (There's nothing to screen-record)**:
- 任务: 处理最大的竞品比较疑虑("为什么不用 Sora/Synthesia")
- 执行: 先用一段精准的文案定义**产品品类**(抽象机制可视化,不是屏幕录制),再用表格做事实陈述
- 文案技巧: 标题是问题陈述(`There's nothing to screen-record`) 而非功能声明 — 让用户先认可"问题存在"再接受"解决方案"

**Section 4 (Powerful Features)**:
- 任务: 深度用户的技术背书
- 执行: 4:8 左文字/右 mockup,三个功能点用 accordion + 自动轮播同步,Editor UI 展示完整时间轴/AI chat 面板
- 策略: 给到了"能编辑、能调整、不是一次性输出"这个关键差异点

**Section 5 (Contact/Stay Updated)**:
- 任务: 低压力保留,不是硬转化
- 执行: 邮件订阅 (`rounded-3xl backdrop-blur-2xl`) + 社交账号 — 对"还没决定"的用户保留接触点

**叙事节拍的密度递减**
Hero(最高信息密度,动态 mockup + 两个 CTA) → What it does(中高密度,视频演示) → Comparison(低密度,表格事实) → Features(中密度,accordionm) → Contact(最低密度,表单) — 整体是"冲击→展开→论证→验证→保留"的密度递减弧线。

### 为什么这样做好
把最常见的竞品疑虑(`为什么不用 Sora/Synthesia`)做成了一个独立 section 主动回答,而不是埋在 FAQ 里——这是把用户心理流程内化到页面叙事结构的典范。

### 可借鉴的精髓
> **"把竞品异议单独做成一个 Section"**: 与其等用户自己去想"为什么不用XXX",不如主动用一个 section 把竞品列出来、做事实比较——这样反而显得自信、透明,而非防御性。

---

## 9. 拟物/UI 演示美学

### 观察到的具体做法

**macOS 窗口语法的精确还原**
每个 demo 窗口都遵循同一套"macOS 拟物模板":
```
外框:   rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl
标题栏: h-12 border-b border-white/5 bg-white/5 px-4
三点:   h-2.5 w-2.5 rounded-full (red/20, yellow/20, green/20)
文件名: font-mono text-[10px] text-white/30
内容区: p-6 或 p-8
```
三点的颜色用 `/20` 透明度版本(不是鲜艳的红/黄/绿) — 这是非常刻意的克制,表示"这不是真正可操作的 macOS 窗口,只是一个视觉引用"。

**三种 UI 模态对应三个流程阶段**
1. **文本编辑器** (script.txt) — 代表"输入",用 monospace 字体 + 打字光标建立"代码/终端"隐喻
2. **时间轴编辑器** (project.vizplainer) — 代表"AI 处理",有 Scene 1/2/3 彩色时间块、进度加载
3. **视频帧预览** (SCENE 02) — 代表"输出",展示实际视频帧内容

这三个 UI 模态刚好对应产品的三个核心能力,且都是用户**熟悉的专业工具形式**(文本编辑器/视频编辑器),降低认知门槛。

**"一个文件名让 mockup 变真实"**
`script.txt`、`project.vizplainer`、`untitled_architecture_v1.viz` — 具体的文件名(而非"Your Content Here")让 mockup 从"示意图"变成"真实截图"。`untitled_architecture_v1` 还有"版本命名"的细节,进一步强化真实感。

**编辑器 UI 内的"AI 存在感"**
Features section 的编辑器右侧面板明确写出:
> *"Effect: AI Effect / Implementing neon-border glow effect (blue to purple gradients)..."*

这个描述性文字同时完成两件事:①向用户展示 AI 正在做什么 ②向用户展示产品视频的风格(neon-border glow)——一个 UI 元素双重叙事。

**时间轴的可信度信号**
编辑器底部时间轴 (`00:00:00` 时间码 + 彩色 scene blocks) — 对于目标用户(有过 Premiere/After Effects 经验的内容创作者),看到熟悉的时间轴布局就建立了"这个工具是认真的"的可信度。

### 为什么这样做好
用专业工具(视频编辑器/代码编辑器)的视觉语言展示 AI 工具,让产品显得"有技术含量"而非"傻瓜式黑盒"。这对技术敏感的目标用户(B2B SaaS 受众)尤为重要。

### 可借鉴的精髓
> **"用专业工具 UI 形态展示输入/处理/输出三个阶段"**: 分别找到目标用户熟悉的 UI 形式(代码编辑器 = 输入感、时间轴 = 过程感、视频帧 = 输出感),用三个 UI 拟物呈现,让产品 demo 同时充当产品教程。

---

## 10. 整体气质关键词

以下 7 个形容词及其设计依据:

### `cinematic`(电影感)
- **体现**: Hero H1 的 `leading-[1.05]` 使行间距极紧,72px × 2行的大字在暗背景上形成"片名字幕"质感;canvas 粒子背景 + `radial-gradient` 边缘压暗,有 IMAX 银幕感;无任何横向边界框,内容浮于空黑中。

### `restrained`(克制)
- **体现**: 所有装饰元素均为 10-20% 透明度版本;强调色满格出现仅 5 处/全页;主 CTA 用白色而非品牌色;没有 emoji、插画、彩色卡片、统计数字。

### `technical`(技术感)
- **体现**: monospace 字体系统性地标记"机器/系统"语境;文件名(`script.txt`)、时间码(`00:00:00`)、终端面板、状态标签(`INPUT:`/`OUTPUT:`)构成完整的"工程师 UI"词汇表。

### `dark-mode-native`(暗色原生)
- **体现**: 不是"暗色版本的亮色设计",而是从底层就为暗色设计——只有纯黑底、白色透明度层级、在暗背景才显效的 glow 效果、玻璃态卡片;放到亮色背景上这套设计完全失效。

### `premium`(高级感)
- **体现**: `py-24` 的大量留白不"节省屏幕";`p-6~p-8` 的慷慨 padding;比较表 `max-w-4xl` 居中不填满;单色调保持贯穿;没有任何一处看起来是"为了节省空间而压缩的"。

### `systematic`(系统性)
- **体现**: 所有 section 用完全一致的 `py-24` 节奏;容器宽度严格从 3xl/5xl/7xl 三档选取;字重只用 300/500/700 三档;透明度用 5/10/20/40/50/60/80 固定档位 — 没有"随机调出来的"值。

### `documentary`(纪录片感)
- **体现**: 演示内容用真实的 Google Q3 分析文章(非占位符文本);竞品比较表用真实竞品名(Sora/HeyGen/Navattic);叙事语气直接(`There's nothing to screen-record`) — 像是在陈述事实而非推销。

---

## 附: 对"网页伪视频演示模板系统"最值得借鉴的 Top 8 特质

> 按借鉴优先级排序,越靠前越容易形成直接的模板系统价值

### #1 — **macOS 窗口语法作为通用"演示容器"**
**借鉴点**: 建立一套标准 macOS 窗口模板(`rounded-2xl border border-white/10 shadow-2xl` + 三点标题栏 + 文件名),所有产品演示内容放入这个容器中。容器本身暗示"这是真实可用的工具",比空白 mockup 或圆角卡片更有说服力。三点用低透明度(不是鲜艳颜色),视觉上"引用"macOS 而非"假装是" macOS。

### #2 — **三段式 UI 流程图(输入/处理/输出)替代文字步骤说明**
**借鉴点**: 流程的三个阶段用三个不同 UI 形态呈现:文本编辑器→加载/处理器→输出预览。每个阶段对应目标用户熟悉的 UI 形式。配合标签页+进度条自动轮播,让流程"活起来"而不是静止的三步图。这套结构可以作为任何"输入→AI处理→输出"产品的通用 hero demo 模板。

### #3 — **强调色只在 UI 状态内满格,页面级用白/黑**
**借鉴点**: 模板系统的品牌色只出现在 mockup 内部的进度条、激活状态、高亮文字,页面级的所有 CTA 按钮、导航、标题用白色/透明边框。这使品牌色保持"产品 UI 感"而非"营销广告感",且整个模板看起来不会过度饱和。

### #4 — **7档白色透明度文字层级系统**
**借鉴点**: 建立统一的文字透明度规范:100% → 80% → 60% → 50% → 40% → 25% → 20%,对应 primary/heading/body/muted/label/disabled/ghost 七个语义级别。所有文本层级只用这一套,不引入彩色文字。这使任何内容放入模板后自动获得清晰的层级感。

### #5 — **真实内容 > placeholder 文字**
**借鉴点**: 演示时不用 "Lorem ipsum" 或 "Your content here",而是用真实的行业文章、真实的文件名(`untitled_architecture_v1.viz`)、真实的数据。这让"网页伪视频"演示的每一帧看起来像是真实产品截图而非模拟图。即使内容跟演示产品无直接关系也比 placeholder 更有说服力。

### #6 — **py-24 单一节奏单元(纵向"电影帧"感)**
**借鉴点**: 演示模板的每个"场景/slide"使用统一的 `96px` 上下内边距,加上黑色全宽背景,使每个场景都有"满屏电影帧"的独立感。不要用不同 section 用不同的 padding 值,节奏感来自统一。

### #7 — **monospace = 机器/系统语境的视觉语法**
**借鉴点**: 在演示模板中,凡是想表达"这是 AI/系统/工具自动产生的"的文字(状态标签、文件名、时间码、输出结果),一律用 monospace 字体 + ALL CAPS + `tracking-widest`。凡是人类解说/叙述,用 sans-serif 正文。这两套视觉语言的分工一旦建立,用户不需要阅读就能感知"哪些是 AI 做的,哪些是人说的"。

### #8 — **竞品比较表作为独立 Section 的叙事策略**
**借鉴点**: 在演示模板系统中,专门留出一个"对比帧/场景",主动列出竞争方案的局限性。用 mono 字体 + `✕ no` / `✓ yes` + 极低对比度的竞品列 vs 高亮的己方列,用事实陈述代替广告语言。这个"主动回答疑虑"的帧比任何功能介绍帧说服力都强。

---

*报告字数: ~5000字 | 方法: HTML/CSS class 提取 + 实地截图 + 设计判断 | 范围: 6个 section 全部检视*
