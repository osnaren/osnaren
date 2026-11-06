'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ALIASES = [
  { label: 'HIDDEN HEIRESS', y: 16 },
  { label: 'HEIRESS IN HIDING', y: 46 },
  { label: '千金归来', y: 76 },
];

/** Vertlas — several titles resolve into one 9:16 drama, beside the shelf it joins. */
export function VertlasVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {ALIASES.map((alias, i) => (
        <motion.g
          key={alias.label}
          initial={r ? undefined : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
        >
          <rect
            x="6"
            y={alias.y}
            width="96"
            height="18"
            rx="4"
            fill="var(--surface)"
            stroke={i === 0 ? 'var(--accent)' : 'var(--line-strong)'}
          />
          <text
            x="14"
            y={alias.y + 12}
            fontFamily="var(--font-mono)"
            fontSize="7.5"
            letterSpacing="0.6"
            fill={i === 0 ? 'var(--accent)' : 'var(--muted)'}
          >
            {alias.label}
          </text>
          <motion.path
            d={`M102 ${alias.y + 9} C118 ${alias.y + 9} 116 55 130 55`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            initial={r ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
          />
        </motion.g>
      ))}

      {/* the canonical drama */}
      <motion.g
        initial={r ? undefined : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        style={{ transformOrigin: '155px 55px' }}
      >
        <rect x="130" y="10" width="51" height="90" rx="5" fill="var(--accent)" fillOpacity="0.16" />
        <rect x="130" y="10" width="51" height="90" rx="5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="136" y="22" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--accent)">
          9:16
        </text>
        <rect x="136" y="80" width="39" height="4" rx="2" fill="var(--ink)" opacity="0.7" />
        <rect x="136" y="88" width="26" height="3" rx="1.5" fill="var(--ink)" opacity="0.35" />
      </motion.g>

      {/* the shelf it joins: tracked, rated, next up */}
      {[
        { x: 196, y: 20, w: 43, tone: 'var(--ok)' },
        { x: 248, y: 28, w: 38, tone: 'var(--sun)' },
      ].map((poster, i) => (
        <motion.g
          key={poster.x}
          initial={r ? undefined : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.7 + i * 0.08 }}
        >
          <rect
            x={poster.x}
            y={poster.y}
            width={poster.w}
            height={(poster.w * 16) / 9}
            rx="4"
            fill="var(--surface-2)"
            stroke="var(--line-strong)"
          />
          <circle cx={poster.x + 8} cy={poster.y + 8} r="3" fill={poster.tone} />
          <rect
            x={poster.x + 5}
            y={poster.y + (poster.w * 16) / 9 - 10}
            width={poster.w - 10}
            height="3"
            rx="1.5"
            fill="var(--ink)"
            opacity="0.3"
          />
        </motion.g>
      ))}
    </svg>
  );
}
