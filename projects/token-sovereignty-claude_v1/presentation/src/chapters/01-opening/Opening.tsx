import { useMountAnim } from "../../hooks/useMountAnim";
import type { ChapterStepProps } from "../../registry/types";
import "./Opening.css";

export default function Opening({ step }: ChapterStepProps) {
  const mounted = useMountAnim(step);

  return (
    <div className="scene-pad opening-root">
      <div className="step-content" key={step}>
        {step === 0 && (
          <div className={`opening-step-0 cascade ${mounted ? "in" : ""}`}>
            <div className="opening-badge badge-mono" style={{ "--i": 0 } as React.CSSProperties}>
              CNBC Live · 2026年7月1日
            </div>
            <div className="opening-hero-text" style={{ "--i": 1 } as React.CSSProperties}>
              Something has gone
              <br />
              completely wrong.
            </div>
          </div>
        )}
        {step === 1 && (
          <div className={`opening-step-1 cascade ${mounted ? "in" : ""}`}>
            <div className="opening-quote-en display-en" style={{ "--i": 0 } as React.CSSProperties}>
              "Something has gone completely wrong."
            </div>
            <div className="opening-quote-zh" style={{ "--i": 1 } as React.CSSProperties}>
              有些东西已经彻底跑偏了
            </div>
            <div className="opening-rule rule-accent" style={{ "--i": 2 } as React.CSSProperties} />
          </div>
        )}
        {step === 2 && (
          <div className={`opening-step-2 cascade ${mounted ? "in" : ""}`}>
            <div className={`opening-claim-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
              <div className="opening-claim-icon">
                <span className="dot-accent" />
              </div>
              <div className="opening-claim-content">
                <div className="opening-claim-main">
                  企业花几百万买token
                </div>
                <div className="opening-claim-arrow">→</div>
                <div className="opening-claim-bad">
                  零价值 + IP被偷
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={`opening-step-3 cascade ${mounted ? "in" : ""}`}>
            <div className={`opening-dialogue-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
              <div className="opening-host-line">
                <span className="opening-host-name">Becky Quick</span>
                <span className="opening-host-text">"你听起来很愤怒。"</span>
              </div>
              <div className="opening-karp-line">
                <span className="opening-karp-name">Karp</span>
                <span className="opening-karp-text">"这是报道。"</span>
              </div>
            </div>
            <div className={`opening-dialogue-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              <div className="opening-host-line">
                <span className="opening-host-name">Sorkin</span>
                <span className="opening-host-text">"Sounds like shade."</span>
              </div>
              <div className="opening-karp-line">
                <span className="opening-karp-name">Karp</span>
                <span className="opening-karp-text">"No, no. This is reporting."</span>
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className={`opening-step-4 ${mounted ? "in" : ""}`}>
            <div className={`opening-karp-reveal rise-step ${mounted ? "in" : ""}`}>
              <div className="opening-karp-name-big display-en">
                Alex Karp
              </div>
              <div className="opening-karp-title">
                Palantir CEO
              </div>
              <div className="opening-karp-networth badge-mono is-accent">
                身家 $12B+
              </div>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className={`opening-step-5 cascade ${mounted ? "in" : ""}`}>
            <div className="opening-connect-line" style={{ "--i": 0 } as React.CSSProperties}>
              这些话
            </div>
            <div className="opening-connect-arrow" style={{ "--i": 1 } as React.CSSProperties}>
              ↓
            </div>
            <div className="opening-connect-target" style={{ "--i": 2 } as React.CSSProperties}>
              跟你每次打开
              <br />
              <span className="opening-connect-ai">AI对话框</span>
              <br />
              有直接的关系
            </div>
          </div>
        )}
      </div>
      <div className="ambient-orbs opening-orb" />
    </div>
  );
}
