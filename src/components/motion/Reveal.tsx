'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll reveal per the design spec: 12px rise + fade, 0.35s, optional stagger.
 * Falls back to a plain opacity fade when the user prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li';
}) {
  const reduceMotion = useReducedMotion();
  const Component = as === 'section' ? motion.section : as === 'li' ? motion.li : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </Component>
  );
}
