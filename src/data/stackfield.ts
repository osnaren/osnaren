export type StackCategory = 'frontend' | 'tool' | 'research' | 'product' | 'design' | 'life';

export interface StackItem {
  label: string;
  /** short monochrome glyph rendered in the cell chip */
  glyph: string;
  category: StackCategory;
  /** optional "USED IN" metadata surfaced in the discovery readout */
  usedIn?: string;
}

export const categoryLabel: Record<StackCategory, string> = {
  frontend: 'Frontend',
  tool: 'Tool',
  research: 'Research',
  product: 'Product',
  design: 'Design',
  life: 'Life',
};

/**
 * The buried stack — revealed cell by cell in the footer's Stackfield.
 * Glyphs are deliberately monochrome mono-font codes, not brand logos:
 * they match the lab's label language and cost zero kilobytes.
 */
export const stackItems: StackItem[] = [
  { label: 'React', glyph: '⚛', category: 'frontend', usedIn: 'ShadySide · Portfolio' },
  { label: 'TypeScript', glyph: 'TS', category: 'frontend', usedIn: 'Everything shipped since 2021' },
  { label: 'Next.js', glyph: '▲', category: 'frontend', usedIn: 'TheFlames · Portfolio' },
  { label: 'Tailwind', glyph: '~w', category: 'frontend', usedIn: 'Portfolio' },
  { label: 'Framer Motion', glyph: '◇', category: 'frontend', usedIn: 'This footer' },
  { label: 'GSAP', glyph: '⟿', category: 'frontend' },
  { label: 'Three.js / R3F', glyph: '△', category: 'frontend' },
  { label: 'React Native', glyph: '⚛m', category: 'frontend' },
  { label: 'Performance', glyph: 'ms', category: 'frontend', usedIn: 'Commerce product pages' },
  { label: 'Node.js', glyph: '⬡', category: 'tool' },
  { label: 'Python', glyph: 'Py', category: 'tool', usedIn: 'Research · Soliton services' },
  { label: 'MongoDB', glyph: '⌸', category: 'tool' },
  { label: 'MinIO', glyph: '⛁', category: 'tool' },
  { label: 'GitHub', glyph: '⑂', category: 'tool' },
  { label: 'Vercel', glyph: '▴', category: 'tool' },
  { label: 'Kaggle', glyph: 'K', category: 'research', usedIn: '3 public datasets' },
  { label: 'Research', glyph: '§', category: 'research', usedIn: '3 peer-reviewed papers' },
  { label: 'Datasets', glyph: '⊞', category: 'research', usedIn: '158k images published' },
  { label: 'ShadySide', glyph: '☀', category: 'product', usedIn: 'Live at shadyside.app' },
  { label: 'TheFlames', glyph: 'F', category: 'product', usedIn: 'Live at theflames.app' },
  { label: 'UX', glyph: 'UX', category: 'design' },
  { label: 'Accessibility', glyph: 'A11Y', category: 'design', usedIn: 'Every interface on this site' },
  { label: 'Photography', glyph: '⌾', category: 'life' },
  { label: 'Gardening', glyph: '⚘', category: 'life' },
];

/** Cell layout: items interleaved with empty "signal" cells at fixed slots. */
export const SIGNAL_SLOTS = [4, 11, 18, 25];
export const TOTAL_CELLS = stackItems.length + SIGNAL_SLOTS.length; // 28
