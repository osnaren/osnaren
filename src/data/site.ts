export const site = {
  name: 'Obuli Sai Naren',
  handle: 'osnaren',
  domain: 'https://osnaren.com',
  role: 'Frontend Engineer',
  location: 'Salem, Tamil Nadu, India',
  email: '66naren@gmail.com',
  description:
    'Obuli Sai Naren is a frontend engineer building useful web products, ecommerce experiences, and product experiments with React, TypeScript, UX, and accessibility.',
  version: 'v2026.07',
  links: {
    github: 'https://github.com/osnaren',
    linkedin: 'https://www.linkedin.com/in/osnaren/',
    x: 'https://twitter.com/osnaren',
    instagram: 'https://instagram.com/osnaren',
    orcid: 'https://orcid.org/0000-0002-6656-9617',
    kaggle: 'https://www.kaggle.com/obulisainaren',
  },
} as const;

export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Story', href: '/story' },
  { label: 'Resume', href: '/resume' },
] as const;
