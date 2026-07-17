'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** University campus — building rises from ground with archway drawing in. */
export function CampusPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.line
        x1="36"
        y1="136"
        x2="204"
        y2="136"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.rect
        x="56"
        y="44"
        width="128"
        height="84"
        rx="3"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      />
      <motion.path
        d="M120 26 L192 50 L48 50 Z"
        fill="var(--ink)"
        initial={r ? undefined : { y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      {[80, 110, 130, 160].map((x, i) => (
        <motion.rect
          key={x}
          x={x - 2}
          y="56"
          width="4"
          height="40"
          rx="1"
          fill="var(--line-strong)"
          initial={r ? undefined : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ originY: 1 }}
          transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
        />
      ))}
      <motion.path
        d="M108 96 Q120 78 132 96"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      />
      <motion.line
        x1="108"
        y1="96"
        x2="108"
        y2="128"
        stroke="var(--accent)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, delay: 0.55 }}
      />
      <motion.line
        x1="132"
        y1="96"
        x2="132"
        y2="128"
        stroke="var(--accent)"
        strokeWidth="2.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, delay: 0.6 }}
      />
      <motion.rect
        x="100"
        y="128"
        width="40"
        height="4"
        rx="1"
        fill="var(--well)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.2, delay: 0.65 }}
      />
      <motion.rect
        x="96"
        y="132"
        width="48"
        height="4"
        rx="1"
        fill="var(--well)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.2, delay: 0.7 }}
      />
    </svg>
  );
}
