import { artifacts } from '@/data/artifacts';
import { site } from '@/data/site';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/lab', '/story', '/resume', '/contact'];
  const caseStudies = [...new Set(artifacts.flatMap((a) => (a.caseStudy ? [a.caseStudy] : [])))];

  return [...staticRoutes, ...caseStudies].map((route) => ({
    url: `${site.domain}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/projects/') ? 0.8 : 0.7,
  }));
}
