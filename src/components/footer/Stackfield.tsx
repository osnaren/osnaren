'use client';

import { useEffect, useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import {
  categoryLabel,
  SIGNAL_SLOTS,
  stackItems,
  TOTAL_CELLS,
  type StackCategory,
  type StackItem,
} from '@/data/stackfield';

type CellContent = { type: 'item'; item: StackItem } | { type: 'signal' };
type Cell = CellContent & { index: number };

/**
 * Build the 28-cell deck. The unshuffled layout (signal cells at fixed slots)
 * is what renders on the server and the first client paint — since hidden
 * cells look identical, that keeps hydration clean. `shuffle` (Fisher-Yates)
 * is applied only after mount and on reset, so the buried field is arranged
 * fresh every visit without ever tripping a hydration mismatch.
 */
function buildCells(shuffle: boolean): Cell[] {
  const deck: CellContent[] = [];
  let itemCursor = 0;
  for (let slot = 0; slot < TOTAL_CELLS; slot++) {
    if (SIGNAL_SLOTS.includes(slot)) deck.push({ type: 'signal' });
    else deck.push({ type: 'item', item: stackItems[itemCursor++] });
  }
  if (shuffle) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  return deck.map((content, index) => ({ ...content, index }));
}

const categoryTone: Record<StackCategory, string> = {
  frontend: 'text-ink',
  tool: 'text-muted',
  research: 'text-amber',
  product: 'text-accent',
  design: 'text-ink',
  life: 'text-ok',
};

const categoryDot: Record<StackCategory, string> = {
  frontend: 'bg-ink',
  tool: 'bg-faint',
  research: 'bg-amber',
  product: 'bg-accent',
  design: 'bg-ink',
  life: 'bg-ok',
};

const railButton =
  'border-line/80 text-faint hover:border-accent hover:text-accent rounded border px-2 py-1 font-mono text-[9px] font-medium tracking-[0.08em] uppercase transition-colors disabled:opacity-35 disabled:hover:border-line/80 disabled:hover:text-faint';

/**
 * The Stackfield: a field of data buried under the footer grid. Hidden cells
 * are etched into the background — transparent, hairline borders, faint
 * diagonal glyphs — and only become solid token cards once revealed. No
 * bombs, no failure; the sr-only stack list in the footer means nothing is
 * click-gated for screen readers. Nothing persists across visits.
 */
export function Stackfield() {
  const reduceMotion = useReducedMotion();
  // deterministic on SSR + first paint, then shuffled once mounted
  const [cells, setCells] = useState<Cell[]>(() => buildCells(false));
  const [revealed, setRevealed] = useState<ReadonlySet<number>>(new Set());
  const [lastFound, setLastFound] = useState<StackItem | null>(null);

  useEffect(() => {
    setCells(buildCells(true));
  }, []);

  const revealedItems = cells.filter((c) => c.type === 'item' && revealed.has(c.index)).length;
  const allRevealed = revealed.size === TOTAL_CELLS;

  const reveal = (cell: Cell) => {
    setRevealed((current) => {
      if (current.has(cell.index)) return current;
      const next = new Set(current);
      next.add(cell.index);
      return next;
    });
    if (cell.type === 'item' && !revealed.has(cell.index)) setLastFound(cell.item);
  };

  return (
    <div>
      {/* survey rail: label, count, controls */}
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-faint font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase">
          ⌁ Stackfield — survey the substrate ·{' '}
          <span aria-live="polite" className="text-muted">
            {revealedItems}/{stackItems.length}
          </span>
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setRevealed(new Set(cells.map((c) => c.index)));
              setLastFound(null);
            }}
            disabled={allRevealed}
            className={railButton}
          >
            Reveal all
          </button>
          <button
            type="button"
            onClick={() => {
              setRevealed(new Set());
              setLastFound(null);
              setCells(buildCells(true)); // re-bury in a fresh arrangement
            }}
            disabled={revealed.size === 0}
            className={railButton}
          >
            Reset
          </button>
        </div>
      </div>

      <div role="group" aria-label="Stack discovery grid" className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
        {cells.map((cell, cellOrder) => {
          const isRevealed = revealed.has(cell.index);
          const label = cell.type === 'item' ? cell.item.label : 'Signal cell — nothing buried here';
          return (
            <motion.button
              key={cell.index}
              type="button"
              aria-pressed={isRevealed}
              aria-label={isRevealed ? label : `Hidden cell ${cell.index + 1} of ${TOTAL_CELLS} — activate to reveal`}
              onClick={() => reveal(cell)}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : (cellOrder % 7) * 0.04 + Math.floor(cellOrder / 7) * 0.06,
              }}
              className={`group relative aspect-square min-h-13 rounded-sm transition-colors duration-200 ${
                isRevealed
                  ? cell.type === 'item'
                    ? 'border-line-strong bg-surface cursor-default border shadow-[0_2px_0_var(--line)]'
                    : 'border-line/60 cursor-default border border-dashed bg-transparent'
                  : 'border-line/70 hover:border-accent/50 hover:bg-accent/4 focus-visible:border-accent/50 border bg-transparent'
              }`}
            >
              {isRevealed ? (
                cell.type === 'item' ? (
                  <motion.span
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-1"
                  >
                    <span
                      aria-hidden="true"
                      className={`size-1 shrink-0 rounded-full ${categoryDot[cell.item.category]} absolute top-1.5 right-1.5 opacity-70`}
                    />
                    <span
                      aria-hidden="true"
                      className={`font-mono text-[13px] leading-none font-semibold ${categoryTone[cell.item.category]}`}
                    >
                      {cell.item.glyph}
                    </span>
                    <span className="text-muted max-w-full truncate px-0.5 text-center font-mono text-[7.5px] leading-tight tracking-[0.02em] uppercase">
                      {cell.item.label}
                    </span>
                  </motion.span>
                ) : (
                  <motion.span
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-ok/70 size-1 rounded-full shadow-[0_0_0_3px_color-mix(in_srgb,var(--ok)_14%,transparent)]"
                    />
                  </motion.span>
                )
              ) : (
                <span
                  aria-hidden="true"
                  className="text-faint/45 group-hover:text-accent group-focus-visible:text-accent absolute inset-0 flex items-center justify-center font-mono text-[10px] transition-colors"
                >
                  ▚
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* discovery readout — metadata for the latest find */}
      <p
        aria-live="polite"
        className="text-faint mt-2.5 min-h-4 truncate font-mono text-[9px] tracking-widest uppercase"
      >
        {lastFound ? (
          <>
            <span className="text-accent">Discovered: {lastFound.label}</span>
            <span aria-hidden="true"> · </span>
            Type: {categoryLabel[lastFound.category]}
            {lastFound.usedIn && (
              <>
                <span aria-hidden="true"> · </span>
                Used in: {lastFound.usedIn}
              </>
            )}
          </>
        ) : allRevealed ? (
          <>Substrate fully surveyed — {stackItems.length} items catalogued</>
        ) : (
          <>Awaiting survey…</>
        )}
      </p>
    </div>
  );
}
