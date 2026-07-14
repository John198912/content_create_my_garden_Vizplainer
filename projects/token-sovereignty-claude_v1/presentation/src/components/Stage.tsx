import { type CSSProperties, type ReactNode, useState } from "react";
import { useStageScale } from "../hooks/useStageScale";

interface Props {
  onAdvance(): void;
  sceneId?: string;
  chapterId?: string;
  children: ReactNode;
}

interface SceneLayer {
  chapterId: string;
  sceneId: string;
  children: ReactNode;
}

/**
 * The 16:9 stage. Click anywhere except interactive children = advance.
 *
 * Layout structure (3 nested elements):
 *   .app-shell    ← full viewport, flex-centers the fitter
 *   .stage-fitter ← sized to ACTUAL VISIBLE px (1920*scale × 1080*scale)
 *                   so the layout system honestly sees what's on screen
 *                   and centers it bulletproof on every viewport / DPR.
 *   .stage-frame  ← raw 1920×1080 box, scaled from top-left into the fitter.
 *
 * Stage deliberately owns no transition timing. V2.1 SceneHost/HyperFrames
 * owns semantic scene transitions; the legacy step surface swaps directly
 * so it can never introduce a blank timer-driven frame.
 */
export function Stage({ onAdvance, sceneId = "scene", chapterId = "chapter", children }: Props) {
  const clean = new URLSearchParams(window.location.search).get("clean") === "1";
  // Clean recording must occupy the complete 16:9 viewport. Preview mode keeps
  // breathing room for progress and playback controls outside the stage.
  const scale = useStageScale(1920, 1080, clean ? 0 : 80, clean ? 0 : 100);
  const [active, setActive] = useState<SceneLayer>(() => ({ chapterId, sceneId, children }));
  const [previous, setPrevious] = useState<SceneLayer | null>(null);

  // Derive the two transition layers synchronously from the scene identity so
  // a newly selected beat can never flash on screen before its hand-off starts.
  if (sceneId !== active.sceneId) {
    setPrevious(active);
    setActive({ chapterId, sceneId, children });
  }

  const fitterStyle: CSSProperties = {
    width: 1920 * scale,
    height: 1080 * scale,
  };
  const frameStyle: CSSProperties = {
    transform: `scale(${scale})`,
  };

  return (
    <div className="app-shell">
      <div className="stage-fitter" style={fitterStyle}>
        <div
          className="stage-frame"
          data-scene-id={active.sceneId}
          style={frameStyle}
          onClick={(e) => {
            const t = e.target as HTMLElement;
            if (t.closest("button, a, input, [data-no-advance]")) return;
            onAdvance();
          }}
        >
          {previous && (
            <div
              key={`out-${previous.sceneId}`}
              className="scene-transition-layer is-outgoing"
              data-transition={previous.chapterId === active.chapterId ? "beat" : "chapter"}
              onAnimationEnd={() => setPrevious(null)}
            >
              {previous.children}
            </div>
          )}
          <div
            key={`in-${active.sceneId}`}
            className={`scene-transition-layer ${previous ? "is-incoming" : "is-active"}`}
            data-transition={previous?.chapterId === active.chapterId ? "beat" : "chapter"}
          >
            {active.children}
          </div>
        </div>
      </div>
    </div>
  );
}
