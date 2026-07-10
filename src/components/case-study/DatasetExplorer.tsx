'use client';

import { useState } from 'react';

export interface DatasetClass {
  name: string;
  /** verified image/sample count for this class */
  count: number;
  /** optional detail: subclasses, condition name, etc. */
  detail?: string;
}

/**
 * Dataset explorer: pick a class, see its verified share of the corpus, and a
 * clearly-labelled illustrative sample tile. Distribution bars use verified
 * counts only; the sample tiles are abstract swatches, never real medical scans.
 */
/** Locale-independent thousands grouping so server and client render identically. */
const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function DatasetExplorer({
  classes,
  unit = 'images',
  accentTone = 'accent',
}: {
  classes: DatasetClass[];
  unit?: string;
  accentTone?: 'accent' | 'ok';
}) {
  const [active, setActive] = useState(0);
  const total = classes.reduce((sum, c) => sum + c.count, 0);
  const max = Math.max(...classes.map((c) => c.count));
  const current = classes[active];
  const bar = accentTone === 'ok' ? 'var(--ok)' : 'var(--accent)';

  return (
    <div className="module-card overflow-hidden">
      <div className="border-line text-faint flex items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[9.5px] font-medium tracking-widest uppercase">
        <span>Interactive explanation — dataset</span>
        <span className="text-ok">Verified counts · illustrative tiles</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_240px]">
        {/* distribution */}
        <div className="p-4">
          <p className="text-faint font-mono text-[9.5px] tracking-[0.08em] uppercase">
            Class distribution · {fmt(total)} {unit} · {classes.length} classes
          </p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {classes.map((c, i) => {
              const isActive = active === i;
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex w-full items-center gap-3 rounded px-1 py-1 text-left"
                  >
                    <span
                      className={`w-28 shrink-0 truncate font-mono text-[11px] ${isActive ? 'text-ink font-medium' : 'text-muted group-hover:text-ink'}`}
                    >
                      {c.name}
                    </span>
                    <span className="bg-surface-2 relative h-3.5 flex-1 overflow-hidden rounded-sm">
                      <span
                        className="absolute inset-y-0 left-0 rounded-sm transition-opacity"
                        style={{ width: `${(c.count / max) * 100}%`, background: bar, opacity: isActive ? 1 : 0.42 }}
                      />
                    </span>
                    <span className="text-faint w-14 shrink-0 text-right font-mono text-[10px] tabular-nums">
                      {fmt(c.count)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* selected class panel + illustrative tile */}
        <div className="border-line bg-surface-2 border-t p-4 lg:border-t-0 lg:border-l" aria-live="polite">
          <p className="text-accent font-mono text-[10px] font-medium tracking-widest uppercase">Selected class</p>
          <p className="mt-1.5 text-[15px] font-semibold">{current.name}</p>
          {current.detail && <p className="text-muted mt-1 text-[12px] leading-relaxed">{current.detail}</p>}
          <p className="text-faint mt-2 font-mono text-[10px] tracking-[0.06em] uppercase">
            {fmt(current.count)} {unit} · {((current.count / total) * 100).toFixed(1)}% of corpus
          </p>

          {/* abstract illustrative sample grid — never a real scan */}
          <div className="mt-3 grid grid-cols-4 gap-1" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => {
              const tones = ['var(--well)', bar, 'var(--well)', 'var(--line-strong)'];
              const tone = i % 3 === 0 ? bar : tones[i % tones.length];
              return (
                <span
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{ background: tone, opacity: i % 3 === 0 ? 0.5 : 0.9 }}
                />
              );
            })}
          </div>
          <p className="text-faint mt-2 font-mono text-[8.5px] leading-3 tracking-[0.06em] uppercase">
            Illustrative tiles — not real samples
          </p>
        </div>
      </div>
    </div>
  );
}
