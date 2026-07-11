'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';

import { ArtifactPreview } from '@/components/projects/ArtifactPreview';
import { ArtifactVisual } from '@/components/projects/ArtifactVisual';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { artifactFilters, artifacts, matchesFilter, type Artifact, type ArtifactFilterKey } from '@/data/artifacts';

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
}

function ArtifactLinks({ links }: { links: Artifact['links'] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {links.map((link) => {
        const className = `inline-flex min-h-10 items-center rounded-md px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors ${
          link.primary ? 'bg-ink text-paper hover:bg-accent' : 'border-ink hover:bg-ink hover:text-paper border'
        }`;
        return link.external ? (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
            {link.label} ↗<span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Link key={link.label} href={link.href} className={className}>
            {link.label} →
          </Link>
        );
      })}
    </div>
  );
}

function ArtifactRow({
  artifact,
  open,
  active,
  onToggle,
  onSelect,
  onScrollActive,
  registerRef,
}: {
  artifact: Artifact;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onSelect: (slug: string) => void;
  onScrollActive: (slug: string) => void;
  registerRef: (slug: string, el: HTMLElement | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const panelId = `artifact-panel-${artifact.slug}`;
  const headingId = `artifact-heading-${artifact.slug}`;

  // scroll drives the active preview unless a deliberate selection has the lock
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    registerRef(artifact.slug, element);
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && onScrollActive(artifact.slug), {
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0,
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      registerRef(artifact.slug, null);
    };
  }, [artifact.slug, onScrollActive, registerRef]);

  return (
    <motion.li
      ref={ref}
      layout={!reduceMotion}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onPointerEnter={() => onSelect(artifact.slug)}
      onFocusCapture={() => onSelect(artifact.slug)}
      className={`border-line relative border-b transition-colors ${active ? 'bg-surface' : 'hover:bg-surface/60'}`}
    >
      {/* active scan marker */}
      <span
        aria-hidden="true"
        className={`bg-accent absolute top-0 bottom-0 left-0 w-0.75 origin-top transition-transform duration-200 ${
          active ? 'scale-y-100' : 'scale-y-0'
        }`}
      />

      <h3 id={headingId} className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
        >
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-accent font-mono text-[11px] font-medium tracking-[0.08em] tabular-nums">
              {artifact.id}
            </span>
            <span className="text-base font-semibold tracking-[-0.01em] sm:text-lg">{artifact.name}</span>
            <span className="text-faint font-mono text-[10.5px] tracking-[0.06em] uppercase">
              {artifact.typeLabel} · {artifact.year}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="hidden sm:block">
              <StatusBadge tone={artifact.statusTone}>{artifact.status}</StatusBadge>
            </span>
            <span
              aria-hidden="true"
              className={`text-faint grid size-6 place-items-center rounded border text-base font-semibold transition-transform ${
                open ? 'border-accent text-accent rotate-45' : 'border-line'
              }`}
            >
              +
            </span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 px-4 pb-4 sm:px-5">
              <p className="text-faint font-mono text-[10px] tracking-widest uppercase">Problem — {artifact.problem}</p>
              <p className="text-muted max-w-2xl text-[13px] leading-relaxed">{artifact.summary}</p>

              {/* inline preview — mobile only; desktop uses the sticky stage */}
              <div className="bg-surface-2 border-line relative mt-1 h-40 overflow-hidden rounded-lg border lg:hidden">
                <div className="grid h-full place-items-center p-5">
                  <ArtifactVisual visual={artifact.visual} />
                </div>
              </div>

              <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Tags">
                {artifact.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-line text-faint rounded-full border px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-[0.06em] uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="sm:hidden">
                <StatusBadge tone={artifact.statusTone}>{artifact.status}</StatusBadge>
              </div>
              <div className="mt-1">
                <ArtifactLinks links={artifact.links} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function ArtifactIndex() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<ArtifactFilterKey>('all');
  const [query, setQuery] = useState('');
  const [openSlug, setOpenSlug] = useState<string | null>('shadyside');
  const [activeSlug, setActiveSlug] = useState('shadyside');

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('filter');
    if (artifactFilters.some((item) => item.key === requested)) setFilter(requested as ArtifactFilterKey);
  }, []);

  const rowRefs = useRef<Record<string, HTMLElement | null>>({});
  const listRef = useRef<HTMLOListElement>(null);
  const registerRef = useCallback((slug: string, el: HTMLElement | null) => {
    rowRefs.current[slug] = el;
  }, []);

  // deliberate selection (hover / focus / arrows) briefly outranks scroll-driven
  // updates so the preview never fights the visitor
  const lockRef = useRef(0);
  const selectActive = useCallback((slug: string, lockMs = 800) => {
    lockRef.current = Date.now() + lockMs;
    setActiveSlug(slug);
  }, []);
  const scrollActive = useCallback((slug: string) => {
    if (Date.now() < lockRef.current) return;
    setActiveSlug(slug);
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        artifactFilters.map((f) => [f.key, artifacts.filter((a) => matchesFilter(a, f.key)).length])
      ) as Record<ArtifactFilterKey, number>,
    []
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return artifacts.filter((artifact) => {
      if (!matchesFilter(artifact, filter)) return false;
      if (!needle) return true;
      const haystack = [
        artifact.id,
        artifact.name,
        artifact.typeLabel,
        artifact.problem,
        artifact.summary,
        ...artifact.tags,
        ...(artifact.keywords ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [filter, query]);

  // keep the preview pointed at a valid artifact after filtering/searching
  useEffect(() => {
    if (visible.length && !visible.some((artifact) => artifact.slug === activeSlug)) {
      setActiveSlug(visible[0].slug);
    }
  }, [visible, activeSlug]);

  // scroll to top of list when filter or query changes
  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, [filter, query, reduceMotion]);

  // live refs so the keyboard navigator never reads stale state
  const navRef = useRef({ visible, activeSlug });
  useEffect(() => {
    navRef.current = { visible, activeSlug };
  }, [visible, activeSlug]);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      const { visible: list, activeSlug: current } = navRef.current;
      if (!list.length) return;
      const index = Math.max(
        0,
        list.findIndex((artifact) => artifact.slug === current)
      );
      const next = index + direction;
      if (next < 0 || next >= list.length) return;
      const slug = list[next].slug;
      selectActive(slug, 900);
      rowRefs.current[slug]?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    },
    [reduceMotion, selectActive]
  );

  // arrow-key navigation, only when focus isn't in a form control
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target))
        return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        navigate(1);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  const activeArtifact = visible.find((a) => a.slug === activeSlug) ?? visible[0] ?? artifacts[0];
  const activeIndex = visible.findIndex((a) => a.slug === activeArtifact?.slug);

  const activeFilterLabel = artifactFilters.find((f) => f.key === filter)?.label ?? 'All';
  const queryState = query.trim()
    ? `${visible.length} ${visible.length === 1 ? 'result' : 'results'} · Search: ${query.trim()}`
    : filter === 'all'
      ? `${visible.length} artifacts · Full index`
      : `${visible.length} ${visible.length === 1 ? 'result' : 'results'} · Filter: ${activeFilterLabel}`;

  const resetIndex = () => {
    setQuery('');
    setFilter('all');
  };

  return (
    <div>
      {/* control rail — sticky beneath the site header */}
      <div className="bg-paper/95 border-line sticky top-16 z-30 -mx-5 border-b px-5 py-3 backdrop-blur-sm sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-5 overflow-x-auto p-5 pt-0 lg:mx-0 lg:overflow-visible lg:px-0">
            <div role="group" aria-label="Filter artifacts by type" className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
              {artifactFilters.map((f) => {
                const isActive = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(f.key)}
                    className={`relative rounded-full border px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
                      isActive
                        ? 'border-ink text-paper'
                        : 'border-line text-muted hover:border-line-strong hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={reduceMotion ? undefined : 'filter-pill'}
                        className="bg-ink absolute inset-0 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {f.label} <span className={isActive ? 'opacity-60' : 'opacity-50'}>{counts[f.key]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative lg:w-64 lg:shrink-0">
            <label htmlFor="artifact-search" className="sr-only">
              Search artifacts
            </label>
            <input
              id="artifact-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search artifacts…"
              className="border-line bg-surface focus:border-accent placeholder:text-faint w-full rounded-md border py-2.5 pr-3 pl-9 font-mono text-[12px] outline-none"
            />
            <span
              aria-hidden="true"
              className="text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[12px]"
            >
              ⌕
            </span>
          </div>
        </div>

        {/* active-query state */}
        <div className="mt-2.5 flex items-center justify-between gap-3">
          <p
            data-testid="query-state"
            className="text-faint font-mono text-[10px] font-medium tracking-widest uppercase"
            aria-live="polite"
          >
            <span className="text-accent">▸</span> {queryState}
          </p>
          {(filter !== 'all' || query.trim()) && (
            <button
              type="button"
              onClick={resetIndex}
              className="text-faint hover:text-accent font-mono text-[9.5px] tracking-[0.08em] uppercase underline-offset-4 hover:underline"
            >
              Reset index
            </button>
          )}
        </div>
      </div>

      {/* scanner: index + sticky preview stage */}
      <div className="grid gap-8 pt-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
        <div className="min-h-75">
          <LayoutGroup>
            <ol ref={listRef} className="border-line list-none border-t">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((artifact) => (
                  <ArtifactRow
                    key={artifact.slug}
                    artifact={artifact}
                    open={openSlug === artifact.slug}
                    active={activeSlug === artifact.slug}
                    onSelect={selectActive}
                    onScrollActive={scrollActive}
                    onToggle={() => {
                      selectActive(artifact.slug, 900);
                      setOpenSlug((current) => (current === artifact.slug ? null : artifact.slug));
                    }}
                    registerRef={registerRef}
                  />
                ))}
              </AnimatePresence>
            </ol>
          </LayoutGroup>

          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-line-strong text-faint mt-6 grid place-items-center gap-3 rounded-xl border-[1.5px] border-dashed px-6 py-16 text-center"
            >
              {' '}
              {/* scanner empty state icon */}
              <svg viewBox="0 0 80 80" className="mb-1 h-16 w-16 opacity-30" aria-hidden="true">
                <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle
                  cx="40"
                  cy="40"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <circle cx="40" cy="40" r="4" fill="currentColor" />
                <line x1="40" y1="4" x2="40" y2="16" stroke="currentColor" strokeWidth="1" />
                <line x1="40" y1="64" x2="40" y2="76" stroke="currentColor" strokeWidth="1" />
                <line x1="4" y1="40" x2="16" y2="40" stroke="currentColor" strokeWidth="1" />
                <line x1="64" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="1" />
              </svg>{' '}
              <p className="font-mono text-[11px] tracking-widest uppercase">No artifacts match this scan.</p>
              {query.trim() && <p className="text-[13px]">Nothing indexed under “{query.trim()}”.</p>}
              <button
                type="button"
                onClick={resetIndex}
                className="border-ink hover:bg-ink hover:text-paper mt-1 rounded-md border px-4 py-2 font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase transition-colors"
              >
                Reset index
              </button>
            </motion.div>
          )}
        </div>

        {/* right: living preview stage */}
        {activeArtifact && (
          <aside className="hidden lg:block" aria-label="Artifact preview">
            <div className="sticky top-60">
              <ArtifactPreview
                artifact={activeArtifact}
                position={activeIndex + 1}
                total={visible.length}
                onPrev={() => navigate(-1)}
                onNext={() => navigate(1)}
                canPrev={activeIndex > 0}
                canNext={activeIndex < visible.length - 1}
              />
              <p className="text-faint mt-3 px-1 font-mono text-[9px] leading-4 tracking-[0.08em] uppercase">
                Previews are designed schematics. Use ← / → to scan.
              </p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
