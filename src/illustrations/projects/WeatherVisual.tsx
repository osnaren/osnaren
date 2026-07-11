'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Weather display with sun, cloud, and data. */
export function WeatherVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* sun */}
      <motion.circle
        cx="72"
        cy="44"
        r="22"
        fill="var(--sun)"
        initial={r ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      />
      {/* sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.line
            key={angle}
            x1={72 + Math.cos(rad) * 29}
            y1={44 + Math.sin(rad) * 29}
            x2={72 + Math.cos(rad) * 36}
            y2={44 + Math.sin(rad) * 36}
            stroke="var(--sun)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={r ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.2, delay: 0.2 + (angle / 360) * 0.4 }}
          />
        );
      })}
      {/* cloud */}
      <motion.path
        d="M62 86 H148 C160 86 168 78 168 68 C168 57 159 49 148 49 C144 34 131 24 115 24 C96 24 81 38 80 57 C68 58 58 66 58 76 C58 80 59 83 62 86Z"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        initial={r ? undefined : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      {/* temperature */}
      <text x="194" y="47" fontFamily="var(--font-mono)" fontSize="25" fontWeight="600" fill="var(--ink)">
        27°
      </text>
      <motion.text
        x="194"
        y="66"
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--faint)"
        initial={r ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        KOLKATA / 14:20
      </motion.text>
      {/* status bars */}
      <motion.line
        x1="194"
        y1="79"
        x2="272"
        y2="79"
        stroke="var(--ok)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      />
      <motion.line
        x1="194"
        y1="90"
        x2="244"
        y2="90"
        stroke="var(--well)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={r ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      />
    </svg>
  );
}
