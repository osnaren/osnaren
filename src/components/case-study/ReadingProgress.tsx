'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin signal-orange bar under the sticky header showing how far through a
 * case study the reader is. Decorative — hidden from AT and from print.
 */
export function ReadingProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="bg-accent print-hidden fixed inset-x-0 top-16.25 z-30 h-0.5 origin-left"
      style={{ scaleX }}
    />
  );
}
