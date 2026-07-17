'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Forest fire classification — cards flip in with flame accent. */
export function FirePreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      {[
        { x: 20, fill: 'var(--accent)', label: 'fire', icon: true },
        { x: 72, fill: 'var(--ok)', label: 'no fire' },
        { x: 124, fill: 'var(--faint)', label: 'smoke' },
        { x: 176, fill: 'var(--sun)', label: 'mixed' },
      ].map((cell, i) => (
        <g key={cell.label}>
          <motion.rect
            x={cell.x}
            y="32"
            width="44"
            height="56"
            rx="5"
            fill={cell.fill}
            opacity="0.85"
            initial={r ? undefined : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: 0.5 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          />
          {cell.icon && (
            <motion.path
              d="M42 62 C42 50 48 42 42 36 C36 42 42 50 42 62 Z"
              fill="var(--paper)"
              opacity="0.6"
              initial={r ? undefined : { scale: 0 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          )}
          <text
            x={cell.x + 22}
            y="104"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="7"
            fill="var(--faint)"
          >
            {cell.label}
          </text>
        </g>
      ))}
      <motion.rect
        x="56"
        y="118"
        width="128"
        height="18"
        rx="4"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="1"
        initial={r ? undefined : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.35, delay: 0.4 }}
      />
      <text x="120" y="130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--accent)">
        98.72% ACCURACY
      </text>
    </svg>
  );
}
