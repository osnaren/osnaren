'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Commerce product page schematic. */
export function CommerceVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <motion.rect
        x="16"
        y="14"
        width="84"
        height="84"
        rx="6"
        fill="var(--well)"
        initial={r ? undefined : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M32 82 L54 56 L70 70 L86 46"
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
          y={18 + i * 20}
          width={i === 0 ? 150 : 96}
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
          key={`sw-${i}`}
          x={118 + i * 26}
          y="58"
          width="20"
          height="16"
          rx="3"
          fill={i === 1 ? 'var(--ok)' : 'var(--well)'}
          opacity={i === 1 ? 0.9 : 1}
          initial={r ? undefined : { opacity: 0, y: 4 }}
          animate={{ opacity: i === 1 ? 0.9 : 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
        />
      ))}
      <motion.rect
        x="118"
        y="82"
        width="112"
        height="16"
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
