import { useMountAnim } from "../../hooks/useMountAnim";
import type { ChapterStepProps } from "../../registry/types";
import "./KarpArguments.css";

export default function KarpArguments({ step }: ChapterStepProps) {
  const mounted = useMountAnim(step);

  return (
    <div className="scene-pad karp-root">
      <div className="step-content" key={step}>
        {(step === 0 || step === 1) && (
          <div className={`karp-arg-block cascade ${mounted ? "in" : ""}`}>
            <div className="karp-arg-number hero-num" style={{ "--i": 0 } as React.CSSProperties}>①</div>
            <div className="karp-arg-title" style={{ "--i": 1 } as React.CSSProperties}>
              Token计费模式在偷走企业的价值
            </div>
            {step >= 1 && (
              <div className={`karp-arg-quote-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <div className="karp-quote-en display-en">
                  "I'm going to chillax and waste my time with tokens,
                  I'm gonna get no value, and they're gonna get my IP."
                </div>
                <div className="karp-quote-divider rule" />
                <div className="karp-quote-zh">
                  我嗑token浪费时间 → 拿到零价值 → 他们拿走我的IP
                </div>
              </div>
            )}
          </div>
        )}
        {(step === 2 || step === 3 || step === 4) && (
          <div className={`karp-arg-continue cascade ${mounted ? "in" : ""}`}>
            <div className="karp-arg-number hero-num" style={{ "--i": 0 } as React.CSSProperties}>①</div>
            {step >= 2 && (
              <div className="karp-insight-card" style={{ "--i": 1 } as React.CSSProperties}>
                <div className="karp-insight-label badge-mono">不是"贵"的问题</div>
                <div className="karp-insight-main">
                  是<span className="karp-highlight">方向性</span>错误
                </div>
              </div>
            )}
            {step >= 3 && (
              <div className={`karp-logic-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <div className="karp-logic-if">AI能帮企业一天赚 $100M</div>
                <div className="karp-logic-arrow">→</div>
                <div className="karp-logic-then">为什么按token收费而不是分30%？</div>
              </div>
            )}
            {step >= 4 && (
              <div className={`karp-conclusion-badge rise-step ${mounted ? "in" : ""}`} style={{ "--i": 3 } as React.CSSProperties}>
                <div className="badge-mono">Karp的推论</div>
                <div className="karp-conclusion-text">
                  按用量收费 <span className="karp-conclusion-eq">≠</span> 按价值收费
                </div>
              </div>
            )}
          </div>
        )}
        {(step === 5 || step === 6) && (
          <div className={`karp-arg-block cascade ${mounted ? "in" : ""}`}>
            <div className="karp-arg-number hero-num" style={{ "--i": 0 } as React.CSSProperties}>②</div>
            <div className="karp-arg-title" style={{ "--i": 1 } as React.CSSProperties}>
              企业正在被"财富税"抽血
            </div>
            <div className="karp-tax-desc" style={{ "--i": 2 } as React.CSSProperties}>
              从亿万富翁开始 → 最终覆盖所有用户
            </div>
            {step >= 6 && (
              <div className={`karp-tax-compare cascade ${mounted ? "in" : ""}`} style={{ "--i": 3 } as React.CSSProperties}>
                <div className={`karp-tax-item glow-card ${mounted ? "in" : ""}`}>
                  <div className="karp-tax-x">✗ 服务费</div>
                  <div className="karp-tax-reason">自愿购买、可讨价还价</div>
                </div>
                <div className={`karp-tax-item glow-card ${mounted ? "in" : ""}`}>
                  <div className="karp-tax-x">✗ 订阅费</div>
                  <div className="karp-tax-reason">用完即止、随时可退</div>
                </div>
                <div className={`karp-tax-item glow-card ${mounted ? "in" : ""}`} style={{ borderColor: "var(--accent)" }}>
                  <div className="karp-tax-check">✓ 税</div>
                  <div className="karp-tax-reason-accent">必须交 · 无法讨价 · 无法控制用途</div>
                </div>
              </div>
            )}
          </div>
        )}
        {(step === 7 || step === 8) && (
          <div className={`karp-arg-block cascade ${mounted ? "in" : ""}`}>
            <div className="karp-arg-number hero-num" style={{ "--i": 0 } as React.CSSProperties}>③</div>
            <div className="karp-arg-title" style={{ "--i": 1 } as React.CSSProperties}>
              生产资料正在被转移
            </div>
            <div className="karp-means-quote" style={{ "--i": 2 } as React.CSSProperties}>
              "They want to know they own the means of production."
            </div>
            <div className="karp-means-tag badge-mono is-accent" style={{ "--i": 3 } as React.CSSProperties}>
              生产资料 · means of production
            </div>
            {step >= 8 && (
              <div className={`karp-three-pillars cascade ${mounted ? "in" : ""}`} style={{ "--i": 4 } as React.CSSProperties}>
                <div className="karp-pillar">
                  <div className="karp-pillar-q">谁控制模型？</div>
                </div>
                <div className="karp-pillar">
                  <div className="karp-pillar-q">谁掌控参数权重？</div>
                </div>
                <div className="karp-pillar">
                  <div className="karp-pillar-q">谁掌握企业价值？</div>
                </div>
                <div className="karp-pillar-bottom">缺一个都不能算"拥有"</div>
              </div>
            )}
          </div>
        )}
        {step === 9 && (
          <div className={`karp-arg-block cascade ${mounted ? "in" : ""}`}>
            <div className="karp-arg-number hero-num" style={{ "--i": 0 } as React.CSSProperties}>④</div>
            <div className="karp-arg-title" style={{ "--i": 1 } as React.CSSProperties}>
              AI行业重建信任，需要回答四个问题
            </div>
            <div className="karp-four-questions" style={{ "--i": 2 } as React.CSSProperties}>
              <div className={`karp-question-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
                <span className="karp-q-num">01</span><span className="karp-q-text">谁拥有我的数据？</span>
              </div>
              <div className={`karp-question-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
                <span className="karp-q-num">02</span><span className="karp-q-text">数据存储在哪里？</span>
              </div>
              <div className={`karp-question-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <span className="karp-q-num">03</span><span className="karp-q-text">我的提示是否安全？</span>
              </div>
              <div className={`karp-question-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 3 } as React.CSSProperties}>
                <span className="karp-q-num">04</span><span className="karp-q-text">是否传输给第三方？</span>
              </div>
            </div>
            <div className={`karp-question-footer rise-step ${mounted ? "in" : ""}`} style={{ "--i": 4 } as React.CSSProperties}>
              他不是在问AI公司。<span className="karp-highlight">他在问你。</span>
            </div>
          </div>
        )}
        {(step === 10 || step === 11) && (
          <div className={`karp-chain-block cascade ${mounted ? "in" : ""}`}>
            <div className="karp-chain-title" style={{ "--i": 0 } as React.CSSProperties}>四个论点，串起来看</div>
            <div className="karp-chain-flow" style={{ "--i": 1 } as React.CSSProperties}>
              <div className={`karp-chain-node glow-card ${mounted ? "in" : ""}`}>
                <div className="karp-chain-num">①</div><div className="karp-chain-text">计费与价值脱节</div>
              </div>
              <div className="karp-chain-arrow">→</div>
              <div className={`karp-chain-node glow-card ${mounted ? "in" : ""}`}>
                <div className="karp-chain-num">②</div><div className="karp-chain-text">“财富税”批评</div>
              </div>
              <div className="karp-chain-arrow">→</div>
              <div className={`karp-chain-node glow-card ${mounted ? "in" : ""}`}>
                <div className="karp-chain-num">③</div><div className="karp-chain-text">生产资料控制权</div>
              </div>
              <div className="karp-chain-arrow">→</div>
              <div className={`karp-chain-node glow-card ${mounted ? "in" : ""}`}>
                <div className="karp-chain-num">④</div><div className="karp-chain-text">需要回答四问</div>
              </div>
            </div>
            {step >= 11 && (
              <div className={`karp-chain-tease rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                这套逻辑……<span className="karp-highlight">只对企业成立？</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="ambient-orbs karp-orb" />
    </div>
  );
}
