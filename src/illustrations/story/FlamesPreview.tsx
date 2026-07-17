'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** TheFlames letter tiles with staggered reveal and strike-through. */
export function FlamesPreview() {
  const r = useReducedMotion();

  return (
    <div className="grid h-full place-items-center p-4" aria-hidden="true">
      <div className="grid grid-cols-3 gap-2">
        {['F', 'L', 'A', 'M', 'E', 'S'].map((letter, i) => (
          <motion.span
            key={letter}
            initial={r ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className={`relative grid size-9 place-items-center rounded-md border font-mono text-xs font-medium ${
              i === 1 ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface text-muted'
            }`}
          >
            {letter}
            {i !== 1 && !r && (
              <motion.span
                className="bg-accent/80 absolute top-1/2 left-1 h-0.5 w-7 origin-left -translate-y-1/2 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              />
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
