import Link from 'next/link';

import { SignalLine } from '@/components/layout/SignalLine';
import { site } from '@/data/site';

const moduleMap = [
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Story', href: '/story' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

const featured = [
  { label: 'ShadySide', href: '/projects/shadyside', meta: 'OSN-001' },
  { label: 'TheFlames', href: '/projects/theflames', meta: 'OSN-002' },
  { label: 'Research', href: '/projects/forest-fire-detection', meta: '3 papers' },
  { label: 'Datasets', href: '/projects/multi-cancer-dataset', meta: '3 public' },
];

const socials = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'X', href: site.links.x },
  { label: 'Email', href: `mailto:${site.email}` },
];

/** Bump when the site's content meaningfully changes. */
const LAST_UPDATED = 'July 2026';

export function Footer() {
  return (
    <footer className="border-line bg-grid mt-16 border-t">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SignalLine />

        <div className="grid gap-10 pt-4 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* identity */}
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-ink text-paper grid size-8 place-items-center rounded-lg font-mono text-[11px] font-semibold">
                ON
              </span>
              <span className="font-mono text-[13px] font-semibold tracking-[0.08em]">
                OSNAREN<span className="text-accent">.LAB</span>
              </span>
            </div>
            <p className="text-muted mt-4 max-w-xs text-[13.5px] leading-relaxed">
              A workbench for useful frontend products, public datasets, and small experiments — built from everyday
              problems, in Salem, Tamil Nadu.
            </p>
            <p className="text-ok mt-5 inline-flex items-center gap-2 rounded-full border border-current/25 bg-current/8 px-3 py-1.5 font-mono text-[10px] font-medium tracking-widest uppercase">
              <span className="bg-ok size-1.5 rounded-full" aria-hidden="true" />
              Open channel — available for interesting work
            </p>
          </div>

          {/* module map */}
          <nav aria-label="Site map">
            <p className="label-mono text-faint">Module map</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {moduleMap.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-accent font-mono text-[12px] tracking-[0.04em] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* featured artifacts */}
          <nav aria-label="Featured artifacts">
            <p className="label-mono text-faint">Featured artifacts</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {featured.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-baseline justify-between gap-2">
                    <span className="text-muted group-hover:text-accent font-mono text-[12px] tracking-[0.04em] transition-colors">
                      {item.label}
                    </span>
                    <span className="text-faint font-mono text-[9.5px] tracking-[0.08em] uppercase">{item.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* channels */}
          <nav aria-label="Social links">
            <p className="label-mono text-faint">Channels</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="text-muted hover:text-accent font-mono text-[12px] tracking-[0.04em] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* baseline */}
        <div className="border-line text-faint flex flex-col gap-3 border-t py-6 font-mono text-[10px] tracking-[0.08em] uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Obuli Sai Naren · Built on the bench</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Last updated {LAST_UPDATED}</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>{site.version}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
