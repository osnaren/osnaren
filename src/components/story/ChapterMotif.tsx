import {
  GridMotif,
  MarginMotif,
  PaperMotif,
  BlocksMotif,
  FlowMotif,
  SignalMotif,
  GrowthMotif,
} from '@/illustrations/story/motifs';

import type { StoryChapter } from '@/data/story-chapters';
import type { ComponentType } from 'react';

type MotifProps = { index: string };

const motifComponents: Record<StoryChapter['motif'], ComponentType<MotifProps>> = {
  grid: GridMotif,
  margin: MarginMotif,
  paper: PaperMotif,
  blocks: BlocksMotif,
  flow: FlowMotif,
  signal: SignalMotif,
  growth: GrowthMotif,
};

/**
 * A decorative emblem that gives each chapter a distinct identity while
 * incorporating the chapter number as the hero element. Purely aria-hidden
 * ornamentation — no information depends on it.
 */
export function ChapterMotif({ motif, index }: { motif: StoryChapter['motif']; index: string }) {
  const Motif = motifComponents[motif] ?? GrowthMotif;
  return <Motif index={index} />;
}
