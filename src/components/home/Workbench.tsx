'use client';

import { useEffect, useRef } from 'react';

import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

import { CommandStrip } from '@/components/home/CommandStrip';
import { ModuleCard } from '@/components/home/ModuleCard';
import { benchModules } from '@/data/modules';

/** Desktop instrument-field placement. The primary artifact (OSN-001) dominates
 *  the centre; the five service modules orbit it at varying depth and overlap. */
const positions: Record<string, string> = {
  'OSN-001': 'left-[30%] top-[19%] z-30 h-[45%] w-[40%]',
  'OSN-002': 'left-[2%] top-[6%] z-10 h-[29%] w-[28%]',
  'OSN-009': 'left-[2%] top-[57%] z-10 h-[28%] w-[28%]',
  'OSN-011': 'right-[2%] top-[6%] z-10 h-[29%] w-[28%]',
  'OSN-012': 'right-[2%] top-[57%] z-10 h-[28%] w-[28%]',
  'OSN-013': 'left-[38%] top-[64%] z-20 h-[27%] w-[24%]',
};

export function Workbench({
  activeId,
  onActive,
  onEngagementChange,
}: {
  activeId: string;
  onActive: (id: string) => void;
  onEngagementChange?: (engaged: boolean) => void;
}) {
  const benchRef = useRef<HTMLElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const mobileFrameRef = useRef<number | null>(null);
  const mobileIndexRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const inView = useInView(benchRef, { margin: '10% 0px 10% 0px' });

  // pointer-driven depth: a small parallax translate + a subtle 3D tilt, both
  // spring-smoothed so React never re-renders on pointer frames.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const layerX = useSpring(useTransform(pointerX, [0, 1], [-9, 9]), { stiffness: 120, damping: 22 });
  const layerY = useSpring(useTransform(pointerY, [0, 1], [-6, 6]), { stiffness: 120, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [3.2, -3.2]), { stiffness: 110, damping: 20 });
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [-2.6, 2.6]), { stiffness: 110, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !inView || event.pointerType !== 'mouse') return;
    const rect = benchRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') onEngagementChange?.(true);
  };

  const handlePointerLeave = () => {
    resetPointer();
    onEngagementChange?.(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onEngagementChange?.(false);
  };

  useEffect(
    () => () => {
      if (mobileFrameRef.current !== null) cancelAnimationFrame(mobileFrameRef.current);
    },
    []
  );

  const handleMobileScroll = () => {
    if (mobileFrameRef.current !== null) return;
    mobileFrameRef.current = requestAnimationFrame(() => {
      mobileFrameRef.current = null;
      const rail = mobileRailRef.current;
      if (!rail) return;
      const cards = Array.from(rail.children) as HTMLElement[];
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== mobileIndexRef.current) {
        mobileIndexRef.current = closestIndex;
        onActive(benchModules[closestIndex].id);
      }
    });
  };

  return (
    <section
      ref={benchRef}
      aria-label="Living workbench modules"
      className="min-w-0"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={() => onEngagementChange?.(true)}
      onBlurCapture={handleBlur}
    >
      {/* ── mobile: swipeable snap rail with partial next-card preview ── */}
      <div
        ref={mobileRailRef}
        onScroll={handleMobileScroll}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 scrollbar-none [&::-webkit-scrollbar]:hidden min-[1360px]:hidden"
        role="list"
      >
        {benchModules.map((module, i) => (
          <div
            key={module.id}
            role="listitem"
            data-mobile-id={module.id}
            className="w-[80vw] max-w-80 flex-none snap-center"
          >
            <ModuleCard
              module={module}
              index={i}
              active={activeId === module.id}
              primary={i === 0}
              onActive={onActive}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 min-[1360px]:hidden" aria-label="Active module">
        {benchModules.map((module) => (
          <button
            key={module.id}
            type="button"
            aria-label={`Show ${module.name}`}
            aria-current={activeId === module.id ? 'true' : undefined}
            onClick={() => {
              onActive(module.id);
              const rail = mobileRailRef.current;
              const card = rail?.querySelector<HTMLElement>(`[data-mobile-id="${module.id}"]`);
              card?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
            }}
            className={`h-1.5 min-w-6 rounded-full transition-colors ${activeId === module.id ? 'bg-accent' : 'bg-line-strong'}`}
          />
        ))}
      </div>

      {/* ── desktop: the instrument field ─────────────────────────────── */}
      <div
        className="workbench-field border-line-strong bg-paper/62 relative hidden h-[min(72svh,750px)] min-h-165 overflow-hidden rounded-lg border shadow-[0_8px_0_var(--line)] min-[1360px]:block"
        style={{ perspective: reduceMotion ? undefined : '1400px' }}
      >
        {/* column ruler */}
        <div
          className="text-faint pointer-events-none absolute inset-x-5 top-3 flex justify-between font-mono text-[8px]"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index}>{String(index + 1).padStart(2, '0')}</span>
          ))}
        </div>
        {/* row ruler */}
        <div
          className="text-faint pointer-events-none absolute top-12 bottom-16 left-3 flex flex-col justify-between font-mono text-[8px]"
          aria-hidden="true"
        >
          {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
        </div>

        <motion.div
          style={reduceMotion ? undefined : { x: layerX, y: layerY, rotateX, rotateY }}
          className="absolute inset-7 bottom-16 transform-3d"
        >
          {benchModules.map((module, index) => (
            <div key={module.id} className={`absolute ${positions[module.id]}`}>
              <ModuleCard
                module={module}
                index={index}
                active={activeId === module.id}
                primary={module.id === 'OSN-001'}
                dimmed={activeId !== module.id}
                onActive={onActive}
              />
            </div>
          ))}
        </motion.div>

        {/* command strip — 1–6 shortcuts + click nav, docked in the field */}
        <div className="absolute right-3 bottom-3 left-7">
          <CommandStrip activeId={activeId} onSelect={onActive} />
        </div>
      </div>
    </section>
  );
}
