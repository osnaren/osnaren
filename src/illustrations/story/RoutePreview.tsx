'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** ShadySide route path with animated draw-in and pulsing sun. */
export function RoutePreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.path
        d="M18 120 C70 108 100 62 140 66 S208 90 224 44"
        fill="none"
        stroke="var(--ok)"
        strokeWidth="9"
        initial={r ? { opacity: 0.3 } : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d="M16 116 C68 104 98 58 138 62 S206 86 222 40"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="16"
        cy="116"
        r="5"
        fill="var(--ink)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.circle
        cx="222"
        cy="40"
        r="5"
        fill="var(--accent)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      />
      <motion.circle
        cx="186"
        cy="26"
        r="11"
        fill="var(--sun)"
        initial={r ? undefined : { scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.15, 1], opacity: 1 }}
        transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </svg>
  );
}
