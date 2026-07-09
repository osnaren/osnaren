export interface StackItem {
  label: string;
  /** short monochrome glyph rendered in the cell chip */
  glyph: string;
  kind: 'stack' | 'artifact' | 'practice';
}

/**
 * The buried stack — revealed cell by cell in the footer's Stackfield grid.
 * Glyphs are deliberately monochrome mono-font codes, not brand logos:
 * they match the lab's label language and cost zero kilobytes.
 */
export const stackItems: StackItem[] = [
  { label: 'React', glyph: '⚛', kind: 'stack' },
  { label: 'TypeScript', glyph: 'TS', kind: 'stack' },
  { label: 'Next.js', glyph: '▲', kind: 'stack' },
  { label: 'Tailwind', glyph: '~w', kind: 'stack' },
  { label: 'Framer Motion', glyph: '◇', kind: 'stack' },
  { label: 'GSAP', glyph: '⟿', kind: 'stack' },
  { label: 'Three.js / R3F', glyph: '△', kind: 'stack' },
  { label: 'React Native', glyph: '⚛m', kind: 'stack' },
  { label: 'Node.js', glyph: '⬡', kind: 'stack' },
  { label: 'Python', glyph: 'Py', kind: 'stack' },
  { label: 'MongoDB', glyph: '⌸', kind: 'stack' },
  { label: 'MinIO', glyph: '⛁', kind: 'stack' },
  { label: 'GitHub', glyph: '⑂', kind: 'stack' },
  { label: 'Vercel', glyph: '▴', kind: 'stack' },
  { label: 'Kaggle', glyph: 'K', kind: 'stack' },
  { label: 'ShadySide', glyph: '☀', kind: 'artifact' },
  { label: 'TheFlames', glyph: 'F', kind: 'artifact' },
  { label: 'Research', glyph: '§', kind: 'artifact' },
  { label: 'Datasets', glyph: '⊞', kind: 'artifact' },
  { label: 'UX', glyph: 'UX', kind: 'stack' },
  { label: 'Accessibility', glyph: 'A11Y', kind: 'stack' },
  { label: 'Performance', glyph: 'ms', kind: 'stack' },
  { label: 'Photography', glyph: '⌾', kind: 'practice' },
  { label: 'Gardening', glyph: '⚘', kind: 'practice' },
];

/** Cell layout: items interleaved with empty "signal" cells at fixed slots. */
export const SIGNAL_SLOTS = [4, 11, 18, 25];
export const TOTAL_CELLS = stackItems.length + SIGNAL_SLOTS.length; // 28
