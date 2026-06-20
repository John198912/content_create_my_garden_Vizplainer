// ⚠️ 这是 anchor 参考代码，不会被任何项目编译。
//    抄到真实项目时（presentation/src/chapters/NN-compare/），
//    把下面两个 import 改成：
//      import { MaskReveal } from "../../components/MaskReveal";
//      import type { ChapterStepProps } from "../../registry/types";
import { MaskReveal } from "../../../templates/src/components/MaskReveal";
import type { ChapterStepProps } from "../../../templates/src/registry/types";
import "./chapter.css";

/**
 * comparison-frame · 完整章节示例（C3）
 * ─────────────────────────────────────────
 * 默认绑 electric-studio 主题（B2B / 投资人路演）。
 *
 * Vizplainer 的 #8 签名落地：**竞品对比作为独立章节**。不是埋在正文里
 * 一句「比 X 好」，而是给它一整屏一张对比表，**逐列揭示**：
 * 对照列先以「灰态」全部出现 → 我方列最后刷出（accent），✓/✕ 收尾。
 *
 * 关键手段：
 * - 对照列 ghost 灰（--text-ghost / --text-faint），我方列满色
 * - 逐列揭示（trait：禁一次全亮），每列 1 step
 * - ✓/✕ 用纯字符 + token 色，不要 emoji（反 AI 味）
 * - 我方列那一列整列高亮（accent 描边 / 底色），一眼定胜负
 *
 * narrations.ts 必须 N+1 条（intro + 每列一条；这里 3 列 = 4 条）。
 */

const ROWS = ["实时增量", "本地优先", "零配置上手", "开源可自托管"];

type Col = {
  name: string;
  ours?: boolean;
  // 每行：true=有 / false=无
  cells: boolean[];
};

const COLS: Col[] = [
  { name: "Legacy A", cells: [false, false, true, false] },
  { name: "Cloud B", cells: [true, false, false, false] },
  { name: "我们", ours: true, cells: [true, true, true, true] },
];

export default function ComparisonFrameChapter({ step }: ChapterStepProps) {
  // step 0 intro；step 1..N 逐列揭示（揭到第 step 列）
  const revealed = step; // 0 = 只表头，1 = 第1列，...

  return (
    <div className="cf-scene scene-pad">
      <header className="cf-head">
        <MaskReveal show duration={900}>
          <span className="sys-label">同类对比</span>
        </MaskReveal>
        <MaskReveal show delay={250} duration={1000}>
          <h2 className="cf-title">谁能做到全部四件事？</h2>
        </MaskReveal>
      </header>

      <div className="cf-grid">
        {/* 左侧能力行标 */}
        <div className="cf-rowlabels">
          <div className="cf-corner" />
          {ROWS.map((r) => (
            <div key={r} className="cf-rowlabel sys-label">{r}</div>
          ))}
        </div>

        {/* 各竞品列 —— 逐列揭示 */}
        {COLS.map((col, ci) => {
          const shown = ci < revealed;
          return (
            <div
              key={col.name}
              className={`cf-col ${col.ours ? "is-ours" : "is-ghost"} ${shown ? "in" : ""}`}
            >
              <div className="cf-colname">{col.name}</div>
              {col.cells.map((has, ri) => (
                <div key={ri} className="cf-cell">
                  <span className={`cf-mark ${has ? "yes" : "no"}`}>
                    {has ? "✓" : "✕"}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
