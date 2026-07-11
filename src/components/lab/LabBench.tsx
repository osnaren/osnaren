'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

import { benchRegistry } from '@/components/lab/registry';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { availableCategories, labExperiments, statusMeta, type LabCategory, type LabExperiment } from '@/data/lab';

type FilterKey = 'all' | LabCategory;

function StatusLine({ text }: { text: string }) {
  return (
    <p aria-hidden="true" className="text-faint font-mono text-[10px] font-medium tracking-[0.12em] uppercase">
      <span className="bg-ok mr-2 inline-block size-1.5 animate-pulse rounded-full align-middle motion-reduce:animate-none" />
      {text}
    </p>
  );
}

function ExperimentCard({
  experiment,
  featured = false,
  onOpen,
  onInspect,
  registerTrigger,
}: {
  experiment: LabExperiment;
  featured?: boolean;
  onOpen: (id: string) => void;
  onInspect: (id: string | null) => void;
  registerTrigger: (id: string, el: HTMLButtonElement | null) => void;
}) {
  const Preview = benchRegistry[experiment.key];
  const status = statusMeta[experiment.status];
  const interactive = experiment.status === 'live';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      onPointerEnter={() => onInspect(experiment.id)}
      onPointerLeave={() => onInspect(null)}
      onFocusCapture={() => onInspect(experiment.id)}
      className="module-card group flex h-full flex-col overflow-hidden"
    >
      <div
        className={`bg-surface-2 relative ${featured ? 'min-h-56' : 'min-h-40'} grid place-items-center overflow-hidden p-4`}
      >
        {/* corner ticks — working-surface detail */}
        <span aria-hidden="true" className="border-line-strong absolute top-2 left-2 size-2.5 border-t border-l" />
        <span aria-hidden="true" className="border-line-strong absolute right-2 bottom-2 size-2.5 border-r border-b" />
        <Preview mode="preview" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold ${featured ? 'text-[16px]' : 'text-[14px]'}`}>
            <span className="text-accent font-mono text-[10px] font-medium tracking-[0.06em]">{experiment.id}</span>
            <span className="mx-1.5 text-faint" aria-hidden="true">
              ·
            </span>
            {experiment.name}
          </h3>
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
        </div>
        <p className="text-muted text-[12.5px] leading-relaxed">{experiment.premise}</p>
        <div className="text-faint mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] tracking-[0.08em] uppercase">
          <span className="text-ok">{experiment.category}</span>
          <span>{experiment.hint}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-faint font-mono text-[9px] tracking-[0.08em] uppercase">{experiment.tech}</span>
          <button
            ref={(el) => registerTrigger(experiment.id, el)}
            type="button"
            onClick={() => onOpen(experiment.id)}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 font-mono text-[10px] font-medium tracking-[0.06em] uppercase transition-colors ${
              interactive
                ? 'bg-ink text-paper hover:bg-accent'
                : 'border-line text-muted hover:border-line-strong border'
            }`}
          >
            {interactive ? 'Open on bench' : 'Open study'} <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function OpenBench({
  experiment,
  siblings,
  onClose,
  onSelect,
  onEvent,
  headingRef,
}: {
  experiment: LabExperiment;
  siblings: LabExperiment[];
  onClose: () => void;
  onSelect: (id: string) => void;
  onEvent: (message: string) => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const Bench = benchRegistry[experiment.key];
  const status = statusMeta[experiment.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.99 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border-line-strong bg-paper/60 relative overflow-hidden rounded-xl border shadow-[0_8px_0_var(--line)]"
    >
      {/* subtle ambient tint keyed to the experiment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_-10%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_60%)]"
      />

      {/* header */}
      <div className="border-line relative flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-accent font-mono text-[11px] font-medium tracking-[0.08em]">{experiment.id}</span>
          <h2 ref={headingRef} tabIndex={-1} className="truncate text-[15px] font-semibold outline-none">
            {experiment.name}
          </h2>
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="border-line hover:border-ink hover:text-accent inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 font-mono text-[10px] font-medium tracking-[0.08em] uppercase transition-colors"
        >
          <X className="size-3.5" aria-hidden="true" /> Close bench
        </button>
      </div>

      <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* main stage + controls */}
        <div className="min-h-95 p-4 sm:p-5 lg:min-h-110">
          <Bench mode="bench" onEvent={onEvent} />
        </div>

        {/* observation + technical */}
        <aside className="border-line bg-surface/50 border-t p-4 sm:p-5 lg:border-t-0 lg:border-l">
          <p className="text-faint font-mono text-[9.5px] font-medium tracking-[0.12em] uppercase">Observation</p>
          <dl className="mt-3 flex flex-col gap-2.5 text-[12.5px] leading-relaxed">
            {(
              [
                ['Input', experiment.observation.input],
                ['Behaviour', experiment.observation.behaviour],
                ['Result', experiment.observation.result],
                ['Implementation', experiment.observation.implementation],
                ['Reduced motion', experiment.observation.reducedMotion],
              ] as const
            ).map(([term, value]) => (
              <div key={term}>
                <dt className="text-faint font-mono text-[9px] tracking-[0.08em] uppercase">{term}</dt>
                <dd className="text-muted mt-0.5">{value}</dd>
              </div>
            ))}
          </dl>

          {experiment.disclaimer && (
            <p className="border-accent bg-accent/5 text-muted mt-4 rounded-r border-l-2 px-3 py-2 text-[11.5px] leading-relaxed">
              {experiment.disclaimer}
            </p>
          )}

          {/* technical strip */}
          <div className="border-line text-faint mt-4 flex flex-col gap-1.5 border-t pt-3 font-mono text-[9px] tracking-[0.08em] uppercase">
            <span>Tech · {experiment.tech}</span>
            <span>Model · {experiment.interactionModel}</span>
            <span>Updated · {experiment.updated}</span>
            {experiment.related && (
              <Link href={experiment.related.href} className="text-accent hover:underline">
                → {experiment.related.label}
              </Link>
            )}
          </div>
        </aside>
      </div>

      {/* navigator — filtered to current view */}
      <div className="border-line relative border-t px-4 py-3 sm:px-5">
        <p className="text-faint mb-2 font-mono text-[9px] tracking-widest uppercase">Other modules</p>
        <div className="flex flex-wrap gap-1.5">
          {siblings.map((sibling) => {
            const isCurrent = sibling.id === experiment.id;
            return (
              <button
                key={sibling.id}
                type="button"
                aria-current={isCurrent ? 'true' : undefined}
                onClick={() => onSelect(sibling.id)}
                className={`rounded-md border px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.04em] uppercase transition-colors ${
                  isCurrent ? 'border-accent bg-surface-2 text-ink' : 'border-line text-muted hover:text-ink'
                }`}
              >
                <span className={isCurrent ? 'text-accent' : 'text-faint'}>{sibling.id.replace('OSN-LAB-', '')}</span>{' '}
                {sibling.name}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function LabBench() {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // sync state with URL search params
  const [filter, setFilter] = useState<FilterKey>((searchParams.get('filter') as FilterKey) || 'all');
  const [openId, setOpenId] = useState<string | null>(searchParams.get('exp') || null);
  const [inspectId, setInspectId] = useState<string | null>(null);
  const [event, setEvent] = useState<string | null>(null);

  const eventTimer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const benchRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const categories = useMemo(() => availableCategories(), []);
  const visible = useMemo(
    () => (filter === 'all' ? labExperiments : labExperiments.filter((e) => e.category === filter)),
    [filter]
  );

  const open = openId ? (labExperiments.find((e) => e.id === openId) ?? null) : null;

  // --- URL sync helpers ---
  const pushExpToUrl = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) {
        params.set('exp', id);
      } else {
        params.delete('exp');
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const pushFilterToUrl = useCallback(
    (key: FilterKey) => {
      const params = new URLSearchParams(searchParams.toString());
      if (key === 'all') {
        params.delete('filter');
      } else {
        params.set('filter', key);
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // --- open / close with URL sync + history ---
  const handleOpen = useCallback(
    (id: string) => {
      setOpenId(id);
      pushExpToUrl(id);
    },
    [pushExpToUrl]
  );

  const handleClose = useCallback(() => {
    const id = openId;
    setOpenId(null);
    pushExpToUrl(null);
    if (id) window.requestAnimationFrame(() => triggerRefs.current[id]?.focus());
  }, [openId, pushExpToUrl]);

  // handle back/forward browser navigation
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const exp = params.get('exp');
      const filt = (params.get('filter') as FilterKey) || 'all';
      setOpenId(exp);
      setFilter(filt);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // scroll bench panel into view after React renders it
  useEffect(() => {
    if (open) {
      // two rAFs: first lets React commit, second lets layout settle
      // requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        benchRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        // });
      });
    }
  }, [open, reduceMotion]);

  // Escape key closes the bench
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openId) {
        event.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openId, handleClose]);

  // if a filter change hides the open experiment, return to the index
  useEffect(() => {
    if (openId && !visible.some((e) => e.id === openId)) {
      setOpenId(null);
      pushExpToUrl(null);
    }
  }, [visible, openId, pushExpToUrl]);

  // move focus into the bench on open; restore to the trigger on close
  useEffect(() => {
    if (open) headingRef.current?.focus();
  }, [open]);

  useEffect(
    () => () => {
      if (eventTimer.current !== null) window.clearTimeout(eventTimer.current);
    },
    []
  );

  const pushEvent = (message: string) => {
    setEvent(message);
    if (eventTimer.current !== null) window.clearTimeout(eventTimer.current);
    eventTimer.current = window.setTimeout(() => setEvent(null), 1500);
  };

  const handleFilterChange = (key: FilterKey) => {
    setFilter(key);
    pushFilterToUrl(key);
  };

  const statusText = open
    ? (event ?? `${open.id} — RUNNING`)
    : inspectId
      ? `${inspectId} — INSPECTING`
      : 'BENCH — IDLE';

  const featured = filter === 'all' ? visible.find((e) => e.featured) : undefined;
  const rest = featured ? visible.filter((e) => e.id !== featured.id) : visible;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
      {/* control rail: filters + lab status — sticky beneath site header */}
      <div className="bg-paper/95 border-line sticky top-16 z-30 -mx-5 border-b px-5 py-3 backdrop-blur-sm sm:mx-0 sm:border-b sm:px-0">
        <div className="-mx-5 overflow-x-auto p-5 pt-0 sm:mx-0 sm:overflow-visible sm:px-0">
          <div
            role="group"
            aria-label="Filter experiments by category"
            className="flex w-max gap-2 sm:w-auto sm:flex-wrap"
          >
            {categories.map((category) => {
              const active = filter === category.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleFilterChange(category.key)}
                  className={`relative rounded-full border px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
                    active ? 'border-ink text-paper' : 'border-line text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : 'lab-filter-pill'}
                      className="bg-ink absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {category.label} <span className={active ? 'opacity-60' : 'opacity-50'}>{category.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <StatusLine text={statusText} />
      </div>

      {/* index ↔ open bench */}
      <div ref={benchRef} className="pt-8">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="bench">
              <OpenBench
                experiment={open}
                siblings={visible}
                onClose={handleClose}
                onSelect={(id) => {
                  setOpenId(id);
                  pushExpToUrl(id);
                }}
                onEvent={pushEvent}
                headingRef={headingRef}
              />
            </motion.div>
          ) : (
            <motion.div
              key="index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              {featured && (
                <ExperimentCard
                  experiment={featured}
                  featured
                  onOpen={handleOpen}
                  onInspect={setInspectId}
                  registerTrigger={(id, el) => (triggerRefs.current[id] = el)}
                />
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {rest.map((experiment) => (
                    <ExperimentCard
                      key={experiment.id}
                      experiment={experiment}
                      onOpen={handleOpen}
                      onInspect={setInspectId}
                      registerTrigger={(id, el) => (triggerRefs.current[id] = el)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
