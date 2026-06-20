// ⚠️ 这是 anchor 参考代码，不会被任何项目编译。
//    抄到真实项目时（presentation/src/chapters/NN-pipeline/），
//    把下面两个 import 改成：
//      import { MaskReveal } from "../../components/MaskReveal";
//      import type { ChapterStepProps } from "../../registry/types";
import { MaskReveal } from "../../../templates/src/components/MaskReveal";
import type { ChapterStepProps } from "../../../templates/src/registry/types";
import "./chapter.css";

/**
 * ui-mockup-scene · 完整章节示例（C1）
 * ─────────────────────────────────────────
 * 默认绑 bold-signal-v2 主题（暗色 + 动效）。
 *
 * 这是 Vizplainer 的 #1 + #2 签名落地：把一个「真实产品界面」装进
 * .window-frame（macOS 风窗口），再用 .carousel-slide 在
 * 输入 → 处理中 → 产出 三态之间**前翻切换**（不是堆三个箭头流程图）。
 *
 * 关键手段：
 * - 整个演示对象 = 一个 .window-frame（标题栏 3 点 + 文件名槽 + body）
 * - 三态用同一个窗口、只换 .wf-body 内容：carousel-slide 前翻进/出
 * - accent 只在「处理中 / 完成」的 UI 状态点里满格出现，文字层不抢色
 * - 真实文件名 / 真实命令 / 真实输出（trait #5），不要 lorem 占位
 * - 每一态 = 1 step（trait：流程必须逐态揭示，禁一次三联画）
 *
 * narrations.ts 必须 4 条（intro + 3 态）。
 */

type Phase = "intro" | "input" | "process" | "output";
const PHASES: Phase[] = ["intro", "input", "process", "output"];

export default function UiMockupChapter({ step }: ChapterStepProps) {
  const phase = PHASES[Math.min(step, PHASES.length - 1)];

  return (
    <div className="um-scene scene-pad">
      <header className="um-head">
        <span className="sys-label">data pipeline · 单文件演示</span>
      </header>

      {/* 唯一的演示对象：一个真实感窗口。整章不离开它。 */}
      <div className={`window-frame is-mac um-window ${step > 0 ? "in" : ""}`}>
        <div className="wf-bar">
          <span className="wf-dots" />
          <span className="wf-title">{titleFor(phase)}</span>
          <span className="um-status">
            <span className={`status-dot ${phase === "process" ? "is-live" : ""}`} />
            <span className="sys-label">{statusFor(phase)}</span>
          </span>
        </div>

        <div className="wf-body um-body">
          {/* 三态共用一个轮播容器，前翻切换 */}
          {phase === "intro" && (
            <MaskReveal show duration={900}>
              <div className="um-ghost human-note">
                把一份原始 CSV，喂进同一个脚本，看它怎么吐出干净结果。
              </div>
            </MaskReveal>
          )}

          {phase === "input" && (
            <div className="carousel-slide is-active um-slide">
              <div className="sys-label um-slide-tag">输入 · raw.csv</div>
              <pre className="um-code">{`id,ts,amount,note
1001,1718918400,  42.50 ,"  paid "
1002,1718922000,,"refund??"
1003,1718925600, 17 ,ok`}</pre>
            </div>
          )}

          {phase === "process" && (
            <div className="carousel-slide is-active um-slide">
              <div className="sys-label um-slide-tag">处理中 · clean.py</div>
              <pre className="um-code">{`$ python clean.py raw.csv
▸ trimming whitespace ......... done
▸ coercing amount → float ..... done
▸ dropping null rows .......... 1 removed`}</pre>
              <div className="um-progress"><span /></div>
            </div>
          )}

          {phase === "output" && (
            <div className="carousel-slide is-active um-slide">
              <div className="sys-label um-slide-tag um-slide-ok">产出 · clean.csv</div>
              <pre className="um-code">{`id,ts,amount,note
1001,1718918400,42.50,paid
1003,1718925600,17.00,ok`}</pre>
              <div className="um-result">
                <span className="hero-num um-count">2</span>
                <span className="human-note">行干净数据 · 0 报错</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function titleFor(p: Phase) {
  return p === "output" ? "clean.csv" : p === "process" ? "clean.py" : "raw.csv";
}
function statusFor(p: Phase) {
  return p === "process" ? "RUNNING" : p === "output" ? "DONE" : "READY";
}
