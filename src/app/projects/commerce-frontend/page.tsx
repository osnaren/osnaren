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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commerce Frontend Systems — Work',
  description:
    'High-level case study of Obuli Sai Naren’s frontend work on customer-facing ecommerce product experiences at Victoria’s Secret & Co.',
};

export default function CommerceFrontendPage() {
  return (
    <article>
      <CaseHero
        tone="paper"
        eyebrow="OSN-009 — Work"
        status="Professional experience"
        title="Frontend systems for real customer journeys"
        lede="Customer-facing ecommerce at Victoria’s Secret & Co. — the React product-page experiences that stand between a person and the thing they came to buy."
        links={[{ label: 'See the resume', href: '/resume#experience', primary: true }]}
      />

      <MetaStrip
        items={[
          { label: 'Company', value: 'Victoria’s Secret & Co.' },
          { label: 'Role', value: 'Front End Web Developer' },
          { label: 'Period', value: 'Dec 2023 → present' },
          { label: 'Surface', value: 'Digital commerce, at scale' },
        ]}
      />

      <CaseBody>
        <Callout label="Scope">
          This is a public, non-confidential summary of the work: the problem space, collaboration model, and
          engineering judgment. Internal systems, screenshots, ticket references, feature flags, architecture, and
          business metrics are intentionally excluded.
        </Callout>

        <CaseSection index="01" title="Context">
          <p>
            A product detail page looks simple and is not. It is the point where inventory, pricing, sizing, imagery,
            fulfillment promises, accessibility law, marketing experiments, and analytics all have to resolve into one
            screen that loads fast on a phone with two bars of signal. Get it wrong in a small way and a person quietly
            leaves.
          </p>
        </CaseSection>

        <CaseSection index="02" title="What I work on">
          <DecisionGrid
            items={[
              {
                title: 'Product-page experiences',
                copy: 'React interfaces for discovery and purchase confidence — how availability, sizing, and fulfillment information is presented and how the page behaves as a customer changes their mind.',
              },
              {
                title: 'End-to-end feature ownership',
                copy: 'From technical discovery through production: UI behaviour, state handling, the edge cases nobody wrote a ticket for, and the release itself.',
              },
              {
                title: 'Experimentation & analytics',
                copy: 'Features built to be A/B tested, instrumented so the result is measurable, and shipped with the discipline to actually read the outcome.',
              },
              {
                title: 'Reusable frontend patterns',
                copy: 'Cleaner component logic and improved test coverage so the next feature is cheaper than the last one.',
              },
            ]}
          />
        </CaseSection>

        <CaseSection index="03" title="Frontend challenges, honestly">
          <RuledList
            items={[
              <>
                <strong className="text-ink">Accessibility is not a checklist item.</strong> Size pickers, image
                galleries, and availability messaging have to work with a screen reader and a keyboard, on desktop and
                on mobile. This is the part of the job I care most about getting right.
              </>,
              <>
                <strong className="text-ink">Performance is a customer experience.</strong> Every kilobyte and every
                layout shift is a tax on someone&rsquo;s patience and someone&rsquo;s data plan.
              </>,
              <>
                <strong className="text-ink">State is where the bugs live.</strong> A page reflecting a live inventory
                system has more states than the design file shows, and the interesting engineering is in the ones nobody
                mocked up.
              </>,
            ]}
          />
        </CaseSection>

        <CaseSection index="04" title="Collaboration model">
          <p>
            Features move through Product, UX, QA, Backend, and Analytics before they reach a customer. Cross-functional
            delivery means the frontend engineer is often the person who notices that three of those groups have
            different assumptions about the same edge case — and says so early, when it is still cheap.
          </p>
        </CaseSection>

        <CaseSection index="05" title="What I learned">
          <RuledList
            items={[
              'At scale, small frontend details are big business. A confusing size selector is not a design quibble.',
              'Ownership is mostly communication with a deadline attached.',
              'Experimentation replaces argument with evidence — the same instinct that made me publish datasets rather than claims.',
            ]}
          />
        </CaseSection>

        <CaseFooterNav
          prev={{ label: 'Prev: OSN-008 Forest Fire Dataset', href: '/projects/forest-fire-c4' }}
          next={{ label: 'Next: OSN-010 Soliton Systems', href: '/projects/soliton-systems' }}
        />
      </CaseBody>
    </article>
  );
}
