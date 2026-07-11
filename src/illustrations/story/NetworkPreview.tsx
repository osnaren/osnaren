'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Network topology — lines radiate from center, nodes scale in. */
export function NetworkPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.circle
        cx="120"
        cy="75"
        r="22"
        fill="var(--accent)"
        opacity="0.82"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.35 }}
      />
      <motion.circle
        cx="120"
        cy="75"
        r="6"
        fill="var(--surface)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      />
      {[
        { x: 182, y: 96 },
        { x: 138, y: 123 },
        { x: 81, y: 116 },
        { x: 52, y: 79 },
        { x: 72, y: 40 },
        { x: 126, y: 25 },
      ].map((node, i) => (
        <g key={`${node.x}-${node.y}`}>
          <motion.line
            x1="120"
            y1="75"
            x2={node.x}
            y2={node.y}
            stroke="var(--line-strong)"
            strokeWidth="1.5"
            initial={r ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="9"
            fill="var(--ok)"
            opacity="0.7"
            initial={r ? undefined : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, delay: 0.2 + i * 0.06 }}
          />
        </g>
      ))}
    </svg>
  );
}
