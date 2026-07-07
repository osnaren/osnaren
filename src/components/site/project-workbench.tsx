'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Beaker, BriefcaseBusiness, FileText, History, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

type ModuleId = 'work' | 'lab' | 'story' | 'resume';

const modules = [
  {
    id: 'work',
    label: 'Work',
    title: 'Product engineering',
    body: 'React ecommerce, product pages, experimentation, accessibility, and production delivery.',
    href: '/work',
    icon: BriefcaseBusiness,
    className: 'module-work',
  },
  {
    id: 'lab',
    label: 'Lab',
    title: 'Useful oddities',
    body: 'ShadySide, InboxCtrl, TreeGenius, and smaller interface experiments that solve personal annoyances.',
    href: '/lab',
    icon: Beaker,
    className: 'module-lab',
  },
  {
    id: 'story',
    label: 'Story',
    title: 'College to commerce',
    body: "School, CS, research, Soliton, Victoria's Secret & Co., photography, gardening, and the work behind the work.",
    href: '/story',
    icon: History,
    className: 'module-story',
  },
  {
    id: 'resume',
    label: 'Resume',
    title: 'Evidence trail',
    body: 'Experience, skills, publications, awards, and a clean resume surface without unnecessary private details.',
    href: '/resume',
    icon: FileText,
    className: 'module-resume',
  },
] satisfies Array<{
  id: ModuleId;
  label: string;
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
  className: string;
}>;

export function ProjectWorkbench() {
  const [activeId, setActiveId] = useState<ModuleId>('work');
  const constraintsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const active = modules.find((item) => item.id === activeId) ?? modules[0];
  const ActiveIcon = active.icon;

  return (
    <section className="workbench" aria-label="Portfolio workbench">
      <div ref={constraintsRef} className="workbench-stage">
        <div className="grid-floor" aria-hidden="true" />
        <div className="stage-crosshair stage-crosshair-a" aria-hidden="true" />
        <div className="stage-crosshair stage-crosshair-b" aria-hidden="true" />

        {modules.map((item, index) => {
          const Icon = item.icon;
          const activeModule = item.id === activeId;

          return (
            <motion.button
              key={item.id}
              type="button"
              drag={!reduceMotion}
              dragConstraints={constraintsRef}
              dragElastic={0.08}
              dragMomentum={false}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              onFocus={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={cn('workbench-module', item.className, activeModule && 'is-active')}
              style={{ zIndex: activeModule ? 20 : 10 + index }}
            >
              <span className="module-cap" aria-hidden="true" />
              <Icon aria-hidden="true" size={22} />
              <span>{item.label}</span>
            </motion.button>
          );
        })}

        <motion.div
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="workbench-readout"
        >
          <div className="readout-topline">
            <ActiveIcon aria-hidden="true" size={18} />
            <span>{active.label}</span>
          </div>
          <h2>{active.title}</h2>
          <p>{active.body}</p>
          <Link href={active.href} className="text-link">
            Open module
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </motion.div>

        <div className="signal-strip" aria-hidden="true">
          <Sparkles size={14} />
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
