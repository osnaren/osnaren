'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Employee badge dropping in with lanyard swing. */
export function BadgePreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.line
        x1="120"
        y1="4"
        x2="120"
        y2="32"
        stroke="var(--line-strong)"
        strokeWidth="2"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle
        cx="120"
        cy="6"
        r="4"
        fill="var(--well)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.rect
        x="64"
        y="32"
        width="112"
        height="80"
        rx="6"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 200, damping: 20 }}
      />
      <motion.circle
        cx="100"
        cy="64"
        r="14"
        fill="var(--well)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <circle cx="100" cy="58" r="6" fill="var(--well)" opacity="0.6" />
      <path d="M88 72 C88 66 94 62 100 62 C106 62 112 66 112 72" fill="var(--well)" opacity="0.6" />
      <motion.rect
        x="122"
        y="54"
        width="42"
        height="5"
        rx="2.5"
        fill="var(--ink)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.25, delay: 0.35 }}
      />
      <motion.rect
        x="122"
        y="64"
        width="30"
        height="3.5"
        rx="1.75"
        fill="var(--well)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      />
      <motion.rect
        x="122"
        y="72"
        width="36"
        height="3.5"
        rx="1.75"
        fill="var(--well)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.2, delay: 0.45 }}
      />
      <motion.rect
        x="64"
        y="98"
        width="112"
        height="14"
        rx="0"
        fill="var(--accent)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      <rect x="64" y="98" width="112" height="6" rx="6" fill="var(--accent)" />
      <motion.rect
        x="80"
        y="101"
        width="80"
        height="4"
        rx="2"
        fill="var(--paper)"
        opacity="0.5"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.2, delay: 0.6 }}
      />
      <rect x="112" y="26" width="16" height="10" rx="2" fill="var(--line-strong)" />
    </svg>
  );
}
