import Link from 'next/link';

import { ReadingProgress } from '@/components/case-study/ReadingProgress';
import { Reveal } from '@/components/motion/Reveal';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TheFlames — Project',
  description:
    'TheFlames: a long-unfinished hobby idea turned into a polished web version of the classic schoolyard FLAMES game, with auto and manual modes.',
};

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
      <ReadingProgress />
      <header className="border-line border-b">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] font-medium tracking-[0.12em] uppercase">
            <span className="text-accent">OSN-002 — Project</span>
            <span className="text-ok">● Live · Experiment</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">TheFlames</h1>
          <p className="text-muted mt-4 max-w-xl text-[15px] leading-relaxed">
            The paper-and-pencil FLAMES game every Indian schoolkid knows — two names in, shared letters crossed out,
            and the leftover count cycles F-L-A-M-E-S until one destiny remains. An old hobby idea, finally finished as
            a small, fast, free web toy.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://theflames.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-press rounded-md px-5 py-3 font-mono text-[12px] font-medium tracking-wider text-white uppercase shadow-[0_2px_0_var(--accent-press)] transition-colors"
            >
              Play it live ↗
            </a>
            <a
              href="https://github.com/osnaren/the-flames"
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink hover:bg-ink hover:text-paper rounded-md border px-5 py-3 font-mono text-[12px] font-medium tracking-wider uppercase transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-5 py-14 sm:px-8">
        <Reveal as="section">
          <h2 className="label-mono text-accent">The six destinies</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {outcomes.map((outcome) => (
              <li key={outcome.letter} className="module-card flex items-center gap-3 p-3">
                <span className="bg-ink text-paper grid size-9 shrink-0 place-items-center rounded-md font-mono text-sm font-semibold">
                  {outcome.letter}
                </span>
                <span className="text-[13px] font-medium">{outcome.meaning}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section">
          <h2 className="label-mono text-accent">Why it exists</h2>
          <p className="text-muted mt-3 text-[15px] leading-relaxed">
            This was one of the first playful projects I wanted to build, but it sat unfinished for years. Shipping it
            properly became the point: take a tiny memory-lane idea and give it the same care I would give a serious
            product.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="label-mono text-accent">What shipped</h2>
          <ul className="text-muted mt-4 flex list-none flex-col gap-2.5 text-[15px] leading-relaxed">
            <li className="border-line border-l-2 pl-4">Auto mode with an animated reveal for the quick hit.</li>
            <li className="border-line border-l-2 pl-4">
              Manual mode for the paper-and-pencil ritual: cross out letters, then count it down yourself.
            </li>
            <li className="border-line border-l-2 pl-4">
              Anonymous global charts, plus share and download options for results.
            </li>
            <li className="border-line border-l-2 pl-4">
              No account wall; names are used for the result flow, not stored as personal profiles.
            </li>
          </ul>
        </Reveal>

        <Reveal as="section">
          <h2 className="label-mono text-accent">Production-grade play</h2>
          <p className="text-muted mt-3 text-[15px] leading-relaxed">
            Not every project needs to be serious to be built seriously. TheFlames is nostalgia with production-grade
            care: TypeScript, proper SEO, responsive motion, and a result flow that feels playful without becoming
            noisy.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="label-mono text-accent">The one UX decision that matters</h2>
          <p className="text-muted mt-3 text-[15px] leading-relaxed">
            Automatic mode does the counting instantly — but there is a{' '}
            <strong className="text-ink">Manual Mode</strong> that lets you cross out the shared letters yourself and
            walk the F-L-A-M-E-S count step by step, the way it worked in the back of a notebook. The point of the app
            is the ritual, not just the result.
          </p>
        </Reveal>

        <nav className="border-line text-faint flex items-center justify-between border-t pt-6 font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
          <Link href="/projects/shadyside" className="hover:text-accent transition-colors">
            ← Prev: OSN-001 ShadySide
          </Link>
          <Link href="/projects" className="text-ink hover:text-accent transition-colors">
            Back to index →
          </Link>
        </nav>
      </div>
    </article>
  );
}
