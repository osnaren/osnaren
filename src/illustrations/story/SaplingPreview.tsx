'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Sapling planting milestone — trees grow from ground up. */
export function SaplingPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <motion.line
        x1="28"
        y1="122"
        x2="212"
        y2="122"
        stroke="var(--line-strong)"
        strokeWidth="2"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      {[62, 120, 178].map((x, i) => (
        <g key={x}>
          <motion.line
            x1={x}
            y1="122"
            x2={x}
            y2={72 - i * 8}
            stroke="var(--ok)"
            strokeWidth="2.5"
            initial={r ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
          />
          <motion.path
            d={`M${x} ${96 - i * 8} C${x - 20} ${92 - i * 8} ${x - 24} ${76 - i * 8} ${x - 22} ${68 - i * 8} C${x - 5} ${70 - i * 8} ${x} ${82 - i * 8} ${x} ${96 - i * 8} Z`}
            fill="var(--ok)"
            opacity="0.52"
            initial={r ? undefined : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.52 }}
            transition={{ duration: 0.35, delay: 0.4 + i * 0.12 }}
          />
          <motion.path
            d={`M${x} ${86 - i * 8} C${x + 18} ${82 - i * 8} ${x + 24} ${66 - i * 8} ${x + 21} ${58 - i * 8} C${x + 6} ${61 - i * 8} ${x} ${72 - i * 8} ${x} ${86 - i * 8} Z`}
            fill="var(--ok)"
            opacity="0.78"
            initial={r ? undefined : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.78 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.12 }}
          />
        </g>
      ))}
      <motion.rect
        x="82"
        y="20"
        width="76"
        height="24"
        rx="4"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        initial={r ? undefined : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      />
      <text x="120" y="35" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="monospace">
        1,000+ SAPLINGS
      </text>
    </svg>
  );
}
