'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Dataset grid with staggered tile reveal. */
export function DatasetPreview() {
  const r = useReducedMotion();

  return (
    <div className="grid h-full place-items-center p-4" aria-hidden="true">
      <div className="grid aspect-3/2 h-full max-h-full w-auto grid-cols-6 gap-1.5">
        {Array.from({ length: 24 }).map((_, i) => {
          const tone = i % 7 === 0 ? 'accent' : i % 5 === 0 ? 'ok' : i % 11 === 0 ? 'sun' : 'well';
          return (
            <motion.span
              key={i}
              className="aspect-square rounded-sm"
              style={{ background: `var(--${tone})` }}
              initial={r ? undefined : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: i * 0.015 }}
            />
          );
        })}
      </div>
    </div>
  );
}
