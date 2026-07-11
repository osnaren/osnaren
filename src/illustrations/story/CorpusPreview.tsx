'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Multi-cancer corpus — fan branches spread outward from root. */
export function CorpusPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.circle
        cx="120"
        cy="22"
        r="10"
        fill="var(--ink)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = Math.PI * 0.15 + (i * Math.PI * 0.7) / 7;
        const endX = 120 + Math.cos(angle - Math.PI / 2) * 50;
        const endY = 22 + Math.sin(angle - Math.PI / 2) * 50 + 36;
        const fill = i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--ok)' : 'var(--sun)';
        return (
          <g key={i}>
            <motion.line
              x1="120"
              y1="32"
              x2={endX}
              y2={endY}
              stroke="var(--line-strong)"
              strokeWidth="1"
              initial={r ? undefined : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
            />
            <motion.circle
              cx={endX}
              cy={endY}
              r="8"
              fill={fill}
              opacity="0.8"
              initial={r ? undefined : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25, delay: 0.3 + i * 0.05 }}
            />
            {[0, 1, 2].map((j) => (
              <motion.circle
                key={j}
                cx={endX + (j - 1) * 10}
                cy={endY + 16}
                r="3"
                fill={fill}
                opacity="0.4"
                initial={r ? undefined : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.45 + i * 0.04 + j * 0.03 }}
              />
            ))}
          </g>
        );
      })}
      <motion.rect
        x="68"
        y="128"
        width="104"
        height="14"
        rx="3"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      />
      <text x="120" y="138" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--faint)">
        8 CLASSES · 26 SUBCLASSES
      </text>
    </svg>
  );
}
