import {
  MagneticCard,
  RouteDraw,
  SchedulerSketch,
  SquishToggle,
  SunPathStudy,
  ThemeTokens,
} from '@/components/lab/experiments';
import { Reveal } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'The lab: small UI studies and product interaction experiments by Obuli Sai Naren.',
};

const experiments = [
  {
    id: 'EXP-01',
    name: 'Squish toggle',
    tag: 'Live inline',
    tone: 'ok' as const,
    tech: 'FRAMER',
    note: 'Switches deserve squash-and-stretch. Tap it.',
    demo: SquishToggle,
  },
  {
    id: 'EXP-02',
    name: 'Sun path',
    tag: 'Live inline',
    tone: 'ok' as const,
    tech: 'SVG + MATH',
    note: 'Drag the clock; watch the shady side flip at noon. The seed of ShadySide.',
    demo: SunPathStudy,
  },
  {
    id: 'EXP-03',
    name: 'Magnetic chip',
    tag: 'Live inline',
    tone: 'ok' as const,
    tech: 'SPRINGS',
    note: 'The hero modules use a gentler version of this pull.',
    demo: MagneticCard,
  },
  {
    id: 'EXP-04',
    name: 'Route draw',
    tag: 'Live inline',
    tone: 'ok' as const,
    tech: 'SVG PATH',
    note: 'The case-study choreography, replayable as a toy.',
    demo: RouteDraw,
  },
  {
    id: 'EXP-05',
    name: 'Theme crossfade',
    tag: 'In this site',
    tone: 'accent' as const,
    tech: 'CSS VARS',
    note: 'Paper → near-black on one token system, no flash.',
    demo: ThemeTokens,
  },
  {
    id: 'EXP-06',
    name: 'Drag scheduler',
    tag: 'Prototype',
    tone: 'muted' as const,
    tech: 'REACT DND',
    note: 'A drag-to-schedule grid study from the Soliton days.',
    demo: SchedulerSketch,
  },
];

export default function LabPage() {
  return (
    <div>
      <PageHeader
        route="/LAB"
        title="Interaction studies from the workbench."
        lede="Small UI studies, motion tests, and product interaction ideas. The live modules run inline; the prototypes are clearly labelled."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {experiments.map((exp, i) => {
          const Demo = exp.demo;
          return (
            <Reveal key={exp.id} delay={(i % 3) * 0.05}>
              <section
                aria-label={`${exp.id} ${exp.name}`}
                className="module-card flex h-full flex-col overflow-hidden"
              >
                <div className="bg-surface-2 min-h-[150px] p-4">
                  <Demo />
                </div>
                <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-[13.5px] font-semibold">
                      <span className="text-accent font-mono text-[10.5px] font-medium">{exp.id}</span> · {exp.name}
                    </h2>
                    <StatusBadge tone={exp.tone}>{exp.tag}</StatusBadge>
                  </div>
                  <p className="text-muted text-xs leading-relaxed">{exp.note}</p>
                  <p className="text-faint mt-auto font-mono text-[9px] tracking-[0.1em]">{exp.tech}</p>
                </div>
              </section>
            </Reveal>
          );
        })}
        <Reveal delay={0.1}>
          <div className="border-line-strong text-faint grid h-full min-h-[220px] place-items-center rounded-xl border-[1.5px] border-dashed p-6 text-center font-mono text-[11px] tracking-[0.08em] uppercase">
            More studies will appear here after they ship
          </div>
        </Reveal>
      </div>
    </div>
  );
}
