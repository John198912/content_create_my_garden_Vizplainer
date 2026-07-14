import assert from "node:assert/strict";
import { resolveTimelinePosition } from "../src/runtime/CueResolver.ts";
import { MasterClock } from "../src/runtime/MasterClock.ts";
import type { TimelineManifest } from "../src/runtime/types.ts";
import { resolvePlaybackCommand } from "../src/hooks/usePlaybackControls.ts";

const clock = new MasterClock(2_000_000);
assert.equal(clock.seekUs(-10), 0);
assert.equal(clock.seekAudioSeconds(1.25), 1_250_000);
assert.equal(clock.seekFrame(30, 30), 1_000_000);
assert.equal(clock.seekUs(9_000_000), 2_000_000);
assert.equal(resolvePlaybackCommand(" ", "auto", false), "unlock-auto");
assert.equal(resolvePlaybackCommand(" ", "auto", true), "none");
assert.equal(resolvePlaybackCommand(" ", "manual", false), "next");
assert.equal(resolvePlaybackCommand(" ", "audio", false), "next");

const timeline: TimelineManifest = {
  schemaVersion: "2.1",
  compilerVersion: "test",
  meta: {
    id: "test",
    width: 1920,
    height: 1080,
    fps: 30,
    language: "zh-CN",
    timebase: "microseconds",
  },
  durationUs: 2_000_000,
  chapters: [
    {
      id: "chapter",
      title: "Chapter",
      purpose: "Test boundaries",
      startUs: 0,
      endUs: 2_000_000,
      durationUs: 2_000_000,
      scenes: [
        {
          id: "scene",
          role: "hook",
          layout: "full",
          heroFrameBeatId: "beat-b",
          focalElement: "message",
          startUs: 0,
          endUs: 2_000_000,
          durationUs: 2_000_000,
          beats: [
            {
              id: "beat-a",
              message: "A",
              narrationSegmentId: "seg-a",
              narration: "A",
              screenCopy: { primary: "A" },
              claimIds: ["claim-a"],
              startUs: 0,
              endUs: 1_000_000,
              durationUs: 1_000_000,
              cues: [
                {
                  id: "cue-a",
                  phraseId: "phrase-a",
                  target: "message",
                  action: "highlight",
                  serves: "test",
                  atUs: 500_000,
                  durationUs: 100_000,
                },
              ],
            },
            {
              id: "beat-b",
              message: "B",
              narrationSegmentId: "seg-b",
              narration: "B",
              screenCopy: { primary: "B" },
              claimIds: ["claim-a"],
              startUs: 1_000_000,
              endUs: 2_000_000,
              durationUs: 1_000_000,
              cues: [],
            },
          ],
        },
      ],
    },
  ],
};

assert.equal(resolveTimelinePosition(timeline, 0)?.beat.id, "beat-a");
assert.equal(resolveTimelinePosition(timeline, 500_000)?.activeCues[0]?.id, "cue-a");
assert.equal(resolveTimelinePosition(timeline, 1_000_000)?.beat.id, "beat-b");
assert.equal(resolveTimelinePosition(timeline, 2_000_000)?.beat.id, "beat-b");
assert.equal(resolveTimelinePosition(timeline, 2_000_001), null);

console.log("✓ runtime clock/cue/recording-control tests passed (13 assertions)");
