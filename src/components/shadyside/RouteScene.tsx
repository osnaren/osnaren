'use client';

import { useRef } from 'react';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const ROUTE = 'M24 150 C120 132 200 60 320 72 S520 118 616 44';

/**
 * The evidence exhibit: as the section scrolls into view the route draws
 * itself and the sun travels along it, ending on the blunt answer.
 * Reduced motion renders the finished scene statically.
 */
export function RouteScene() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 45%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const sunDistance = useTransform(progress, (v) => `${Math.round(v * 82)}%`);
  const badgeOpacity = useTransform(progress, [0.75, 0.95], [0, 1]);

  return (
    <div
      ref={ref}
      className="bg-surface-2 border-line relative overflow-hidden rounded-xl border"
      role="img"
      aria-label="Diagram: a bus route drawn west to east with the sun travelling alongside it; the left side of the route is highlighted as shaded, with the verdict “sit left — shade 82% of route”."
    >
      <svg viewBox="0 0 640 190" className="block w-full" aria-hidden="true">
        {/* shade band hugging the route */}
        <motion.path
          d="M24 158 C120 140 200 68 320 80 S520 126 616 52"
          fill="none"
          stroke="var(--ok)"
          strokeWidth="12"
          opacity="0.28"
          style={reduceMotion ? undefined : { pathLength: progress }}
          initial={false}
        />
        {/* the route itself */}
        <motion.path
          d={ROUTE}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="3"
          style={reduceMotion ? undefined : { pathLength: progress }}
          initial={false}
        />
        <circle cx="24" cy="150" r="6" fill="var(--ink)" />
        <motion.circle
          cx="616"
          cy="44"
          r="6"
          fill="var(--accent)"
          style={reduceMotion ? undefined : { opacity: badgeOpacity }}
        />
        {/* compass */}
        <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--faint)">
          <text x="24" y="178">
            START · 16:10
          </text>
          <text x="560" y="26">
            ARRIVE
          </text>
        </g>
      </svg>
      {/* travelling sun */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 left-0 size-5 rounded-full"
        style={{
          background: 'var(--sun)',
          boxShadow: '0 0 0 6px color-mix(in srgb, var(--sun) 22%, transparent)',
          offsetPath: `path('${ROUTE}')`,
          offsetDistance: reduceMotion ? '82%' : sunDistance,
          offsetAnchor: '50% 130%',
        }}
      />
      <motion.span
        aria-hidden="true"
        style={reduceMotion ? undefined : { opacity: badgeOpacity }}
        className="bg-ink text-paper absolute bottom-3 left-3 rounded px-2.5 py-1.5 font-mono text-[10px] font-medium tracking-[0.08em]"
      >
        SIT LEFT · SHADE 82% OF ROUTE
      </motion.span>
    </div>
  );
}
