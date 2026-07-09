export type ModuleVisual = 'route' | 'flames' | 'commerce' | 'lab' | 'story' | 'resume';

export interface BenchModule {
  id: string;
  key: number;
  name: string;
  status: string;
  statusTone: 'ok' | 'accent' | 'muted';
  copy: string;
  href: string;
  visual: ModuleVisual;
  /** grid span on desktop */
  wide?: boolean;
  /** dark inverted card */
  inverted?: boolean;
  /** resting rotation in degrees, straightens on hover */
  tilt: number;
}

export const benchModules: BenchModule[] = [
  {
    id: 'OSN-001',
    key: 1,
    name: 'ShadySide',
    status: '● Shipped · Live',
    statusTone: 'ok',
    copy: 'Find the cooler side before boarding.',
    href: '/projects/shadyside',
    visual: 'route',
    wide: true,
    tilt: -0.6,
  },
  {
    id: 'OSN-002',
    key: 2,
    name: 'TheFlames',
    status: '● Live · Experiment',
    statusTone: 'ok',
    copy: 'Old school FLAMES, finally shipped.',
    href: '/projects/theflames',
    visual: 'flames',
    tilt: 0.8,
  },
  {
    // ids match the artifact index (OSN-009 = Commerce Frontend Systems)
    id: 'OSN-009',
    key: 3,
    name: 'Work',
    status: 'Experience',
    statusTone: 'muted',
    copy: 'Frontend systems for real customer journeys.',
    href: '/projects/commerce-frontend',
    visual: 'commerce',
    tilt: -0.7,
  },
  {
    id: 'OSN-011',
    key: 4,
    name: 'Lab',
    status: 'Experiments',
    statusTone: 'accent',
    copy: 'Interaction studies and product prototypes.',
    href: '/lab',
    visual: 'lab',
    tilt: 0.5,
  },
  {
    // 012/013 are reserved for site modules — the artifact index tops out at 011
    id: 'OSN-012',
    key: 5,
    name: 'Story',
    status: 'Field Notes',
    statusTone: 'accent',
    copy: 'Milestones, curated.',
    href: '/story',
    visual: 'story',
    tilt: -0.4,
  },
  {
    id: 'OSN-013',
    key: 6,
    name: 'Resume',
    status: 'Spec Sheet',
    statusTone: 'muted',
    copy: 'The recruiter fast path.',
    href: '/resume',
    visual: 'resume',
    inverted: true,
    tilt: 0.6,
  },
];
