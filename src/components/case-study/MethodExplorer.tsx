'use client';

import { useState } from 'react';

export interface MethodStage {
  label: string;
  detail: string;
}

/**
 * A lightweight method explorer for research case studies: step through the
 * pipeline stages, each with a short plain-language explanation. Keyboard
 * accessible; no essential information is animation-dependent.
 */
export function MethodExplorer({ stages, note }: { stages: MethodStage[]; note?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="module-card overflow-hidden">
      <div className="border-line text-faint flex items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[9.5px] font-medium tracking-widest uppercase">
        <span>Interactive explanation — method</span>
        <span className="text-accent">Illustrative pipeline</span>
      </div>

      {/* pipeline nodes */}
      <div className="bg-surface-2 overflow-x-auto px-4 py-5">
        <ol className="flex min-w-max items-center gap-1" aria-label="Method stages">
          {stages.map((stage, i) => {
            const isActive = active === i;
            return (
              <li key={stage.label} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-[10.5px] font-medium tracking-[0.04em] uppercase transition-colors ${
                    isActive
                      ? 'border-accent bg-accent text-white'
                      : i < active
                        ? 'border-ok/40 text-ok'
                        : 'border-line text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  <span className={isActive ? 'text-white/70' : 'opacity-60'}>{String(i + 1).padStart(2, '0')}</span>
                  {stage.label}
                </button>
                {i < stages.length - 1 && (
                  <span aria-hidden="true" className="text-line-strong px-1 font-mono text-xs">
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* active stage detail */}
      <div className="p-4" aria-live="polite">
        <p className="text-accent font-mono text-[10px] font-medium tracking-widest uppercase">
          Stage {String(active + 1).padStart(2, '0')} — {stages[active].label}
        </p>
        <p className="text-muted mt-2 max-w-2xl text-[13.5px] leading-relaxed">{stages[active].detail}</p>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="border-line hover:border-ink inline-flex min-h-9 items-center rounded-md border px-3 font-mono text-[10.5px] tracking-[0.06em] uppercase transition-colors disabled:opacity-40"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => setActive((a) => Math.min(stages.length - 1, a + 1))}
            disabled={active === stages.length - 1}
            className="border-line hover:border-ink inline-flex min-h-9 items-center rounded-md border px-3 font-mono text-[10.5px] tracking-[0.06em] uppercase transition-colors disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>

      {note && (
        <p className="border-line text-faint border-t px-4 py-2.5 font-mono text-[9px] leading-4 tracking-[0.06em] uppercase">
          {note}
        </p>
      )}
    </div>
  );
}
