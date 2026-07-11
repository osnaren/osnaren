export interface ResumeRole {
  title: string;
  period: string;
  bullets: string[];
}

export interface ResumeBlock {
  id: string;
  label: string;
  meta: string;
  company?: string;
  location?: string;
  roles: ResumeRole[];
}

export const experience: ResumeBlock[] = [
  {
    id: 'BLOCK-01',
    label: 'Current',
    meta: 'DEC 2023 → NOW',
    company: 'Victoria’s Secret & Co.',
    location: 'Bengaluru, India',
    roles: [
      {
        title: 'Front End Web Developer',
        period: 'Apr 2026 — Present',
        bullets: [
          'Lead development of high-impact ecommerce features from technical discovery to production, partnering with Product, UX, QA, Backend, and Analytics.',
          'Build and refine React product-page experiences that improve product discovery and purchase confidence — availability, sizing, and fulfillment interactions.',
          'Support experimentation-driven development: A/B-tested features with analytics integration and measurable outcomes.',
          'Contribute reusable frontend patterns, cleaner component logic, and improved testing coverage.',
        ],
      },
      {
        title: 'Associate Front End Web Developer',
        period: 'Dec 2023 — Mar 2026',
        bullets: [
          'Built customer-facing, React-based product detail experiences used across digital commerce journeys.',
          'Owned frontend implementation of complex features — UI behavior, state handling, edge cases, accessibility, production readiness.',
          'Ensured components followed accessibility best practices across desktop and mobile.',
        ],
      },
    ],
  },
  {
    id: 'BLOCK-02',
    label: 'Previous',
    meta: 'JUL 2021 → NOV 2023',
    company: 'Soliton Technologies',
    location: 'Coimbatore, India',
    roles: [
      {
        title: 'Project Engineer',
        period: 'Jun 2022 — Nov 2023',
        bullets: [
          'Modernized the frontend codebase toward modular, maintainable component architecture.',
          'Built Python services for MongoDB and Minio alongside frontend work.',
          'Mentored engineers on HTML, CSS, JavaScript, and Node.js.',
        ],
      },
      {
        title: 'Project Intern',
        period: 'Jul 2021 — May 2022',
        bullets: [
          'Shipped a responsive dark theme and a drag-and-drop scheduling UX.',
          'Built a CLI tool for multi-device support, real-time data retrieval, and performance monitoring.',
          'Introduced frontend performance optimizations and user-friendly shortcuts.',
        ],
      },
    ],
  },
];

export const education = [
  {
    school: 'Kongu Engineering College',
    detail: 'B.E. Computer Science · 2018 — 2022',
    note: 'First Rank in B.E. CSE',
  },
  {
    school: 'Sri Vidya Mandir Mat. Hr. Sec. School',
    detail: 'HSC (Maths–Biology) 2018 · SSLC 2016',
    note: 'Best Student in Academic Activities',
  },
] as const;

export const skills = {
  core: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'React Native', 'HTML', 'CSS'],
  practice: ['UX', 'Accessibility', 'Performance', 'Frontend architecture', 'A/B testing', 'Analytics integration'],
  alsoSpeaks: ['Node.js', 'Python', 'MongoDB', 'Minio'],
} as const;

export const publications: ReadonlyArray<{ title: string; venue: string; href?: string }> = [
  {
    title:
      'Multiple Types of Cancer Classification Using CT/MRI Images Based on Learning Without Forgetting Powered Deep Learning Models',
    venue: 'IEEE Access, vol. 11, pp. 10336–10354 · 2023',
    href: 'https://doi.org/10.1109/ACCESS.2023.3240443',
  },
  {
    title: 'Forest fire and smoke detection using deep learning-based learning without forgetting',
    venue: 'Fire Ecology 19(1), Springer · 2023',
    href: 'https://doi.org/10.1186/s42408-022-00165-0',
  },
  {
    title: 'Classification of Retinal OCT Images Using Deep Learning',
    venue: 'IEEE ICCCI · 2022',
    href: 'https://doi.org/10.1109/ICCCI54379.2022.9740985',
  },
];

/** Public Kaggle datasets — the most-reused artifacts. */
export const datasets: ReadonlyArray<{ title: string; meta: string; href: string }> = [
  {
    title: 'Multi Cancer Dataset',
    meta: '130,000 images · 8 classes · 26 subclasses',
    href: 'https://www.kaggle.com/datasets/obulisainaren/multi-cancer',
  },
  {
    title: 'Retinal OCT Image Classification — C8',
    meta: '24,000 images · 8 retinal conditions',
    href: 'https://www.kaggle.com/datasets/obulisainaren/retinal-oct-c8',
  },
  {
    title: 'Forest Fire Image Classification Dataset',
    meta: '4,823 images · 4 classes',
    href: 'https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4',
  },
];

export const certifications = [
  'Kaizen IoT Workshop',
  'Fundamentals of Information Security',
  'Build a Face Recognition Application using Python',
  'Dakshina Bharat Hindi Prachar Sabha — 8 examinations from Prathamic through Praveen Uttarardh, First Class',
] as const;

export const languages = ['Tamil', 'English', 'Kannada', 'Hindi'] as const;

export const leadership = [
  {
    role: 'Vice President · National Green Corps',
    period: '2016 — 2018',
    detail:
      'School garden, 1,000+ saplings donated to the Isha Foundation, and a district environmental-awareness event.',
  },
  {
    role: 'Class Representative · Placement Coordinator',
    period: '2018 — 2022',
    detail: 'Student–faculty communication and campus placement coordination at Kongu Engineering College.',
  },
  {
    role: 'Founder · CSE Altruists; Executive Member · CSEA',
    period: '2020 — 2022',
    detail: 'Peer mentorship for junior students and delivery of departmental technical programmes.',
  },
  {
    role: 'Director · Rotaract',
    period: '2017 — 2018',
    detail: 'Peer-led community service and club coordination.',
  },
] as const;
