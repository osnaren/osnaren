import type { LucideIcon } from 'lucide-react';
import {
  Beaker,
  BookOpen,
  BriefcaseBusiness,
  CircuitBoard,
  GraduationCap,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  Sprout,
} from 'lucide-react';

export type ProjectSlug = 'shadyside' | 'inboxctrl' | 'treegenius';

export type Project = {
  slug: ProjectSlug;
  index: string;
  name: string;
  status: string;
  statusTone: 'shipped' | 'active' | 'prototype';
  problem: string;
  oneLine: string;
  summary: string;
  role: string;
  timeline: string;
  stack: string[];
  links: {
    label: string;
    href: string;
  }[];
  image?: {
    src: string;
    alt: string;
  };
  proof: string[];
  caseStudy: {
    heading: string;
    body: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: 'shadyside',
    index: 'OSN-001',
    name: 'ShadySide',
    status: 'Shipped',
    statusTone: 'shipped',
    problem: 'sun vs seat',
    oneLine: 'A travel companion that helps riders choose the lower-sun-exposure side.',
    summary:
      'ShadySide analyzes route geometry, departure time, sun position, and trip context to recommend the better side of a bus, train, or car journey.',
    role: 'Creator, product engineer',
    timeline: '2024 - ongoing',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Google Maps', 'Jest', 'Cypress'],
    links: [
      { label: 'Live app', href: 'https://shadyside.app' },
      { label: 'Case study', href: '/work/shadyside' },
    ],
    image: {
      src: '/work/shadyside-methodology.webp',
      alt: 'A route and sun-position visual from ShadySide.',
    },
    proof: [
      'Public planner flow verified on desktop and mobile',
      'Live share links rehydrate and recompute trip results',
      'Built around route geometry, time, weather context, and seat-side recommendation',
    ],
    caseStudy: [
      {
        heading: 'Problem',
        body: 'A simple commute question is surprisingly hard to answer: which side should I sit on if I do not want direct sun for most of the route?',
      },
      {
        heading: 'Product Shape',
        body: 'The product turns route, time, and sun-position data into a practical recommendation that can be checked quickly before a trip.',
      },
      {
        heading: 'Engineering Notes',
        body: 'The app combines route planning, shareable trip state, production verification, responsive UI, and a growing reliability audit trail.',
      },
    ],
  },
  {
    slug: 'inboxctrl',
    index: 'OSN-002',
    name: 'InboxCtrl',
    status: 'Active build',
    statusTone: 'active',
    problem: 'inbox overload',
    oneLine: 'A self-hosted Gmail control plane for safer cleanup and filter drafting.',
    summary:
      'InboxCtrl is an open-source, self-hosted Gmail control plane for metadata-first inbox cleanup, review-first bulk actions, rollback-aware organization, and natural-language filter drafting.',
    role: 'Creator, architecture and product engineering',
    timeline: '2026 - active',
    stack: ['Next.js', 'TypeScript', 'Better Auth', 'SQLite', 'Postgres', 'Gmail API', 'Docker'],
    links: [
      { label: 'Project notes', href: '/work/inboxctrl' },
      { label: 'Public docs direction', href: 'https://inboxctrl.com' },
    ],
    proof: [
      'OSS launch posture separates public site and self-host product app',
      'Demo mode is local-only and blocks real Gmail access',
      'Permission model avoids broad Gmail mailbox scope',
    ],
    caseStudy: [
      {
        heading: 'Problem',
        body: 'Inbox cleanup tools often ask for too much permission and make destructive bulk actions feel too easy.',
      },
      {
        heading: 'Product Shape',
        body: 'The app starts with read-only audit paths, deterministic demo data, scoped Gmail permissions, and rollback-aware organization.',
      },
      {
        heading: 'Engineering Notes',
        body: 'The repo is structured as a monorepo with separate site, web app, shared packages, Gmail integration, sync engine, rule engine, demo data, and extension boundaries.',
      },
    ],
  },
  {
    slug: 'treegenius',
    index: 'OSN-003',
    name: 'TreeGenius',
    status: 'Prototype',
    statusTone: 'prototype',
    problem: 'family memory',
    oneLine: 'A family tree system for preserving people, relationships, and shared memory.',
    summary:
      'TreeGenius explores interactive family-tree visualization, role-based access, authentication, sharing, and data models for long-lived family records.',
    role: 'Product prototype, frontend and system exploration',
    timeline: '2026 - prototype',
    stack: ['React', 'TypeScript', 'Vite', 'Flask', 'Neo4j', 'Auth0', 'Framer Motion'],
    links: [{ label: 'Project notes', href: '/work/treegenius' }],
    image: {
      src: '/work/treegenius-tree.png',
      alt: 'TreeGenius tree mark.',
    },
    proof: [
      'Interactive tree visualization direction',
      'Role-based admin and viewer access model',
      'Public sharing and real-time update goals',
    ],
    caseStudy: [
      {
        heading: 'Problem',
        body: 'Family history software can feel either too archival or too fragile for people who simply want to preserve relationships and context.',
      },
      {
        heading: 'Product Shape',
        body: 'The prototype focuses on tree visualization, identity, permissions, and sharing so family records can grow without becoming chaotic.',
      },
      {
        heading: 'Engineering Notes',
        body: 'The original direction used React, Flask, Neo4j, Auth0, and Docker. The current work is a useful place for product-system thinking, not a finished public launch.',
      },
    ],
  },
];

export const storyItems = [
  {
    year: '2015 - 2018',
    title: 'School foundations',
    label: 'Sri Vidya Mandir',
    body: 'Maths, biology, languages, and the early habit of treating study like a system to understand rather than a pile to memorize.',
    icon: BookOpen,
  },
  {
    year: '2018 - 2022',
    title: 'Computer science',
    label: 'Kongu Engineering College',
    body: 'B.E. Computer Science, first rank, academic activity recognition, and research work around deep-learning image classification.',
    icon: GraduationCap,
  },
  {
    year: '2021 - 2023',
    title: 'Soliton Technologies',
    label: 'Project intern to engineer',
    body: 'Frontend performance, dark theme work, scheduling interactions, service integrations, CLI tooling, and mentoring across web fundamentals.',
    icon: BriefcaseBusiness,
  },
  {
    year: '2023 - now',
    title: "Victoria's Secret & Co.",
    label: 'Frontend ecommerce',
    body: 'React product-page work, accessibility, experimentation, analytics integration, customer experience improvements, and production delivery.',
    icon: ShieldCheck,
  },
  {
    year: 'After hours',
    title: 'Tools, photos, plants',
    label: 'Personal lab',
    body: 'Small products for everyday problems, plus photography and gardening as a way to keep noticing texture, timing, patience, and growth.',
    icon: Sprout,
  },
] satisfies Array<{
  year: string;
  title: string;
  label: string;
  body: string;
  icon: LucideIcon;
}>;

export const labModules = [
  {
    id: 'signal-board',
    name: 'Signal Board',
    type: 'Portfolio system',
    body: 'A small interaction model for rearranging work, lab, story, and resume modules without turning the site into a toy.',
    icon: CircuitBoard,
  },
  {
    id: 'mail-rules',
    name: 'Rule Draft Console',
    type: 'InboxCtrl',
    body: 'Review-first Gmail cleanup logic, scoped permissions, and dry-run filter planning.',
    icon: Mail,
  },
  {
    id: 'family-graph',
    name: 'Family Graph',
    type: 'TreeGenius',
    body: 'A relationship canvas for family memory, access boundaries, and shareable context.',
    icon: Network,
  },
  {
    id: 'micro-interactions',
    name: 'Motion Bench',
    type: 'UI craft',
    body: 'Small interface studies: springy modules, scroll-linked reveals, tactile buttons, and accessible animation defaults.',
    icon: Sparkles,
  },
  {
    id: 'experiments',
    name: 'Experiment Log',
    type: 'Lab',
    body: 'A place for useful oddities that do not need to pretend they are finished products yet.',
    icon: Beaker,
  },
];

export const resumeSections = [
  {
    title: "Victoria's Secret & Co.",
    role: 'Front End Web Developer',
    period: 'April 2026 - present',
    location: 'Bengaluru',
    bullets: [
      'Build scalable, accessible, performance-conscious React features for product discovery and purchase confidence.',
      'Lead frontend implementation across technical discovery, UX, QA, backend, analytics, and production delivery.',
      'Support A/B testing and analytics requirements so customer experience improvements can be measured.',
    ],
  },
  {
    title: "Victoria's Secret & Co.",
    role: 'Associate Front End Web Developer',
    period: 'December 2023 - March 2026',
    location: 'Bengaluru',
    bullets: [
      'Built and enhanced customer-facing product detail experiences across digital commerce journeys.',
      'Owned UI behavior, state handling, edge cases, accessibility, and production readiness for complex frontend features.',
      'Strengthened React, JavaScript, frontend architecture, debugging, testing, analytics, and ecommerce domain workflows.',
    ],
  },
  {
    title: 'Soliton Technologies',
    role: 'Project Engineer',
    period: 'June 2022 - November 2023',
    location: 'Coimbatore',
    bullets: [
      'Modernized frontend styling from Tailwind CSS to SCSS with modular component structure.',
      'Integrated Python services for MongoDB and Minio-backed application workflows.',
      'Mentored team members across HTML, CSS, JavaScript, and Node.js fundamentals.',
    ],
  },
  {
    title: 'Soliton Technologies',
    role: 'Project Intern',
    period: 'July 2021 - May 2022',
    location: 'Coimbatore',
    bullets: [
      'Implemented responsive dark-theme experiences across devices and lighting conditions.',
      'Designed and integrated a drag-and-drop scheduling feature for improved usability.',
      'Built a CLI tool for multi-device support, real-time data retrieval, and performance monitoring.',
    ],
  },
];

export const publications = [
  'Forest fire and smoke detection using deep learning-based learning without forgetting',
  'Classification of Retinal OCT Images Using Deep Learning',
  'Multiple Types of Cancer Classification Using CT/MRI Images Based on Learning Without Forgetting Powered Deep Learning Models',
];

export const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'User Experience',
  'Accessibility',
  'Performance',
  'Experimentation',
  'GraphQL',
  'SQL',
  'Python',
  'Node.js',
  'Tailwind CSS',
  'Three.js',
  'Framer Motion',
];
