import type { FieldNote } from '@/data/story';

/**
 * Chapters are a Story-specific *presentation* layer over the verified field
 * notes in `story.ts`. No dates, titles, captions, or lessons are changed here
 * — this only groups existing notes into the phases the chronicle reads through.
 */
export type StoryChapterKey = 'origins' | 'college' | 'research' | 'soliton' | 'commerce' | 'lab' | 'ongoing';

export interface StoryChapter {
  key: StoryChapterKey;
  /** 01–07, shown in the rail and behind chapter headers */
  index: string;
  label: string;
  /** verified year range derived from the notes it contains */
  years: string;
  /** one grounded line, no motivational filler */
  blurb: string;
  /** visual motif key, kept inside the existing token system */
  motif: 'grid' | 'margin' | 'paper' | 'blocks' | 'flow' | 'signal' | 'growth';
}

export const storyChapters: StoryChapter[] = [
  {
    key: 'origins',
    index: '01',
    label: 'Origins',
    years: '2015 – 2018',
    blurb: 'School in Salem — language study, environmental work, and early community leadership.',
    motif: 'grid',
  },
  {
    key: 'college',
    index: '02',
    label: 'College',
    years: '2018 – 2022',
    blurb: 'Computer Science at Kongu — coursework, research, peer mentorship, and student coordination.',
    motif: 'margin',
  },
  {
    key: 'research',
    index: '03',
    label: 'Research',
    years: '2021 – 2023',
    blurb: 'Medical-imaging and wildfire models — and the public datasets underneath them.',
    motif: 'paper',
  },
  {
    key: 'soliton',
    index: '04',
    label: 'Soliton',
    years: '2021 – 2023',
    blurb: 'First production work: frontend UX, tooling, and services people had to live in.',
    motif: 'blocks',
  },
  {
    key: 'commerce',
    index: '05',
    label: 'Commerce',
    years: '2023 →',
    blurb: 'Ecommerce frontend at scale — React product experiences, accessibility, and experiments.',
    motif: 'flow',
  },
  {
    key: 'lab',
    index: '06',
    label: 'Product Lab',
    years: '2025 →',
    blurb: 'Shipping small, useful products end to end — and rebuilding this site as the workbench.',
    motif: 'signal',
  },
  {
    key: 'ongoing',
    index: '07',
    label: 'Ongoing',
    years: 'No end date',
    blurb: 'Practices with no ship date, kept because they change how I look at everything else.',
    motif: 'growth',
  },
];

/** Map each verified field-note ID to the chapter it belongs to. */
export const noteChapter: Record<string, StoryChapterKey> = {
  'FN-HIN': 'origins',
  'FN-001': 'origins',
  'FN-ROT': 'origins',
  'FN-002': 'college',
  'FN-CLS': 'college',
  'FN-PLC': 'college',
  'FN-ALT': 'college',
  'FN-006': 'college',
  'FN-003': 'research',
  'FN-005': 'research',
  'FN-007': 'research',
  'FN-009': 'research',
  'FN-008': 'research',
  'FN-004': 'soliton',
  'FN-010': 'commerce',
  'FN-013': 'commerce',
  'FN-011': 'lab',
  'FN-012': 'lab',
  'FN-014': 'lab',
};

/**
 * Real, public-safe media for a note. Only ShadySide has a designed premise
 * illustration in the repo; everything else uses schematic artifacts so no fake
 * photographs, certificates, or workplace screenshots are ever fabricated.
 */
export interface NoteMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const noteMedia: Record<string, NoteMedia> = {
  'FN-012': {
    src: '/images/shadyside-premise.webp',
    alt: 'ShadySide premise illustration: a curved route line from start to destination, a dashed sun arc overhead, and a green band marking the shaded side of the route.',
    width: 1376,
    height: 768,
  },
};

export const chapterOf = (note: FieldNote): StoryChapterKey => noteChapter[note.id] ?? 'lab';
