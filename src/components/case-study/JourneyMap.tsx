'use client';

import { useState } from 'react';

export interface JourneyStep {
  label: string;
  caption: string;
  /** the states / edge cases the frontend must actually handle */
  states?: string[];
}

/** A public-safe customer-journey map built from generic system states. */
export function JourneyMap({ steps, kicker = 'Customer journey' }: { steps: JourneyStep[]; kicker?: string }) {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <div className="module-card overflow-hidden">
      <div className="border-line text-faint flex items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[9.5px] font-medium tracking-widest uppercase">
        <span>{kicker} — generic system map</span>
        <span className="text-accent">Illustrative, non-proprietary</span>
      </div>

      {/* flow of generic blocks */}
      <div className="bg-surface-2 overflow-x-auto px-4 py-5">
        <ol className="flex min-w-max items-stretch gap-1" aria-label="Journey steps">
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <li key={step.label} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`h-full w-32 rounded-md border px-3 py-2.5 text-left transition-colors ${
                    isActive ? 'border-accent bg-surface' : 'border-line bg-surface/60 hover:border-line-strong'
                  }`}
                >
                  <span className="text-faint font-mono text-[9px] tracking-[0.08em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`mt-0.5 block text-[12px] font-semibold ${isActive ? 'text-ink' : 'text-muted'}`}>
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="text-line-strong px-1 font-mono text-xs">
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* active step detail */}
      <div className="p-4" aria-live="polite">
        <p className="text-accent font-mono text-[10px] font-medium tracking-widest uppercase">{current.label}</p>
        <p className="text-muted mt-2 max-w-2xl text-[13.5px] leading-relaxed">{current.caption}</p>
        {current.states && current.states.length > 0 && (
          <div className="mt-3">
            <p className="text-faint font-mono text-[9px] tracking-[0.08em] uppercase">States the frontend handles</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {current.states.map((state) => (
                <li
                  key={state}
                  className="border-line text-muted rounded-full border px-2.5 py-1 font-mono text-[9.5px] tracking-[0.04em] uppercase"
                >
                  {state}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
