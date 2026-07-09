'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';

import { ArtifactVisual } from '@/components/projects/ArtifactVisual';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { artifactFilters, artifacts, matchesFilter, type Artifact, type ArtifactFilterKey } from '@/data/artifacts';

function ArtifactLinks({ links }: { links: Artifact['links'] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {links.map((link) => {
        const className = `rounded-md px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors ${
          link.primary ? 'bg-ink text-paper hover:bg-accent' : 'border-ink hover:bg-ink hover:text-paper border'
        }`;
        return link.external ? (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
            {link.label} ↗
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

function ArtifactRow({ artifact, open, onToggle }: { artifact: Artifact; open: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();
  const panelId = `artifact-panel-${artifact.slug}`;
  const headingId = `artifact-heading-${artifact.slug}`;

  return (
    <motion.div
      layout={!reduceMotion}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`overflow-hidden ${open ? 'module-card my-4' : 'border-line hover:bg-surface border-b transition-colors'}`}
    >
      <h3 id={headingId} className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
        >
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-accent font-mono text-[11px] font-medium tracking-[0.08em]">{artifact.id}</span>
            <span
              className={`font-semibold tracking-[-0.01em] ${open ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
            >
              {artifact.name}
            </span>
            <span className="text-faint font-mono text-[10.5px] tracking-[0.06em] uppercase">
              {artifact.typeLabel} · {artifact.year}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="hidden sm:block">
              <StatusBadge tone={artifact.statusTone}>{artifact.status}</StatusBadge>
            </span>
            <span className="text-faint text-base font-semibold" aria-hidden="true">
              {open ? '−' : '+'}
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
          >
            <div className="grid gap-4 px-4 pb-3 sm:px-5 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <p className="text-faint font-mono text-[10px] tracking-widest uppercase">
                  Problem — {artifact.problem}
                </p>
                <p className="text-muted text-[13px] leading-relaxed">{artifact.summary}</p>
                <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
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
              </div>
              <div className="bg-surface-2 border-line min-h-30 rounded-lg border p-3">
                <ArtifactVisual visual={artifact.visual} />
              </div>
            </div>
            <div className="px-4 pb-5 sm:px-5">
              <ArtifactLinks links={artifact.links} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ArtifactIndex() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<ArtifactFilterKey>('all');
  const [query, setQuery] = useState('');
  const [openSlug, setOpenSlug] = useState<string | null>('shadyside');

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

  return (
    <div>
      {/* controls */}
      <div className="border-line flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:overflow-visible lg:px-0">
          <div role="group" aria-label="Filter artifacts by type" className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
            {artifactFilters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.key)}
                  className={`relative rounded-full border px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
                    active ? 'border-ink text-paper' : 'border-line text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : 'filter-pill'}
                      className="bg-ink absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className={active ? 'opacity-60' : 'opacity-50'}>{counts[f.key]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative lg:w-64">
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

      {/* rows */}
      <LayoutGroup>
        <div className="min-h-75">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((artifact) => (
              <ArtifactRow
                key={artifact.slug}
                artifact={artifact}
                open={openSlug === artifact.slug}
                onToggle={() => setOpenSlug((current) => (current === artifact.slug ? null : artifact.slug))}
              />
            ))}
          </AnimatePresence>

          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-line-strong text-faint mt-6 grid place-items-center gap-2 rounded-xl border-[1.5px] border-dashed px-6 py-16 text-center"
            >
              <p className="font-mono text-[11px] tracking-widest uppercase">No artifacts match this bench query</p>
              <p className="text-[13px]">
                Nothing indexed under “{query}”.{' '}
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setFilter('all');
                  }}
                  className="text-accent underline underline-offset-4"
                >
                  Reset the index
                </button>
                .
              </p>
            </motion.div>
          )}
        </div>
      </LayoutGroup>
    </div>
  );
}
