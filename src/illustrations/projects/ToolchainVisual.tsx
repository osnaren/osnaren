'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Toolchain / Soliton scheduler grid with staggered reveal. */
export function ToolchainVisual() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => {
          const isAccent = row === 1 && col >= 1 && col <= 3;
          return (
            <motion.rect
              key={`${row}-${col}`}
              x={20 + col * 44}
              y={16 + row * 22}
              width="38"
              height="16"
              rx="3"
              fill={isAccent ? 'var(--accent)' : 'var(--well)'}
              opacity={isAccent ? 0.9 : 1}
              initial={r ? undefined : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: isAccent ? 0.9 : 1, scale: 1 }}
              transition={{ duration: 0.2, delay: (row * 6 + col) * 0.015 }}
            />
          );
        })
      )}
    </svg>
  );
}
