'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

import { Workbench } from '@/components/home/Workbench';
import { benchModules } from '@/data/modules';

const DEFAULT_MODULE_ID = 'OSN-001';

export function HomeHero() {
  const [activeId, setActiveId] = useState(DEFAULT_MODULE_ID);
  const reduceMotion = useReducedMotion();
  const activeModule = benchModules.find((module) => module.id === activeId) ?? benchModules[0];

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, delay: reduceMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <motion.div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      />
      <div className="relative mx-auto grid min-h-[calc(100svh-104px)] max-w-384 items-center gap-9 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(430px,0.86fr)_minmax(0,1.14fr)] lg:gap-7 lg:py-8 xl:grid-cols-[minmax(500px,0.86fr)_minmax(0,1.14fr)] xl:gap-10 xl:px-12">
        <div className="flex min-w-0 flex-col">
          <motion.p
            {...enter(0.08)}
            className="text-ok flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-widest uppercase"
          >
            <span
              className="bg-ok size-1.5 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--ok)_15%,transparent)]"
              aria-hidden="true"
            />
            Bench powered on — all modules live
          </motion.p>

          <motion.h1
            {...enter(0.14)}
            className="mt-5 max-w-3xl text-5xl leading-[1.03] font-semibold tracking-normal text-balance sm:text-[58px] lg:text-[50px] xl:text-[60px] 2xl:text-[68px]"
          >
            I build useful frontend products from everyday problems.
          </motion.h1>

          <motion.p {...enter(0.2)} className="text-muted mt-5 max-w-xl text-[16px] leading-7 sm:text-[17px]">
            Frontend developer building accessible commerce experiences, useful web products, and research-backed
            experiments with React and TypeScript.
          </motion.p>

          <motion.div {...enter(0.42)} className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="bg-accent hover:bg-accent-press inline-flex min-h-12 items-center gap-2 rounded-md px-5 font-mono text-[12px] font-medium tracking-[0.04em] text-white uppercase shadow-[0_3px_0_var(--accent-press)] transition-colors"
            >
              Explore Work <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/resume"
              className="border-ink hover:bg-ink hover:text-paper inline-flex min-h-12 items-center gap-2 rounded-md border px-5 font-mono text-[12px] font-medium tracking-[0.04em] uppercase transition-colors"
            >
              <FileText className="size-4" aria-hidden="true" /> Resume
            </Link>
          </motion.div>

          <motion.div
            {...enter(0.48)}
            className="text-faint mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] leading-5 tracking-[0.04em] uppercase"
          >
            <span>
              NOW / <span className="text-ink">VICTORIA&rsquo;S SECRET &amp; CO.</span>
            </span>
            <span>
              PREV / <span className="text-ink">SOLITON</span>
            </span>
            <span>
              EDU / <span className="text-ink">B.E. CSE, KONGU</span>
            </span>
          </motion.div>

          <motion.div
            {...enter(0.3)}
            data-testid="module-inspector"
            className="border-line-strong bg-surface/76 relative mt-5 min-h-22 overflow-hidden rounded-md border px-4 py-3 shadow-[0_3px_0_var(--line)] backdrop-blur-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-ok font-mono text-[10px] font-medium tracking-widest uppercase">
              Inspecting {activeModule.id}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeModule.id}
                initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                transition={{ duration: 0.16 }}
                className="mt-1.5"
              >
                <p className="text-[16px] font-semibold tracking-normal">{activeModule.contextTitle}</p>
                <p className="text-muted mt-1 max-w-sm font-mono text-[9px] leading-4 tracking-[0.08em] uppercase">
                  {activeModule.contextDetail}
                </p>
              </motion.div>
            </AnimatePresence>
            <span className="border-accent absolute right-3 bottom-3 h-4 w-4 border-r border-b" aria-hidden="true" />
            <span className="border-accent absolute top-3 left-3 h-4 w-4 border-t border-l" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
          className="min-w-0"
        >
          <Workbench activeId={activeId} onActive={setActiveId} />
        </motion.div>
      </div>
    </section>
  );
}
