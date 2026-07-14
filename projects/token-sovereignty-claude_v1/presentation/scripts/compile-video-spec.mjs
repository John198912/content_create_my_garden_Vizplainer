#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import YAML from "yaml";

export const COMPILER_VERSION = "2.1.0";
const ID_RE = /^[a-z0-9][a-z0-9-]*$/;
const REQUIRED_DESIGN_SECTIONS = [
  "Style Prompt",
  "Colors",
  "Typography",
  "Motion",
  "What NOT to Do",
];

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function sha256File(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function readRequired(path, label, errors) {
  if (!existsSync(path)) {
    errors.push(`${label} missing: ${path}`);
    return "";
  }
  return readFileSync(path, "utf8");
}

function readJson(path, label, errors, fallback = {}) {
  const text = readRequired(path, label, errors);
  if (!text) return fallback;
  try {
    return JSON.parse(text);
  } catch (error) {
    errors.push(`${label} is not valid JSON: ${error.message}`);
    return fallback;
  }
}

function validId(id, label, errors, ids) {
  if (typeof id !== "string" || !ID_RE.test(id)) {
    errors.push(`${label} must match ${ID_RE}`);
    return;
  }
  if (ids.has(id)) errors.push(`duplicate global id: ${id}`);
  ids.add(id);
}

function assertIntegerUs(value, label, errors, min = 0) {
  if (!Number.isInteger(value) || value < min) {
    errors.push(`${label} must be an integer >= ${min} microseconds`);
  }
}

function quantize(timeUs, fps) {
  const frame = Math.round((timeUs * fps) / 1_000_000);
  const quantizedUs = Math.round((frame * 1_000_000) / fps);
  return { frame, quantizedUs, errorUs: quantizedUs - timeUs };
}

function parseArgs(argv) {
  const result = {
    root: process.cwd(),
    spec: "video-spec.yaml",
    out: "src/generated/timeline.json",
    check: false,
    production: false,
  };
  for (const arg of argv) {
    if (arg === "--check") result.check = true;
    else if (arg === "--production") result.production = true;
    else if (arg.startsWith("--root=")) result.root = arg.slice(7);
    else if (arg.startsWith("--spec=")) result.spec = arg.slice(7);
    else if (arg.startsWith("--out=")) result.out = arg.slice(6);
    else throw new Error(`unknown argument: ${arg}`);
  }
  result.root = resolve(result.root);
  return result;
}

function checkHash(path, expected, label, errors) {
  if (!existsSync(path)) {
    errors.push(`${label} file missing: ${path}`);
    return;
  }
  if (expected && sha256File(path) !== expected) {
    errors.push(`${label} sha256 does not match locked manifest`);
  }
}

function validateProductionFiles(
  root,
  assetManifest,
  audioManifest,
  fontManifest,
  requiredSegmentIds,
  requiredChapterIds,
  errors,
) {
  for (const asset of assetManifest.assets ?? []) {
    if (asset.required === false) continue;
    if (!asset.path) errors.push(`asset ${asset.id ?? "<unknown>"} has no path`);
    else checkHash(join(root, asset.path), asset.sha256, `asset ${asset.id}`, errors);
    if (!asset.license) errors.push(`asset ${asset.id ?? "<unknown>"} has no license/source note`);
  }

  if ((fontManifest.fonts ?? []).length === 0) {
    errors.push("production requires at least one project-local font in fonts.manifest.json");
  }
  for (const font of fontManifest.fonts ?? []) {
    checkHash(join(root, font.path ?? ""), font.sha256, `font ${font.id ?? "<unknown>"}`, errors);
  }

  if ((audioManifest.chapters ?? []).length === 0) {
    errors.push("production requires chapter audio masters in audio-manifest.json");
  }
  const audioSegmentIds = new Set((audioManifest.segments ?? []).map((segment) => segment.id));
  const audioChapterIds = new Set((audioManifest.chapters ?? []).map((chapter) => chapter.id));
  for (const segmentId of requiredSegmentIds) {
    if (!audioSegmentIds.has(segmentId)) errors.push(`audio manifest missing narration segment ${segmentId}`);
  }
  for (const chapterId of requiredChapterIds) {
    if (!audioChapterIds.has(chapterId)) errors.push(`audio manifest missing chapter master ${chapterId}`);
  }
  for (const segment of audioManifest.segments ?? []) {
    checkHash(join(root, segment.output ?? ""), segment.sha256, `audio segment ${segment.id}`, errors);
  }
  for (const chapter of audioManifest.chapters ?? []) {
    checkHash(join(root, chapter.master ?? ""), chapter.sha256, `audio master ${chapter.id}`, errors);
  }
}

export function compileProject(options = {}) {
  const root = resolve(options.root ?? process.cwd());
  const specPath = join(root, options.spec ?? "video-spec.yaml");
  const outputPath = join(root, options.out ?? "src/generated/timeline.json");
  const errors = [];
  const warnings = [];
  const sourceTexts = {};

  sourceTexts.spec = readRequired(specPath, "video spec", errors);
  let spec = {};
  try {
    spec = YAML.parse(sourceTexts.spec) ?? {};
  } catch (error) {
    errors.push(`video spec is not valid YAML: ${error.message}`);
  }

  const claimsPath = join(root, "claims.json");
  const designPath = join(root, "DESIGN.md");
  const assetsPath = join(root, "assets.manifest.json");
  const alignmentPath = join(root, "alignment.json");
  const audioPath = join(root, "audio-manifest.json");
  const fontsPath = join(root, "fonts.manifest.json");
  const claims = readJson(claimsPath, "claims", errors, { claims: [], sources: [] });
  const assets = readJson(assetsPath, "asset manifest", errors, { assets: [] });
  const alignment = readJson(alignmentPath, "alignment", errors, { phrases: [] });
  const audio = readJson(audioPath, "audio manifest", errors, { segments: [], chapters: [] });
  const fonts = readJson(fontsPath, "font manifest", errors, { fonts: [] });
  sourceTexts.design = readRequired(designPath, "visual identity", errors);

  if (spec.schemaVersion !== "2.1") errors.push("video spec schemaVersion must be 2.1");
  if (spec.meta?.timebase !== "microseconds") errors.push("meta.timebase must be microseconds");
  if (![24, 30, 60].includes(spec.meta?.fps)) errors.push("meta.fps must be 24, 30, or 60");
  if (!Array.isArray(spec.chapters) || spec.chapters.length === 0) errors.push("at least one chapter is required");

  for (const section of REQUIRED_DESIGN_SECTIONS) {
    const re = new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\s*$`, "mi");
    if (!re.test(sourceTexts.design)) errors.push(`DESIGN.md missing section: ## ${section}`);
  }

  const claimIds = new Set();
  const sourceIds = new Set();
  for (const source of claims.sources ?? []) {
    if (sourceIds.has(source.id)) errors.push(`duplicate source id: ${source.id}`);
    sourceIds.add(source.id);
  }
  for (const claim of claims.claims ?? []) {
    if (!ID_RE.test(claim.id ?? "")) errors.push(`invalid claim id: ${claim.id}`);
    if (claimIds.has(claim.id)) errors.push(`duplicate claim id: ${claim.id}`);
    claimIds.add(claim.id);
    if (["L1", "L2", "L3"].includes(claim.priority) && (claim.sourceIds ?? []).length === 0) {
      errors.push(`claim ${claim.id} requires at least one source`);
    }
    for (const sourceId of claim.sourceIds ?? []) {
      if (!sourceIds.has(sourceId)) errors.push(`claim ${claim.id} references missing source ${sourceId}`);
    }
  }

  const assetIds = new Set((assets.assets ?? []).map((asset) => asset.id));
  const phraseMap = new Map();
  for (const phrase of alignment.phrases ?? []) {
    if (phraseMap.has(phrase.id)) errors.push(`duplicate phrase id: ${phrase.id}`);
    phraseMap.set(phrase.id, phrase);
    assertIntegerUs(phrase.startUs, `phrase ${phrase.id}.startUs`, errors);
    assertIntegerUs(phrase.endUs, `phrase ${phrase.id}.endUs`, errors);
    if ((phrase.confidence ?? 0) < 0.85 && phrase.reviewed !== true) {
      errors.push(`phrase ${phrase.id} confidence < 0.85 and is not manually reviewed`);
    }
  }

  const ids = new Set();
  const outputChapters = [];
  const roundingEvents = [];
  const coveredClaims = new Set();
  const requiredSegmentIds = new Set();
  const requiredChapterIds = new Set();
  let cursorUs = 0;

  for (const chapter of spec.chapters ?? []) {
    validId(chapter.id, "chapter.id", errors, ids);
    requiredChapterIds.add(chapter.id);
    if (!chapter.purpose) errors.push(`chapter ${chapter.id} requires purpose`);
    const outputScenes = [];
    const chapterStartUs = cursorUs;
    const scenes = chapter.scenes ?? [];

    for (let sceneIndex = 0; sceneIndex < scenes.length; sceneIndex += 1) {
      const scene = scenes[sceneIndex];
      validId(scene.id, "scene.id", errors, ids);
      if (!scene.layout) errors.push(`scene ${scene.id} requires layout`);
      if (!scene.focalElement) errors.push(`scene ${scene.id} requires focalElement`);
      if (scenes.length > 1 && !scene.transitionIn) errors.push(`scene ${scene.id} requires transitionIn`);
      if (sceneIndex < scenes.length - 1 && !scene.transitionOut) errors.push(`scene ${scene.id} requires transitionOut`);

      const visualIds = new Set();
      for (const visual of scene.visuals ?? []) {
        validId(visual.id, "visual.id", errors, ids);
        visualIds.add(visual.id);
        if (!visual.serves) errors.push(`visual ${visual.id} requires serves`);
        if ((visual.claimIds ?? []).length === 0) errors.push(`visual ${visual.id} requires claimIds`);
        for (const claimId of visual.claimIds ?? []) {
          if (!claimIds.has(claimId)) errors.push(`visual ${visual.id} references missing claim ${claimId}`);
          coveredClaims.add(claimId);
        }
        for (const assetId of visual.assetIds ?? []) {
          if (!assetIds.has(assetId)) errors.push(`visual ${visual.id} references missing asset ${assetId}`);
        }
      }

      const sceneStartUs = cursorUs;
      const outputBeats = [];
      const beatIds = new Set((scene.beats ?? []).map((beat) => beat.id));
      if (!beatIds.has(scene.heroFrameBeatId)) errors.push(`scene ${scene.id} heroFrameBeatId is not one of its beats`);

      for (const beat of scene.beats ?? []) {
        validId(beat.id, "beat.id", errors, ids);
        assertIntegerUs(beat.durationUs, `beat ${beat.id}.durationUs`, errors, 500000);
        if (!beat.narrationSegmentId) errors.push(`beat ${beat.id} requires narrationSegmentId`);
        else requiredSegmentIds.add(beat.narrationSegmentId);
        if (!beat.narration) errors.push(`beat ${beat.id} requires narration text for legacy/audio generation`);
        if (!beat.screenCopy?.primary) errors.push(`beat ${beat.id} requires screenCopy.primary`);
        if (/\r|\n/.test(beat.screenCopy?.primary ?? "")) errors.push(`beat ${beat.id} screenCopy.primary must wrap naturally; remove forced line breaks`);
        for (const claimId of beat.claimIds ?? []) {
          if (!claimIds.has(claimId)) errors.push(`beat ${beat.id} references missing claim ${claimId}`);
          coveredClaims.add(claimId);
        }

        const beatStartUs = cursorUs;
        const beatEndUs = beatStartUs + (Number.isInteger(beat.durationUs) ? beat.durationUs : 0);
        const outputCues = [];
        for (const cue of beat.cues ?? []) {
          validId(cue.id, "cue.id", errors, ids);
          if (!cue.serves) errors.push(`cue ${cue.id} requires serves`);
          const phrase = phraseMap.get(cue.phraseId);
          if (!phrase) {
            errors.push(`cue ${cue.id} references missing phrase ${cue.phraseId}`);
            continue;
          }
          if (!visualIds.has(cue.target) && cue.target !== scene.focalElement) {
            warnings.push(`cue ${cue.id} target ${cue.target} is an internal scene target; keep it stable in SceneRenderer`);
          }
          const atUs = phrase.startUs + (cue.leadUs ?? 0);
          if (atUs < beatStartUs - 200000 || atUs > beatEndUs + 200000) {
            errors.push(`cue ${cue.id} resolves outside beat ${beat.id} by more than 200ms`);
          }
          outputCues.push({ ...cue, atUs, phraseText: phrase.text });
          roundingEvents.push({ type: "cue", id: cue.id, timeUs: atUs, ...quantize(atUs, spec.meta?.fps ?? 30) });
        }

        outputBeats.push({
          ...beat,
          startUs: beatStartUs,
          endUs: beatEndUs,
          cues: outputCues,
        });
        roundingEvents.push({ type: "beat", id: beat.id, timeUs: beatStartUs, ...quantize(beatStartUs, spec.meta?.fps ?? 30) });
        cursorUs = beatEndUs;
      }

      outputScenes.push({
        ...scene,
        startUs: sceneStartUs,
        endUs: cursorUs,
        durationUs: cursorUs - sceneStartUs,
        beats: outputBeats,
      });
      roundingEvents.push({ type: "scene", id: scene.id, timeUs: sceneStartUs, ...quantize(sceneStartUs, spec.meta?.fps ?? 30) });
    }

    outputChapters.push({
      id: chapter.id,
      title: chapter.title,
      purpose: chapter.purpose,
      startUs: chapterStartUs,
      endUs: cursorUs,
      durationUs: cursorUs - chapterStartUs,
      scenes: outputScenes,
    });
  }

  for (const claim of claims.claims ?? []) {
    if (["L1", "L2"].includes(claim.priority) && !coveredClaims.has(claim.id)) {
      errors.push(`high-priority claim ${claim.id} has no visual/beat coverage`);
    }
  }

  if (options.production === true || spec.meta?.mode === "production") {
    validateProductionFiles(
      root,
      assets,
      audio,
      fonts,
      requiredSegmentIds,
      requiredChapterIds,
      errors,
    );
  } else {
    if ((fonts.fonts ?? []).length === 0) warnings.push("draft uses system font fallback; production requires local font files and hashes");
    if ((audio.chapters ?? []).length === 0) warnings.push("draft has no chapter audio master; production check will fail until audio is locked");
  }

  const sourceFiles = {
    "video-spec.yaml": specPath,
    "claims.json": claimsPath,
    "DESIGN.md": designPath,
    "assets.manifest.json": assetsPath,
    "alignment.json": alignmentPath,
    "audio-manifest.json": audioPath,
    "fonts.manifest.json": fontsPath,
  };
  const sourceHashes = {};
  for (const [name, path] of Object.entries(sourceFiles)) {
    if (existsSync(path)) sourceHashes[name] = sha256File(path);
  }

  const timeline = {
    schemaVersion: "2.1",
    compilerVersion: COMPILER_VERSION,
    sourceHashes,
    meta: spec.meta ?? {},
    chapters: outputChapters,
    durationUs: cursorUs,
    rounding: { fps: spec.meta?.fps ?? 30, events: roundingEvents },
  };

  if (errors.length === 0 && options.check !== true) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(timeline, null, 2)}\n`, "utf8");
    const legacyPath = join(root, "src/generated/legacy-narrations.ts");
    const legacy = outputChapters.map((chapter) => ({
      id: chapter.id,
      narrations: chapter.scenes.flatMap((scene) => scene.beats.map((beat) => beat.narration)),
    }));
    mkdirSync(dirname(legacyPath), { recursive: true });
    writeFileSync(legacyPath, `// Generated by compile-video-spec.mjs. Do not edit.\nexport const LEGACY_NARRATIONS = ${JSON.stringify(legacy, null, 2)} as const;\n`, "utf8");
  }

  return { timeline, errors, warnings, outputPath, fingerprint: sha256Text(JSON.stringify(timeline)) };
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exitCode = 2;
    return;
  }
  const result = compileProject(args);
  for (const warning of result.warnings) console.warn(`⚠ ${warning}`);
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`✗ ${error}`);
    console.error(`\n${result.errors.length} production contract error(s)`);
    process.exitCode = 1;
    return;
  }
  const verb = args.check ? "validated" : `compiled to ${result.outputPath}`;
  console.log(`✓ V2.1 spec ${verb}`);
  console.log(`  duration ${(result.timeline.durationUs / 1_000_000).toFixed(2)}s · fingerprint ${result.fingerprint.slice(0, 12)}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
