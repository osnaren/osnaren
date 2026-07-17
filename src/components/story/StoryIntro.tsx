'use client';

import { motion, useReducedMotion } from 'framer-motion';

const markers = ['2016', '2018', '2021', '2023', '2025', 'NOW'] as const;

/** The opening: concept + a compact drawn timeline overview. Deliberately short
 *  of a full viewport so the chronicle starts almost immediately. */
export function StoryIntro() {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: reduceMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <section className="border-line relative isolate overflow-hidden border-b" aria-labelledby="story-title">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_88%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_58%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <motion.p {...enter(0.04)} className="label-mono text-accent">
          /STORY — FIELD NOTES
        </motion.p>
        <motion.h1
          {...enter(0.1)}
          id="story-title"
          className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl"
        >
          The story, in artifacts.
        </motion.h1>
        <motion.p {...enter(0.16)} className="text-muted mt-4 max-w-xl text-[15px] leading-relaxed sm:text-[16px]">
          A field log of the work, research, experiments, and small decisions that shaped how I build.
        </motion.p>

        {/* compact timeline overview — drawn spine + year markers */}
        <motion.div {...enter(0.24)} className="mt-8 max-w-2xl" aria-hidden="true">
          <div className="relative">
            <span className="bg-line absolute top-1.75 right-1 left-1 h-px" />
            <motion.span
              className="bg-accent absolute top-1.75 left-1 h-px origin-left"
              style={{ right: '0.25rem' }}
              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.32, ease: 'easeInOut' }}
            />
            <ol className="relative flex items-center justify-between">
              {markers.map((marker, index) => (
                <motion.li
                  key={marker}
                  className="flex flex-col items-center gap-2"
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.4 + index * 0.08 }}
                >
                  <span
                    className={`size-3.5 rounded-full border-[3px] border-paper ${
                      index === markers.length - 1 ? 'bg-accent' : 'bg-line-strong'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10.5px] tracking-[0.08em] ${
                      index === markers.length - 1 ? 'text-accent font-medium' : 'text-faint'
                    }`}
                  >
                    {marker}
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
