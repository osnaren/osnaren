'use client';

import Link from 'next/link';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ArtifactVisual } from '@/components/projects/ArtifactVisual';
import { StatusBadge } from '@/components/ui/StatusBadge';

import type { Artifact } from '@/data/artifacts';

/** The living artifact preview — a small evidence board that re-assembles as the
 *  active artifact changes. Only the mounted (active) preview animates. */
export function ArtifactPreview({
  artifact,
  position,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  artifact: Artifact;
  position: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const primary = artifact.links.find((link) => link.primary) ?? artifact.links[0];
  const secondary = artifact.links.filter((link) => link !== primary).slice(0, 2);
  const idNumber = artifact.id.split('-')[1] ?? artifact.id;

  return (
    <div className="module-card relative overflow-hidden">
      {/* oversized artifact number, subtly behind */}
      <span
        aria-hidden="true"
        className="text-line-strong/40 pointer-events-none absolute -top-3 right-2 font-mono text-7xl font-semibold tracking-tighter select-none"
      >
        {idNumber}
      </span>

      {/* header: id · status · navigator */}
      <div className="border-line relative flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="bg-ok size-1.5 shrink-0 rounded-full" aria-hidden="true" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={artifact.id}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className="text-accent font-mono text-[11px] font-medium tracking-[0.08em]"
            >
              {artifact.id}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-faint font-mono text-[10px] tracking-[0.08em] tabular-nums" aria-live="off">
            {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Previous artifact"
              className="border-line hover:border-ink grid size-7 place-items-center rounded-md border transition-colors disabled:opacity-35 disabled:hover:border-line"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              aria-label="Next artifact"
              className="border-line hover:border-ink grid size-7 place-items-center rounded-md border transition-colors disabled:opacity-35 disabled:hover:border-line"
            >
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* stage: framed visual with coordinate ticks + scan sweep */}
      <div className="bg-surface-2 relative h-56 overflow-hidden">
        <div
          className="text-faint pointer-events-none absolute inset-x-3 top-2 flex justify-between font-mono text-[7px]"
          aria-hidden="true"
        >
          {['00', '02', '04', '06', '08'].map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div
          className="border-accent/40 pointer-events-none absolute top-3 left-3 size-3 border-t border-l"
          aria-hidden="true"
        />
        <div
          className="border-accent/40 pointer-events-none absolute right-3 bottom-3 size-3 border-r border-b"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={artifact.id}
            initial={reduceMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute inset-0 grid place-items-center p-6"
          >
            <ArtifactVisual visual={artifact.visual} />
          </motion.div>
        </AnimatePresence>

        {!reduceMotion && (
          <span
            key={`scan-${artifact.id}`}
            aria-hidden="true"
            className="opacity-0 via-accent/50 pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-transparent to-transparent animate-[scan-sweep_0.9s_ease-out]"
          />
        )}
      </div>

      {/* metadata + CTA */}
      <div className="p-4 pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] leading-snug">{artifact.name}</h2>
            <p className="text-faint mt-1 font-mono text-[9.5px] tracking-widest uppercase">
              {artifact.typeLabel} · {artifact.year}
            </p>
          </div>
          <StatusBadge tone={artifact.statusTone}>{artifact.status}</StatusBadge>
        </div>

        <p className="text-muted mt-2.5 text-[12.5px] leading-relaxed">{artifact.problem}.</p>

        <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Tags">
          {artifact.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="border-line text-faint rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium tracking-[0.06em] uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          {primary &&
            (primary.external ? (
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-paper hover:bg-accent inline-flex min-h-10 items-center gap-2 rounded-md px-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors"
              >
                {primary.label} <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Link
                href={primary.href}
                className="bg-ink text-paper hover:bg-accent inline-flex min-h-10 items-center gap-2 rounded-md px-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors"
              >
                {primary.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          {secondary.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink hover:bg-ink hover:text-paper inline-flex min-h-10 items-center gap-2 rounded-md border px-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors"
              >
                {link.label} <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="border-ink hover:bg-ink hover:text-paper inline-flex min-h-10 items-center gap-2 rounded-md border px-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors"
              >
                {link.label} <span aria-hidden="true">→</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
