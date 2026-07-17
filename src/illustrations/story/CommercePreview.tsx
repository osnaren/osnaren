'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Commerce product page schematic with animated elements. */
export function CommercePreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.rect
        x="16"
        y="20"
        width="86"
        height="110"
        rx="6"
        fill="var(--well)"
        initial={r ? undefined : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M32 108 L54 76 L70 92 L88 62"
        stroke="var(--faint)"
        strokeWidth="2.5"
        fill="none"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      {[0, 1].map((i) => (
        <motion.rect
          key={`t-${i}`}
          x="118"
          y={24 + i * 20}
          width={i === 0 ? 106 : 66}
          height={i === 0 ? 10 : 8}
          rx={i === 0 ? 5 : 4}
          fill="var(--well)"
          initial={r ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.3, delay: 0.15 + i * 0.1 }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={`chip-${i}`}
          x={118 + i * 28}
          y="68"
          width="22"
          height="18"
          rx="3"
          fill={i === 1 ? 'var(--ok)' : 'var(--well)'}
          initial={r ? undefined : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
        />
      ))}
      <motion.rect
        x="118"
        y="102"
        width="106"
        height="20"
        rx="5"
        fill="var(--accent)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.35, delay: 0.5 }}
      />
    </svg>
  );
}
