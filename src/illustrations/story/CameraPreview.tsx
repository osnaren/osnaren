'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Camera lens with aperture scaling in. */
export function CameraPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.rect
        x="48"
        y="38"
        width="144"
        height="86"
        rx="8"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.rect
        x="92"
        y="24"
        width="42"
        height="16"
        rx="4"
        fill="var(--well)"
        initial={r ? undefined : { y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.2 }}
      />
      <motion.circle
        cx="120"
        cy="82"
        r="28"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.circle
        cx="120"
        cy="82"
        r="12"
        fill="var(--accent)"
        opacity="0.25"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      <motion.circle
        cx="120"
        cy="82"
        r="5"
        fill="var(--accent)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.circle
        cx="170"
        cy="54"
        r="4"
        fill="var(--sun)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      />
    </svg>
  );
}
