'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { OrbitalBadge } from '@/components/layout/OrbitalBadge';

/**
 * OrbitalPreloader — a full-screen loading screen using the orbital badge.
 *
 * Shows once on initial page load, then fades out and is removed from the DOM.
 * Respects `prefers-reduced-motion` — snaps out immediately when preferred.
 *
 * The preloader waits for:
 * 1. The Coda font to finish loading (via `document.fonts.ready`)
 * 2. A minimum display time of 600ms (so it doesn't flash)
 * 3. An additional 400ms for the "os" text to animate in before fading out
 */
export function OrbitalPreloader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const finish = () => {
      if (!cancelled) setVisible(false);
    };

    // Wait for fonts + minimum display time
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 800));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([minDelay, fontsReady]).then(finish);

    // Safety timeout — never block the page for more than 2.5s
    const safety = setTimeout(finish, 2500);

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeInOut' }}
          className="bg-paper fixed inset-0 z-9999 grid place-items-center"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <OrbitalBadge size={200} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
