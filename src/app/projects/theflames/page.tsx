import type { Metadata } from 'next';
import Link from 'next/link';

import { ReadingProgress } from '@/components/case-study/ReadingProgress';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'TheFlames — Project',
  description:
    'TheFlames: the classic schoolyard FLAMES game rebuilt as a fast, free web toy by Obuli Sai Naren — automatic counting plus a manual mode for purists.',
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
            and the leftover count cycles F-L-A-M-E-S until one destiny remains. Rebuilt as a small, fast, free web toy.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://theflames.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-press rounded-md px-5 py-3 font-mono text-[12px] font-medium tracking-[0.05em] text-white uppercase shadow-[0_2px_0_var(--accent-press)] transition-colors"
            >
              Play it live ↗
            </a>
            <a
              href="https://github.com/osnaren/the-flames"
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink hover:bg-ink hover:text-paper rounded-md border px-5 py-3 font-mono text-[12px] font-medium tracking-[0.05em] uppercase transition-colors"
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
            Not every project needs to be serious to be built seriously. TheFlames is nostalgia with production-grade
            care: TypeScript, proper SEO, no account required, and names are only used in the moment — the site keeps
            nothing but anonymous stats for its trends chart.
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
