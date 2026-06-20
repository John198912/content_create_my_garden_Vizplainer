// ⚠️ 这是 anchor 参考代码，不会被任何项目编译。
//    抄到真实项目时（presentation/src/chapters/NN-split/），
//    把下面两个 import 改成：
//      import { MaskReveal } from "../../components/MaskReveal";
//      import type { ChapterStepProps } from "../../registry/types";
import { MaskReveal } from "../../../templates/src/components/MaskReveal";
import type { ChapterStepProps } from "../../../templates/src/registry/types";
import "./chapter.css";

/**
 * asymmetric-split · 完整章节示例（C2）
 * ─────────────────────────────────────────
 * 默认绑 swiss-ikb 主题（瑞士国际主义 / 信息驱动）。
 *
 * Vizplainer 的留白哲学落地：**33% 文字 / 67% 视觉**的非对称分屏。
 * 左窄列放「一句话观点 + 一个 mono 标签」（密度低、呼吸感强），
 * 右宽栏放「真正的视觉演示」（窗口 / 图表 / mockup，密度高）。
 *
 * 关键手段：
 * - 左右**密度反比**（trait #6）：左列越空，右栏越实，对比才成立
 * - 左列文字逐行 mask reveal，右栏视觉随后浮现（节拍分明）
 * - 不要 50/50 居中对称 —— 那是 PPT 的味道，非对称才有编辑感
 *
 * narrations.ts 必须 3 条（论点 → 论据浮现 → 收束数字）。
 */

export default function AsymmetricSplitChapter({ step }: ChapterStepProps) {
  return (
    <div className="as-scene scene-pad">
      {/* 左：窄文字列（33%） */}
      <aside className="as-left">
        <MaskReveal show duration={1000}>
          <span className="sys-label as-tag">观察 02</span>
        </MaskReveal>
        <MaskReveal show delay={300} duration={1100}>
          <h2 className="as-claim">
            慢，是因为<br />每次都<span className="as-em">重算</span>。
          </h2>
        </MaskReveal>
        {step >= 2 && (
          <MaskReveal show duration={900}>
            <p className="human-note as-note">
              缓存命中后，同一查询从 1.8s 掉到 40ms。
            </p>
          </MaskReveal>
        )}
      </aside>

      {/* 右：宽视觉栏（67%） */}
      <section className="as-right">
        {step >= 1 && (
          <div className="window-frame as-window in">
            <div className="wf-bar">
              <span className="wf-dots" />
              <span className="wf-title">query · latency</span>
            </div>
            <div className="wf-body as-chart">
              <Bar label="无缓存" value="1.8s" pct={100} dim />
              <Bar label="有缓存" value="40ms" pct={4} accent show={step >= 2} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Bar({
  label,
  value,
  pct,
  dim,
  accent,
  show = true,
}: {
  label: string;
  value: string;
  pct: number;
  dim?: boolean;
  accent?: boolean;
  show?: boolean;
}) {
  return (
    <div className={`as-bar-row ${show ? "in" : ""}`}>
      <span className="sys-label as-bar-label">{label}</span>
      <div className="as-bar-track">
        <span
          className={`as-bar-fill ${accent ? "is-accent" : ""} ${dim ? "is-dim" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`as-bar-val ${accent ? "is-accent" : ""}`}>{value}</span>
    </div>
  );
}
