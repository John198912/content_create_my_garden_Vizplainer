import { useEffect } from "react";
import type { PlaybackMode } from "./useAudioPlayer";
import type { StepperState } from "./useStepper";

interface Options {
  mode: PlaybackMode;
  autoStarted: boolean;
  setAutoStarted(started: boolean): void;
  cycleMode(): void;
  stepper: StepperState;
}

export type PlaybackCommand =
  | "cycle-mode"
  | "unlock-auto"
  | "next"
  | "previous"
  | "home"
  | "end"
  | `chapter-${number}`
  | "none";

export function resolvePlaybackCommand(
  key: string,
  mode: PlaybackMode,
  autoStarted: boolean,
): PlaybackCommand {
  if (key === "m" || key === "M") return "cycle-mode";
  if (key === " " && mode === "auto") return autoStarted ? "none" : "unlock-auto";
  if (key === "ArrowRight" || key === " ") return "next";
  if (key === "ArrowLeft" || key === "Backspace") return "previous";
  if (key === "Home") return "home";
  if (key === "End") return "end";
  if (/^[1-9]$/.test(key)) return `chapter-${Number(key) - 1}`;
  return "none";
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

/**
 * Single owner for global keyboard controls.
 * In gated Auto mode, Space only unlocks playback; it never advances.
 */
export function usePlaybackControls({
  mode,
  autoStarted,
  setAutoStarted,
  cycleMode,
  stepper,
}: Options) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const command = resolvePlaybackCommand(event.key, mode, autoStarted);
      if (command === "cycle-mode") {
        event.preventDefault();
        cycleMode();
        return;
      }
      if (command === "unlock-auto") {
        event.preventDefault();
        setAutoStarted(true);
        return;
      }
      if (command === "next") {
        event.preventDefault();
        stepper.next();
      } else if (command === "previous") {
        event.preventDefault();
        stepper.prev();
      } else if (command === "home") {
        event.preventDefault();
        stepper.jumpToChapter(0, 0);
      } else if (command === "end") {
        event.preventDefault();
        stepper.jumpToGlobal(stepper.totalGlobal - 1);
      } else if (command.startsWith("chapter-")) {
        const chapter = Number(command.slice("chapter-".length));
        if (chapter < stepper.totalChapters) {
          event.preventDefault();
          stepper.jumpToChapter(chapter, 0);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, autoStarted, setAutoStarted, cycleMode, stepper]);
}
