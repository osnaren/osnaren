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
  title: 'Commerce Frontend Systems — Work',
  description:
    'High-level capability case study of Obuli Sai Naren’s frontend work on customer-facing ecommerce product experiences at Victoria’s Secret & Co.',
};

const chapters: CaseChapter[] = [
  { id: 'context', label: 'Context' },
  { id: 'ownership', label: 'Frontend ownership' },
  { id: 'journey', label: 'Customer journey' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'collaboration', label: 'Collaboration' },
  { id: 'lessons', label: 'Lessons' },
];

const journey = [
  {
    label: 'Discover',
    caption:
      'A customer arrives at a product from search, browse, or a campaign, and forms a first impression in one screen.',
    states: ['Loading', 'Image gallery', 'Deep link', 'Low bandwidth'],
  },
  {
    label: 'Understand choice',
    caption:
      'Imagery, description, and sizing information have to answer “is this the right thing for me?” without friction.',
    states: ['Size guide', 'Variant swatch', 'Content missing'],
  },
  {
    label: 'Select size',
    caption: 'The size picker must work with a keyboard and a screen reader, and reflect what is actually purchasable.',
    states: ['In stock', 'Low stock', 'Out of stock', 'Not carried'],
  },
  {
    label: 'Check availability',
    caption: 'Availability reflects a live inventory system with more states than any static design file shows.',
    states: ['Backorder', 'Store-only', 'Ships later'],
  },
  {
    label: 'Choose fulfilment',
    caption: 'Ship-to-home, pickup, and delivery estimates each change what the rest of the page should say.',
    states: ['Pickup', 'Ship', 'Unavailable in region'],
  },
  {
    label: 'Add to bag',
    caption:
      'The commit action must be resilient to double-taps, races, and errors without losing the customer’s intent.',
    states: ['Success', 'Retry', 'Error', 'Quantity limit'],
  },
];

export default function CommerceFrontendPage() {
  return (
    <article>
      <CaseHero
        tone="paper"
        eyebrow="OSN-009 — Work · capability study"
        status="Professional experience"
        artifactId="009"
        title="Frontend systems for real customer journeys"
        lede="Customer-facing ecommerce at Victoria’s Secret & Co. — the React product-page experiences that stand between a person and the thing they came to buy. Presented as a capability study, not a claim about one confidential product."
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

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-009"
        prev={{ label: 'Prev: OSN-008 Forest Fire Dataset', href: '/projects/forest-fire-c4' }}
        next={{ label: 'Next: OSN-010 Soliton Systems', href: '/projects/soliton-systems' }}
      >
        <Callout label="Scope">
          This is a public, non-confidential summary of the work: the problem space, collaboration model, and
          engineering judgment. Internal systems, screenshots, ticket references, feature flags, architecture, and
          business metrics are intentionally excluded. The journey map below uses generic system blocks, not any private
          company UI.
        </Callout>

        <Chapter id="context" index="01" title="Context">
          <p>
            A product detail page looks simple and is not. It is the point where inventory, pricing, sizing, imagery,
            fulfilment promises, accessibility law, marketing experiments, and analytics all have to resolve into one
            screen that loads fast on a phone with two bars of signal. Get it wrong in a small way and a person quietly
            leaves.
          </p>
        </Chapter>

        <Chapter id="ownership" index="02" title="Frontend ownership" wide>
          <p className="max-w-170">What I own, end to end.</p>
          <DecisionGrid
            items={[
              {
                title: 'Product-page experiences',
                copy: 'React interfaces for discovery and purchase confidence — how availability, sizing, and fulfilment are presented, and how the page behaves as a customer changes their mind.',
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
        </Chapter>

        <Chapter id="journey" index="03" title="The customer journey" wide>
          <p className="max-w-170">
            A sanitized view of the states a product experience has to handle. Step through it — the interesting
            engineering lives in the states nobody mocked up.
          </p>
          <JourneyMap steps={journey} kicker="Product-page journey" />
        </Chapter>

        <Chapter id="challenges" index="04" title="Frontend challenges, honestly">
          <RuledList
            items={[
              <>
                <strong className="text-ink">Accessibility is not a checklist item.</strong> Size pickers, image
                galleries, and availability messaging have to work with a screen reader and a keyboard, on desktop and
                on mobile. This is the part of the job I care most about getting right.
              </>,
              <>
                <strong className="text-ink">Performance is a customer experience.</strong> Every kilobyte and every
                layout shift is a tax on someone’s patience and someone’s data plan.
              </>,
              <>
                <strong className="text-ink">State is where the bugs live.</strong> A page reflecting a live inventory
                system has more states than the design file shows, and the interesting engineering is in the ones nobody
                mocked up.
              </>,
            ]}
          />
        </Chapter>

        <Chapter id="collaboration" index="05" title="Collaboration model">
          <p>
            Features move through Product, UX, QA, Backend, and Analytics before they reach a customer. Cross-functional
            delivery means the frontend engineer is often the person who notices that three of those groups have
            different assumptions about the same edge case — and says so early, when it is still cheap.
          </p>
        </Chapter>

        <CaseClosing
          lessons={[
            'At scale, small frontend details are big business. A confusing size selector is not a design quibble.',
            'Ownership is mostly communication with a deadline attached.',
            'Experimentation replaces argument with evidence — the same instinct that made me publish datasets rather than claims.',
          ]}
          links={[{ label: 'See the resume', href: '/resume#experience', primary: true }]}
          prev={{ label: 'Prev: OSN-008 Forest Fire Dataset', href: '/projects/forest-fire-c4' }}
          next={{ label: 'Next: OSN-010 Soliton Systems', href: '/projects/soliton-systems' }}
        />
      </CaseScaffold>
    </article>
  );
}
