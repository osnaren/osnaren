'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Lab / experiment grid with staggered tile reveal. */
export function LabPreview() {
  const r = useReducedMotion();
  const tones = ['well', 'accent', 'well', 'ink', 'ok', 'well', 'sun', 'well', 'well'] as const;

  return (
    <div className="grid h-full place-items-center p-4" aria-hidden="true">
      <div className="grid aspect-square h-full max-h-full w-auto grid-cols-3 gap-2">
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
    </div>
  );
}
