'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** ShadySide route with animated draw-in and travelling sun. */
export function RouteVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <motion.path
        d="M14 88 C90 78 130 36 190 42 S276 66 290 28"
        fill="none"
        stroke="var(--ok)"
        strokeWidth="8"
        initial={r ? { opacity: 0.3 } : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d="M12 84 C88 74 128 32 188 38 S274 62 288 24"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="12"
        cy="84"
        r="5"
        fill="var(--ink)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.circle
        cx="288"
        cy="24"
        r="5"
        fill="var(--accent)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      />
      <motion.circle
        cx="240"
        cy="16"
        r="9"
        fill="var(--sun)"
        initial={r ? undefined : { scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.15, 1], opacity: 1 }}
        transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </svg>
  );
}
