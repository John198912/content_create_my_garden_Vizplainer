import type { CompiledBeat, CompiledCue, CompiledScene, TimeUs, TimelineManifest } from "./types.ts";

export interface TimelinePosition {
  scene: CompiledScene;
  beat: CompiledBeat;
  activeCues: CompiledCue[];
}

function contains(startUs: TimeUs, endUs: TimeUs, timeUs: TimeUs, isLast: boolean) {
  return timeUs >= startUs && (timeUs < endUs || (isLast && timeUs === endUs));
}

export function resolveTimelinePosition(
  timeline: TimelineManifest,
  timeUs: TimeUs,
): TimelinePosition | null {
  const scenes = timeline.chapters.flatMap((chapter) => chapter.scenes);
  const scene = scenes.find((candidate, index) =>
    contains(candidate.startUs, candidate.endUs, timeUs, index === scenes.length - 1),
  );
  if (!scene) return null;
  const beat = scene.beats.find((candidate, index) =>
    contains(candidate.startUs, candidate.endUs, timeUs, index === scene.beats.length - 1),
  );
  if (!beat) return null;
  const activeCues = beat.cues.filter((cue) => {
    const endUs = cue.atUs + (cue.durationUs ?? 1);
    return timeUs >= cue.atUs && timeUs < endUs;
  });
  return { scene, beat, activeCues };
}
