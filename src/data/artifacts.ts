export type ArtifactType = 'product' | 'research' | 'dataset' | 'publication' | 'work' | 'experiment';

export type ArtifactVisual = 'route' | 'flames' | 'fire' | 'retina' | 'cancer' | 'commerce' | 'toolchain' | 'lab';

export interface ArtifactLink {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}

export interface Artifact {
  id: string;
  slug: string;
  name: string;
  type: ArtifactType;
  /** short type label rendered in the row */
  typeLabel: string;
  status: string;
  statusTone: 'ok' | 'accent' | 'amber' | 'muted';
  year: string;
  /** the one-line problem this artifact addresses */
  problem: string;
  summary: string;
  tags: string[];
  links: ArtifactLink[];
  visual: ArtifactVisual;
  /** internal route to a full case study, if one exists */
  caseStudy?: string;
  /** searchable extras that don't render */
  keywords?: string[];
}

export const artifactFilters = [
  { key: 'all', label: 'All' },
  { key: 'product', label: 'Products' },
  { key: 'research', label: 'Research' },
  { key: 'dataset', label: 'Datasets' },
  { key: 'publication', label: 'Publications' },
  { key: 'work', label: 'Work' },
  { key: 'experiment', label: 'Experiments' },
] as const;

export type ArtifactFilterKey = (typeof artifactFilters)[number]['key'];

/**
 * "research" is a virtual bucket: publications and datasets both belong to it,
 * so a recruiter can see the whole academic trail with one chip.
 */
export function matchesFilter(artifact: Artifact, filter: ArtifactFilterKey): boolean {
  if (filter === 'all') return true;
  if (filter === 'research') return artifact.type === 'publication' || artifact.type === 'dataset';
  return artifact.type === filter;
}

export const artifacts: Artifact[] = [
  {
    id: 'OSN-001',
    slug: 'shadyside',
    name: 'ShadySide',
    type: 'product',
    typeLabel: 'Product',
    status: '● Live',
    statusTone: 'ok',
    year: '2025 →',
    problem: 'Sun vs. bus seat',
    summary:
      'A shade-friendly travel planner. Enter start, destination, and departure time; ShadySide compares route direction with estimated sun position and recommends the side of the bus, train, or car that stays cooler.',
    tags: ['React', 'TypeScript', 'Route geometry', 'Solar position', 'SEO'],
    links: [
      { label: 'Case study', href: '/projects/shadyside', primary: true },
      { label: 'Live app', href: 'https://shadyside.app', external: true },
    ],
    visual: 'route',
    caseStudy: '/projects/shadyside',
    keywords: ['bus', 'shade', 'sun', 'travel', 'commute'],
  },
  {
    id: 'OSN-002',
    slug: 'theflames',
    name: 'TheFlames',
    type: 'product',
    typeLabel: 'Product Experiment',
    status: '● Live',
    statusTone: 'ok',
    year: '2025 →',
    problem: 'Nostalgia, computed',
    summary:
      'The schoolyard FLAMES game — Friends, Love, Affection, Marriage, Enemies, Siblings — rebuilt as a fast, free web toy. Automatic mode does the counting; Manual Mode preserves the notebook ritual.',
    tags: ['Next.js', 'TypeScript', 'Playful UX'],
    links: [
      { label: 'Project page', href: '/projects/theflames', primary: true },
      { label: 'Live app', href: 'https://theflames.app', external: true },
      { label: 'GitHub', href: 'https://github.com/osnaren/the-flames', external: true },
    ],
    visual: 'flames',
    caseStudy: '/projects/theflames',
    keywords: ['game', 'relationship', 'toy'],
  },
  {
    id: 'OSN-003',
    slug: 'forest-fire-detection',
    name: 'Forest Fire & Smoke Detection',
    type: 'publication',
    typeLabel: 'Publication',
    status: '◆ Published',
    statusTone: 'amber',
    year: '2023',
    problem: 'Catastrophic forgetting in fire detection',
    summary:
      'Peer-reviewed research in Fire Ecology (Springer) applying Learning without Forgetting to transfer-learned CNNs, so a fire-detection model can learn a new dataset without losing the one it was trained on.',
    tags: ['Deep learning', 'LwF', 'Xception', 'Fire Ecology'],
    links: [
      { label: 'Case study', href: '/projects/forest-fire-detection', primary: true },
      { label: 'Paper (open access)', href: 'https://doi.org/10.1186/s42408-022-00165-0', external: true },
      { label: 'Code', href: 'https://github.com/osnaren/forest-fire', external: true },
    ],
    visual: 'fire',
    caseStudy: '/projects/forest-fire-detection',
    keywords: ['wildfire', 'smoke', 'springer', 'transfer learning', 'paper'],
  },
  {
    id: 'OSN-004',
    slug: 'multi-cancer-classification',
    name: 'Multi-Cancer Classification',
    type: 'publication',
    typeLabel: 'Publication',
    status: '◆ Published',
    statusTone: 'amber',
    year: '2023',
    problem: 'One model, eight cancers',
    summary:
      'IEEE Access journal article classifying eight kinds of cancer from CT/MRI imagery using Bayesian-optimised pretrained CNNs, with Learning without Forgetting preserving performance on earlier datasets.',
    tags: ['IEEE Access', 'CNN', 'Bayesian optimisation', 'LwF'],
    links: [
      { label: 'Case study', href: '/projects/multi-cancer-classification', primary: true },
      { label: 'Paper (DOI)', href: 'https://doi.org/10.1109/ACCESS.2023.3240443', external: true },
      { label: 'Dataset', href: '/projects/multi-cancer-dataset' },
    ],
    visual: 'cancer',
    caseStudy: '/projects/multi-cancer-classification',
    keywords: ['medical imaging', 'oncology', 'densenet', 'paper'],
  },
  {
    id: 'OSN-005',
    slug: 'retinal-oct-classification',
    name: 'Retinal OCT Classification',
    type: 'publication',
    typeLabel: 'Publication',
    status: '◆ Published',
    statusTone: 'amber',
    year: '2022',
    problem: 'Silent, slow-onset retinal disease',
    summary:
      'Conference paper (IEEE ICCCI 2022) on classifying retinal OCT scans with deep learning, so retinal disorders that develop slowly and without obvious signs can be flagged earlier.',
    tags: ['IEEE ICCCI', 'OCT', 'Medical imaging'],
    links: [
      { label: 'Case study', href: '/projects/retinal-oct-classification', primary: true },
      { label: 'Paper (DOI)', href: 'https://doi.org/10.1109/ICCCI54379.2022.9740985', external: true },
      { label: 'Dataset', href: '/projects/retinal-oct-c8' },
    ],
    visual: 'retina',
    caseStudy: '/projects/retinal-oct-classification',
    keywords: ['eye', 'ophthalmology', 'drusen', 'paper'],
  },
  {
    id: 'OSN-006',
    slug: 'multi-cancer-dataset',
    name: 'Multi Cancer Dataset',
    type: 'dataset',
    typeLabel: 'Dataset',
    status: '● Public dataset',
    statusTone: 'ok',
    year: '2022 →',
    problem: 'Cancer imagery scattered across sources',
    summary:
      'A 130,000-image Kaggle dataset consolidating 8 cancer types across 26 subclasses into one uniform, 512×512 corpus — the most widely used artifact I have published.',
    tags: ['Kaggle', '130k images', '26 subclasses', 'CC BY-NC-SA 4.0'],
    links: [
      { label: 'Case study', href: '/projects/multi-cancer-dataset', primary: true },
      { label: 'Kaggle', href: 'https://www.kaggle.com/datasets/obulisainaren/multi-cancer', external: true },
      { label: 'DOI', href: 'https://doi.org/10.34740/KAGGLE/DSV/3415848', external: true },
    ],
    visual: 'cancer',
    caseStudy: '/projects/multi-cancer-dataset',
    keywords: ['leukemia', 'brain', 'breast', 'cervical', 'kidney', 'lung', 'colon', 'lymphoma', 'oral'],
  },
  {
    id: 'OSN-007',
    slug: 'retinal-oct-c8',
    name: 'Retinal OCT Image Classification — C8',
    type: 'dataset',
    typeLabel: 'Dataset',
    status: '● Public dataset',
    statusTone: 'ok',
    year: '2021 →',
    problem: 'No balanced 8-class OCT benchmark',
    summary:
      '24,000 retinal OCT images across 8 retinal conditions, split into balanced train/validation/test folds. Indexed by the openmedlab Awesome-Medical-Dataset collection.',
    tags: ['Kaggle', '24k images', '8 classes', 'CC BY-NC-SA 4.0'],
    links: [
      { label: 'Case study', href: '/projects/retinal-oct-c8', primary: true },
      { label: 'Kaggle', href: 'https://www.kaggle.com/datasets/obulisainaren/retinal-oct-c8', external: true },
      { label: 'DOI', href: 'https://doi.org/10.34740/KAGGLE/DSV/2736749', external: true },
    ],
    visual: 'retina',
    caseStudy: '/projects/retinal-oct-c8',
    keywords: ['amd', 'cnv', 'dme', 'drusen', 'macular hole'],
  },
  {
    id: 'OSN-008',
    slug: 'forest-fire-c4',
    name: 'Forest Fire Image Classification Dataset',
    type: 'dataset',
    typeLabel: 'Dataset',
    status: '● Public dataset',
    statusTone: 'ok',
    year: '2022 →',
    problem: 'Smoke ≠ fire ≠ both',
    summary:
      '4,823 standardised forest images across four classes — fire, no fire, smoke, and smokefire — because a detector that cannot separate smoke from flame creates costly false alarms.',
    tags: ['Kaggle', '4.8k images', '4 classes', 'CC BY-NC-SA 4.0'],
    links: [
      { label: 'Case study', href: '/projects/forest-fire-c4', primary: true },
      { label: 'Kaggle', href: 'https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4', external: true },
      { label: 'DOI', href: 'https://doi.org/10.34740/KAGGLE/DSV/3135325', external: true },
    ],
    visual: 'fire',
    caseStudy: '/projects/forest-fire-c4',
    keywords: ['wildfire', 'smoke', 'environmental monitoring'],
  },
  {
    id: 'OSN-009',
    slug: 'commerce-frontend',
    name: 'Commerce Frontend Systems',
    type: 'work',
    typeLabel: 'Work',
    status: 'Professional experience',
    statusTone: 'muted',
    year: '2023 →',
    problem: 'Frontend systems for real customer journeys',
    summary:
      'Customer-facing ecommerce frontend at Victoria’s Secret & Co. — React product-page experiences, accessibility, performance, experimentation, and analytics, delivered across Product, UX, QA, Backend, and Analytics.',
    tags: ['React', 'TypeScript', 'Accessibility', 'Performance', 'A/B testing'],
    links: [{ label: 'Case study', href: '/projects/commerce-frontend', primary: true }],
    visual: 'commerce',
    caseStudy: '/projects/commerce-frontend',
    keywords: ['victoria secret', 'ecommerce', 'pdp', 'retail'],
  },
  {
    id: 'OSN-010',
    slug: 'soliton-systems',
    name: 'Soliton Product UI & Tools',
    type: 'work',
    typeLabel: 'Work',
    status: 'Professional experience',
    statusTone: 'muted',
    year: '2021 – 2023',
    problem: 'Engineering tools people have to live in',
    summary:
      'Frontend and tooling work at Soliton Technologies: a responsive dark theme, a drag-and-drop scheduling interface, a CLI for multi-device monitoring, and Python services behind them.',
    tags: ['Frontend UX', 'Dark theme', 'Drag & drop', 'CLI', 'Python'],
    links: [{ label: 'Case study', href: '/projects/soliton-systems', primary: true }],
    visual: 'toolchain',
    caseStudy: '/projects/soliton-systems',
    keywords: ['mongodb', 'minio', 'mentoring', 'internship'],
  },
  {
    id: 'OSN-011',
    slug: 'lab-experiments',
    name: 'Lab Experiments',
    type: 'experiment',
    typeLabel: 'Experiments',
    status: '◐ Studies',
    statusTone: 'accent',
    year: 'Ongoing',
    problem: 'Ideas that need a bench, not a repo',
    summary:
      'Small UI studies that run live inline — squash-and-stretch toggles, a sun-path slider that seeded ShadySide, magnetic hover physics, and scroll-driven route drawing.',
    tags: ['Framer Motion', 'SVG', 'Micro-interactions'],
    links: [{ label: 'Open the Lab', href: '/lab', primary: true }],
    visual: 'lab',
    keywords: ['studies', 'prototypes', 'motion'],
  },
];

export const artifactBySlug = (slug: string) => artifacts.find((a) => a.slug === slug);
