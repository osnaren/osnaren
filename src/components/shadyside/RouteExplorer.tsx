'use client';

import { useId, useMemo, useState } from 'react';

// Simplified, illustrative model — NOT the production algorithm.
// Screen convention: up = north, right = east. Sun azimuth is measured
// clockwise from north (northern-hemisphere sun sits to the south at noon).
const W = 640;
const H = 210;

// a route with four directed segments (west → north-east, with turns)
const POINTS: [number, number][] = [
  [40, 168],
  [190, 150],
  [330, 96],
  [470, 120],
  [604, 56],
];

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  bearing: number;
  length: number;
}

const SEGMENTS: Segment[] = POINTS.slice(0, -1).map(([x1, y1], i) => {
  const [x2, y2] = POINTS[i + 1];
  const dx = x2 - x1;
  const dy = y2 - y1;
  // bearing: 0 = north (up), 90 = east (right)
  const bearing = (Math.atan2(dx, -dy) * 180) / Math.PI;
  return { x1, y1, x2, y2, bearing: (bearing + 360) % 360, length: Math.hypot(dx, dy) };
});

const norm = (deg: number) => ((deg % 360) + 360) % 360;

export function RouteExplorer() {
  const [hour, setHour] = useState(16);
  const sliderId = useId();

  const sunAz = 90 + ((hour - 6) / 12) * 180; // 6:00 → east, 12:00 → south, 18:00 → west
  const t = (hour - 6) / 12;
  const sunX = 40 + t * (W - 80);
  const sunY = 40 - Math.sin(t * Math.PI) * 26 + 6;

  const { segments, verdict, shadePct } = useMemo(() => {
    const segments = SEGMENTS.map((seg) => {
      const rel = norm(sunAz - seg.bearing);
      // rel in (0,180): sun to the right of travel → right side exposed
      const rightExposed = rel > 0 && rel < 180;
      const intensity = Math.abs(Math.sin((rel * Math.PI) / 180)); // glancing vs direct
      const exposure = seg.length * intensity;
      // shaded side = opposite of exposed
      const shadedSide: 'left' | 'right' = rightExposed ? 'left' : 'right';
      // perpendicular offset toward the shaded side (screen coords)
      const dx = seg.x2 - seg.x1;
      const dy = seg.y2 - seg.y1;
      const len = Math.hypot(dx, dy) || 1;
      // left-of-travel normal in screen space = (dy, -dx)
      const lx = dy / len;
      const ly = -dx / len;
      const sign = shadedSide === 'left' ? 1 : -1;
      const off = 7;
      return {
        ...seg,
        rightExposed,
        exposure,
        shadedSide,
        gx1: seg.x1 + lx * off * sign,
        gy1: seg.y1 + ly * off * sign,
        gx2: seg.x2 + lx * off * sign,
        gy2: seg.y2 + ly * off * sign,
      };
    });
    const exposeRight = segments.reduce((sum, s) => sum + (s.rightExposed ? s.exposure : 0), 0);
    const exposeLeft = segments.reduce((sum, s) => sum + (s.rightExposed ? 0 : s.exposure), 0);
    const total = exposeLeft + exposeRight || 1;
    const verdict: 'left' | 'right' = exposeLeft <= exposeRight ? 'left' : 'right';
    const recommendedExposure = Math.min(exposeLeft, exposeRight);
    const shadePct = Math.round(100 * (1 - recommendedExposure / total));
    return { segments, verdict, shadePct };
  }, [sunAz]);

  return (
    <div className="module-card overflow-hidden">
      <div className="border-line text-faint flex items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[9.5px] font-medium tracking-widest uppercase">
        <span>Interactive explanation</span>
        <span className="text-accent">Status — Illustrative model</span>
      </div>

      <div className="bg-surface-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`Illustrative route diagram. With departure at ${hour}:00, the recommendation is to sit ${verdict}, keeping shade for about ${shadePct}% of the route.`}
        >
          {/* sun arc guide */}
          <path
            d={`M40 46 Q${W / 2} -8 ${W - 40} 46`}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1"
            strokeDasharray="4 5"
          />
          {/* base route */}
          <polyline
            points={POINTS.map((p) => p.join(',')).join(' ')}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* shaded-side band per segment */}
          {segments.map((seg, i) => (
            <line
              key={i}
              x1={seg.gx1}
              y1={seg.gy1}
              x2={seg.gx2}
              y2={seg.gy2}
              stroke="var(--ok)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.5"
            />
          ))}
          {/* endpoints */}
          <circle cx={POINTS[0][0]} cy={POINTS[0][1]} r="5" fill="var(--ink)" />
          <circle cx={POINTS[POINTS.length - 1][0]} cy={POINTS[POINTS.length - 1][1]} r="5" fill="var(--accent)" />
          {/* sun */}
          <circle cx={sunX} cy={sunY} r="13" fill="var(--sun)" opacity="0.28" />
          <circle cx={sunX} cy={sunY} r="7" fill="var(--sun)" />
          {/* labels */}
          <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--faint)">
            <text x={POINTS[0][0]} y={POINTS[0][1] + 20}>
              START
            </text>
            <text x={POINTS[POINTS.length - 1][0] - 30} y={POINTS[POINTS.length - 1][1] - 12}>
              ARRIVE
            </text>
          </g>
        </svg>
      </div>

      <div className="border-line grid gap-4 border-t p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div>
          <label htmlFor={sliderId} className="text-faint block font-mono text-[10px] tracking-[0.08em] uppercase">
            Departure time — {String(hour).padStart(2, '0')}:00
          </label>
          <input
            id={sliderId}
            type="range"
            min={6}
            max={18}
            step={1}
            value={hour}
            onChange={(event) => setHour(Number(event.target.value))}
            className="accent-accent mt-2 w-full"
            aria-describedby={`${sliderId}-out`}
          />
          <p className="text-faint mt-1 flex justify-between font-mono text-[9px] tracking-[0.06em] uppercase">
            <span>06:00 sunrise east</span>
            <span>18:00 sunset west</span>
          </p>
        </div>
        <div
          id={`${sliderId}-out`}
          aria-live="polite"
          className="bg-ink text-paper flex min-w-40 flex-col items-center rounded-md px-5 py-3 text-center"
        >
          <span className="font-mono text-[9px] tracking-[0.12em] text-[#f2a369] uppercase">Recommendation</span>
          <span className="mt-0.5 text-2xl font-semibold tracking-[-0.01em]">SIT {verdict.toUpperCase()}</span>
          <span className="mt-0.5 font-mono text-[10px] tracking-[0.06em] text-[#6fbf99]">
            SHADE {shadePct}% OF ROUTE
          </span>
        </div>
      </div>
    </div>
  );
}
