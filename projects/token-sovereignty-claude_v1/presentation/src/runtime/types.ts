export type TimeUs = number;

export interface CompiledCue {
  id: string;
  phraseId: string;
  target: string;
  action: string;
  serves: string;
  atUs: TimeUs;
  durationUs?: TimeUs;
}

export interface CompiledBeat {
  id: string;
  message: string;
  narrationSegmentId: string;
  narration: string;
  screenCopy: { primary: string; secondary?: string; labels?: string[] };
  claimIds: string[];
  startUs: TimeUs;
  endUs: TimeUs;
  durationUs: TimeUs;
  cues: CompiledCue[];
}

export interface CompiledScene {
  id: string;
  role: string;
  layout: string;
  heroFrameBeatId: string;
  focalElement: string;
  transitionIn?: string;
  transitionOut?: string;
  startUs: TimeUs;
  endUs: TimeUs;
  durationUs: TimeUs;
  beats: CompiledBeat[];
}

export interface CompiledChapter {
  id: string;
  title: string;
  purpose: string;
  startUs: TimeUs;
  endUs: TimeUs;
  durationUs: TimeUs;
  scenes: CompiledScene[];
}

export interface TimelineManifest {
  schemaVersion: "2.1";
  compilerVersion: string;
  meta: {
    id: string;
    width: number;
    height: number;
    fps: 24 | 30 | 60;
    language: string;
    timebase: "microseconds";
  };
  chapters: CompiledChapter[];
  durationUs: TimeUs;
}
