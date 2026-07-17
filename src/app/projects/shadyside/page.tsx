import Image from 'next/image';

import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import {
  CaseClosing,
  CaseHero,
  Chapter,
  ChapterMoment,
  DecisionGrid,
  MetaStrip,
  ProcessStrip,
  PullQuote,
} from '@/components/case-study/primitives';
import { RouteExplorer } from '@/components/shadyside/RouteExplorer';
import { RouteScene } from '@/components/shadyside/RouteScene';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShadySide — Case Study',
  description:
    'How ShadySide grew from one sun-baked Tamil Nadu bus ride into a v1.5 travel utility that recommends the cooler side of a bus, train, or car.',
  alternates: { canonical: '/projects/shadyside' },
};

const chapters: CaseChapter[] = [
  { id: 'premise', label: 'Premise' },
  { id: 'problem', label: 'Problem' },
  { id: 'insight', label: 'Insight' },
  { id: 'system', label: 'How it works' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'experience', label: 'Experience' },
  { id: 'reception', label: 'Reception' },
  { id: 'lessons', label: 'Lessons' },
];

const process = [
  {
    label: 'Read the route',
    caption: 'Start, destination, and departure time become a sequence of directed segments.',
  },
  { label: 'Place the sun', caption: 'The sun’s position is estimated per segment from the clock and coordinates.' },
  {
    label: 'Score each side',
    caption: 'Segment direction vs. sun gives each side an exposure estimate; weather tempers it.',
  },
  {
    label: 'Say it plainly',
    caption: 'The side with less expected sun wins — recalculate if boarding slips or the bus detours.',
  },
];

const decisions = [
  {
    title: 'One blunt answer',
    copy: 'The output is “sit left” or “sit right”, not a heatmap. Per-segment detail and sun times are secondary evidence you can expand.',
  },
  {
    title: 'Time chips, not date pickers',
    copy: '“Now · +5 · +10 · +15 min” matches how people actually board buses. A full scheduler exists, but the fast path is one tap.',
  },
  {
    title: 'An honest disclaimer',
    copy: 'Real shade shifts with clouds, trees, buildings, flyovers, and detours. The app calls itself a comfort guide, not a guarantee.',
  },
  {
    title: 'Product loops after the answer',
    copy: 'v1.5 added recent and favourite routes, shareable result cards, a public status page, and clearer route tips.',
  },
  {
    title: 'Answer pages for real questions',
    copy: 'Search queries like “bus sun side” became public answer pages (bus-shade, train-shade) that route back into the planner.',
  },
  {
    title: 'Mobile-first flow',
    copy: 'The whole planner is built for a phone held one-handed at a bus stop — the moment the question actually gets asked.',
  },
];

export default function ShadySidePage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-001 — Product case study"
        status="● Shipped · v1.5 · Live"
        artifactId="001"
        title="ShadySide"
        lede="A travel utility that reads your route, departure time, sun position, and weather context — then tells you which side of the bus, train, or car is likely to stay cooler."
        links={[
          { label: 'Open the live app', href: 'https://shadyside.app', external: true, primary: true },
          { label: 'Bus shade guide', href: 'https://shadyside.app/bus-shade', external: true },
        ]}
        aside={
          <figure className="module-card overflow-hidden">
            <Image
              src="/images/shadyside-premise.webp"
              alt="Illustration of the ShadySide premise: a curved route line from start to destination, a dashed sun arc overhead, and a green band marking the shaded side of the route."
              width={1376}
              height={768}
              priority
              className="w-full"
            />
            <figcaption className="label-mono text-faint border-line bg-surface border-t px-4 py-2.5">
              FIG 0.1 — Premise: route, sun path, shaded side
            </figcaption>
          </figure>
        }
      />

      <MetaStrip
        items={[
          { label: 'Role', value: 'Design + build, solo' },
          { label: 'Stack', value: 'React · TS · Geo + solar math' },
          { label: 'Status', value: 'v1.5 · out of beta', tone: 'ok' },
          { label: 'Type', value: 'Travel utility · live' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-001"
        next={{ label: 'Next: OSN-002 TheFlames', href: '/projects/theflames' }}
      >
        <Chapter id="premise" index="01" title="Premise">
          <p>
            ShadySide is a shade-friendly travel planner: enter a start, a destination, and a departure time, and it
            compares the route direction with the estimated sun position and weather context to recommend the side of
            the vehicle more likely to stay cool. It is live, out of beta at v1.5, and reachable by anyone typing a real
            question into search.
          </p>
        </Chapter>

        <ChapterMoment label="FIG 01">
          <RouteScene />
        </ChapterMoment>

        <Chapter id="problem" index="02" title="The problem">
          <p>
            Long bus rides. Sun on your face, phone, or laptop screen. Everyone guesses which side to sit on, and most
            guess wrong — because the answer changes with the route’s direction, the time of day, the season, and every
            turn along the way. There is no permanent “shady side”.
          </p>
          <p className="text-muted">
            This started with a real 2020 trip: four hours from Jalakandapuram to Coimbatore, on the wrong side, while
            the sun did exactly what the sun does. The inputs — route, clock, sun, weather — are all computable, so
            instead of guessing I built the tool I wanted before boarding.
          </p>
        </Chapter>

        <Chapter id="insight" index="03" title="The insight">
          <PullQuote cite="The core realisation behind ShadySide">
            The shaded side is not east versus west. It is route geometry, time, date, and sun position — resolved
            across every segment of the trip.
          </PullQuote>
          <p className="text-muted">
            A route moving east in the morning, west in the evening, or turning through several directions exposes
            different windows at different times. The recommendation has to reflect the whole journey, not one road.
          </p>
        </Chapter>

        <Chapter id="system" index="04" title="How it works" wide>
          <p className="max-w-170">
            Route geometry, departure time, location, sun position, and weather context resolve into a single
            recommendation. The pipeline is four honest steps.
          </p>
          <ProcessStrip steps={process} />
          <p className="text-muted max-w-170">
            Scrub the departure time below to watch the sun cross the route and the recommendation flip. This is a
            simplified educational model, not the production algorithm.
          </p>
          <RouteExplorer />
        </Chapter>

        <Chapter id="decisions" index="05" title="Product decisions" wide>
          <p className="max-w-170">
            The difference between a neat calculator and a usable travel tool is a handful of product decisions.
          </p>
          <DecisionGrid items={decisions} />
        </Chapter>

        <Chapter id="experience" index="06" title="The experience" wide>
          <p className="max-w-170">
            The live surface stays deliberately small: a planner, a blunt result, and the loops around it that make it a
            product rather than a demo.
          </p>
          <ProcessStrip
            steps={[
              {
                label: 'Plan the journey',
                caption: 'Start, destination, transit mode (bus, train, car), and a departure time.',
              },
              {
                label: 'Get the answer',
                caption: 'A blunt “sit left / sit right” with the shaded share of the route.',
              },
              {
                label: 'Loop back',
                caption: 'Recent and favourite routes, shareable result cards, and a public status page.',
              },
              {
                label: 'Answer pages',
                caption: 'Bus-shade and train-shade guides that answer the exact search queries people use.',
              },
            ]}
          />
        </Chapter>

        <Chapter id="reception" index="07" title="Reception, honestly">
          <p className="text-muted">
            The beta was small, but the feedback was specific enough to keep going — people understood the problem
            immediately. After 1,000+ shade recommendations, ShadySide moved out of beta as v1.5. It is now live,
            indexed, listed on Product Hunt, and reached by people typing real questions into search: “bus sun side”,
            “sit in shade train”, and “where to sit in a bus to avoid sunlight”. Those queries now shape the roadmap.
          </p>
        </Chapter>

        <CaseClosing
          lessons={[
            'Ship the earliest useful version — strangers used it the same week.',
            'A niche idea can still be a real product if the problem is felt sharply enough.',
            'A blunt answer beats a clever visualization when someone is boarding a bus.',
            'Honesty is a feature: saying “comfort guide, not a guarantee” costs nothing and buys trust.',
          ]}
          links={[
            { label: 'Open the live app', href: 'https://shadyside.app', external: true, primary: true },
            { label: 'Train shade guide', href: 'https://shadyside.app/train-shade', external: true },
          ]}
          next={{ label: 'Next: OSN-002 TheFlames', href: '/projects/theflames' }}
        />
      </CaseScaffold>
    </article>
  );
}
