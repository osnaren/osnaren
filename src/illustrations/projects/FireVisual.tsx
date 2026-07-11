'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Forest fire detection — four class swatches with staggered reveal. */
export function FireVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {[
        { x: 18, fill: 'var(--accent)', label: 'fire' },
        { x: 90, fill: 'var(--ok)', label: 'nofire' },
        { x: 162, fill: 'var(--faint)', label: 'smoke' },
        { x: 234, fill: 'var(--sun)', label: 'smokefire' },
      ].map((cell, i) => (
        <g key={cell.label}>
          <motion.rect
            x={cell.x}
            y="18"
            width="52"
            height="52"
            rx="6"
            fill={cell.fill}
            opacity="0.9"
            initial={r ? undefined : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: 0.5 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          />
          <text
            x={cell.x + 26}
            y="88"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="var(--faint)"
          >
            {cell.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
