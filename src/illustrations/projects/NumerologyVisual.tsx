'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Numerology calculator — grid reveal with result circle. */
export function NumerologyVisual() {
  const r = useReducedMotion();
  const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {values.map((value, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const active = value === '5';
        return (
          <g key={value}>
            <motion.rect
              x={22 + col * 34}
              y={10 + row * 30}
              width="26"
              height="24"
              rx="4"
              fill={active ? 'var(--accent)' : 'var(--well)'}
              initial={r ? undefined : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            />
            <text
              x={35 + col * 34}
              y={26 + row * 30}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill={active ? 'var(--paper)' : 'var(--faint)'}
            >
              {value}
            </text>
          </g>
        );
      })}
      <motion.path
        d="M132 55 H164"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <motion.path
        d="M157 49 L164 55 L157 61"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      />
      <motion.circle
        cx="210"
        cy="55"
        r="34"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.35, delay: 0.3 }}
      />
      <motion.circle
        cx="210"
        cy="55"
        r="24"
        fill="none"
        stroke="var(--sun)"
        strokeWidth="2"
        strokeDasharray="2 4"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <text
        x="210"
        y="64"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="29"
        fontWeight="600"
        fill="var(--ink)"
      >
        5
      </text>
      <text x="210" y="103" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--faint)">
        MERCURY
      </text>
    </svg>
  );
}
