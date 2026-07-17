'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Coordination hub — lines draw outward from center. */
export function CoordinationPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.rect
        x="94"
        y="55"
        width="52"
        height="40"
        rx="5"
        fill="var(--accent)"
        opacity="0.82"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle
        cx="120"
        cy="75"
        r="5"
        fill="var(--surface)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      />
      {[
        { x: 24, y: 26 },
        { x: 24, y: 100 },
        { x: 172, y: 26 },
        { x: 172, y: 100 },
      ].map((node, i) => (
        <g key={`${node.x}-${node.y}`}>
          <motion.path
            d={`M${node.x < 100 ? node.x + 44 : node.x} ${node.y + 12} L${node.x < 100 ? 94 : 146} 75`}
            stroke="var(--line-strong)"
            strokeWidth="1.5"
            initial={r ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.07 }}
          />
          <motion.rect
            x={node.x}
            y={node.y}
            width="44"
            height="24"
            rx="4"
            fill="var(--well)"
            initial={r ? undefined : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.35 + i * 0.07 }}
          />
        </g>
      ))}
    </svg>
  );
}
