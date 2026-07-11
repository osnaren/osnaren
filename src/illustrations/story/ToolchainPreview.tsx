'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Toolchain grid schematic with staggered cell reveal. */
export function ToolchainPreview() {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4].map((col) => {
          const isAccent = row === 2 && col >= 1 && col <= 3;
          return (
            <motion.rect
              key={`${row}-${col}`}
              x={20 + col * 42}
              y={20 + row * 24}
              width="34"
              height="16"
              rx="3"
              fill={isAccent ? 'var(--accent)' : 'var(--well)'}
              initial={r ? undefined : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: (row * 5 + col) * 0.02 }}
            />
          );
        })
      )}
    </svg>
  );
}
