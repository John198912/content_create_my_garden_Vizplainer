import { useMountAnim } from "../../hooks/useMountAnim";
import type { ChapterStepProps } from "../../registry/types";
import "./EnterpriseToIndividual.css";

export default function EnterpriseToIndividual({ step }: ChapterStepProps) {
  const mounted = useMountAnim(step);

  return (
    <div className="scene-pad e2i-root">
      <div className="step-content" key={step}>
        {(step === 0 || step === 1) && (
          <div className={`e2i-section cascade ${mounted ? "in" : ""}`}>
            <div className="e2i-map-badge" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="e2i-from badge-mono">企业论点 ① Token偷走价值</div>
              <div className="e2i-map-arrow">→</div>
              <div className="e2i-to badge-mono is-accent">你的版本</div>
            </div>
            <div className="e2i-ai-icons" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="e2i-ai-icon">ChatGPT月费</span>
              <span className="e2i-ai-icon">Claude订阅</span>
              <span className="e2i-ai-icon">API调用次数</span>
            </div>
            {step >= 1 && (
              <div className={`e2i-question-card glow-card rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <div className="e2i-question-label badge-mono">追问</div>
                <div className="e2i-question-main">
                  每次AI帮你之后<br />你手里<span className="e2i-highlight">多了什么</span>？
                </div>
                <div className="e2i-answer-split">
                  <div className="e2i-answer-got"><span className="e2i-check-mark">+</span> 一个结果</div>
                  <div className="e2i-answer-lost"><span className="e2i-x-mark">−</span> 一堆token额度</div>
                </div>
                <div className="e2i-question-sub">下次不用这个AI的时候——<span className="e2i-highlight">还在吗？</span></div>
              </div>
            )}
          </div>
        )}
        {(step === 2 || step === 3) && (
          <div className={`e2i-section cascade ${mounted ? "in" : ""}`}>
            <div className="e2i-map-badge" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="e2i-from badge-mono">企业论点 ② 财富税</div>
              <div className="e2i-map-arrow">→</div>
              <div className="e2i-to badge-mono is-accent">你的版本</div>
            </div>
            <div className="e2i-flow-diagram" style={{ "--i": 1 } as React.CSSProperties}>
              <div className={`e2i-flow-node glow-card ${mounted ? "in" : ""}`}>
                <div className="e2i-flow-label">你付出</div>
                <div className="e2i-flow-items">
                  <span>💰 付费</span>
                  <span>🧠 需求+逻辑</span>
                  <span>🎯 判断偏好</span>
                </div>
              </div>
              <div className="e2i-flow-arrow-big">→</div>
              <div className={`e2i-flow-node glow-card ${mounted ? "in" : ""}`}>
                <div className="e2i-flow-label">平台处理</div>
                <div className="e2i-flow-desc">保存或分析交互<br />取决于产品与设置</div>
              </div>
              <div className="e2i-flow-arrow-big">→</div>
              <div className={`e2i-flow-node glow-card ${mounted ? "in" : ""}`}>
                <div className="e2i-flow-label">可能用途</div>
                <div className="e2i-flow-desc">服务改进或训练<br />取决于授权条款</div>
              </div>
            </div>
            {step >= 3 && (
              <div className={`e2i-who-wins ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <div className="e2i-win-card">
                  <div className="e2i-win-header">你得到的</div>
                  <div className="e2i-win-item">一次服务</div>
                </div>
                <div className="e2i-win-vs">vs</div>
                <div className="e2i-win-card" style={{ borderColor: "var(--accent)" }}>
                  <div className="e2i-win-header-accent">平台可能获得</div>
                  <div className="e2i-win-items">
                    <div>订阅收入</div><div>使用信号</div><div>经授权的改进数据</div>
                  </div>
                </div>
                <div className="e2i-win-question">一次服务之外，<span className="e2i-highlight">你留下了什么资产？</span></div>
              </div>
            )}
          </div>
        )}
        {(step === 4 || step === 5) && (
          <div className={`e2i-section cascade ${mounted ? "in" : ""}`}>
            <div className="e2i-map-badge" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="e2i-from badge-mono">企业论点 ③ 生产资料</div>
              <div className="e2i-map-arrow">→</div>
              <div className="e2i-to badge-mono is-accent">你的版本</div>
            </div>
            <div className="e2i-assets-grid" style={{ "--i": 1 } as React.CSSProperties}>
              <div className="e2i-asset-item"><div className="e2i-asset-label">问题拆解方式</div></div>
              <div className="e2i-asset-item"><div className="e2i-asset-label">审美判断</div></div>
              <div className="e2i-asset-item"><div className="e2i-asset-label">Prompt模板</div></div>
              <div className="e2i-asset-item"><div className="e2i-asset-label">"好内容"的定义</div></div>
            </div>
            <div className="e2i-assets-tag badge-mono is-accent" style={{ "--i": 2 } as React.CSSProperties}>这些才是你的"生产资料"——不是GPU</div>
            {step >= 5 && (
              <div className={`e2i-where-question rise-step ${mounted ? "in" : ""}`} style={{ "--i": 3 } as React.CSSProperties}>
                <div className="e2i-where-left">在自己的笔记里？</div>
                <div className="e2i-where-or">OR</div>
                <div className="e2i-where-right">
                  散落在几百次AI对话记录里
                  <div className="e2i-where-sub">——那些记录你甚至没有导出过</div>
                </div>
              </div>
            )}
          </div>
        )}
        {(step === 6 || step === 7) && (
          <div className={`e2i-section cascade ${mounted ? "in" : ""}`}>
            <div className="e2i-map-badge" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="e2i-from badge-mono">企业论点 ④ 四个问题</div>
              <div className="e2i-map-arrow">→</div>
              <div className="e2i-to badge-mono is-accent">直接问你</div>
            </div>
            <div className="e2i-four-ask" style={{ "--i": 1 } as React.CSSProperties}>
              <div className={`e2i-ask-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
                <span className="e2i-ask-q">数据归谁？</span><span className="e2i-ask-x">需查条款</span>
              </div>
              <div className={`e2i-ask-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
                <span className="e2i-ask-q">服务器存了什么？</span><span className="e2i-ask-x">需查设置</span>
              </div>
              <div className={`e2i-ask-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                <span className="e2i-ask-q">Prompt被拿去训练了吗？</span><span className="e2i-ask-x">因产品而异</span>
              </div>
              <div className={`e2i-ask-item rise-step ${mounted ? "in" : ""}`} style={{ "--i": 3 } as React.CSSProperties}>
                <span className="e2i-ask-q">内容传输给第三方？</span><span className="e2i-ask-x">需核对边界</span>
              </div>
            </div>
            {step >= 7 && (
              <div className={`e2i-cant-answer rise-step ${mounted ? "in" : ""}`} style={{ "--i": 2 } as React.CSSProperties}>
                如果无法回答，说明<span className="e2i-highlight">控制边界并不透明</span>
              </div>
            )}
          </div>
        )}
        {step === 8 && (
          <div className={`e2i-section cascade ${mounted ? "in" : ""}`}>
            <div className="e2i-mirror" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="e2i-mirror-left">
                <div className="e2i-mirror-label badge-mono">企业</div>
                <div className="e2i-mirror-main">可控生产资料</div>
                <div className="e2i-mirror-arrow">→</div>
                <div className="e2i-mirror-result">竞争</div>
              </div>
              <div className="e2i-mirror-center"><div className="e2i-mirror-same">同一张<br />处方</div></div>
              <div className="e2i-mirror-right">
                <div className="e2i-mirror-label badge-mono is-accent">你</div>
                <div className="e2i-mirror-main">可控能力资产</div>
                <div className="e2i-mirror-arrow">→</div>
                <div className="e2i-mirror-result">降低替代风险</div>
              </div>
            </div>
            <div className={`e2i-closing-line rise-step ${mounted ? "in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
              Karp给CEO看病，我们拿同一张处方，给自己<span className="e2i-highlight">号个脉</span>
            </div>
          </div>
        )}
      </div>
      <div className="ambient-orbs e2i-orb" />
    </div>
  );
}
