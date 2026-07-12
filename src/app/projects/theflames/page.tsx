import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { CaseClosing, CaseHero, Chapter, MetaStrip, RuledList } from '@/components/case-study/primitives';
import { FlamesStepper } from '@/components/theflames/FlamesStepper';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TheFlames — Project',
  description:
    'TheFlames: a long-unfinished hobby idea turned into a polished web version of the classic schoolyard FLAMES game, with auto and manual modes.',
  alternates: { canonical: '/projects/theflames' },
};

const chapters: CaseChapter[] = [
  { id: 'premise', label: 'Premise' },
  { id: 'why', label: 'Why rebuild' },
  { id: 'play', label: 'Play it' },
  { id: 'modes', label: 'Auto & manual' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'lessons', label: 'Lessons' },
];

const outcomes = [
  { letter: 'F', meaning: 'Friends' },
  { letter: 'L', meaning: 'Love' },
  { letter: 'A', meaning: 'Affection' },
  { letter: 'M', meaning: 'Marriage' },
  { letter: 'E', meaning: 'Enemies' },
  { letter: 'S', meaning: 'Siblings' },
];

export default function TheFlamesPage() {
  return (
    <article>
      <CaseHero
        tone="paper"
        eyebrow="OSN-002 — Product experiment"
        status="● Live · Playful"
        artifactId="002"
        title="TheFlames"
        lede="The paper-and-pencil FLAMES game every Indian schoolkid knows — two names in, shared letters crossed out, and the leftover count cycles F-L-A-M-E-S until one destiny remains. An old hobby idea, finally finished as a small, fast, free web toy."
        links={[
          { label: 'Play it live', href: 'https://theflames.app', external: true, primary: true },
          { label: 'GitHub', href: 'https://github.com/osnaren/the-flames', external: true },
        ]}
      />

      <MetaStrip
        items={[
          { label: 'Role', value: 'Design + build, solo' },
          { label: 'Stack', value: 'Next.js · TS · Framer Motion' },
          { label: 'Status', value: 'Live · free · no account', tone: 'ok' },
          { label: 'Scope', value: 'Small toy, production care' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-002"
        prev={{ label: 'Prev: OSN-001 ShadySide', href: '/projects/shadyside' }}
        next={{ label: 'Next: OSN-003 Forest Fire', href: '/projects/forest-fire-detection' }}
      >
        <Chapter id="premise" index="01" title="Premise" wide>
          <p className="max-w-170">
            FLAMES compares two names to reveal one of six playful outcomes. It is nostalgia, computed: the classic
            notebook game rebuilt so it runs instantly, works on a phone, and shares cleanly — without losing the
            hand-counted ritual that made it fun.
          </p>
          <ul className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {outcomes.map((outcome) => (
              <li key={outcome.letter} className="module-card flex items-center gap-3 p-3">
                <span className="bg-ink text-paper grid size-9 shrink-0 place-items-center rounded-md font-mono text-sm font-semibold">
                  {outcome.letter}
                </span>
                <span className="text-[13px] font-medium">{outcome.meaning}</span>
              </li>
            ))}
          </ul>
        </Chapter>

        <Chapter id="why" index="02" title="Why rebuild it">
          <p className="text-muted">
            This was one of the first playful projects I wanted to build, but it sat unfinished for years. Shipping it
            properly became the point: take a tiny memory-lane idea and give it the same care I would give a serious
            product — TypeScript, proper SEO, responsive motion, and a result flow that feels playful without becoming
            noisy.
          </p>
        </Chapter>

        <Chapter id="play" index="03" title="Play it" wide>
          <p className="max-w-170">
            Step through the elimination the way it worked in the back of a notebook: cross the shared letters, count
            what remains, then run the F-L-A-M-E-S countdown. Everything below happens on your device.
          </p>
          <FlamesStepper />
        </Chapter>

        <Chapter id="modes" index="04" title="Auto and manual">
          <p className="text-muted">
            Automatic mode does the counting instantly with an animated reveal — the quick hit. But there is a{' '}
            <strong className="text-ink">Manual Mode</strong> that lets you cross out the shared letters yourself and
            walk the count step by step. The point of the app is the ritual, not just the result.
          </p>
          <RuledList
            items={[
              'Auto mode — instant animated reveal for the quick answer.',
              'Manual mode — cross out letters yourself and count it down, notebook-style.',
              'Anonymous global charts, plus share and download options for results.',
            ]}
          />
        </Chapter>

        <Chapter id="privacy" index="05" title="Privacy">
          <p className="text-muted">
            There is no account wall. Names are used to calculate the result in the moment; the site keeps only
            anonymous statistics for its charts and trends, not personal profiles. The interactive explainer on this
            page goes further — it runs entirely in your browser and sends nothing at all.
          </p>
        </Chapter>

        <CaseClosing
          lessons={[
            'Playful software still deserves production-grade care.',
            'The ritual is the product — the manual mode matters more than the instant answer.',
            'Privacy is a feature you can state plainly: “names stay on your device”.',
          ]}
          links={[{ label: 'Play it live', href: 'https://theflames.app', external: true, primary: true }]}
          prev={{ label: 'Prev: OSN-001 ShadySide', href: '/projects/shadyside' }}
          next={{ label: 'Next: OSN-003 Forest Fire', href: '/projects/forest-fire-detection' }}
        />
      </CaseScaffold>
    </article>
  );
}
