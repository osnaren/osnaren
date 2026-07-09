import type { Metadata } from 'next';

import {
  Callout,
  CaseBody,
  CaseFooterNav,
  CaseHero,
  CaseSection,
  DecisionGrid,
  MetaStrip,
  RuledList,
} from '@/components/case-study/primitives';

export const metadata: Metadata = {
  title: 'Soliton Product UI & Tools — Work',
  description:
    'High-level case study of Obuli Sai Naren’s frontend and tooling work at Soliton Technologies: dark theme, drag-and-drop scheduling, CLI tooling, and Python services.',
};

export default function SolitonSystemsPage() {
  return (
    <article>
      <CaseHero
        tone="paper"
        eyebrow="OSN-010 — Work"
        status="Professional experience"
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

      <CaseBody>
        <Callout label="Scope">
          This is a public, non-confidential summary. Client names, internal systems, proprietary implementations,
          screenshots, and business metrics are intentionally excluded; the focus is the kind of work and the
          engineering lessons.
        </Callout>

        <CaseSection index="01" title="Context">
          <p>
            My first production work. Engineering tools have a particular quality: their users are captive. Nobody
            churns from an internal scheduling interface — they simply suffer it. That makes UX quality a matter of
            professional courtesy rather than conversion rate, and it is a good place to learn craft.
          </p>
        </CaseSection>

        <CaseSection index="02" title="What I built">
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
        </CaseSection>

        <CaseSection index="03" title="Frontend challenges">
          <RuledList
            items={[
              <>
                <strong className="text-ink">Direct manipulation is an accessibility trap.</strong> A drag-and-drop
                scheduler that only works with a mouse excludes people. That realisation is why the workbench on this
                site&rsquo;s homepage never requires dragging.
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
        </CaseSection>

        <CaseSection index="04" title="What I learned">
          <RuledList
            items={[
              'Real users change how you build, immediately and permanently.',
              'Internal tools deserve the same care as customer-facing ones. The users just cannot complain publicly.',
              'Working across the stack — UI, CLI, services — made me a better frontend engineer, not a worse one.',
            ]}
          />
        </CaseSection>

        <CaseFooterNav
          prev={{ label: 'Prev: OSN-009 Commerce Frontend', href: '/projects/commerce-frontend' }}
          next={{ label: 'Next: the Lab', href: '/lab' }}
        />
      </CaseBody>
    </article>
  );
}
