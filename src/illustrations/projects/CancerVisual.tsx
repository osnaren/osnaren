'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Multi-cancer classification — fan diagram with staggered reveal. */
export function CancerVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* root node */}
      <motion.circle
        cx="150"
        cy="16"
        r="10"
        fill="var(--ink)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* 8 class branches spread wider */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 22 + i * 35.4;
        const fill = i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--ok)' : 'var(--sun)';
        return (
          <g key={i}>
            <motion.line
              x1="150"
              y1="26"
              x2={x}
              y2="72"
              stroke="var(--line-strong)"
              strokeWidth="1.2"
              initial={r ? undefined : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
            />
            <motion.circle
              cx={x}
              cy="80"
              r="8"
              fill={fill}
              opacity="0.85"
              initial={r ? undefined : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25, delay: 0.3 + i * 0.05 }}
            />
          </g>
        );
      })}
    </svg>
  );
}
