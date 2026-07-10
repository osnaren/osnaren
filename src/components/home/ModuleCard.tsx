'use client';

import Link from 'next/link';

import { motion, useReducedMotion } from 'framer-motion';

import { ModuleVisualFor } from '@/components/home/ModuleVisuals';

import type { BenchModule } from '@/data/modules';

const statusColor = {
  ok: 'text-ok',
  accent: 'text-accent',
  muted: 'text-faint',
} as const;

/**
 * A workbench module stays a plain link. The surrounding instrument field owns
 * the pointer depth so six cards do not each run a pointer loop. On desktop a
 * card can be nudged and springs back — decorative only, clicking always wins.
 */
export function ModuleCard({
  module,
  index,
  active = true,
  primary = false,
  dimmed,
  draggable = false,
  onActive,
}: {
  module: BenchModule;
  index: number;
  active?: boolean;
  primary?: boolean;
  dimmed?: boolean;
  draggable?: boolean;
  onActive?: (id: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const recede = dimmed ?? !active;

  const link = (
    <Link
      href={module.href}
      draggable={false}
      className={`group flex h-full flex-col gap-2.5 rounded-lg border transition-[box-shadow,border-color,background-color] ${
        primary ? 'min-h-60 p-5' : 'min-h-35 p-3.5'
      } ${
        module.inverted
          ? 'border-transparent bg-[#17191e] text-[#f0eee7] shadow-[0_3px_0_var(--accent-press)] hover:shadow-[0_6px_0_var(--accent-press)]'
          : `bg-surface shadow-[0_3px_0_var(--line)] hover:shadow-[0_6px_0_var(--line)] ${
              active ? 'border-ink/60 dark:border-ink/45' : 'border-line-strong'
            }`
      }`}
      aria-label={`${module.name} — ${module.copy}`}
    >
      <div
        className={`flex gap-1 font-mono font-medium tracking-widest uppercase ${
          primary ? 'items-baseline justify-between text-[10px]' : 'flex-col items-start text-[9px]'
        }`}
      >
        <span className={module.inverted ? 'text-[#f2a369]' : 'text-accent'}>
          {module.id} · {module.name}
        </span>
        <span className={module.inverted ? 'text-[#6fbf99]' : statusColor[module.statusTone]}>{module.status}</span>
      </div>
      <div className={`flex ${primary ? 'min-h-31 flex-1' : 'min-h-14 flex-1'}`}>
        <ModuleVisualFor visual={module.visual} />
      </div>
      <p
        className={`${primary ? 'text-[12.5px]' : 'text-[11px]'} leading-snug ${module.inverted ? 'text-[#b9bcc4]' : 'text-muted'}`}
      >
        {module.copy}{' '}
        <span
          className={`font-medium transition-opacity ${active ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 group-focus-visible:opacity-100 ${
            module.inverted ? 'text-[#f2a369]' : 'text-accent'
          }`}
        >
          Open →
        </span>
      </p>
    </Link>
  );

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: primary ? 26 : 18, scale: 0.96 }}
      animate={{
        opacity: recede ? 0.68 : 1,
        y: 0,
        scale: recede ? 0.975 : 1,
        rotate: reduceMotion ? 0 : recede ? module.tilt : 0,
        filter: recede ? 'saturate(0.85)' : 'saturate(1)',
      }}
      transition={{
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
        scale: { type: 'spring', stiffness: 280, damping: 25 },
        rotate: { type: 'spring', stiffness: 220, damping: 22 },
        y: { duration: 0.42, delay: reduceMotion ? 0 : 0.28 + index * 0.06, ease: 'easeOut' },
      }}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
      onPointerEnter={() => onActive?.(module.id)}
      onFocusCapture={() => onActive?.(module.id)}
      className="h-full"
      data-module-id={module.id}
      data-active={active || undefined}
    >
      {draggable && !reduceMotion ? (
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.3}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragTransition={{ bounceStiffness: 320, bounceDamping: 26 }}
          whileDrag={{ scale: 1.03, zIndex: 40, cursor: 'grabbing' }}
          className="h-full"
        >
          {link}
        </motion.div>
      ) : (
        link
      )}
    </motion.div>
  );
}
