'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** The three routes the bench opens into, matched to the pathway sections below. */
const routes = [
  { x: 130, label: 'OSN-001', name: 'ShadySide', tone: 'var(--accent)' },
  { x: 500, label: 'OSN-011', name: 'Lab', tone: 'var(--ok)' },
  { x: 870, label: 'OSN-012', name: 'Story', tone: 'var(--ok)' },
] as const;

/**
 * A quiet handoff between the hero workbench and the routes below it: one node
 * at the top fans into the three pathway sections, reusing the bench's signal
 * geometry and module IDs so the page reads as one continuous system.
 */
export function HomeBridge() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-hidden="true" className="bg-paper relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-[108rem] px-5 sm:px-8 xl:px-14 2xl:px-20">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="h-16 w-full sm:h-20 lg:h-24">
          {/* source node — the bench */}
          <circle cx="500" cy="6" r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          {routes.map((route, index) => {
            const d = `M500 8 C500 54 ${route.x} 40 ${route.x} 108`;
            return (
              <g key={route.label}>
                <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1.1" strokeDasharray="5 5" />
                <motion.path
                  d={d}
                  fill="none"
                  stroke={route.tone}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={reduceMotion ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.85 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : index * 0.12,
                    ease: 'easeOut',
                  }}
                />
                <circle cx={route.x} cy="108" r="4" fill={route.tone} />
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
