'use client';

import { useMemo, useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { SIGNAL_SLOTS, stackItems, TOTAL_CELLS, type StackItem } from '@/data/stackfield';

type Cell = { index: number } & ({ type: 'item'; item: StackItem } | { type: 'signal' });

function buildCells(): Cell[] {
  const cells: Cell[] = [];
  let itemCursor = 0;
  for (let index = 0; index < TOTAL_CELLS; index++) {
    if (SIGNAL_SLOTS.includes(index)) {
      cells.push({ index, type: 'signal' });
    } else {
      cells.push({ index, type: 'item', item: stackItems[itemCursor++] });
    }
  }
  return cells;
}

const kindTone: Record<StackItem['kind'], string> = {
  stack: 'text-ink',
  artifact: 'text-accent',
  practice: 'text-ok',
};

/**
 * Minesweeper-inspired "reveal the stack" grid — no bombs, no failure.
 * Every cell is a real button; the full list also exists as sr-only text in
 * the footer so nothing is click-gated for screen readers. Nothing persists.
 */
export function Stackfield() {
  const reduceMotion = useReducedMotion();
  const cells = useMemo(() => buildCells(), []);
  const [revealed, setRevealed] = useState<ReadonlySet<number>>(new Set());

  const revealedItems = cells.filter((c) => c.type === 'item' && revealed.has(c.index)).length;
  const allRevealed = revealed.size === TOTAL_CELLS;

  const reveal = (index: number) =>
    setRevealed((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="label-mono text-faint">
          Stackfield — tap to survey the stack
          <span aria-hidden="true"> · </span>
          <span aria-live="polite" className="text-muted">
            {revealedItems}/{stackItems.length} found
          </span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRevealed(new Set(cells.map((c) => c.index)))}
            disabled={allRevealed}
            className="border-line text-muted hover:border-accent hover:text-accent rounded-md border px-2.5 py-1.5 font-mono text-[9.5px] font-medium tracking-[0.08em] uppercase transition-colors disabled:opacity-40"
          >
            Reveal all
          </button>
          <button
            type="button"
            onClick={() => setRevealed(new Set())}
            disabled={revealed.size === 0}
            className="border-line text-muted hover:border-accent hover:text-accent rounded-md border px-2.5 py-1.5 font-mono text-[9.5px] font-medium tracking-[0.08em] uppercase transition-colors disabled:opacity-40"
          >
            Reset
          </button>
        </div>
      </div>

      <div role="group" aria-label="Stack discovery grid" className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
        {cells.map((cell) => {
          const isRevealed = revealed.has(cell.index);
          const label = cell.type === 'item' ? cell.item.label : 'Signal cell — nothing buried here';
          return (
            <button
              key={cell.index}
              type="button"
              aria-pressed={isRevealed}
              aria-label={isRevealed ? label : `Hidden cell ${cell.index + 1} of ${TOTAL_CELLS} — activate to reveal`}
              onClick={() => reveal(cell.index)}
              className={`group relative aspect-square min-h-14 rounded-md border transition-all duration-150 ${
                isRevealed
                  ? 'border-line bg-surface-2 translate-y-px cursor-default shadow-none'
                  : 'border-line-strong bg-surface shadow-[0_2px_0_var(--line)] hover:-translate-y-px hover:shadow-[0_3px_0_var(--line)]'
              }`}
            >
              {isRevealed ? (
                cell.type === 'item' ? (
                  <motion.span
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-1"
                  >
                    <span
                      aria-hidden="true"
                      className={`font-mono text-[13px] leading-none font-semibold ${kindTone[cell.item.kind]}`}
                    >
                      {cell.item.glyph}
                    </span>
                    <span className="text-muted max-w-full truncate px-0.5 text-center font-mono text-[8px] leading-tight tracking-[0.02em] uppercase">
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
                      className="bg-ok size-1.5 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--ok)_18%,transparent)]"
                    />
                  </motion.span>
                )
              ) : (
                <span
                  aria-hidden="true"
                  className="text-faint group-hover:text-accent absolute inset-0 flex items-center justify-center font-mono text-[11px] transition-colors"
                >
                  ▚
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
