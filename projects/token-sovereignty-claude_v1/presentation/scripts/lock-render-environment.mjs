#!/usr/bin/env node
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const INPUTS = [
  "video-spec.yaml",
  "claims.json",
  "DESIGN.md",
  "assets.manifest.json",
  "alignment.json",
  "audio-manifest.json",
  "fonts.manifest.json",
  "src/generated/timeline.json",
];

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function version(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().split("\n")[0];
  } catch {
    return "unavailable";
  }
}

const inputs = {};
for (const relative of INPUTS) {
  const path = resolve(ROOT, relative);
  if (existsSync(path)) inputs[relative] = sha256(path);
}

const lock = {
  schemaVersion: "2.1",
  createdAt: new Date().toISOString(),
  runtime: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    hyperframes: version("npx", ["--no-install", "hyperframes", "info"]),
    chrome: version("google-chrome", ["--version"]),
    ffmpeg: version("ffmpeg", ["-version"]),
  },
  inputs,
};

writeFileSync(resolve(ROOT, "render.lock.json"), `${JSON.stringify(lock, null, 2)}\n`, "utf8");
console.log(`✓ render.lock.json written with ${Object.keys(inputs).length} input hashes`);
