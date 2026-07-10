export type LabCategory = 'motion' | 'interface' | 'data' | 'systems' | 'visual';
export type LabStatus = 'live' | 'study' | 'prototype' | 'archived' | 'soon';

export interface LabExperiment {
  /** display id, e.g. OSN-LAB-01 */
  id: string;
  /** registry key mapping to the implementation */
  key: string;
  name: string;
  category: LabCategory;
  status: LabStatus;
  /** one-line idea, understandable without interacting */
  premise: string;
  /** interaction hint shown on the card */
  hint: string;
  tech: string;
  interactionModel: string;
  updated: string;
  featured?: boolean;
  /** verified internal/related link, never a fabricated source */
  related?: { label: string; href: string };
  /** honest note when the study is not the production calculation / not live data */
  disclaimer?: string;
  observation: {
    input: string;
    behaviour: string;
    result: string;
    implementation: string;
    reducedMotion: string;
  };
}

export const labExperiments: LabExperiment[] = [
  {
    id: 'OSN-LAB-02',
    key: 'sunpath',
    name: 'Sun Path Study',
    category: 'visual',
    status: 'live',
    featured: true,
    premise: 'Where the sun sits across a day — the visual seed behind ShadySide.',
    hint: 'Scrub time · change season',
    tech: 'SVG + solar geometry',
    interactionModel: 'Slider · preset buttons',
    updated: 'Jul 2026',
    related: { label: 'ShadySide case study', href: '/projects/shadyside' },
    disclaimer: 'Interface study — not the production ShadySide calculation.',
    observation: {
      input: 'Time of day and a season preset.',
      behaviour: 'The sun tracks an arc; the exposed side and ground shadow respond.',
      result: 'A quick read on which side of a route stays cool.',
      implementation: 'Pure SVG driven by a couple of trigonometric functions — no canvas, no dependency.',
      reducedMotion: 'No sweep animation; the diagram updates instantly on input.',
    },
  },
  {
    id: 'OSN-LAB-01',
    key: 'squish',
    name: 'Squish Toggle',
    category: 'motion',
    status: 'live',
    premise: 'A toggle with squash-and-stretch — because state changes deserve material weight.',
    hint: 'Tap the switch · tune the spring',
    tech: 'Framer Motion springs',
    interactionModel: 'Tap / keyboard · sliders',
    updated: 'Jul 2026',
    observation: {
      input: 'Spring stiffness, damping, mass, and squish amount.',
      behaviour: 'The knob overshoots and settles per the spring; the trace plots the same curve.',
      result: 'A switch that feels physical instead of instant.',
      implementation: 'A single Framer Motion spring transition; whileTap drives the squash-and-stretch.',
      reducedMotion: 'The knob snaps between states with no overshoot; the values stay adjustable.',
    },
  },
  {
    id: 'OSN-LAB-03',
    key: 'magnetic',
    name: 'Magnetic Chip',
    category: 'interface',
    status: 'live',
    premise: 'A control that leans toward your pointer within a tunable field.',
    hint: 'Move your pointer near it',
    tech: 'Springs + pointer math',
    interactionModel: 'Pointer (mouse) · sliders',
    updated: 'Jul 2026',
    related: { label: 'Home workbench', href: '/' },
    observation: {
      input: 'Attraction radius, strength, and spring return.',
      behaviour: 'Inside the field the chip follows the pointer; outside it, it springs home.',
      result: 'A magnetic affordance like the home workbench uses, dialled gentler.',
      implementation: 'Pointer delta mapped onto spring motion values — no React re-render per frame.',
      reducedMotion: 'Pointer-follow is disabled; the chip stays put and the field is shown statically.',
    },
  },
  {
    id: 'OSN-LAB-04',
    key: 'route',
    name: 'Route Replay',
    category: 'motion',
    status: 'live',
    premise: 'A marker travelling a route — the case-study choreography as a controllable toy.',
    hint: 'Play · scrub speed',
    tech: 'SVG path + requestAnimationFrame',
    interactionModel: 'Play/pause · speed · reset',
    updated: 'Jul 2026',
    related: { label: 'ShadySide case study', href: '/projects/shadyside' },
    disclaimer: 'Illustrative path — not live travel data.',
    observation: {
      input: 'Play state and playback speed.',
      behaviour: 'A marker advances along the path; the active segment lights up.',
      result: 'Directional storytelling you can pause and inspect.',
      implementation:
        'getPointAtLength on an SVG path, driven by a rAF loop that pauses offscreen and when the tab is hidden.',
      reducedMotion: 'The full route is drawn statically; stepping through segments is manual.',
    },
  },
  {
    id: 'OSN-LAB-05',
    key: 'theme',
    name: 'Theme Transition Study',
    category: 'systems',
    status: 'live',
    premise: 'One token system, two themes — crossfaded on a single contained panel.',
    hint: 'Flip the preview theme',
    tech: 'CSS custom properties',
    interactionModel: 'Toggle (contained)',
    updated: 'Jul 2026',
    observation: {
      input: 'A local, panel-scoped theme toggle.',
      behaviour: 'Only this panel’s tokens crossfade; the page theme is untouched.',
      result: 'Proof that the whole UI rides one variable system.',
      implementation: 'A nested data-theme scope re-binds the CSS variables for its subtree only.',
      reducedMotion: 'The crossfade duration collapses; the colours switch instantly.',
    },
  },
  {
    id: 'OSN-LAB-06',
    key: 'scheduler',
    name: 'Drag Scheduler',
    category: 'systems',
    status: 'study',
    premise: 'A drag-to-schedule grid from the Soliton era — shown here as a static study.',
    hint: 'Visual study · see notes',
    tech: 'Drag-and-drop (original)',
    interactionModel: 'Study · non-interactive here',
    updated: 'Archive',
    related: { label: 'Soliton case study', href: '/projects/soliton-systems' },
    disclaimer: 'Presented as a visual study — a mouse-only drag control is not shipped here.',
    observation: {
      input: 'None on this page.',
      behaviour: 'The schematic shows the drop-target grid with one placed block.',
      result: 'Documents the pattern without shipping an inaccessible control.',
      implementation: 'The production version paired direct-manipulation drag with keyboard parity and undo.',
      reducedMotion: 'Static by design.',
    },
  },
];

export const labCategories: { key: 'all' | LabCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'motion', label: 'Motion' },
  { key: 'interface', label: 'Interface' },
  { key: 'data', label: 'Data' },
  { key: 'systems', label: 'Systems' },
  { key: 'visual', label: 'Visual' },
];

export const statusMeta: Record<LabStatus, { label: string; tone: 'ok' | 'accent' | 'muted' }> = {
  live: { label: 'Live', tone: 'ok' },
  study: { label: 'Study', tone: 'accent' },
  prototype: { label: 'Prototype', tone: 'accent' },
  archived: { label: 'Archived', tone: 'muted' },
  soon: { label: 'Coming soon', tone: 'muted' },
};

/** Categories that actually contain experiments, with live counts. */
export function availableCategories() {
  return labCategories
    .map((category) => ({
      ...category,
      count:
        category.key === 'all'
          ? labExperiments.length
          : labExperiments.filter((experiment) => experiment.category === category.key).length,
    }))
    .filter((category) => category.count > 0);
}
