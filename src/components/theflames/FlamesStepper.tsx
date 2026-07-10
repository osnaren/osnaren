'use client';

import { useId, useMemo, useState } from 'react';

const FLAMES: { letter: string; meaning: string }[] = [
  { letter: 'F', meaning: 'Friends' },
  { letter: 'L', meaning: 'Love' },
  { letter: 'A', meaning: 'Affection' },
  { letter: 'M', meaning: 'Marriage' },
  { letter: 'E', meaning: 'Enemies' },
  { letter: 'S', meaning: 'Siblings' },
];

const SAMPLES: [string, string][] = [
  ['Meera', 'Arjun'],
  ['Anaya', 'Vikram'],
  ['Priya', 'Rohan'],
];

interface Marked {
  char: string;
  struck: boolean;
}

function compute(nameA: string, nameB: string) {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
  const a = clean(nameA);
  const b = clean(nameB);
  const bCount: Record<string, number> = {};
  for (const c of b) bCount[c] = (bCount[c] ?? 0) + 1;
  const aCount: Record<string, number> = {};
  for (const c of a) aCount[c] = (aCount[c] ?? 0) + 1;

  // shared occurrences to strike from each side
  const shared: Record<string, number> = {};
  for (const c of Object.keys(aCount)) shared[c] = Math.min(aCount[c], bCount[c] ?? 0);

  const strikeFrom = (name: string) => {
    const budget = { ...shared };
    return [...name].map((raw) => {
      const c = raw.toLowerCase();
      if (/[a-z]/.test(c) && budget[c] > 0) {
        budget[c] -= 1;
        return { char: raw, struck: true } as Marked;
      }
      return { char: raw, struck: false } as Marked;
    });
  };

  const markedA = strikeFrom(nameA);
  const markedB = strikeFrom(nameB);
  const remaining =
    markedA.filter((m) => /[a-z]/i.test(m.char) && !m.struck).length +
    markedB.filter((m) => /[a-z]/i.test(m.char) && !m.struck).length;

  // FLAMES elimination
  const pool = FLAMES.map((f) => f.letter);
  const removedOrder: string[] = [];
  let idx = 0;
  if (remaining > 0) {
    while (pool.length > 1) {
      idx = (idx + remaining - 1) % pool.length;
      removedOrder.push(pool[idx]);
      pool.splice(idx, 1);
      if (idx >= pool.length) idx = 0;
    }
  }
  const result = FLAMES.find((f) => f.letter === pool[0]) ?? FLAMES[0];
  return { markedA, markedB, remaining, removedOrder, resultLetter: pool[0], result };
}

const STAGE_LABELS = ['Names', 'Cross shared letters', 'Count what is left', 'Run F·L·A·M·E·S', 'Result'];

export function FlamesStepper() {
  const [nameA, setNameA] = useState(SAMPLES[0][0]);
  const [nameB, setNameB] = useState(SAMPLES[0][1]);
  const [stage, setStage] = useState(0);
  const idA = useId();
  const idB = useId();

  const model = useMemo(() => compute(nameA, nameB), [nameA, nameB]);

  const reset = () => setStage(0);
  const step = () => setStage((s) => Math.min(s + 1, 4));
  const sample = () => {
    const pick = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    setNameA(pick[0]);
    setNameB(pick[1]);
    setStage(0);
  };

  const renderName = (marked: Marked[], show: boolean) => (
    <span className="inline-flex flex-wrap gap-0.5">
      {marked.map((m, i) => (
        <span
          key={i}
          className={`relative font-mono text-lg font-medium ${show && m.struck ? 'text-faint' : 'text-ink'}`}
        >
          {m.char}
          {show && m.struck && (
            <span
              className="bg-accent absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rounded-full"
              aria-hidden="true"
            />
          )}
        </span>
      ))}
    </span>
  );

  const eliminated = stage >= 3 ? model.removedOrder : [];
  const resolved = stage >= 4;

  return (
    <div className="module-card overflow-hidden">
      <div className="border-line text-faint flex items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[9.5px] font-medium tracking-widest uppercase">
        <span>Interactive explanation</span>
        <span className="text-ok">Client-side · nothing stored</span>
      </div>

      {/* inputs */}
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div>
          <label htmlFor={idA} className="text-faint block font-mono text-[10px] tracking-[0.08em] uppercase">
            First name
          </label>
          <input
            id={idA}
            value={nameA}
            maxLength={20}
            onChange={(e) => {
              setNameA(e.target.value);
              setStage(0);
            }}
            className="border-line bg-surface focus:border-accent mt-1.5 w-full rounded-md border px-3 py-2 font-mono text-[13px] outline-none"
          />
        </div>
        <div>
          <label htmlFor={idB} className="text-faint block font-mono text-[10px] tracking-[0.08em] uppercase">
            Second name
          </label>
          <input
            id={idB}
            value={nameB}
            maxLength={20}
            onChange={(e) => {
              setNameB(e.target.value);
              setStage(0);
            }}
            className="border-line bg-surface focus:border-accent mt-1.5 w-full rounded-md border px-3 py-2 font-mono text-[13px] outline-none"
          />
        </div>
      </div>

      {/* stage progress */}
      <div className="px-4">
        <ol className="flex flex-wrap gap-1.5" aria-label="Steps">
          {STAGE_LABELS.map((label, i) => (
            <li
              key={label}
              aria-current={stage === i ? 'step' : undefined}
              className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-medium tracking-[0.06em] uppercase ${
                stage >= i ? 'border-accent text-accent' : 'border-line text-faint'
              }`}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>
      </div>

      {/* board */}
      <div className="bg-surface-2 m-4 rounded-lg p-4" aria-live="polite">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-faint w-14 shrink-0 font-mono text-[9px] tracking-[0.08em] uppercase">Name A</span>
            {renderName(model.markedA, stage >= 1)}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-faint w-14 shrink-0 font-mono text-[9px] tracking-[0.08em] uppercase">Name B</span>
            {renderName(model.markedB, stage >= 1)}
          </div>
        </div>

        {stage >= 2 && (
          <p className="text-muted mt-4 font-mono text-[11px] tracking-[0.04em] uppercase">
            Letters remaining — <span className="text-ink font-semibold">{model.remaining}</span>
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {FLAMES.map((f) => {
            const isOut = eliminated.includes(f.letter);
            const isResult = resolved && f.letter === model.resultLetter;
            return (
              <span
                key={f.letter}
                className={`relative grid size-9 place-items-center rounded-md border font-mono text-sm font-medium transition-colors ${
                  isResult
                    ? 'border-accent bg-accent text-white'
                    : isOut
                      ? 'border-line text-faint'
                      : 'border-line-strong bg-surface text-ink'
                }`}
              >
                {f.letter}
                {isOut && !isResult && (
                  <span
                    className="bg-accent/80 absolute top-1/2 left-1 h-0.5 w-7 -translate-y-1/2 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </span>
            );
          })}
        </div>

        {resolved && (
          <p className="mt-4 text-[15px] font-semibold">
            <span className="text-accent">{model.result.letter}</span> — {model.result.meaning}{' '}
            <span className="text-faint font-mono text-[10px] tracking-[0.06em] uppercase">
              · for entertainment only
            </span>
          </p>
        )}
      </div>

      {/* controls */}
      <div className="border-line flex flex-wrap items-center gap-2.5 border-t px-4 py-3">
        <button
          type="button"
          onClick={step}
          disabled={stage >= 4}
          className="bg-ink text-paper hover:bg-accent inline-flex min-h-9 items-center rounded-md px-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors disabled:opacity-40"
        >
          {stage >= 4 ? 'Resolved' : `Step → ${STAGE_LABELS[Math.min(stage + 1, 4)]}`}
        </button>
        <button
          type="button"
          onClick={reset}
          className="border-ink hover:bg-ink hover:text-paper inline-flex min-h-9 items-center rounded-md border px-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={sample}
          className="text-faint hover:text-accent inline-flex min-h-9 items-center px-1 font-mono text-[10px] tracking-[0.06em] uppercase"
        >
          ↺ Random sample
        </button>
        <span className="text-faint ml-auto font-mono text-[9px] tracking-[0.06em] uppercase">
          Names stay on your device
        </span>
      </div>
    </div>
  );
}
