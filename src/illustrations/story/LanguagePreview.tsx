'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Language-learning progress bars that grow from baseline. */
export function LanguagePreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.line
        x1="34"
        y1="118"
        x2="206"
        y2="118"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <motion.rect
            x={36 + i * 21}
            y={106 - i * 9}
            width="15"
            height={12 + i * 9}
            rx="2"
            fill={i === 7 ? 'var(--accent)' : i > 4 ? 'var(--ok)' : 'var(--well)'}
            initial={r ? undefined : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: 1 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
          />
          <text x={43.5 + i * 21} y="132" textAnchor="middle" fill="var(--faint)" fontSize="7" fontFamily="monospace">
            {i + 1}
          </text>
        </g>
      ))}
      <motion.circle
        cx="199"
        cy="32"
        r="10"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      <motion.path
        d="M194 32 L198 36 L205 27"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      />
    </svg>
  );
}
