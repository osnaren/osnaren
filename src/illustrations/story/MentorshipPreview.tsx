'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Mentorship network — connections draw between tiers. */
export function MentorshipPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <g stroke="var(--line-strong)" strokeWidth="1.5">
        {[48, 96, 144, 192].map((x, i) => (
          <motion.path
            key={x}
            d={`M${i < 2 ? 88 : 152} 48 C${i < 2 ? 88 : 152} 76 ${x} 72 ${x} 106`}
            fill="none"
            initial={r ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
          />
        ))}
      </g>
      {[88, 152].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="42"
          r="13"
          fill="var(--accent)"
          initial={r ? undefined : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        />
      ))}
      <motion.path
        d="M101 42 H139"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      {[48, 96, 144, 192].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="110"
          r="10"
          fill="var(--ok)"
          opacity="0.68"
          initial={r ? undefined : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.25, delay: 0.4 + i * 0.06 }}
        />
      ))}
    </svg>
  );
}
