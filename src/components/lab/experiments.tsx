'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useId, useRef, useState } from 'react';

/** EXP-01 — a toggle with squash-and-stretch, because switches deserve joy. */
export function SquishToggle() {
  const [on, setOn] = useState(true);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full items-center justify-center gap-4">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Squish toggle demo"
        onClick={() => setOn((v) => !v)}
        className={`relative h-9 w-16 rounded-full border transition-colors ${
          on ? 'bg-ok border-ok' : 'bg-well border-line-strong'
        }`}
      >
        <motion.span
          layout
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 22 }}
          whileTap={reduceMotion ? undefined : { scaleX: 1.25, scaleY: 0.8 }}
          className={`absolute top-1 block size-7 rounded-full bg-white shadow-sm ${on ? 'right-1' : 'left-1'}`}
        />
      </button>
      <span className="text-faint font-mono text-[11px] uppercase">{on ? 'squished on' : 'squished off'}</span>
    </div>
  );
}

/** EXP-02 — drag the clock, watch the sun cross the sky. The ShadySide seed. */
export function SunPathStudy() {
  const [hour, setHour] = useState(16);
  const id = useId();

  // sun arc from 6:00 (left horizon) to 18:00 (right horizon)
  const t = (hour - 6) / 12;
  const x = 20 + t * 160;
  const y = 78 - Math.sin(t * Math.PI) * 58;
  const side = hour < 12 ? 'RIGHT' : 'LEFT';

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <svg viewBox="0 0 200 90" className="w-full max-w-[220px]" aria-hidden="true">
        <path
          d="M20 78 Q100 -38 180 78"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line x1="10" y1="80" x2="190" y2="80" stroke="var(--ink)" strokeWidth="2" />
        <circle cx={x} cy={y} r="8" fill="var(--sun)" />
        <circle cx={x} cy={y} r="13" fill="var(--sun)" opacity="0.25" />
      </svg>
      <label htmlFor={id} className="text-faint font-mono text-[10px] tracking-[0.08em] uppercase">
        {String(hour).padStart(2, '0')}:00 — heading north? sit {side}
      </label>
      <input
        id={id}
        type="range"
        min={6}
        max={18}
        step={1}
        value={hour}
        onChange={(e) => setHour(Number(e.target.value))}
        className="accent-accent w-full max-w-[220px]"
      />
    </div>
  );
}

/** EXP-03 — a chip that leans toward your cursor. Keyboard and touch get a calm version. */
export function MagneticCard() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={reset} className="grid h-full place-items-center">
      <motion.div
        style={reduceMotion ? undefined : { x, y }}
        whileTap={{ scale: 0.96 }}
        className="module-card px-5 py-3 font-mono text-[11px] font-medium tracking-[0.08em] uppercase select-none"
      >
        ⌁ magnetic
      </motion.div>
    </div>
  );
}

/** EXP-04 — replayable route draw, the case-study animation as a toy. */
export function RouteDraw() {
  const [run, setRun] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <svg viewBox="0 0 220 70" className="w-full max-w-[230px]" aria-hidden="true">
        <motion.path
          key={run}
          d="M10 56 C60 50 90 16 140 22 S200 40 212 12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
        <circle cx="10" cy="56" r="4" fill="var(--ink)" />
        <circle cx="212" cy="12" r="4" fill="var(--ok)" />
      </svg>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="border-ink hover:bg-ink hover:text-paper rounded-md border px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.08em] uppercase transition-colors"
      >
        ↺ Replay draw
      </button>
    </div>
  );
}

/** EXP-05 — the site's own theme tokens, exhibited. The header toggle is the live demo. */
export function ThemeTokens() {
  const tokens = ['--paper', '--surface', '--ink', '--accent', '--ok', '--line'];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex gap-2">
        {tokens.map((token) => (
          <span
            key={token}
            title={token}
            className="border-line size-8 rounded-md border"
            style={{ background: `var(${token})` }}
          />
        ))}
      </div>
      <p className="text-faint text-center font-mono text-[10px] tracking-[0.06em] uppercase">
        One token system across light and dark modes
      </p>
    </div>
  );
}

/** EXP-06 — schematic for the Soliton-era drag-scheduling study. */
export function SchedulerSketch() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <svg viewBox="0 0 200 70" className="w-full max-w-[210px]" aria-hidden="true">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={8 + col * 32}
              y={6 + row * 16}
              width="28"
              height="12"
              rx="2"
              fill={row === 1 && col >= 1 && col <= 3 ? 'var(--accent)' : 'var(--well)'}
              opacity={row === 1 && col >= 1 && col <= 3 ? 0.9 : 1}
            />
          ))
        )}
      </svg>
      <p className="text-faint text-center font-mono text-[10px] tracking-[0.06em] uppercase">
        Scheduling interaction study from a production tool
      </p>
    </div>
  );
}
