import type { ChapterDef } from "./types";
import Opening from "../chapters/01-opening/Opening";
import KarpArguments from "../chapters/02-karp-arguments/KarpArguments";
import EnterpriseToIndividual from "../chapters/03-enterprise-to-individual/EnterpriseToIndividual";
import RootCause from "../chapters/04-root-cause/RootCause";
import GlobalSovereignty from "../chapters/05-global-sovereignty/GlobalSovereignty";
import ThreePrinciples from "../chapters/06-three-principles/ThreePrinciples";
import Ending from "../chapters/07-ending/Ending";
import { LEGACY_NARRATIONS } from "../generated/legacy-narrations";

const narrationsByChapter: Map<string, string[]> = new Map(
  LEGACY_NARRATIONS.map((chapter) => [chapter.id, Array.from(chapter.narrations)]),
);

function narrationsFor(chapterId: string): string[] {
  const narrations = narrationsByChapter.get(chapterId);
  if (!narrations) throw new Error(`Compiled timeline is missing chapter: ${chapterId}`);
  return narrations;
}

/**
 * Token Sovereignty — 你每次用ChatGPT，都在交一笔看不见的税
 *
 * V2.1 legacy path: ChapterDef + narrations + Component.
 * Visual styling through bold-signal-v2 theme tokens only.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "opening",
    title: "开场：Karp在CNBC说了什么",
    sceneIds: narrationsFor("opening").map((_, i) => `opening-${i}`),
    narrations: narrationsFor("opening"),
    Component: Opening,
  },
  {
    id: "karp-arguments",
    title: "Karp的四个核心论点",
    sceneIds: narrationsFor("karp-arguments").map((_, i) => `karp-arg-${i}`),
    narrations: narrationsFor("karp-arguments"),
    Component: KarpArguments,
  },
  {
    id: "enterprise-to-individual",
    title: "从企业到个人：共同主题是控制权",
    sceneIds: narrationsFor("enterprise-to-individual").map((_, i) => `e2i-${i}`),
    narrations: narrationsFor("enterprise-to-individual"),
    Component: EnterpriseToIndividual,
  },
  {
    id: "root-cause",
    title: "底层机制：规模化吸收与重组的治理风险",
    sceneIds: narrationsFor("root-cause").map((_, i) => `rc-${i}`),
    narrations: narrationsFor("root-cause"),
    Component: RootCause,
  },
  {
    id: "global-sovereignty",
    title: "AI控制边界与个人的处境",
    sceneIds: narrationsFor("global-sovereignty").map((_, i) => `gs-${i}`),
    narrations: narrationsFor("global-sovereignty"),
    Component: GlobalSovereignty,
  },
  {
    id: "three-principles",
    title: "三件你可以今天开始做的事",
    sceneIds: narrationsFor("three-principles").map((_, i) => `tp-${i}`),
    narrations: narrationsFor("three-principles"),
    Component: ThreePrinciples,
  },
  {
    id: "ending",
    title: "结尾：The Jig Is Up",
    sceneIds: narrationsFor("ending").map((_, i) => `end-${i}`),
    narrations: narrationsFor("ending"),
    Component: Ending,
  },
];
