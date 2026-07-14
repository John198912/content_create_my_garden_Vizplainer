import { useMountAnim } from "../../hooks/useMountAnim";
import type { ChapterStepProps } from "../../registry/types";
import "./GlobalSovereignty.css";

export default function GlobalSovereignty({ step }: ChapterStepProps) {
  const mounted = useMountAnim(step);

  return (
    <div className="scene-pad gs-root">
      <div className="step-content" key={step}>
        {step === 0 && (
          <div className={`gs-section cascade ${mounted ? "in" : ""}`}>
            <div className="gs-title" style={{ "--i": 0 } as React.CSSProperties}>
              国家、机构与企业都在重建<span className="gs-highlight">AI控制边界</span>
            </div>
            <div className="gs-three-signals" style={{ "--i": 1 } as React.CSSProperties}>
              <div className={`gs-signal-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
                <div className="gs-signal-region badge-mono is-accent">美国</div>
                <div className="gs-signal-quote">Karp主张企业掌控模型、权重<br />与“生产资料”</div>
                <div className="gs-signal-source mono">— Alex Karp · CNBC</div>
              </div>
              <div className={`gs-signal-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
                <div className="gs-signal-region badge-mono is-accent">中国</div>
                <div className="gs-signal-quote">面向公众的生成式AI服务<br />受安全评估、算法备案等规则约束</div>
                <div className="gs-signal-source mono">— 《生成式人工智能服务管理暂行办法》</div>
              </div>
              <div className={`gs-signal-card glow-card ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <div className="gs-signal-region badge-mono is-accent">欧洲</div>
                <div className="gs-signal-quote">瑞士方面多年未推进Palantir<br />军方报告建议考虑替代方案</div>
                <div className="gs-signal-source mono">— Republik · 瑞士军方20页报告</div>
              </div>
            </div>
            <div className={`gs-three-conclusion rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
              不同主体 · 同一主题：控制权
            </div>
          </div>
        )}
        {step === 1 && (
          <div className={`gs-section cascade ${mounted ? "in" : ""}`}>
            <div className="gs-zoom-out" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="gs-zoom-label badge-mono">在这场博弈里</div>
              <div className="gs-zoom-question">个人的议价能力最弱</div>
            </div>
            <div className={`gs-bottom-card glow-card rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              <div className="gs-bottom-items">
                <div className="gs-bottom-item"><span className="gs-x-mark">•</span> 信息更少</div>
                <div className="gs-bottom-item"><span className="gs-x-mark">•</span> 迁移成本更高</div>
                <div className="gs-bottom-item"><span className="gs-x-mark">•</span> 很少参与规则制定</div>
              </div>
              <div className="gs-bottom-line rule" />
              <div className="gs-bottom-footer">因此更需要保留<span className="gs-highlight">可迁移资产</span></div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={`gs-section cascade ${mounted ? "in" : ""}`}>
            <div className="gs-perspective" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="gs-karp-view">
                <div className="gs-view-label badge-mono">Karp的视角</div>
                <div className="gs-view-text">资本和企业</div>
              </div>
              <div className="gs-view-vs">vs</div>
              <div className="gs-our-view">
                <div className="gs-view-label badge-mono is-accent">我们的立场</div>
                <div className="gs-view-text-accent">每一个具体的人</div>
              </div>
            </div>
            <div className={`gs-rent-line rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              尤其是那些<br /><span className="gs-highlight">还不知道自己正在"交房租"</span>的人
            </div>
          </div>
        )}
      </div>
      <div className="ambient-orbs gs-orb" />
    </div>
  );
}
