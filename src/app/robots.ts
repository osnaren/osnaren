import { site } from '@/data/site';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended'], allow: '/' },
    ],
    host: site.domain,
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
