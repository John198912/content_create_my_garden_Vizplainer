export interface CaptionGroup {
  id: string;
  text: string;
  startUs: number;
  endUs: number;
  emphasis?: string[];
}

interface Props {
  groups: CaptionGroup[];
  currentUs: number;
}

/** Exactly one phrase group is visible; endUs is an explicit hard kill. */
export function CaptionTrack({ groups, currentUs }: Props) {
  const group = groups.find((candidate) =>
    currentUs >= candidate.startUs && currentUs < candidate.endUs,
  );
  if (!group) return null;
  return (
    <div className="caption-safe-area" data-caption-id={group.id} aria-live="off">
      <div className="caption-group">{group.text}</div>
    </div>
  );
}
