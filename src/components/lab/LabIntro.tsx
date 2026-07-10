'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function LabIntro() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: reduceMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <section className="border-line relative isolate overflow-hidden border-b" aria-labelledby="lab-title">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_88%_0%,color-mix(in_srgb,var(--ok)_9%,transparent),transparent_58%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <motion.p
          {...enter(0.04)}
          className="text-ok flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.14em] uppercase"
        >
          <span className="bg-ok relative size-1.5 rounded-full">
            {!reduceMotion && (
              <motion.span
                className="bg-ok/50 absolute inset-0 rounded-full"
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </span>
          Lab status — Active
        </motion.p>
        <motion.h1
          {...enter(0.1)}
          id="lab-title"
          className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl"
        >
          Experiments, live on the bench.
        </motion.h1>
        <motion.p {...enter(0.16)} className="text-muted mt-4 max-w-xl text-[15px] leading-relaxed sm:text-[16px]">
          Small studies in motion, interaction, data, and interface behaviour — built to test an idea before it becomes
          a product. Open any module to run it.
        </motion.p>
      </div>
    </section>
  );
}
