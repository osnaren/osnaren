import Link from 'next/link';

import { ArrowUpRight, BookOpen, FlaskConical, Sun } from 'lucide-react';

import { SunPathStudy } from '@/components/lab/experiments';
import { Reveal } from '@/components/motion/Reveal';
import { artifacts } from '@/data/artifacts';
import { fieldNotes } from '@/data/story';

function RouteField() {
  return (
    <div className="relative min-h-72 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 720 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g fill="none" stroke="var(--line)" strokeWidth="1">
          <path d="M0 270 C100 205 150 246 245 176 S430 122 520 154 S640 116 720 46" />
          <path d="M0 246 C110 192 170 221 252 160 S414 101 526 134 S646 94 720 23" />
          <path d="M0 294 C95 233 172 267 268 199 S430 149 532 181 S642 145 720 78" />
          <path d="M74 300 C110 238 150 224 204 216 S288 181 334 132 S425 82 478 92" />
        </g>
        <path
          d="M32 260 C126 246 178 208 244 214 S355 174 414 142 S548 156 612 88 S672 70 700 38"
          fill="none"
          stroke="var(--ok)"
          strokeWidth="12"
          opacity="0.16"
        />
        <path
          d="M32 254 C126 240 178 202 244 208 S355 168 414 136 S548 150 612 82 S672 64 700 32"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        {[
          { x: 32, y: 254 },
          { x: 244, y: 208 },
          { x: 414, y: 136 },
          { x: 612, y: 82 },
          { x: 700, y: 32 },
        ].map((point, index) => (
          <g key={point.x}>
            <circle cx={point.x} cy={point.y} r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <text x={point.x + 10} y={point.y - 9} fill="var(--faint)" fontSize="10" fontFamily="monospace">
              {String(index + 1).padStart(2, '0')}
            </text>
          </g>
        ))}
        <circle cx="700" cy="32" r="13" fill="var(--sun)" opacity="0.22" />
        <circle cx="700" cy="32" r="6" fill="var(--sun)" />
      </svg>
      <div className="text-faint absolute top-4 right-3 font-mono text-[9px] leading-5 tracking-[0.06em] uppercase">
        <p>11.6643° N</p>
        <p>78.1460° E</p>
      </div>
    </div>
  );
}

function StoryRail() {
  const notes = fieldNotes.slice(0, 3);

  return (
    <ol className="border-line mt-8 grid border-y sm:grid-cols-3">
      {notes.map((note, index) => (
        <li
          key={note.id}
          className="border-line relative min-h-36 p-4 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0"
        >
          <div className="text-faint flex items-center justify-between font-mono text-[9px] tracking-[0.08em] uppercase">
            <span>{note.date}</span>
            <span>{note.id}</span>
          </div>
          <p className="mt-4 text-[15px] font-semibold tracking-normal">{note.title}</p>
          <p className="text-muted mt-2 text-[12px] leading-5">{note.artifact}</p>
          <span
            className={`absolute bottom-0 left-0 h-0.5 ${index === 0 ? 'bg-accent w-full' : 'bg-line-strong w-1/3'}`}
            aria-hidden="true"
          />
        </li>
      ))}
    </ol>
  );
}

export function HomePathways() {
  const liveProducts = artifacts.filter(
    (artifact) => artifact.type === 'product' && artifact.status.includes('Live')
  ).length;
  const publications = artifacts.filter((artifact) => artifact.type === 'publication').length;
  const datasets = artifacts.filter((artifact) => artifact.type === 'dataset').length;

  return (
    <section aria-labelledby="home-pathways-heading" className="bg-paper relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="relative mx-auto max-w-384 px-5 py-16 sm:px-8 lg:pt-14 lg:pb-20 xl:px-12">
        <Reveal className="border-line flex flex-col gap-3 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-ok font-mono text-[10px] font-medium tracking-widest uppercase">Workbench routes</p>
            <h2 id="home-pathways-heading" className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
              Three routes out of the bench.
            </h2>
          </div>
          <p className="text-muted max-w-md text-[13px] leading-6 sm:text-right">
            Start with a shipped product, open the interaction studies, or follow the work and research chronologically.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12">
          <Reveal as="section" className="border-line py-10 lg:col-span-7 lg:border-r lg:pr-10" delay={0.04}>
            <article aria-labelledby="featured-path-heading" className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-4">
                <p className="text-accent flex items-center gap-2 font-mono text-[10px] font-medium tracking-widest uppercase">
                  <span>01</span> <Sun className="size-3.5" aria-hidden="true" /> Featured case study
                </p>
                <span className="text-ok font-mono text-[9px] tracking-[0.08em] uppercase">OSN-001 · Live</span>
              </div>
              <div className="mt-6 grid items-start gap-6 sm:grid-cols-[minmax(180px,0.72fr)_minmax(0,1.28fr)]">
                <div>
                  <h3 id="featured-path-heading" className="text-3xl font-semibold tracking-normal sm:text-4xl">
                    ShadySide
                  </h3>
                  <p className="text-muted mt-4 text-[14px] leading-6">
                    How route geometry, departure time, sun position, and weather context become one useful seat
                    recommendation.
                  </p>
                  <Link
                    href="/projects/shadyside"
                    className="text-accent mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-medium tracking-[0.06em] uppercase"
                  >
                    Explore Case Study <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
                <RouteField />
              </div>
            </article>
          </Reveal>

          <Reveal as="section" className="border-line border-t py-10 lg:col-span-5 lg:border-t-0 lg:pl-10" delay={0.1}>
            <article aria-labelledby="lab-path-heading" className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-4">
                <p className="text-accent flex items-center gap-2 font-mono text-[10px] font-medium tracking-widest uppercase">
                  <span>02</span> <FlaskConical className="size-3.5" aria-hidden="true" /> Lab
                </p>
                <span className="text-faint font-mono text-[9px] tracking-[0.08em] uppercase">Interaction studies</span>
              </div>
              <h3 id="lab-path-heading" className="mt-6 text-3xl font-semibold tracking-normal sm:text-4xl">
                Move one variable. Watch the answer change.
              </h3>
              <p className="text-muted mt-4 max-w-lg text-[14px] leading-6">
                The sun-path study that seeded ShadySide, plus small motion and interface experiments that run live.
              </p>
              <div className="border-line-strong bg-surface mt-6 min-h-60 rounded-md border p-5 shadow-[0_3px_0_var(--line)]">
                <SunPathStudy />
              </div>
              <Link
                href="/lab"
                className="text-accent mt-5 inline-flex min-h-11 items-center gap-2 self-start font-mono text-[11px] font-medium tracking-[0.06em] uppercase"
              >
                Enter the Lab <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          </Reveal>

          <Reveal as="section" className="border-line border-t py-10 lg:col-span-12" delay={0.08}>
            <article
              aria-labelledby="story-path-heading"
              className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start"
            >
              <div>
                <p className="text-accent flex items-center gap-2 font-mono text-[10px] font-medium tracking-widest uppercase">
                  <span>03</span> <BookOpen className="size-3.5" aria-hidden="true" /> Story
                </p>
                <h3 id="story-path-heading" className="mt-6 text-3xl font-semibold tracking-normal sm:text-4xl">
                  Field notes, not an autobiography.
                </h3>
                <p className="text-muted mt-4 max-w-lg text-[14px] leading-6">
                  A curated trail through products, research, professional work, and the moments that changed how I
                  build.
                </p>
                <Link
                  href="/story"
                  className="text-accent mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-medium tracking-[0.06em] uppercase"
                >
                  Read the Story <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <StoryRail />
            </article>
          </Reveal>
        </div>

        <Reveal className="border-line-strong bg-surface/72 mt-4 grid overflow-hidden rounded-md border sm:grid-cols-2 lg:grid-cols-4">
          {[
            'Frontend commerce',
            `${liveProducts} live products`,
            `${publications} publications`,
            `${datasets} public datasets`,
          ].map((signal, index) => (
            <div
              key={signal}
              className={`border-line flex min-h-16 items-center gap-3 px-4 font-mono text-[10px] font-medium tracking-[0.08em] uppercase ${
                index < 3 ? 'border-b sm:border-b-0 sm:border-r' : ''
              } ${index === 1 ? 'sm:border-r-0 lg:border-r' : ''}`}
            >
              <span className={`size-1.5 rounded-full ${index === 2 ? 'bg-accent' : 'bg-ok'}`} aria-hidden="true" />
              {signal}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
