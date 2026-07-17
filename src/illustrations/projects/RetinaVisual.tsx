'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Retinal OCT classification — concentric rings expanding with scan bars. */
export function RetinaVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <motion.circle
        cx="150"
        cy="55"
        r="44"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { pathLength: 0, scale: 0.7 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.circle
        cx="150"
        cy="55"
        r="30"
        fill="none"
        stroke="var(--ok)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        initial={r ? undefined : { pathLength: 0, scale: 0.7 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.circle
        cx="150"
        cy="55"
        r="15"
        fill="var(--ink)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <motion.circle
        cx="150"
        cy="55"
        r="6"
        fill="var(--accent)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* scan bars — left */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={`l-${i}`}
          x="20"
          y={30 + i * 17}
          width="68"
          height="4"
          rx="2"
          fill="var(--well)"
          initial={r ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.25, delay: 0.2 + i * 0.06 }}
        />
      ))}
      {/* scan bars — right */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={`r-${i}`}
          x={212}
          y={30 + i * 17}
          width="68"
          height="4"
          rx="2"
          fill="var(--well)"
          initial={r ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 1 }}
          transition={{ duration: 0.25, delay: 0.2 + i * 0.06 }}
        />
      ))}
    </svg>
  );
}
