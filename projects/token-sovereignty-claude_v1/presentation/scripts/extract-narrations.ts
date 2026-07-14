/**
 * Emit the TTS worklist from the compiled V2.1 timeline.
 *
 * video-spec.yaml is the editorial source; compile-video-spec.mjs produces
 * src/generated/timeline.json; this script flattens its 47 beats without
 * importing React components or maintaining a second chapter map.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TIMELINE_PATH = resolve(ROOT, "src/generated/timeline.json");
const OUT_PATH = resolve(ROOT, "audio-segments.json");

interface TimelineBeat {
  narration?: unknown;
}

interface TimelineScene {
  beats?: TimelineBeat[];
}

interface TimelineChapter {
  id?: unknown;
  scenes?: TimelineScene[];
}

interface Timeline {
  chapters?: TimelineChapter[];
}

interface Segment {
  chapter: string;
  step: number;
  text: string;
  audio: string;
}

async function main() {
  const print = process.argv.includes("--print");
  const timeline = JSON.parse(await readFile(TIMELINE_PATH, "utf8")) as Timeline;
  const segments: Segment[] = [];
  let silentSteps = 0;

  for (const chapter of timeline.chapters ?? []) {
    if (typeof chapter.id !== "string" || chapter.id.length === 0) {
      throw new Error("compiled timeline contains a chapter without an id");
    }
    const chapterId = chapter.id;
    const beats = (chapter.scenes ?? []).flatMap((scene) => scene.beats ?? []);
    beats.forEach((beat, index) => {
      if (typeof beat.narration !== "string") {
        throw new Error(`${chapterId} beat ${index + 1} has no narration text`);
      }
      const text = beat.narration;
      if (text.trim() === "") {
        silentSteps += 1;
        return;
      }
      const step = index + 1;
      segments.push({
        chapter: chapterId,
        step,
        text,
        audio: `${chapterId}/${step}.mp3`,
      });
    });
  }

  await writeFile(OUT_PATH, `${JSON.stringify(segments, null, 2)}\n`, "utf8");
  console.error(
    `✓ extracted ${segments.length} segments from ${timeline.chapters?.length ?? 0} chapters` +
      (silentSteps > 0 ? ` (skipped ${silentSteps} silent steps)` : ""),
  );
  console.error(`  → ${OUT_PATH}`);
  if (print) console.log(JSON.stringify(segments, null, 2));
}

main().catch((error) => {
  console.error(`✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
