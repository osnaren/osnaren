'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { ParticleWordmark } from '@/components/footer/ParticleWordmark';
import { Stackfield } from '@/components/footer/Stackfield';
import { site } from '@/data/site';
import { stackItems } from '@/data/stackfield';

const modules = [
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Story', href: '/story' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

const channels = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'X', href: site.links.x },
  { label: 'Email', href: `mailto:${site.email}` },
];

/** Bump when the site's content meaningfully changes. */
const LAST_UPDATED = 'July 2026';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

/**
 * The Subsurface Lab. Every page's <main> is at least full-screen (see
 * layout.tsx), so this footer can sit sticky under the raised page surface.
 * Near the bottom on larger screens, the page scroll exposes the pinned footer
 * while its layers rise on separate tracks and the grid planes drift at
 * different depths. On narrow screens the footer remains in normal flow so the
 * full stackfield stays reachable.
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Desktop uses the final document segment because the footer is already
  // sticky behind the page. Mobile uses the footer's own arrival because it
  // stays in normal flow so every part remains reachable.
  const { scrollYProgress: pageScrollProgress } = useScroll();
  const { scrollYProgress: footerScrollProgress } = useScroll({ target: footerRef, offset: ['start 92%', 'end end'] });
  const desktopRevealProgress = useTransform(pageScrollProgress, [0.78, 1], [0, 1], { clamp: true });
  const revealProgress = useMotionValue(0);

  useMotionValueEvent(desktopRevealProgress, 'change', (latest) => {
    if (isDesktop) revealProgress.set(latest);
  });
  useMotionValueEvent(footerScrollProgress, 'change', (latest) => {
    if (!isDesktop) revealProgress.set(latest);
  });
  useEffect(() => {
    revealProgress.set(isDesktop ? desktopRevealProgress.get() : footerScrollProgress.get());
  }, [desktopRevealProgress, footerScrollProgress, isDesktop, revealProgress]);

  const progress = useSpring(revealProgress, {
    stiffness: 86,
    damping: 24,
    restDelta: 0.0005,
  });

  // particle loop runs only while the footer is genuinely on screen
  const inView = useInView(footerRef, { amount: 0.12 });

  const wordY = useTransform(progress, [0, 1], [110, -6]);
  const wordOpacity = useTransform(progress, [0.04, 0.48], [0, 1]);
  const midY = useTransform(progress, [0, 1], [132, 0]);
  const midOpacity = useTransform(progress, [0.18, 0.72], [0, 1]);
  const railY = useTransform(progress, [0, 1], [78, 0]);
  const railOpacity = useTransform(progress, [0.52, 1], [0, 1]);

  const farGridY = useTransform(progress, [0, 1], [104, 10]);
  const farGridScale = useTransform(progress, [0, 1], [1.08, 1.01]);
  const farGridOpacity = useTransform(progress, [0, 1], [0.26, 0.58]);
  const nearGridY = useTransform(progress, [0, 1], [-36, -92]);
  const nearGridScale = useTransform(progress, [0, 1], [0.99, 1.04]);
  const nearGridOpacity = useTransform(progress, [0.28, 1], [0, 0.24]);
  const farGridPosition = useMotionTemplate`0px ${farGridY}px`;
  const nearGridPosition = useMotionTemplate`22px ${nearGridY}px`;

  const layer = (y: typeof wordY, opacity: typeof wordOpacity) => (reduceMotion ? undefined : { y, opacity });

  return (
    <footer
      ref={footerRef}
      aria-labelledby="footer-heading"
      className="border-line bg-well relative z-0 overflow-hidden border-t md:sticky md:bottom-0"
    >
      {/* two grid planes drift in opposite directions for a subtle depth cue */}
      <motion.div
        aria-hidden="true"
        className="bg-grid absolute inset-[-12%]"
        style={
          reduceMotion
            ? undefined
            : { y: farGridY, scale: farGridScale, opacity: farGridOpacity, backgroundPosition: farGridPosition }
        }
      />
      <motion.div
        aria-hidden="true"
        className="bg-grid absolute inset-[-8%] mix-blend-multiply dark:mix-blend-screen"
        style={
          reduceMotion
            ? undefined
            : { y: nearGridY, scale: nearGridScale, opacity: nearGridOpacity, backgroundPosition: nearGridPosition }
        }
      />
      <div
        aria-hidden="true"
        className="from-paper/20 via-transparent to-well pointer-events-none absolute inset-0 bg-linear-to-b"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-5 sm:px-8">
        <h2 id="footer-heading" className="sr-only">
          Obuli Sai Naren — site footer
        </h2>

        {/* plain-text version of everything the visuals encode */}
        <div className="sr-only">
          <p>OSNAREN — frontend systems, useful tools, research artifacts, and tiny experiments.</p>
          <p>Based in Salem, Tamil Nadu, India. Open channel — available for interesting work.</p>
          <p>Stack and interests: {stackItems.map((item) => item.label).join(', ')}.</p>
        </div>

        {/* layer 1 — particle wordmark + tagline */}
        <motion.div style={layer(wordY, wordOpacity)}>
          <ParticleWordmark active={inView} />
          <p className="text-muted mt-2 text-center text-[13.5px] tracking-[0.01em]">
            Frontend systems, useful tools, research artifacts, and tiny experiments.
          </p>
        </motion.div>

        {/* layer 2 — the stackfield, embedded in the substrate */}
        <motion.div style={layer(midY, midOpacity)} className="mx-auto mt-9 w-full max-w-2xl">
          <Stackfield />
        </motion.div>

        {/* layer 3 — bottom command rail */}
        <motion.div style={layer(railY, railOpacity)} className="border-line mt-9 border-t pt-4">
          <div className="flex flex-col gap-x-6 gap-y-3 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Modules">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {modules.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted hover:text-accent font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Channels">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {channels.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="text-muted hover:text-accent font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase transition-colors"
                    >
                      {item.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="text-faint mt-4 flex flex-col gap-x-6 gap-y-2 font-mono text-[9.5px] tracking-[0.08em] uppercase md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Obuli Sai Naren · Built on the bench</p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span>Last updated {LAST_UPDATED}</span>
              <span className="border-ok/30 text-ok inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1">
                <span className="bg-ok size-1 rounded-full" aria-hidden="true" />
                Open channel · Bench online {site.version}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
