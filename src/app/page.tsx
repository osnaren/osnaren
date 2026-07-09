import Link from 'next/link';

import { CommandStrip } from '@/components/home/CommandStrip';
import { Workbench } from '@/components/home/Workbench';
import { Reveal } from '@/components/motion/Reveal';

const trails = [
  {
    href: '/projects/shadyside',
    label: 'OSN-001 · CASE STUDY',
    title: 'How ShadySide picks the cooler seat',
    copy: 'Route geometry, sun position, and product decisions behind the live app.',
  },
  {
    href: '/projects',
    label: 'RESEARCH · 3 PAPERS, 3 DATASETS',
    title: 'Published work, public datasets',
    copy: 'IEEE Access, Fire Ecology, ICCCI, and datasets that researchers continue to build on.',
  },
  {
    href: '/story',
    label: 'OSN-012 · FIELD NOTES',
    title: 'The story, curated',
    copy: 'From a Salem schoolyard to ecommerce scale — one artifact per milestone.',
  },
];

export default function HomePage() {
  return (
    <div className="bg-grid">
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-14 pb-10 sm:px-8 lg:grid-cols-[420px_1fr] lg:gap-12 lg:pt-20">
        {/* left column — the pitch */}
        <div className="flex flex-col gap-6">
          <p className="text-ok flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
            <span
              className="bg-ok size-1.5 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--ok)_15%,transparent)]"
              aria-hidden="true"
            />
            Frontend engineer · React, TypeScript, UX
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-[46px] sm:leading-[1.08]">
            I build useful frontend products from everyday problems.
          </h1>
          <p className="text-muted text-[15.5px] leading-relaxed">
            I work on customer-facing commerce experiences by day and useful product experiments after hours, with a
            focus on accessibility, performance, and clear user outcomes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="bg-accent hover:bg-accent-press rounded-md px-5 py-3 font-mono text-[13px] font-medium tracking-[0.04em] text-white uppercase shadow-[0_2px_0_var(--accent-press)] transition-colors"
            >
              Explore work →
            </Link>
            <Link
              href="/resume"
              className="border-ink hover:bg-ink hover:text-paper rounded-md border px-5 py-3 font-mono text-[13px] font-medium tracking-[0.04em] uppercase transition-colors"
            >
              Resume
            </Link>
          </div>
          <p className="text-faint font-mono text-[11px] leading-relaxed">
            NOW / <span className="text-ink">VICTORIA&rsquo;S SECRET &amp; CO.</span> · PREV /{' '}
            <span className="text-ink">SOLITON</span> · B.E. CSE, KONGU
          </p>
        </div>

        {/* right column — the bench */}
        <div className="flex min-w-0 flex-col gap-5">
          <Workbench />
          <CommandStrip />
        </div>
      </section>

      {/* secondary trails for scrollers */}
      <section aria-label="Featured trails" className="border-line border-t">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8">
          {trails.map((trail, i) => (
            <Reveal key={trail.href} delay={i * 0.06}>
              <Link
                href={trail.href}
                className="module-card group flex h-full flex-col gap-2 p-5 transition-shadow hover:shadow-[0_6px_0_var(--line)]"
              >
                <p className="label-mono text-accent">{trail.label}</p>
                <h2 className="text-[17px] font-semibold tracking-[-0.01em]">{trail.title}</h2>
                <p className="text-muted text-[13px] leading-relaxed">{trail.copy}</p>
                <span className="text-accent mt-auto pt-2 font-mono text-[11px] font-medium tracking-[0.06em] uppercase opacity-70 transition-opacity group-hover:opacity-100">
                  Open →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
