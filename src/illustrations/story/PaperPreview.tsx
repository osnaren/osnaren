'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Annotated document schematic with lines fading in. */
export function PaperPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.rect
        x="52"
        y="14"
        width="136"
        height="122"
        rx="4"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.rect
        x="68"
        y="30"
        width="82"
        height="7"
        rx="3.5"
        fill="var(--ink)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      />
      <motion.rect
        x="68"
        y="44"
        width="104"
        height="4"
        rx="2"
        fill="var(--well)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={i}
          x="68"
          y={62 + i * 11}
          width={i % 2 ? 88 : 104}
          height="4"
          rx="2"
          fill="var(--well)"
          initial={r ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.2, delay: 0.25 + i * 0.05 }}
        />
      ))}
      <motion.rect
        x="68"
        y="118"
        width="44"
        height="7"
        rx="3.5"
        fill="var(--accent)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3, delay: 0.55 }}
      />
    </svg>
  );
}
