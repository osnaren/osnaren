export type NoteTrack = 'work' | 'product' | 'research' | 'life';

export interface FieldNote {
  id: string;
  year: string;
  /** finer-grained date shown on the card */
  date: string;
  track: NoteTrack;
  title: string;
  artifact: string;
  caption: string;
  lesson: string;
  /** schematic rendered in the sticky preview panel */
  preview:
    | 'route'
    | 'flames'
    | 'commerce'
    | 'toolchain'
    | 'paper'
    | 'dataset'
    | 'camera'
    | 'garden'
    | 'school'
    | 'lab'
    | 'language'
    | 'sapling'
    | 'mentorship'
    | 'coordination'
    | 'network'
    | 'service';
  link?: { label: string; href: string; external?: boolean };
  accent?: boolean;
}

export const storyTracks = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work' },
  { key: 'product', label: 'Products' },
  { key: 'research', label: 'Research' },
  { key: 'life', label: 'Life' },
] as const;

export type StoryTrackKey = (typeof storyTracks)[number]['key'];

export const trackLabel: Record<NoteTrack, string> = {
  work: 'Work',
  product: 'Product',
  research: 'Research',
  life: 'Life',
};

/** Newest first. Each entry: one artifact, one caption, one lesson. */
export const fieldNotes: FieldNote[] = [
  {
    id: 'FN-014',
    year: '2026',
    date: '2026',
    track: 'product',
    title: 'osnaren.com becomes the lab',
    artifact: 'This website',
    caption:
      'The portfolio rebuilt as an interactive workbench — every module on the bench is a live door to real work, and every claim on it links to a source.',
    lesson: 'Your own site should be your most honest product.',
    preview: 'lab',
    link: { label: 'You are here', href: '/' },
    accent: true,
  },
  {
    id: 'FN-013',
    year: '2026',
    date: 'APR 2026',
    track: 'work',
    title: 'Front End Web Developer, Victoria’s Secret & Co.',
    artifact: 'Role change',
    caption:
      'From Associate to owning ecommerce features end to end — technical discovery through production, alongside Product, UX, QA, Backend, and Analytics.',
    lesson: 'Ownership is mostly communication with a deadline attached.',
    preview: 'commerce',
    link: { label: 'Commerce case study', href: '/projects/commerce-frontend' },
  },
  {
    id: 'FN-012',
    year: '2025',
    date: '2025',
    track: 'product',
    title: 'ShadySide goes live',
    artifact: 'shadyside.app',
    caption:
      'A 2020 Jalakandapuram-to-Coimbatore bus ride made the problem painfully obvious. The beta stayed small, but 1,000+ shade recommendations later it grew into ShadySide v1.5.',
    lesson: 'A niche idea can still be real if the frustration is sharp enough.',
    preview: 'route',
    link: { label: 'Read the case study', href: '/projects/shadyside' },
    accent: true,
  },
  {
    id: 'FN-011',
    year: '2025',
    date: '2025',
    track: 'product',
    title: 'TheFlames, rebuilt',
    artifact: 'theflames.app',
    caption:
      'One of the first hobby projects I wanted to build finally reached a polished public version: auto reveal, manual notebook mode, anonymous charts, and shareable results.',
    lesson: 'Playful software still deserves production-grade care.',
    preview: 'flames',
    link: { label: 'Project page', href: '/projects/theflames' },
  },
  {
    id: 'FN-010',
    year: '2023',
    date: 'DEC 2023',
    track: 'work',
    title: 'Joined Victoria’s Secret & Co.',
    artifact: 'Badge',
    caption:
      'From services to product. React product-page experiences for a global ecommerce customer base — accessibility, performance, and experimentation-driven delivery.',
    lesson: 'At scale, small frontend details are big business.',
    preview: 'commerce',
  },
  {
    id: 'FN-009',
    year: '2023',
    date: 'JAN 2023',
    track: 'research',
    title: 'Multi-cancer classification, IEEE Access',
    artifact: 'Journal article',
    caption:
      'Eight cancer types, one set of models, and Learning without Forgetting so the network keeps what it already knew. Published in IEEE Access, volume 11.',
    lesson: 'A model that forgets is a liability, not a curiosity.',
    preview: 'paper',
    link: { label: 'Read the case study', href: '/projects/multi-cancer-classification' },
    accent: true,
  },
  {
    id: 'FN-008',
    year: '2023',
    date: 'FEB 2023',
    track: 'research',
    title: 'Forest fire detection, Fire Ecology',
    artifact: 'Journal article',
    caption:
      'A sixth-semester classifier project matured into open-access Fire Ecology research: Xception reached 98.72% on the original dataset, and Learning without Forgetting kept 96.89% of it while learning an unseen one.',
    lesson: 'Research is stronger when the dataset, demo, and limitations are all visible.',
    preview: 'paper',
    link: { label: 'Read the case study', href: '/projects/forest-fire-detection' },
  },
  {
    id: 'FN-007',
    year: '2022',
    date: '2022',
    track: 'research',
    title: 'The Multi Cancer Dataset',
    artifact: 'Public dataset',
    caption:
      '130,000 images, 8 cancer types, 26 subclasses, normalised into one corpus and published openly. It has since seeded well over a hundred community notebooks.',
    lesson: 'The unglamorous work — renaming, resizing, balancing — is what other people actually reuse.',
    preview: 'dataset',
    link: { label: 'Dataset case study', href: '/projects/multi-cancer-dataset' },
    accent: true,
  },
  {
    id: 'FN-006',
    year: '2022',
    date: 'JUN 2022',
    track: 'life',
    title: 'B.E. CSE, first rank',
    artifact: 'Degree',
    caption:
      'Graduated from Kongu Engineering College holding first rank in Computer Science, then went full-time at Soliton as Project Engineer.',
    lesson: 'Fundamentals compound. So do side projects. Keep both.',
    preview: 'school',
  },
  {
    id: 'FN-ALT',
    year: '2021',
    date: 'NOV 2021 – JUN 2022',
    track: 'life',
    title: 'CSE Altruists: seniors helping juniors',
    artifact: 'Peer mentorship programme',
    caption:
      'Founded and coordinated a Computer Science mentorship programme that paired junior teams with senior mentors for projects, placements, and the parts of college that are easier to navigate with someone beside you.',
    lesson: 'Useful systems can be social systems too. Make the path easier for the next person.',
    preview: 'mentorship',
    accent: true,
  },
  {
    id: 'FN-005',
    year: '2022',
    date: 'JAN 2022',
    track: 'research',
    title: 'Retinal OCT classification, IEEE ICCCI',
    artifact: 'Conference paper',
    caption:
      'Retinal disorders develop slowly and without obvious signs. This paper — and the 24,000-image OCT-C8 dataset behind it — tried to make them visible earlier.',
    lesson: 'Infrastructure outlives results. The dataset travelled further than the paper.',
    preview: 'paper',
    link: { label: 'Read the case study', href: '/projects/retinal-oct-classification' },
  },
  {
    id: 'FN-004',
    year: '2021',
    date: 'JUL 2021',
    track: 'work',
    title: 'First production work, Soliton',
    artifact: 'Changelog',
    caption:
      'Internship at Soliton Technologies: shipped a responsive dark theme, a drag-and-drop scheduling UX, and a CLI for multi-device monitoring.',
    lesson: 'Real users change how you build. Immediately.',
    preview: 'toolchain',
    link: { label: 'Soliton case study', href: '/projects/soliton-systems' },
  },
  {
    id: 'FN-003',
    year: '2021',
    date: '2021',
    track: 'research',
    title: 'Retinal OCT-C8 published',
    artifact: 'Public dataset',
    caption:
      'My first artifact that left my hands and kept going without me — 24,000 balanced OCT scans, now indexed in the openmedlab Awesome-Medical-Dataset collection.',
    lesson: 'A benchmark’s value is its fairness, not its size.',
    preview: 'dataset',
    link: { label: 'Dataset case study', href: '/projects/retinal-oct-c8' },
  },
  {
    id: 'FN-PLC',
    year: '2020',
    date: 'JUN 2020 – JUN 2022',
    track: 'life',
    title: 'Placement coordinator and CSEA organiser',
    artifact: 'Campus coordination',
    caption:
      'Coordinated placement activity with students, faculty, and visiting companies while also helping the Computer Science Engineering Association run departmental events, workshops, and technical programmes.',
    lesson: 'Good coordination removes uncertainty before it becomes friction.',
    preview: 'coordination',
  },
  {
    id: 'FN-CLS',
    year: '2018',
    date: 'JUN 2018 – JUN 2022',
    track: 'life',
    title: 'Four years as class representative',
    artifact: 'Student–faculty link',
    caption:
      'Represented the class throughout college: carrying concerns to faculty, bringing decisions back clearly, and learning how much patient communication sits behind a functional group.',
    lesson: 'Representation starts with listening, then closing the loop.',
    preview: 'network',
  },
  {
    id: 'FN-002',
    year: '2018',
    date: '2018',
    track: 'life',
    title: 'Hello, Kongu',
    artifact: 'Admission letter',
    caption:
      'Started B.E. Computer Science at Kongu Engineering College. Coursework built the fundamentals; side projects made them practical.',
    lesson: 'The coursework and the side projects are not in competition.',
    preview: 'school',
  },
  {
    id: 'FN-ROT',
    year: '2017',
    date: 'MAR 2017 – MAR 2018',
    track: 'life',
    title: 'A year of service with Rotaract',
    artifact: 'Club director role',
    caption:
      'Served as a director in Rotaract during school. It was an early lesson in showing up for shared work, organising with peers, and treating community service as a practice rather than a badge.',
    lesson: 'Responsibility becomes real when other people are counting on you.',
    preview: 'service',
  },
  {
    id: 'FN-001',
    year: '2016',
    date: '2016 – 18',
    track: 'life',
    title: 'The school work I loved most',
    artifact: 'Vice President, National Green Corps',
    caption:
      'At Sri Vidya Mandir, our National Green Corps team grew an organic vegetable garden, donated more than 1,000 saplings to the Isha Foundation, and organised a district-level environmental awareness event. Seeing the first harvest change scepticism into participation made the work unforgettable.',
    lesson: 'Visible progress turns a good cause into shared ownership.',
    preview: 'sapling',
    accent: true,
  },
  {
    id: 'FN-HIN',
    year: '2015',
    date: '2015 – 17',
    track: 'life',
    title: 'Prathamic to Praveen, eight stages',
    artifact: 'Dakshina Bharat Hindi Prachar Sabha examinations',
    caption:
      'Started with Prathamic in 2015 and completed the full eight-examination progression through Praveen Uttarardh, earning First Class at every level.',
    lesson: 'Long progress is easier to trust when every stage has a finish line.',
    preview: 'language',
    link: { label: 'Official examination ladder', href: 'https://www.dbhpscentral.org/books.html', external: true },
  },
];

export interface Practice {
  id: string;
  title: string;
  caption: string;
  lesson: string;
  preview: 'camera' | 'garden';
  link?: { label: string; href: string; external?: boolean };
}

/** Two things with no end date, deliberately outside the timeline. */
export const practices: Practice[] = [
  {
    id: 'ONGOING-01',
    title: 'Photography',
    caption:
      'A camera changes how you look at light — useful training for someone who ended up building a sun-tracking app. FrameOS is the work-in-progress home for the archive.',
    lesson: 'The lens sharpens the angle you take on everything else.',
    preview: 'camera',
    link: { label: 'FrameOS repo', href: 'https://github.com/osnaren/frameos', external: true },
  },
  {
    id: 'ONGOING-02',
    title: 'Gardening',
    caption:
      'Slow feedback loops, honest failure states, and no hotfixes. The best available counterweight to a career spent shipping software that changes hourly.',
    lesson: 'Growth takes the time it takes — plants and code both.',
    preview: 'garden',
  },
];

/** Distinct years, newest first — drives the sticky rail. */
export const storyYears = [...new Set(fieldNotes.map((note) => note.year))];
