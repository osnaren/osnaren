'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export type BenchMode = 'preview' | 'bench';

interface BenchProps {
  mode: BenchMode;
  onEvent?: (message: string) => void;
}

/* ------------------------------------------------------------------ */
/* shared control primitives                                           */
/* ------------------------------------------------------------------ */

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <span className="text-faint flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] uppercase">
        {label}
        <span className="text-ink tabular-nums">
          {value}
          {suffix}
        </span>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-accent mt-1.5 w-full"
      />
    </label>
  );
}

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-line hover:border-ink hover:text-accent inline-flex min-h-9 items-center rounded-md border px-3 font-mono text-[10px] font-medium tracking-[0.08em] uppercase transition-colors"
    >
      ↺ Reset
    </button>
  );
}

/** Wraps a bench experiment: stage on top, control panel below. */
function BenchFrame({ stage, controls }: { stage: React.ReactNode; controls: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="bg-surface-2 relative grid flex-1 place-items-center overflow-hidden rounded-lg p-5">{stage}</div>
      <div className="mt-3 flex flex-col gap-3">{controls}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* EXP — Sun Path Study                                                */
/* ------------------------------------------------------------------ */

const SEASONS = [
  { key: 'summer', label: 'Summer', apex: 66 },
  { key: 'equinox', label: 'Equinox', apex: 52 },
  { key: 'winter', label: 'Winter', apex: 34 },
] as const;

export function SunPath({ mode, onEvent }: BenchProps) {
  const [hour, setHour] = useState(mode === 'preview' ? 15 : 16);
  const [season, setSeason] = useState<(typeof SEASONS)[number]['key']>('equinox');
  const apex = SEASONS.find((s) => s.key === season)!.apex;

  const t = (hour - 6) / 12;
  const x = 24 + t * 232;
  const y = 96 - Math.sin(t * Math.PI) * apex;
  const exposed = hour < 12 ? 'RIGHT' : hour > 12 ? 'LEFT' : 'EVEN';
  const shadowX = 280 - x + 24;

  const diagram = (
    <svg
      viewBox="0 0 280 120"
      className="w-full"
      role="img"
      aria-label={`Sun path at ${hour}:00. Exposed side: ${exposed}.`}
    >
      <path
        d={`M24 96 Q140 ${96 - apex * 2} 256 96`}
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <line x1="12" y1="98" x2="268" y2="98" stroke="var(--ink)" strokeWidth="2" />
      {/* ground shadow opposite the sun */}
      <ellipse
        cx={shadowX}
        cy="101"
        rx={10 + (1 - Math.sin(t * Math.PI)) * 26}
        ry="4"
        fill="var(--ink)"
        opacity="0.14"
      />
      <circle cx={x} cy={y} r="13" fill="var(--sun)" opacity="0.22" />
      <circle cx={x} cy={y} r="8" fill="var(--sun)" />
      <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--faint)">
        <text x="16" y="114">
          E · 06:00
        </text>
        <text x="228" y="114">
          W · 18:00
        </text>
      </g>
    </svg>
  );

  if (mode === 'preview') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
        {diagram}
        <span className="text-faint font-mono text-[9px] tracking-[0.08em] uppercase">
          Sit {exposed === 'RIGHT' ? 'LEFT' : 'RIGHT'} · {season}
        </span>
      </div>
    );
  }

  return (
    <BenchFrame
      stage={
        <div className="flex w-full max-w-md flex-col items-center gap-2">
          {diagram}
          <p className="bg-ink text-paper rounded px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.06em]">
            {String(hour).padStart(2, '0')}:00 · EXPOSED {exposed} → SIT{' '}
            {exposed === 'RIGHT' ? 'LEFT' : exposed === 'LEFT' ? 'RIGHT' : 'EITHER'}
          </p>
        </div>
      }
      controls={
        <>
          <Slider label="Time of day" value={hour} min={6} max={18} suffix=":00" onChange={setHour} />
          <div className="flex items-center gap-2">
            <span className="text-faint font-mono text-[9.5px] tracking-[0.08em] uppercase">Season</span>
            <div className="flex gap-1.5">
              {SEASONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={season === s.key}
                  onClick={() => setSeason(s.key)}
                  className={`rounded-md border px-2.5 py-1 font-mono text-[9.5px] tracking-[0.06em] uppercase transition-colors ${
                    season === s.key ? 'border-accent text-accent' : 'border-line text-muted hover:text-ink'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <span className="ml-auto">
              <ResetButton
                onClick={() => {
                  setHour(12);
                  setSeason('equinox');
                  onEvent?.('EXPERIMENT RESET');
                }}
              />
            </span>
          </div>
        </>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* EXP — Squish Toggle                                                 */
/* ------------------------------------------------------------------ */

function springTrace(stiffness: number, damping: number, mass: number) {
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const points: string[] = [];
  const W = 240;
  const H = 64;
  for (let i = 0; i <= 60; i++) {
    const time = (i / 60) * 1.4;
    let value: number;
    if (zeta < 1) {
      const wd = omega0 * Math.sqrt(1 - zeta * zeta);
      value =
        1 -
        Math.exp(-zeta * omega0 * time) *
          (Math.cos(wd * time) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * time));
    } else {
      value = 1 - Math.exp(-omega0 * time) * (1 + omega0 * time);
    }
    const px = 6 + (i / 60) * (W - 12);
    const py = H - 8 - value * (H - 20);
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return { points: points.join(' '), W, H };
}

export function Squish({ mode, onEvent }: BenchProps) {
  const reduceMotion = useReducedMotion();
  const [on, setOn] = useState(true);
  const [stiffness, setStiffness] = useState(500);
  const [damping, setDamping] = useState(22);
  const [mass, setMass] = useState(1);
  const [squish, setSquish] = useState(0.22);

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Squish toggle"
      onClick={() => {
        setOn((v) => !v);
        onEvent?.('INPUT RECEIVED');
      }}
      className={`relative h-10 w-18 rounded-full border transition-colors ${on ? 'bg-ok border-ok' : 'bg-well border-line-strong'}`}
    >
      <motion.span
        layout
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness, damping, mass }}
        whileTap={reduceMotion ? undefined : { scaleX: 1 + squish, scaleY: 1 - squish }}
        className={`absolute top-1 block size-8 rounded-full bg-white shadow-sm ${on ? 'right-1' : 'left-1'}`}
      />
    </button>
  );

  if (mode === 'preview') {
    return (
      <div className="flex h-full items-center justify-center gap-3">
        {toggle}
        <span className="text-faint font-mono text-[10px] uppercase">tap it</span>
      </div>
    );
  }

  const trace = springTrace(stiffness, damping, mass);

  return (
    <BenchFrame
      stage={
        <div className="flex w-full max-w-md flex-col items-center gap-4">
          {toggle}
          <svg viewBox={`0 0 ${trace.W} ${trace.H}`} className="w-full max-w-xs" aria-hidden="true">
            <line x1="6" y1={trace.H - 8} x2={trace.W - 6} y2={trace.H - 8} stroke="var(--line)" strokeWidth="1" />
            <line
              x1="6"
              y1={trace.H - 8 - (trace.H - 20)}
              x2={trace.W - 6}
              y2={trace.H - 8 - (trace.H - 20)}
              stroke="var(--line)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <polyline points={trace.points} fill="none" stroke="var(--accent)" strokeWidth="2" />
          </svg>
          <span className="text-faint font-mono text-[9px] tracking-[0.08em] uppercase">
            Step response · {on ? 'on' : 'off'}
          </span>
        </div>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Slider label="Stiffness" value={stiffness} min={80} max={800} step={10} onChange={setStiffness} />
            <Slider label="Damping" value={damping} min={4} max={40} onChange={setDamping} />
            <Slider label="Mass" value={mass} min={0.4} max={3} step={0.1} onChange={setMass} />
            <Slider label="Squish" value={squish} min={0} max={0.4} step={0.02} onChange={setSquish} />
          </div>
          <ResetButton
            onClick={() => {
              setStiffness(500);
              setDamping(22);
              setMass(1);
              setSquish(0.22);
              onEvent?.('EXPERIMENT RESET');
            }}
          />
        </>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* EXP — Magnetic Chip                                                 */
/* ------------------------------------------------------------------ */

export function Magnetic({ mode, onEvent }: BenchProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(120);
  const [strength, setStrength] = useState(0.4);
  const [stiffness, setStiffness] = useState(200);
  const x = useSpring(useMotionValue(0), { stiffness, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness, damping: 18 });

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const chip = (
    <motion.div
      style={reduceMotion ? undefined : { x, y }}
      whileTap={{ scale: 0.96 }}
      className="module-card px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase select-none"
    >
      ⌁ magnetic
    </motion.div>
  );

  if (mode === 'preview') {
    return (
      <div className="relative grid h-full place-items-center">
        <span className="border-accent/30 absolute size-24 rounded-full border border-dashed" aria-hidden="true" />
        {chip}
      </div>
    );
  }

  return (
    <BenchFrame
      stage={
        <div
          ref={ref}
          onPointerMove={onPointerMove}
          onPointerLeave={reset}
          className="relative grid h-full w-full place-items-center"
        >
          <span
            aria-hidden="true"
            className="border-accent/30 pointer-events-none absolute rounded-full border border-dashed"
            style={{ width: radius * 2, height: radius * 2 }}
          />
          {chip}
          {reduceMotion && (
            <p className="text-faint absolute bottom-1 font-mono text-[9px] tracking-[0.06em] uppercase">
              Pointer-follow off (reduced motion)
            </p>
          )}
        </div>
      }
      controls={
        <>
          <div className="grid grid-cols-3 gap-4">
            <Slider label="Radius" value={radius} min={40} max={200} step={5} suffix="px" onChange={setRadius} />
            <Slider label="Strength" value={strength} min={0.1} max={1} step={0.05} onChange={setStrength} />
            <Slider label="Return" value={stiffness} min={80} max={400} step={10} onChange={setStiffness} />
          </div>
          <ResetButton
            onClick={() => {
              setRadius(120);
              setStrength(0.4);
              setStiffness(200);
              reset();
              onEvent?.('EXPERIMENT RESET');
            }}
          />
        </>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* EXP — Route Replay                                                  */
/* ------------------------------------------------------------------ */

const ROUTE_D = 'M20 150 C110 132 180 60 300 72 S470 130 540 44';
const ROUTE_SEGMENTS = 4;

export function Route({ mode, onEvent }: BenchProps) {
  const reduceMotion = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGCircleElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [segment, setSegment] = useState(0);

  const place = (p: number) => {
    const path = pathRef.current;
    const marker = markerRef.current;
    if (!path || !marker) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(Math.min(1, Math.max(0, p)) * len);
    marker.setAttribute('cx', String(pt.x));
    marker.setAttribute('cy', String(pt.y));
    const seg = Math.min(ROUTE_SEGMENTS - 1, Math.floor(p * ROUTE_SEGMENTS));
    setSegment(seg);
  };

  // rAF loop, paused offscreen (component unmounts on close) and when tab hidden
  useEffect(() => {
    if (mode !== 'bench' || reduceMotion || !playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!document.hidden) {
        progressRef.current += dt * 0.28 * speed;
        if (progressRef.current >= 1) {
          progressRef.current = 1;
          place(1);
          setPlaying(false);
          return;
        }
        place(progressRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, speed, mode, reduceMotion]);

  // initialise marker at start
  useEffect(() => {
    place(progressRef.current);
  }, [mode]);

  const reset = () => {
    progressRef.current = 0;
    setPlaying(false);
    place(0);
    onEvent?.('EXPERIMENT RESET');
  };

  const svg = (compact: boolean) => (
    <svg
      viewBox="0 0 560 180"
      className="w-full"
      role="img"
      aria-label={`Route replay, segment ${segment + 1} of ${ROUTE_SEGMENTS}.`}
    >
      <path d={ROUTE_D} fill="none" stroke="var(--line-strong)" strokeWidth="6" opacity="0.4" />
      <path
        ref={pathRef}
        d={ROUTE_D}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeDasharray={compact || reduceMotion ? undefined : '6 6'}
      />
      <circle cx="20" cy="150" r="5" fill="var(--ink)" />
      <circle cx="540" cy="44" r="5" fill="var(--ok)" />
      <circle ref={markerRef} cx={compact ? 300 : 20} cy={compact ? 72 : 150} r="6" fill="var(--sun)" />
    </svg>
  );

  if (mode === 'preview') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-xs">{svg(true)}</div>
      </div>
    );
  }

  return (
    <BenchFrame
      stage={<div className="w-full max-w-lg">{svg(false)}</div>}
      controls={
        <>
          <div className="flex flex-wrap items-center gap-2">
            {!reduceMotion ? (
              <button
                type="button"
                onClick={() => {
                  if (progressRef.current >= 1) progressRef.current = 0;
                  setPlaying((p) => !p);
                  onEvent?.('INPUT RECEIVED');
                }}
                className="bg-ink text-paper hover:bg-accent inline-flex min-h-9 items-center rounded-md px-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase transition-colors"
              >
                {playing ? '❙❙ Pause' : '▶ Play'}
              </button>
            ) : (
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => place(Math.max(0, (segment - 1) / ROUTE_SEGMENTS + 0.001))}
                  className="border-line hover:border-ink inline-flex min-h-9 items-center rounded-md border px-3 font-mono text-[10px] uppercase"
                >
                  ← Step
                </button>
                <button
                  type="button"
                  onClick={() => place(Math.min(1, (segment + 1) / ROUTE_SEGMENTS + 0.001))}
                  className="border-line hover:border-ink inline-flex min-h-9 items-center rounded-md border px-3 font-mono text-[10px] uppercase"
                >
                  Step →
                </button>
              </div>
            )}
            <ResetButton onClick={reset} />
            <span className="text-faint ml-auto font-mono text-[10px] tracking-[0.06em] uppercase">
              Segment {segment + 1} / {ROUTE_SEGMENTS}
            </span>
          </div>
          {!reduceMotion && (
            <Slider label="Speed" value={speed} min={0.5} max={3} step={0.1} suffix="×" onChange={setSpeed} />
          )}
        </>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* EXP — Theme Transition Study                                        */
/* ------------------------------------------------------------------ */

export function ThemeStudy({ mode, onEvent }: BenchProps) {
  const [preview, setPreview] = useState<'light' | 'dark'>('dark');

  const panel = (
    <div
      data-theme={preview}
      className="bg-surface border-line-strong w-full max-w-sm rounded-lg border p-4 transition-colors duration-300 motion-reduce:transition-none"
    >
      <div className="flex items-center justify-between">
        <span className="text-accent font-mono text-[9px] font-medium tracking-widest uppercase">OSN · PANEL</span>
        <span className="text-ok inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.08em] uppercase">
          <span className="bg-ok size-1.5 rounded-full" /> live
        </span>
      </div>
      <p className="text-ink mt-2 text-sm font-semibold">Warm paper, or near-black.</p>
      <p className="text-muted mt-1 text-[12px] leading-relaxed">
        One token set drives every surface, line, and accent.
      </p>
      <div className="mt-3 flex gap-2">
        <span className="bg-accent rounded px-2.5 py-1 font-mono text-[9px] font-medium tracking-[0.06em] text-white uppercase">
          Primary
        </span>
        <span className="border-line text-muted rounded border px-2.5 py-1 font-mono text-[9px] tracking-[0.06em] uppercase">
          Ghost
        </span>
      </div>
    </div>
  );

  if (mode === 'preview') {
    return <div className="grid h-full place-items-center">{panel}</div>;
  }

  return (
    <BenchFrame
      stage={panel}
      controls={
        <div className="flex items-center gap-2">
          <span className="text-faint font-mono text-[9.5px] tracking-[0.08em] uppercase">Preview theme</span>
          <div className="flex gap-1.5">
            {(['light', 'dark'] as const).map((theme) => (
              <button
                key={theme}
                type="button"
                aria-pressed={preview === theme}
                onClick={() => {
                  setPreview(theme);
                  onEvent?.('INPUT RECEIVED');
                }}
                className={`rounded-md border px-3 py-1.5 font-mono text-[9.5px] tracking-[0.06em] uppercase transition-colors ${
                  preview === theme ? 'border-accent text-accent' : 'border-line text-muted hover:text-ink'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
          <span className="ml-auto">
            <ResetButton
              onClick={() => {
                setPreview('dark');
                onEvent?.('EXPERIMENT RESET');
              }}
            />
          </span>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* EXP — Drag Scheduler (static study)                                 */
/* ------------------------------------------------------------------ */

export function Scheduler({ mode }: BenchProps) {
  const diagram = (
    <svg
      viewBox="0 0 260 96"
      className="w-full max-w-md"
      aria-label="Schematic of a scheduling grid with one placed block spanning three cells."
    >
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={10 + col * 40}
            y={8 + row * 22}
            width="34"
            height="16"
            rx="2.5"
            fill={row === 1 && col >= 1 && col <= 3 ? 'var(--accent)' : 'var(--well)'}
            opacity={row === 1 && col >= 1 && col <= 3 ? 0.9 : 1}
          />
        ))
      )}
    </svg>
  );

  if (mode === 'preview') {
    return <div className="grid h-full place-items-center">{diagram}</div>;
  }

  return (
    <BenchFrame
      stage={
        <div className="flex flex-col items-center gap-3">
          {diagram}
          <p className="text-faint max-w-xs text-center font-mono text-[9.5px] leading-4 tracking-[0.06em] uppercase">
            Visual study — the shipped version paired drag with keyboard parity and undo.
          </p>
        </div>
      }
      controls={
        <p className="text-muted text-[12px] leading-relaxed">
          Rendered as a static study rather than a mouse-only drag control. See the observation notes for how the
          production interaction handled accessibility.
        </p>
      }
    />
  );
}
