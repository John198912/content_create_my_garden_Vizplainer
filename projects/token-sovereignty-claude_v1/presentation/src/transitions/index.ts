export const TRANSITION_FAMILIES = {
  primary: ["directional-push", "focus-pull"],
  accent: ["shutter", "squeeze", "iris"],
  ending: ["color-dip", "slow-focus"],
} as const;

export type TransitionName =
  (typeof TRANSITION_FAMILIES)[keyof typeof TRANSITION_FAMILIES][number];

export interface TransitionContract {
  name: TransitionName;
  durationUs: number;
  serves: string;
  /** Scene transitions own exit; outgoing content stays complete at start. */
  ownsExit: true;
}
