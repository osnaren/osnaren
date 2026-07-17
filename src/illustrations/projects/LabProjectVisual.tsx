'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Lab / experiment grid with staggered reveal. */
export function LabProjectVisual() {
  const r = useReducedMotion();
  const tones = ['well', 'accent', 'well', 'ink', 'ok', 'well', 'sun', 'well'] as const;

  return (
    <div className="grid h-full grid-cols-4 content-center gap-2 px-6" aria-hidden="true">
      {tones.map((tone, i) => (
        <motion.span
          key={i}
          className="aspect-square rounded"
          style={{ background: `var(--${tone})` }}
          initial={r ? undefined : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: i * 0.03 }}
        />
      ))}
    </div>
  );
}
