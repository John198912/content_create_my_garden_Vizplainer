import type { ReactNode } from "react";
import { resolveTimelinePosition } from "./CueResolver.ts";
import type { CompiledBeat, CompiledScene, TimelineManifest } from "./types.ts";

interface Props {
  timeline: TimelineManifest;
  currentUs: number;
  renderScene(scene: CompiledScene, beat: CompiledBeat): ReactNode;
}

/**
 * Shared React review host. It has no independent timers or transitions;
 * every state is a pure function of timeline + currentUs.
 */
export function SceneHost({ timeline, currentUs, renderScene }: Props) {
  const position = resolveTimelinePosition(timeline, currentUs);
  if (!position) return null;
  return (
    <div
      className="scene-host"
      data-scene-id={position.scene.id}
      data-beat-id={position.beat.id}
      data-time-us={currentUs}
    >
      {renderScene(position.scene, position.beat)}
    </div>
  );
}
