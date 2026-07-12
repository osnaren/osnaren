import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { JourneyMap } from '@/components/case-study/JourneyMap';
import {
  Callout,
  CaseClosing,
  CaseHero,
  Chapter,
  DecisionGrid,
  MetaStrip,
  RuledList,
} from '@/components/case-study/primitives';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soliton Product UI & Tools — Work',
  description:
    'High-level case study of Obuli Sai Naren’s frontend and tooling work at Soliton Technologies: dark theme, drag-and-drop scheduling, CLI tooling, and Python services.',
  alternates: { canonical: '/projects/soliton-systems' },
};

const chapters: CaseChapter[] = [
  { id: 'context', label: 'Context' },
  { id: 'built', label: 'What I built' },
  { id: 'system', label: 'System pathway' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'lessons', label: 'Lessons' },
];

const system = [
  {
    label: 'Product UI',
    caption:
      'A responsive dark theme shipped across the product surface — a colour system built as a contract, not a palette.',
    states: ['Light', 'Dark', 'Responsive'],
  },
  {
    label: 'Scheduling board',
    caption: 'A drag-and-drop scheduling interface where the primary interaction is direct manipulation.',
    states: ['Drag', 'Drop target', 'Keyboard parity', 'Undo'],
  },
  {
    label: 'CLI',
    caption: 'A command-line tool for multi-device support, real-time data retrieval, and performance monitoring.',
    states: ['Multi-device', 'Live data', 'Perf monitor'],
  },
  {
    label: 'Python services',
    caption: 'Backend services so the frontend had something honest to display.',
    states: ['API', 'Jobs'],
  },
  {
    label: 'Data stores',
    caption: 'A document store and object storage behind the services.',
    states: ['Documents', 'Objects'],
  },
];

export default function SolitonSystemsPage() {
  return (
    <article>
      <CaseHero
        tone="paper"
        eyebrow="OSN-010 — Work · capability study"
        status="Professional experience"
        artifactId="010"
        title="Product UI and tools engineers have to live in"
        lede="Frontend and tooling at Soliton Technologies — the interfaces and command-line utilities that other engineers open every morning and never think about again, if they are done right."
        links={[{ label: 'See the resume', href: '/resume#experience', primary: true }]}
      />

      <MetaStrip
        items={[
          { label: 'Company', value: 'Soliton Technologies' },
          { label: 'Role', value: 'Project Engineer (prev. Intern)' },
          { label: 'Period', value: 'Jul 2021 → Nov 2023' },
          { label: 'Surface', value: 'Product UI, tooling, services' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-010"
        prev={{ label: 'Prev: OSN-009 Commerce Frontend', href: '/projects/commerce-frontend' }}
        next={{ label: 'Next: the Lab', href: '/lab' }}
      >
        <Callout label="Scope">
          This is a public, non-confidential summary. Client names, internal systems, proprietary implementations,
          screenshots, and business metrics are intentionally excluded; the focus is the kind of work and the
          engineering lessons. The system map below uses generic blocks only.
        </Callout>

        <Chapter id="context" index="01" title="Context">
          <p>
            My first production work. Engineering tools have a particular quality: their users are captive. Nobody
            churns from an internal scheduling interface — they simply suffer it. That makes UX quality a matter of
            professional courtesy rather than conversion rate, and it is a good place to learn craft.
          </p>
        </Chapter>

        <Chapter id="built" index="02" title="What I built" wide>
          <DecisionGrid
            items={[
              {
                title: 'A responsive dark theme',
                copy: 'Shipped across the product UI. Theming taught me that a colour system is a contract, not a palette — the same lesson this portfolio’s token system is built on.',
              },
              {
                title: 'Drag-and-drop scheduling',
                copy: 'A scheduling interface where the primary interaction is direct manipulation. Getting drop targets, keyboard parity, and undo right is most of the work.',
              },
              {
                title: 'A CLI for device monitoring',
                copy: 'Multi-device support, real-time data retrieval, and performance monitoring from the terminal — because sometimes the best interface is not a page.',
              },
              {
                title: 'Python services behind it',
                copy: 'Backend services working with a document store and object storage, so the frontend I was building actually had something honest to display.',
              },
            ]}
          />
        </Chapter>

        <Chapter id="system" index="03" title="The system pathway" wide>
          <p className="max-w-170">
            How the pieces connected — a generic view of the UI, tooling, and services layer, from the interface an
            engineer touched down to the stores behind it.
          </p>
          <JourneyMap steps={system} kicker="System pathway" />
        </Chapter>

        <Chapter id="challenges" index="04" title="Frontend challenges">
          <RuledList
            items={[
              <>
                <strong className="text-ink">Direct manipulation is an accessibility trap.</strong> A drag-and-drop
                scheduler that only works with a mouse excludes people. That realisation is why the workbench on this
                site’s homepage never requires dragging.
              </>,
              <>
                <strong className="text-ink">Modernising a codebase is a social act.</strong> Moving toward modular,
                maintainable component architecture meant convincing people, not just refactoring files.
              </>,
              <>
                <strong className="text-ink">Mentoring exposes what you only half-know.</strong> Teaching HTML, CSS,
                JavaScript, and Node.js to other engineers rebuilt my own fundamentals.
              </>,
            ]}
          />
        </Chapter>

        <CaseClosing
          lessons={[
            'Real users change how you build, immediately and permanently.',
            'Internal tools deserve the same care as customer-facing ones. The users just cannot complain publicly.',
            'Working across the stack — UI, CLI, services — made me a better frontend engineer, not a worse one.',
          ]}
          links={[{ label: 'See the resume', href: '/resume#experience', primary: true }]}
          prev={{ label: 'Prev: OSN-009 Commerce Frontend', href: '/projects/commerce-frontend' }}
          next={{ label: 'Explore the Lab', href: '/lab' }}
        />
      </CaseScaffold>
    </article>
  );
}
