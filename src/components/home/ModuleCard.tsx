'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

import { ModuleVisualFor } from '@/components/home/ModuleVisuals';
import type { BenchModule } from '@/data/modules';

const statusColor = {
  ok: 'text-ok',
  accent: 'text-accent',
  muted: 'text-faint',
} as const;

/**
 * A workbench module: a clickable navigation card with subtle 3D tilt and
 * magnetic pull toward the cursor. Navigation never depends on the physics —
 * it is a plain link, keyboard reachable, and static under reduced motion.
 */
export function ModuleCard({ module, index }: { module: BenchModule; index: number }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [4, -4]), { stiffness: 260, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-5, 5]), { stiffness: 260, damping: 22 });

  const handlePointerMove = (event: React.PointerEvent) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : module.tilt }}
      transition={{ duration: 0.45, delay: 0.08 * index, ease: 'easeOut' }}
      whileHover={reduceMotion ? undefined : { rotate: 0, y: -3, scale: 1.015 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={module.wide ? 'sm:col-span-2' : undefined}
    >
      <Link
        href={module.href}
        className={`group flex h-full min-h-[150px] flex-col gap-2.5 rounded-xl border p-4 transition-shadow ${
          module.inverted
            ? 'border-transparent bg-[#17191e] text-[#f0eee7] shadow-[0_3px_0_var(--accent-press)] hover:shadow-[0_6px_0_var(--accent-press)]'
            : 'border-line-strong bg-surface shadow-[0_3px_0_var(--line)] hover:shadow-[0_6px_0_var(--line)]'
        }`}
        aria-label={`${module.name} — ${module.copy}`}
      >
        <div className="flex items-baseline justify-between gap-2 font-mono text-[10px] font-medium tracking-[0.1em] uppercase">
          <span className={module.inverted ? 'text-[#f2a369]' : 'text-accent'}>
            {module.id} · {module.name}
          </span>
          <span className={module.inverted ? 'text-[#6fbf99]' : statusColor[module.statusTone]}>{module.status}</span>
        </div>
        <ModuleVisualFor visual={module.visual} />
        <p className={`text-[11.5px] leading-snug ${module.inverted ? 'text-[#b9bcc4]' : 'text-muted'}`}>
          {module.copy}{' '}
          <span
            className={`font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
              module.inverted ? 'text-[#f2a369]' : 'text-accent'
            }`}
          >
            Open →
          </span>
        </p>
      </Link>
    </motion.div>
  );
}
