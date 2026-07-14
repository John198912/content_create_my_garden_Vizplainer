import { useMountAnim } from "../../hooks/useMountAnim";
import type { ChapterStepProps } from "../../registry/types";
import "./ThreePrinciples.css";

export default function ThreePrinciples({ step }: ChapterStepProps) {
  const mounted = useMountAnim(step);

  return (
    <div className="scene-pad tp-root">
      <div className="step-content" key={step}>
        {(step === 0 || step === 1) && (
          <div className={`tp-section cascade ${mounted ? "in" : ""}`}>
            <div className={`tp-principle-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
              <div className="tp-principle-num hero-num">①</div>
              <div className="tp-principle-content">
                <div className="tp-principle-title">你拥有你的<span className="tp-highlight">判断标准</span></div>
                <div className="tp-principle-map"><span className="badge-mono">Karp: 控制权重 = 控制命运</span></div>
              </div>
            </div>
            <div className="tp-weight-explain" style={{ "--i": 1 } as React.CSSProperties}>
              <div className="tp-weight-label badge-mono">你的"权重"</div>
              <div className={`tp-weight-items cascade ${mounted ? "in" : ""}`}>
                <div style={{"--i": 0} as React.CSSProperties}>为什么这个标题比那个好</div>
                <div style={{"--i": 1} as React.CSSProperties}>为什么这个角度有意思</div>
                <div style={{"--i": 2} as React.CSSProperties}>为什么删这段留那段</div>
              </div>
            </div>
            {step >= 1 && (
              <div className={`tp-principle-bottom rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                AI能复制你的<span className="tp-strikethrough">输出</span><br />
                复制不了你的<span className="tp-highlight">判断过程</span>
                <div className="tp-condition">——前提：你自己把它记下来了</div>
              </div>
            )}
          </div>
        )}
        {(step === 2 || step === 3) && (
          <div className={`tp-section cascade ${mounted ? "in" : ""}`}>
            <div className={`tp-principle-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
              <div className="tp-principle-num hero-num">②</div>
              <div className="tp-principle-content">
                <div className="tp-principle-title">知识资产不在<span className="tp-highlight">平台服务器上</span></div>
                <div className="tp-principle-map"><span className="badge-mono">Karp: 四问 → 你的行动</span></div>
              </div>
            </div>
            <div className={`tp-action-cards cascade ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              <div className={`tp-action-item glow-card ${mounted ? "in" : ""}`} style={{"--i": 0} as React.CSSProperties}>
                <div className="tp-action-icon"><span className="dot-accent" /></div>
                <div className="tp-action-text">好对话存到本地</div>
              </div>
              <div className={`tp-action-item glow-card ${mounted ? "in" : ""}`} style={{"--i": 1} as React.CSSProperties}>
                <div className="tp-action-icon"><span className="dot-accent" /></div>
                <div className="tp-action-text">好用的prompt→可复用模板</div>
              </div>
            </div>
            {step >= 3 && (
              <div className={`tp-compare rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <div className="tp-compare-left">
                  <div className="tp-compare-label badge-mono">纯消耗</div>
                  <div className="tp-compare-result tp-compare-bad">结束后少了一堆token</div>
                </div>
                <div className="tp-compare-vs">vs</div>
                <div className="tp-compare-right">
                  <div className="tp-compare-label badge-mono is-accent">积累资产</div>
                  <div className="tp-compare-result tp-compare-good">结束后多了一个文件</div>
                </div>
              </div>
            )}
          </div>
        )}
        {step === 4 && (
          <div className={`tp-section cascade ${mounted ? "in" : ""}`}>
            <div className={`tp-principle-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
              <div className="tp-principle-num hero-num">③</div>
              <div className="tp-principle-content">
                <div className="tp-principle-title">随时切换工具<span className="tp-highlight">而不损失能力</span></div>
                <div className="tp-principle-map"><span className="badge-mono">Karp: 生产资料不被转移</span></div>
              </div>
            </div>
            <div className={`tp-follow-you cascade ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              <div className="tp-follow-label badge-mono">这些跟着你走</div>
              <div className="tp-follow-items">
                <div className="tp-follow-item" style={{"--i": 0} as React.CSSProperties}><div className="dot-accent" /> 判断标准</div>
                <div className="tp-follow-item" style={{"--i": 1} as React.CSSProperties}><div className="dot-accent" /> Prompt模板</div>
                <div className="tp-follow-item" style={{"--i": 2} as React.CSSProperties}><div className="dot-accent" /> 问题拆解方式</div>
                <div className="tp-follow-item" style={{"--i": 3} as React.CSSProperties}><div className="dot-accent" /> 审美偏好</div>
              </div>
              <div className="tp-follow-bottom">工具可以换 · <span className="tp-highlight">这些东西跟着你</span></div>
            </div>
          </div>
        )}
        {(step === 5 || step === 6) && (
          <div className={`tp-section tp-final-section cascade ${mounted ? "in" : ""}`}>
            <div className="tp-not-gpu" style={{ "--i": 0 } as React.CSSProperties}>不是让你立刻去买GPU跑本地模型</div>
            <div className={`tp-simplest-card glow-card rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              <div className="tp-simplest-label badge-mono is-accent">最简单的起点</div>
              <div className="tp-simplest-action">每一次"这次对话还不错"</div>
              <div className="tp-simplest-arrow">↓</div>
              <div className="tp-simplest-result">存下来</div>
              <div className="tp-simplest-note">不用整理 · 不用分类 · 先存</div>
            </div>
            {step >= 6 && (
              <div className={`tp-sovereignty-first rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <div className="tp-sovereignty-main">这个动作本身 = <span className="tp-highlight">主权化的第一步</span></div>
                <div className="tp-sovereignty-sub">你开始意识到——对话里有<span className="tp-highlight">"我"</span>的痕迹</div>
                <div className="tp-sovereignty-close">这个"我"，值得被自己保留</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="ambient-orbs tp-orb" />
    </div>
  );
}
