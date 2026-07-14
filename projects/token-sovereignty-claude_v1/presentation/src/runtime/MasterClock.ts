import type { TimeUs } from "./types.ts";

export type ClockSource = "manual" | "audio" | "frame";
export type ClockListener = (timeUs: TimeUs, source: ClockSource) => void;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Deterministic exchange clock. The internal unit is always integer µs.
 * Wall-clock playback is intentionally outside this class.
 */
export class MasterClock {
  readonly durationUs: TimeUs;
  private currentUs: TimeUs = 0;
  private listeners = new Set<ClockListener>();

  constructor(durationUs: TimeUs) {
    if (!Number.isInteger(durationUs) || durationUs <= 0) {
      throw new Error("MasterClock durationUs must be a positive integer");
    }
    this.durationUs = durationUs;
  }

  get timeUs(): TimeUs {
    return this.currentUs;
  }

  seekUs(timeUs: TimeUs, source: ClockSource = "manual"): TimeUs {
    if (!Number.isFinite(timeUs)) throw new Error("seek time must be finite");
    this.currentUs = Math.round(clamp(timeUs, 0, this.durationUs));
    for (const listener of this.listeners) listener(this.currentUs, source);
    return this.currentUs;
  }

  seekAudioSeconds(seconds: number): TimeUs {
    return this.seekUs(seconds * 1_000_000, "audio");
  }

  seekFrame(frame: number, fps: 24 | 30 | 60): TimeUs {
    if (!Number.isInteger(frame) || frame < 0) throw new Error("frame must be a non-negative integer");
    return this.seekUs(Math.round((frame * 1_000_000) / fps), "frame");
  }

  subscribe(listener: ClockListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
