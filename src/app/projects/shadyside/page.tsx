import Image from 'next/image';
import Link from 'next/link';

import { ReadingProgress } from '@/components/case-study/ReadingProgress';
import { Reveal } from '@/components/motion/Reveal';
import { RouteScene } from '@/components/shadyside/RouteScene';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShadySide — Case Study',
  description:
    'How ShadySide grew from one sun-baked Tamil Nadu bus ride into a v1.5 travel utility that recommends the cooler side of a bus, train, or car.',
};

const meta = [
  { label: 'Role', value: 'Design + build, solo' },
  { label: 'Stack', value: 'React · TS · Geo + solar math' },
  { label: 'Status', value: 'v1.5 · out of beta', ok: true },
];

const uxDecisions = [
  {
    title: 'One blunt answer',
    copy: 'The output is not a heatmap or a score table — it is “sit left” or “sit right”. Everything else (per-segment detail, sun times) is secondary evidence you can expand.',
  },
  {
    title: 'Time chips, not date pickers',
    copy: '“Now · +5 · +10 · +15 min” covers how people actually board buses. A full scheduler exists, but the fast path is one tap.',
  },
  {
    title: 'An honest disclaimer',
    copy: 'Real shade changes with clouds, trees, buildings, flyovers, and detours. The app describes itself as a comfort guide, not a guarantee, so the recommendation stays useful without pretending to be perfect.',
  },
  {
    title: 'Product loops after the answer',
    copy: 'Version 1.5 added recent and favourite routes, shareable result cards, post-trip accuracy feedback, a public status page, and clearer route tips — the difference between a neat calculator and a usable travel tool.',
  },
  {
    title: 'Answer pages for real questions',
    copy: 'People find the app by searching “bus sun side” and “where to sit in a train to avoid sunlight”. Those exact questions became public answer pages (bus-shade, train-shade) that route back into the planner.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Read the route',
    copy: 'Start, destination, and departure time in; the route geometry comes back as a sequence of directed segments.',
  },
  {
    step: '02',
    title: 'Place the sun',
    copy: 'For each segment’s time window, the sun’s position is estimated from the clock and coordinates — morning east, evening west, and everything in between.',
  },
  {
    step: '03',
    title: 'Score each side',
    copy: 'Segment direction vs. sun position gives each side of the vehicle an exposure estimate; weather context tempers the result on overcast days.',
  },
  {
    step: '04',
    title: 'Say it plainly',
    copy: 'The side with less expected sun wins. Recalculate if boarding time slips or the bus takes a detour.',
  },
];

export default function ShadySidePage() {
  return (
    <article>
      <ReadingProgress />
      {/* hero — dark evidence-board header */}
      <header className="bg-[#17191e] text-[#f0eee7]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] font-medium tracking-[0.12em] uppercase">
            <span className="text-[#f2a369]">OSN-001 — Case study</span>
            <span className="text-[#6fbf99]">● Shipped · v1.5</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">ShadySide</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#b9bcc4]">
            A travel utility that reads your route, departure time, sun position, and weather context — then tells you
            which side of the bus, train, or car is likely to stay cooler.
          </p>
          <a
            href="https://shadyside.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-md bg-[#e8834a] px-5 py-3 font-mono text-[12px] font-medium tracking-wider text-[#14151a] uppercase transition-colors hover:bg-[#f2a369]"
          >
            Open the live app ↗
          </a>
        </div>
      </header>

      {/* meta strip */}
      <div className="border-line grid grid-cols-1 border-b sm:grid-cols-3">
        {meta.map((item, i) => (
          <div key={item.label} className={`px-5 py-4 sm:px-8 ${i < meta.length - 1 ? 'border-line sm:border-r' : ''}`}>
            <p className="label-mono text-faint">{item.label}</p>
            <p className={`mt-1 text-sm font-medium ${item.ok ? 'text-ok' : ''}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-14 px-5 py-14 sm:px-8">
        <Reveal>
          <figure className="module-card overflow-hidden">
            <Image
              src="/images/shadyside-premise.webp"
              alt="Illustration of the ShadySide premise: a curved route line from start to destination, a dashed sun arc overhead, and a green band marking the shaded side of the route."
              width={1376}
              height={768}
              priority
              className="w-full"
            />
            <figcaption className="label-mono text-faint border-line border-t px-4 py-2.5">
              FIG 0.1 — The premise: route, sun path, shaded side
            </figcaption>
          </figure>
        </Reveal>

        <Reveal as="section">
          <h2 className="label-mono text-accent">01 — The problem</h2>
          <p className="mt-3 text-[15px] leading-relaxed">
            Long bus rides. Sun on your face, phone, or laptop screen. Everyone guesses which side to sit on; most
            people guess wrong because the answer changes with the route’s direction, the time of day, the season, and
            every turn along the way. There is no permanent “shady side”.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="label-mono text-accent">02 — Why I built it</h2>
          <p className="text-muted mt-3 text-[15px] leading-relaxed">
            This started with a real 2020 trip: four hours from Jalakandapuram to Coimbatore, sitting on the wrong side
            while the sun did exactly what the sun does. The inputs — route, clock, sun, and weather — are all
            computable. So instead of guessing, I built the tool I wanted before boarding.
          </p>
        </Reveal>

        <section aria-labelledby="how-heading">
          <Reveal>
            <h2 id="how-heading" className="label-mono text-accent">
              03 — How it works
            </h2>
            <p className="text-muted mt-3 mb-6 text-[15px] leading-relaxed">
              Use route geometry, departure time, location, sun position, and weather context to recommend the side that
              stays cooler. Scroll — the sun runs the route below.
            </p>
          </Reveal>
          <RouteScene />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {howItWorks.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.05}>
                <div className="module-card h-full p-4">
                  <p className="label-mono text-faint">
                    STEP {item.step} — {item.title}
                  </p>
                  <p className="text-muted mt-2 text-[13px] leading-relaxed">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="ux-heading">
          <Reveal>
            <h2 id="ux-heading" className="label-mono text-accent">
              04 — UX decisions
            </h2>
          </Reveal>
          <div className="mt-5 flex flex-col gap-5">
            {uxDecisions.map((decision, i) => (
              <Reveal key={decision.title} delay={i * 0.04}>
                <div className="border-line border-l-2 pl-4">
                  <h3 className="text-[15px] font-semibold">{decision.title}</h3>
                  <p className="text-muted mt-1 text-[13.5px] leading-relaxed">{decision.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal as="section">
          <h2 className="label-mono text-accent">05 — Reception, honestly</h2>
          <p className="text-muted mt-3 text-[15px] leading-relaxed">
            The beta was small, but the feedback was specific enough to keep going: people understood the problem
            immediately. After 1,000+ shade recommendations, ShadySide moved out of beta as v1.5. It is now live,
            indexed, and reached by people typing real questions into search — “bus sun side”, “sit in shade train”, and
            “where to sit in a bus to avoid sunlight”. Those queries now shape the roadmap.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="label-mono text-accent">06 — What I learned</h2>
          <ul className="text-muted mt-3 flex list-none flex-col gap-2.5 text-[15px] leading-relaxed">
            <li className="border-line border-l-2 pl-4">
              Ship the earliest useful version — strangers used it the same week.
            </li>
            <li className="border-line border-l-2 pl-4">
              A niche idea can still be a real product if the problem is felt sharply enough.
            </li>
            <li className="border-line border-l-2 pl-4">
              A blunt answer beats a clever visualization when someone is boarding a bus.
            </li>
            <li className="border-line border-l-2 pl-4">
              Honesty is a feature: saying “comfort guide, not a guarantee” costs nothing and buys trust.
            </li>
          </ul>
        </Reveal>

        <nav className="border-line text-faint flex items-center justify-between border-t pt-6 font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
          <Link href="/projects" className="hover:text-accent transition-colors">
            ← Back to index
          </Link>
          <Link href="/projects/theflames" className="text-ink hover:text-accent transition-colors">
            Next: OSN-002 TheFlames →
          </Link>
        </nav>
      </div>
    </article>
  );
}
