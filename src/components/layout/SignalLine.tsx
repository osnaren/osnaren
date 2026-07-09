'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const PATH = 'M0 22 C120 6 220 38 340 18 S560 4 700 26';

/**
 * The footer's visual element: a route line that draws itself once, with a
 * signal pulse travelling along it — echoing the ShadySide module on the
 * homepage. Decorative only.
 *
 * The pulse is a CSS animation rather than a Framer loop: an endless
 * JS-driven rAF loop keeps the renderer busy forever, which burns battery and
 * blocks headless screenshot capture. The compositor handles this for free.
 */
export function SignalLine() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <div ref={ref} className="relative h-11 w-full overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 700 44" className="h-full w-full" preserveAspectRatio="none">
        <path d={PATH} fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <motion.path
          d={PATH}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </svg>
      <span
        className="absolute top-0 left-0 size-2 rounded-full opacity-0 motion-safe:animate-[signal-travel_6s_linear_infinite]"
        style={{
          background: 'var(--ok)',
          offsetPath: `path('${PATH}')`,
          boxShadow: '0 0 0 4px color-mix(in srgb, var(--ok) 20%, transparent)',
          animationPlayState: inView ? 'running' : 'paused',
        }}
      />
    </div>
  );
}
