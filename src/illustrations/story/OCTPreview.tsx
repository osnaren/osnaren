'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Retinal OCT scan — rings expand outward, scan bars fade in. */
export function OCTPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.circle
        cx="120"
        cy="75"
        r="50"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { pathLength: 0, scale: 0.6 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.circle
        cx="120"
        cy="75"
        r="34"
        fill="none"
        stroke="var(--ok)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        initial={r ? undefined : { pathLength: 0, scale: 0.6 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
      <motion.circle
        cx="120"
        cy="75"
        r="16"
        fill="var(--ink)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      />
      <motion.circle
        cx="120"
        cy="75"
        r="7"
        fill="var(--accent)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`l-${i}`}
          x="14"
          y={30 + i * 18}
          width="40"
          height="8"
          rx="2"
          fill="var(--well)"
          initial={r ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.2, delay: 0.2 + i * 0.05 }}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`r-${i}`}
          x={186}
          y={30 + i * 18}
          width="40"
          height="8"
          rx="2"
          fill="var(--well)"
          initial={r ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 1 }}
          transition={{ duration: 0.2, delay: 0.2 + i * 0.05 }}
        />
      ))}
      <motion.line
        x1="14"
        y1="75"
        x2="68"
        y2="75"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.line
        x1="172"
        y1="75"
        x2="226"
        y2="75"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </svg>
  );
}
