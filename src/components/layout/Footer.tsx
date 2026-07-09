'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Link from 'next/link';

import {
  motion,
  useMotionTemplate,
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

const moduleMap = [
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Story', href: '/story' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

const featured = [
  { label: 'ShadySide', href: '/projects/shadyside', meta: 'OSN-001' },
  { label: 'TheFlames', href: '/projects/theflames', meta: 'OSN-002' },
  { label: 'Research', href: '/projects/forest-fire-detection', meta: '3 papers' },
  { label: 'Datasets', href: '/projects/multi-cancer-dataset', meta: '3 public' },
];

const socials = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'X', href: site.links.x },
  { label: 'Email', href: `mailto:${site.email}` },
];

/** Bump when the site's content meaningfully changes. */
const LAST_UPDATED = 'July 2026';

/**
 * The Subsurface Lab: main content (z-10, opaque) lifts away to reveal the
 * footer pinned beneath it. Sticky pinning is only enabled when the whole
 * footer fits in the viewport — otherwise it degrades to normal flow and the
 * layered parallax still plays as it scrolls in. The reveal progress is read
 * from a zero-height sentinel that sits at the end of the page flow in
 * layout.tsx (the footer itself is a useless scroll target once pinned).
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLElement | null>(null);
  const [canStick, setCanStick] = useState(false);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    sentinelRef.current = document.getElementById('footer-reveal-sentinel');
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const check = () => setCanStick(window.innerWidth >= 1024 && footer.offsetHeight <= window.innerHeight);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(footer);
    window.addEventListener('resize', check);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', check);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sentinelRef, offset: ['start end', 'start 0.3'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  // drives the particle loop: a sticky-pinned footer always "intersects" the
  // viewport, so exposure has to come from the reveal progress instead of IO
  const [revealed, setRevealed] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (value) => setRevealed(value > 0.002));

  const wordY = useTransform(progress, [0, 1], [64, 0]);
  const wordOpacity = useTransform(progress, [0, 0.55], [0.15, 1]);
  const midY = useTransform(progress, [0.12, 1], [88, 0]);
  const midOpacity = useTransform(progress, [0.12, 0.85], [0, 1]);
  const bottomY = useTransform(progress, [0.3, 1], [56, 0]);
  const bottomOpacity = useTransform(progress, [0.3, 1], [0, 1]);
  const gridShift = useTransform(progress, [0, 1], [48, 0]);
  const backgroundPosition = useMotionTemplate`0px ${gridShift}px`;

  const layer = (y: typeof wordY, opacity: typeof wordOpacity) => (reduceMotion ? undefined : { y, opacity });

  return (
    <footer
      ref={footerRef}
      aria-labelledby="footer-heading"
      className={`border-line bg-well relative overflow-hidden border-t ${canStick ? 'sticky bottom-0 z-0' : ''}`}
    >
      {/* subsurface grid, drifting slightly slower than the content */}
      <motion.div
        aria-hidden="true"
        className="bg-grid absolute inset-0"
        style={reduceMotion ? undefined : { backgroundPosition }}
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

        {/* layer 1 — particle wordmark */}
        <motion.div style={layer(wordY, wordOpacity)}>
          <ParticleWordmark active={revealed} />
          <p className="text-muted mt-2 text-center text-[13.5px] tracking-[0.01em]">
            Frontend systems, useful tools, research artifacts, and tiny experiments.
          </p>
        </motion.div>

        {/* layer 2 — stackfield + status panel */}
        <motion.div
          style={layer(midY, midOpacity)}
          className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start"
        >
          <div className="mx-auto w-full max-w-lg lg:mx-0">
            <Stackfield />
          </div>
          <aside aria-label="Status panel" className="lg:pt-9">
            <div className="border-line bg-surface flex flex-col gap-3.5 rounded-xl border p-4 shadow-[0_3px_0_var(--line)]">
              <p className="text-ok inline-flex items-center gap-2 font-mono text-[10px] font-medium tracking-widest uppercase">
                <span className="bg-ok size-1.5 rounded-full" aria-hidden="true" />
                Open channel
              </p>
              <p className="text-muted font-mono text-[10.5px] tracking-[0.06em] uppercase">Salem, Tamil Nadu, India</p>
              <p className="text-muted font-mono text-[10.5px] leading-relaxed tracking-[0.06em] uppercase">
                React · TypeScript · Product-minded frontend
              </p>
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent-press mt-1 rounded-md px-3 py-2 text-center font-mono text-[10.5px] font-medium tracking-[0.06em] text-white uppercase shadow-[0_2px_0_var(--accent-press)] transition-colors"
              >
                Say hello →
              </Link>
            </div>
          </aside>
        </motion.div>

        {/* layer 3 — navigation + baseline */}
        <motion.div style={layer(bottomY, bottomOpacity)} className="mt-8">
          <div className="border-line grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3">
            <nav aria-label="Site map">
              <p className="label-mono text-faint">Module map</p>
              <ul className="mt-3.5 flex flex-col gap-2">
                {moduleMap.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted hover:text-accent font-mono text-[12px] tracking-[0.04em] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Featured artifacts">
              <p className="label-mono text-faint">Featured artifacts</p>
              <ul className="mt-3.5 flex flex-col gap-2">
                {featured.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group flex items-baseline justify-between gap-2">
                      <span className="text-muted group-hover:text-accent font-mono text-[12px] tracking-[0.04em] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-faint font-mono text-[9.5px] tracking-[0.08em] uppercase">{item.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social links">
              <p className="label-mono text-faint">Channels</p>
              <ul className="mt-3.5 flex flex-col gap-2">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="text-muted hover:text-accent font-mono text-[12px] tracking-[0.04em] transition-colors"
                    >
                      {item.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="border-line text-faint mt-6 flex flex-col gap-3 border-t py-4 font-mono text-[10px] tracking-[0.08em] uppercase sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Obuli Sai Naren · Built on the bench</p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Last updated {LAST_UPDATED}</span>
              <span className="border-ok/30 text-ok inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1">
                <span className="bg-ok size-1 rounded-full" aria-hidden="true" />
                {site.version} · Bench online
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
