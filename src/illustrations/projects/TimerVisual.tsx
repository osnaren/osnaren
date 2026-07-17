'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Timer / pomodoro clock with task list. */
export function TimerVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* clock ring — background */}
      <motion.circle
        cx="70"
        cy="55"
        r="39"
        fill="none"
        stroke="var(--well)"
        strokeWidth="8"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* clock ring — progress */}
      <motion.circle
        cx="70"
        cy="55"
        r="39"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="168 245"
        transform="rotate(-90 70 55)"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />
      {/* clock hands */}
      <motion.line
        x1="70"
        y1="55"
        x2="70"
        y2="31"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
      <motion.line
        x1="70"
        y1="55"
        x2="87"
        y2="64"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, delay: 0.5 }}
      />
      <motion.circle
        cx="70"
        cy="55"
        r="4"
        fill="var(--ink)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.55 }}
      />
      {/* task list */}
      <motion.text
        x="135"
        y="27"
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--faint)"
        initial={r ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        CURRENT TASK
      </motion.text>
      <motion.rect
        x="135"
        y="36"
        width="130"
        height="13"
        rx="4"
        fill="var(--ink)"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      />
      {[59, 76, 93].map((y, i) => (
        <motion.rect
          key={y}
          x="135"
          y={y}
          width={[94, 116, 72][i]}
          height="8"
          rx="4"
          fill={i === 2 ? 'var(--ok)' : 'var(--well)'}
          opacity={i === 2 ? 0.8 : 1}
          initial={r ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.25, delay: 0.4 + i * 0.07 }}
        />
      ))}
    </svg>
  );
}
