import { useMountAnim } from "../../hooks/useMountAnim";
import type { ChapterStepProps } from "../../registry/types";
import "./Ending.css";

export default function Ending({ step }: ChapterStepProps) {
  const mounted = useMountAnim(step);

  return (
    <div className="scene-pad end-root">
      <div className="step-content" key={step}>
        {step === 0 && (
          <div className={`end-section cascade ${mounted ? "in" : ""}`}>
            <div className="end-jig-quote" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="end-quote-en display-en">"The jig is up."</div>
              <div className="end-quote-by mono">— Alex Karp</div>
            </div>
            <div className={`end-quote-zh rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>骗局曝光了</div>
          </div>
        )}
        {step === 1 && (
          <div className={`end-section cascade ${mounted ? "in" : ""}`}>
            <div className="end-four-recall" style={{ "--i": 0 } as React.CSSProperties}>
              <div className={`end-recall-items cascade ${mounted ? "in" : ""}`}>
                <div className="end-recall-item" style={{"--i": 0} as React.CSSProperties}>谁拥有数据？</div>
                <div className="end-recall-item" style={{"--i": 1} as React.CSSProperties}>数据存在哪？</div>
                <div className="end-recall-item" style={{"--i": 2} as React.CSSProperties}>提示是否安全？</div>
                <div className="end-recall-item" style={{"--i": 3} as React.CSSProperties}>是否传输给第三方？</div>
              </div>
              <div className="end-recall-footer">这些问题不只企业CEO需要答案</div>
            </div>
            <div className={`end-exam-card glow-card rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              <div className="end-exam-title">每次打开AI对话框</div>
              <div className="end-exam-line">= 交一份<span className="end-highlight">隐形答卷</span></div>
            </div>
            <div className={`end-choice ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
              <div className="end-choice-option end-choice-bad">交完就走</div>
              <div className="end-choice-or">or</div>
              <div className="end-choice-option end-choice-good">存下来，变成自己的东西</div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={`end-section cascade ${mounted ? "in" : ""}`}>
            <div className="end-metaphor" style={{ "--i": 0 } as React.CSSProperties}>
              Karp把病历公开了<br /><span className="end-highlight">要不要给自己号个脉</span>，是你的事
            </div>
            <div className={`end-cta-card glow-card rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              <div className="end-cta-question">积累资产 <span className="end-cta-vs">vs</span> 纯消耗</div>
              <div className="end-cta-prompt">你哪种更多？</div>
              <div className="end-cta-hint mono">弹幕 / 评论区聊聊</div>
            </div>
            <div className={`end-signoff rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
              <div className="end-signoff-name">这里是机智的阿卷</div>
              <div className="end-signoff-msg">一起在AI时代建造属于自己的东西</div>
              <div className="end-signoff-bye mono">下期见</div>
            </div>
          </div>
        )}
      </div>
      <div className="ambient-orbs end-orb" />
    </div>
  );
}
