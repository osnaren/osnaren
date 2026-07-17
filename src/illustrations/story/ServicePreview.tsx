'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Community service — ring draws, nodes appear, heart pulses. */
export function ServicePreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.circle
        cx="120"
        cy="75"
        r="48"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      {[
        { x: 168, y: 75 },
        { x: 144, y: 117 },
        { x: 96, y: 117 },
        { x: 72, y: 75 },
        { x: 96, y: 33 },
        { x: 144, y: 33 },
      ].map((node, i) => (
        <motion.circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r="8"
          fill={i % 2 ? 'var(--ok)' : 'var(--accent)'}
          opacity="0.75"
          initial={r ? undefined : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0.3 + i * 0.06 }}
        />
      ))}
      <motion.path
        d="M96 76 C106 62 114 64 120 72 C126 64 134 62 144 76 C136 92 124 101 120 104 C116 101 104 92 96 76 Z"
        fill="var(--sun)"
        opacity="0.72"
        initial={r ? undefined : { scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.12, 1], opacity: 0.72 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  );
}
