'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { artifacts } from '@/data/artifacts';

/** Opening for the artifact scanner. Counts are derived from the data — never
 *  hardcoded — so the summary can't drift from the real index. */
export function ProjectsIntro() {
  const reduceMotion = useReducedMotion();

  const byType = (type: string) => artifacts.filter((artifact) => artifact.type === type).length;
  const summary = [
    `${artifacts.length} artifacts`,
    `${byType('product')} products`,
    `${byType('publication')} publications`,
    `${byType('dataset')} public datasets`,
    `${byType('work')} work studies`,
    `${byType('experiment')} experiment`,
  ];

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: reduceMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <section className="border-line relative isolate overflow-hidden border-b" aria-labelledby="projects-title">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_90%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_58%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <motion.p {...enter(0.04)} className="label-mono text-accent">
          /PROJECTS — ARTIFACT SCANNER
        </motion.p>
        <motion.h1
          {...enter(0.1)}
          id="projects-title"
          className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl"
        >
          The artifact index.
        </motion.h1>
        <motion.p {...enter(0.16)} className="text-muted mt-4 max-w-xl text-[15px] leading-relaxed sm:text-[16px]">
          Products, research, datasets, professional systems, and experiments — honestly labelled and open for
          inspection.
        </motion.p>

        <motion.ul
          {...enter(0.24)}
          className="text-faint mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[10.5px] tracking-[0.06em] uppercase"
        >
          {summary.map((item, index) => (
            <li key={item} className="flex items-center gap-2.5">
              {index > 0 && (
                <span className="text-line-strong" aria-hidden="true">
                  ·
                </span>
              )}
              <span className={index === 0 ? 'text-ink font-medium' : undefined}>{item}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
