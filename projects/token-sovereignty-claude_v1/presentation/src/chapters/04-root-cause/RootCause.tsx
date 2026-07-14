import { useMountAnim } from "../../hooks/useMountAnim";
import type { ChapterStepProps } from "../../registry/types";
import "./RootCause.css";

export default function RootCause({ step }: ChapterStepProps) {
  const mounted = useMountAnim(step);

  return (
    <div className="scene-pad rc-root">
      <div className="step-content" key={step}>
        {(step === 0 || step === 1) && (
          <div className={`rc-section cascade ${mounted ? "in" : ""}`}>
            <div className="rc-data-lake" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="rc-lake-box">
                <div className="rc-lake-label badge-mono">训练语料</div>
                <div className="rc-lake-arrow-down">↓</div>
                <div className="rc-lake-core">
                  <div className="rc-lake-layer rc-lake-layer-1">大规模公开与授权数据</div>
                  <div className="rc-lake-layer rc-lake-layer-2">文本 · 代码 · 图片 · 视频</div>
                  <div className="rc-lake-layer rc-lake-layer-3">经筛选、清洗与训练</div>
                </div>
                <div className="rc-lake-arrow-down">↓</div>
                <div className="rc-lake-emerge">学习统计模式 → 形成生成能力</div>
              </div>
              <div className="rc-lake-conclusion">规模化<span className="rc-highlight">吸收 · 重组</span>带来新的治理风险</div>
            </div>
            {step >= 1 && (
              <div className={`rc-not-evil rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
                不是一句公司“坏”就能解释<br /><span className="rc-muted">风险来自数据、授权、产品与治理的共同作用</span>
              </div>
            )}
          </div>
        )}
        {(step === 2 || step === 3) && (
          <div className={`rc-section cascade ${mounted ? "in" : ""}`}>
            <div className="rc-sharingan-visual" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="rc-sharingan-icon">写轮眼</div>
              <div className="rc-sharingan-desc">把“高速模仿”的风险具象化</div>
            </div>
            <div className="rc-sharingan-explanation" style={{ "--i": 1 } as React.CSSProperties}>
              <div className="rc-timeline">
                <div className="rc-timeline-left">
                  <div className="rc-timeline-label badge-mono">原创者</div>
                  <div className="rc-timeline-dot accent-dot" />
                  <div className="rc-timeline-text">创作时刻</div>
                </div>
                <div className="rc-timeline-gap"><div className="rc-timeline-gap-text">时间差<br/>→ 0</div></div>
                <div className="rc-timeline-right">
                  <div className="rc-timeline-label badge-mono">AI生成内容</div>
                  <div className="rc-timeline-dot" />
                  <div className="rc-timeline-text">近乎同时</div>
                </div>
              </div>
              {step >= 3 && (
                <div className={`rc-sharingan-reverse rise-step ${mounted ? "in" : ""}`}>
                  来源与时间线被淹没时——<span className="rc-highlight">原创归属会更难辨认</span>
                </div>
              )}
            </div>
          </div>
        )}
        {(step === 4 || step === 5) && (
          <div className={`rc-section cascade ${mounted ? "in" : ""}`}>
            <div className="rc-signal-noise" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="rc-signal-badge badge-mono is-accent">原创信号</div>
              <div className="rc-noise-wave">
                <div className="rc-noise-bar rc-noise-bar-1" />
                <div className="rc-noise-bar rc-noise-bar-2" />
                <div className="rc-noise-bar rc-noise-bar-3" />
                <div className="rc-noise-bar rc-noise-bar-4" />
                <div className="rc-noise-bar rc-noise-bar-5" />
                <div className="rc-noise-bar rc-noise-bar-6" />
                <div className="rc-noise-bar rc-noise-bar-7" />
                <div className="rc-noise-bar rc-noise-bar-8" />
              </div>
              <div className="rc-noise-label">批量复刻 · 洗稿 · 复杂重组 → <span className="rc-highlight">消失在洪流中</span></div>
            </div>
            {step >= 5 && (
              <div className={`rc-business-parallel rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
                <div className={`rc-biz-card glow-card ${mounted ? "in" : ""}`}>
                  <div className="rc-biz-label badge-mono">原创商业模式</div>
                  <div className="rc-biz-arrow">→</div>
                  <div className="rc-biz-result">竞争对手近乎实时复制</div>
                  <div className="rc-biz-bottom">无尽内卷 · 价格战</div>
                </div>
              </div>
            )}
          </div>
        )}
        {step === 6 && (
          <div className={`rc-section cascade ${mounted ? "in" : ""}`}>
            <div className="rc-three-layer" style={{ "--i": 0 } as React.CSSProperties}>
              <div className={`rc-layer-card rc-layer-symptom glow-card ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
                <div className="rc-layer-num hero-num">症状</div>
                <div className="rc-layer-title">计费与价值可能脱节</div>
                <div className="rc-layer-source mono">← Karp的批评</div>
              </div>
              <div className="rc-layer-connector">↓</div>
              <div className={`rc-layer-card rc-layer-cause glow-card ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
                <div className="rc-layer-num hero-num">机制</div>
                <div className="rc-layer-title">知识被规模化吸收与重组</div>
                <div className="rc-layer-source mono">← 受数据与授权影响</div>
              </div>
              <div className="rc-layer-connector">↓</div>
              <div className={`rc-layer-card rc-layer-diagnosis glow-card ${mounted ? "in" : ""}`} style={{"--i": 2, borderColor: "var(--accent)"} as React.CSSProperties}>
                <div className="rc-layer-num hero-num" style={{ color: "var(--accent)" }}>诊断</div>
                <div className="rc-layer-title" style={{ color: "var(--accent)" }}>个人能力资产未被自己留存</div>
              </div>
            </div>
            <div className={`rc-universal rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              公司与个人的风险尺度不同<br /><span className="rc-highlight">共同主题都是控制权</span>
            </div>
          </div>
        )}
      </div>
      <div className="ambient-orbs rc-orb" />
    </div>
  );
}
