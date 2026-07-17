'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Garden growth — stem grows up, leaves unfurl, blossom appears. */
export function GardenPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.line
        x1="70"
        y1="132"
        x2="170"
        y2="132"
        stroke="var(--line-strong)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.line
        x1="120"
        y1="132"
        x2="120"
        y2="56"
        stroke="var(--ok)"
        strokeWidth="3"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
      <motion.path
        d="M120 92 C96 88 82 70 84 52 C106 54 120 70 120 92 Z"
        fill="var(--ok)"
        opacity="0.75"
        initial={r ? undefined : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.75 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      <motion.path
        d="M120 78 C144 74 158 56 156 38 C134 40 120 56 120 78 Z"
        fill="var(--ok)"
        opacity="0.5"
        initial={r ? undefined : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.circle
        cx="120"
        cy="46"
        r="8"
        fill="var(--accent)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </svg>
  );
}
