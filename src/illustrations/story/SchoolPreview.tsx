'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** School building rising from ground with details appearing. */
export function SchoolPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.rect
        x="44"
        y="34"
        width="152"
        height="98"
        rx="4"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M120 24 L188 52 L120 80 L52 52 Z"
        fill="var(--ink)"
        initial={r ? undefined : { y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.15 }}
      />
      <motion.line
        x1="188"
        y1="52"
        x2="188"
        y2="76"
        stroke="var(--accent)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <motion.circle
        cx="188"
        cy="80"
        r="5"
        fill="var(--accent)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.45 }}
      />
      <motion.rect
        x="72"
        y="98"
        width="96"
        height="4"
        rx="2"
        fill="var(--well)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      />
      <motion.rect
        x="88"
        y="110"
        width="64"
        height="4"
        rx="2"
        fill="var(--well)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.25, delay: 0.35 }}
      />
    </svg>
  );
}
