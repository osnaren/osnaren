'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

import { Workbench } from '@/components/home/Workbench';
import { artifacts } from '@/data/artifacts';
import { benchModules } from '@/data/modules';

const DEFAULT_MODULE_ID = 'OSN-001';

const credibilityItems = [
  { label: 'Frontend commerce', href: '/projects?filter=work', tone: 'bg-ok' },
  {
    label: `${artifacts.filter((artifact) => artifact.type === 'product' && artifact.status.includes('Live')).length} live products`,
    href: '/projects?filter=product',
    tone: 'bg-ok',
  },
  {
    label: `${artifacts.filter((artifact) => artifact.type === 'publication').length} publications`,
    href: '/projects?filter=publication',
    tone: 'bg-accent',
  },
  {
    label: `${artifacts.filter((artifact) => artifact.type === 'dataset').length} public datasets`,
    href: '/projects?filter=dataset',
    tone: 'bg-ok',
  },
] as const;

export function HomeHero() {
  const [activeId, setActiveId] = useState(DEFAULT_MODULE_ID);
  const [benchEngaged, setBenchEngaged] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeModule = benchModules.find((module) => module.id === activeId) ?? benchModules[0];

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, delay: reduceMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <section
      className="home-launcher border-line relative isolate flex min-h-[calc(100svh-65px)] flex-col overflow-hidden border-b"
      aria-label="Introduction"
    >
      {/* background grid + soft depth wash */}
      <motion.div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_82%_8%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_60%)]"
      />

      <div
        className="home-hero-grid relative mx-auto grid w-full max-w-[118rem] flex-1 items-center gap-7 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(380px,0.75fr)_minmax(0,1fr)] lg:gap-9 lg:py-7 xl:grid-cols-[minmax(440px,0.75fr)_minmax(0,1fr)] xl:gap-12 xl:px-12 2xl:px-16"
        data-engaged={benchEngaged || undefined}
      >
        {/* ── identity column ─────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-col">
          <motion.p
            {...enter(0.08)}
            className="text-ok flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-widest uppercase"
          >
            <span
              className="bg-ok relative size-1.5 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--ok)_15%,transparent)]"
              aria-hidden="true"
            >
              {!reduceMotion && (
                <motion.span
                  className="bg-ok/50 absolute inset-0 rounded-full"
                  animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </span>
            Bench powered on — choose a module
          </motion.p>

          <h1 className="mt-4 max-w-2xl text-[42px] leading-[1.02] font-semibold tracking-normal text-balance sm:text-[54px] lg:text-[48px] lg:text-wrap 2xl:text-[58px]">
            I turn everyday problems into useful web products.
          </h1>

          <motion.p
            {...enter(0.24)}
            className="text-muted mt-4 max-w-xl text-[15px] leading-6 sm:text-[16px] sm:leading-7"
          >
            Frontend developer building accessible commerce experiences, public tools, and research-backed experiments
            with React and TypeScript.
          </motion.p>

          <motion.div {...enter(0.32)} className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="bg-ink text-paper hover:bg-ink/85 inline-flex min-h-12 items-center gap-2 rounded-md px-5 font-mono text-[12px] font-medium tracking-[0.04em] uppercase shadow-[0_3px_0_var(--line-strong)] transition-colors"
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
            {...enter(0.4)}
            className="text-faint mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9.5px] leading-5 tracking-[0.04em] uppercase"
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
        </div>

        {/* ── living workbench ────────────────────────────────────────── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
          className="min-w-0"
        >
          <div className="mb-3 min-[1360px]:hidden">
            <ActiveReadout activeModule={activeModule} reduceMotion={Boolean(reduceMotion)} />
          </div>
          <Workbench activeId={activeId} onActive={setActiveId} onEngagementChange={setBenchEngaged} />
          <div className="mt-3 hidden min-[1360px]:block">
            <ActiveReadout activeModule={activeModule} reduceMotion={Boolean(reduceMotion)} />
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto w-full max-w-[118rem] px-5 pb-5 sm:px-8 lg:pb-6 xl:px-12 2xl:px-16">
        <nav
          aria-label="Portfolio credibility"
          className="border-line-strong bg-surface/72 grid overflow-hidden rounded-md border sm:grid-cols-2 lg:grid-cols-4"
        >
          {credibilityItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-muted hover:bg-surface-2 hover:text-ink flex min-h-12 items-center gap-2.5 px-4 py-3 font-mono text-[9.5px] font-medium tracking-[0.07em] uppercase transition-colors ${
                index < credibilityItems.length - 1
                  ? 'border-line border-b sm:odd:border-r lg:border-r lg:border-b-0'
                  : ''
              } ${index === 1 ? 'lg:border-r sm:border-r-0' : ''}`}
            >
              <span className={`size-1.5 shrink-0 rounded-full ${item.tone}`} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <motion.span
        aria-hidden="true"
        className="from-accent pointer-events-none absolute bottom-0 left-[70%] h-24 w-px origin-top bg-linear-to-b to-transparent max-lg:hidden"
        initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.8 }}
        transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
      />
    </section>
  );
}

function ActiveReadout({
  activeModule,
  reduceMotion,
}: {
  activeModule: (typeof benchModules)[number];
  reduceMotion: boolean;
}) {
  return (
    <div
      data-testid="module-inspector"
      className="border-line bg-paper/82 flex min-h-14 items-center gap-3 rounded-md border px-3.5 py-2.5 backdrop-blur-sm"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="bg-accent h-7 w-px shrink-0" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeModule.id}
          initial={reduceMotion ? false : { opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -5 }}
          transition={{ duration: 0.16 }}
          className="min-w-0"
        >
          <p className="text-faint font-mono text-[9px] font-medium tracking-widest uppercase">
            Inspecting <span className="text-accent">{activeModule.id}</span> · {activeModule.status}
          </p>
          <p className="mt-0.5 truncate text-[13px] font-semibold sm:text-[14px]">{activeModule.contextTitle}</p>
          <p className="text-muted mt-0.5 truncate font-mono text-[8.5px] tracking-[0.07em] uppercase">
            {activeModule.contextDetail}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
