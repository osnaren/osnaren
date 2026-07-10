'use client';

import { useEffect, useRef } from 'react';

import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

import { CommandStrip } from '@/components/home/CommandStrip';
import { ModuleCard } from '@/components/home/ModuleCard';
import { benchModules } from '@/data/modules';

const positions: Record<string, string> = {
  'OSN-001': 'left-[29%] top-[21%] z-20 h-[46%] w-[43%]',
  'OSN-002': 'left-[2%] top-[7%] z-10 h-[27%] w-[30%]',
  'OSN-009': 'left-[1%] top-[57%] z-10 h-[27%] w-[30%]',
  'OSN-011': 'right-[1%] top-[6%] z-10 h-[28%] w-[29%]',
  'OSN-012': 'right-[0%] top-[55%] z-10 h-[28%] w-[30%]',
  'OSN-013': 'left-[38%] top-[71%] z-10 h-[24%] w-[27%]',
};

const signalPaths = [
  { id: 'OSN-002', d: 'M225 130 C285 130 260 215 342 215' },
  { id: 'OSN-009', d: 'M218 410 C300 410 260 335 342 335' },
  { id: 'OSN-011', d: 'M725 138 C650 138 690 215 628 215' },
  { id: 'OSN-012', d: 'M728 405 C650 405 690 330 628 330' },
  { id: 'OSN-013', d: 'M485 530 C485 470 485 450 485 405' },
] as const;

export function Workbench({ activeId, onActive }: { activeId: string; onActive: (id: string) => void }) {
  const benchRef = useRef<HTMLElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const mobileFrameRef = useRef<number | null>(null);
  const mobileIndexRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const inView = useInView(benchRef, { margin: '10% 0px 10% 0px' });
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const layerX = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), { stiffness: 130, damping: 24 });
  const layerY = useSpring(useTransform(pointerY, [0, 1], [-5, 5]), { stiffness: 130, damping: 24 });

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
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div
        ref={mobileRailRef}
        onScroll={handleMobileScroll}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 scrollbar-none [&::-webkit-scrollbar]:hidden lg:hidden"
        role="list"
      >
        {benchModules.map((module, i) => (
          <div
            key={module.id}
            role="listitem"
            data-mobile-id={module.id}
            className="w-[82vw] max-w-80 flex-none snap-center"
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

      <div className="mt-2 flex items-center justify-center gap-2 lg:hidden" aria-label="Active module">
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

      <div className="border-line-strong bg-paper/62 relative hidden h-140 overflow-hidden rounded-lg border shadow-[0_8px_0_var(--line)] lg:block">
        <div
          className="text-faint pointer-events-none absolute inset-x-5 top-3 flex justify-between font-mono text-[8px]"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index}>{String(index + 1).padStart(2, '0')}</span>
          ))}
        </div>
        <div
          className="text-faint pointer-events-none absolute top-12 bottom-14 left-3 flex flex-col justify-between font-mono text-[8px]"
          aria-hidden="true"
        >
          {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
        </div>

        <svg viewBox="0 0 960 560" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {signalPaths.map((path) => {
            const selected = activeId === path.id;
            return (
              <g key={path.id}>
                <path d={path.d} fill="none" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="5 5" />
                <motion.path
                  d={path.d}
                  fill="none"
                  stroke={selected ? 'var(--accent)' : 'var(--ok)'}
                  strokeWidth={selected ? 2 : 1.25}
                  initial={false}
                  animate={{ pathLength: selected ? 1 : 0.18, opacity: selected ? 1 : 0.25 }}
                  transition={{ duration: reduceMotion ? 0 : 0.38, ease: 'easeOut' }}
                />
              </g>
            );
          })}
        </svg>

        <motion.div style={reduceMotion ? undefined : { x: layerX, y: layerY }} className="absolute inset-7 bottom-15">
          {benchModules.map((module, index) => (
            <div key={module.id} className={`absolute ${positions[module.id]}`}>
              <ModuleCard
                module={module}
                index={index}
                active={activeId === module.id}
                primary={module.id === 'OSN-001'}
                onActive={onActive}
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute right-3 bottom-3 left-7">
          <CommandStrip activeId={activeId} onSelect={onActive} />
        </div>
      </div>
    </section>
  );
}
