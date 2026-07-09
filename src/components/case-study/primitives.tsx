import Link from 'next/link';

import { ReadingProgress } from '@/components/case-study/ReadingProgress';
import { Reveal } from '@/components/motion/Reveal';

export interface CaseLink {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}

/**
 * Dark hero used by every case study. `tone` swaps between the inverted
 * evidence-board header (products, research) and a paper header (work),
 * so the templates stay visually distinct without new tokens.
 */
export function CaseHero({
  eyebrow,
  status,
  title,
  lede,
  links,
  tone = 'ink',
}: {
  eyebrow: string;
  status?: string;
  title: string;
  lede: string;
  links?: CaseLink[];
  tone?: 'ink' | 'paper';
}) {
  const inverted = tone === 'ink';
  return (
    <header className={inverted ? 'bg-[#17191e] text-[#f0eee7]' : 'border-line bg-grid border-b'}>
      <ReadingProgress />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] font-medium tracking-[0.12em] uppercase">
          <span className={inverted ? 'text-[#f2a369]' : 'text-accent'}>{eyebrow}</span>
          {status && <span className={inverted ? 'text-[#6fbf99]' : 'text-ok'}>{status}</span>}
        </div>
        <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-[42px] sm:leading-[1.08]">
          {title}
        </h1>
        <p className={`mt-4 max-w-xl text-[15px] leading-relaxed ${inverted ? 'text-[#b9bcc4]' : 'text-muted'}`}>
          {lede}
        </p>
        {links && links.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {links.map((link) => {
              const primaryClass = inverted
                ? 'bg-[#e8834a] text-[#14151a] hover:bg-[#f2a369]'
                : 'bg-accent text-white shadow-[0_2px_0_var(--accent-press)] hover:bg-accent-press';
              const secondaryClass = inverted
                ? 'border border-[#f0eee7] hover:bg-[#f0eee7] hover:text-[#17191e]'
                : 'border-ink hover:bg-ink hover:text-paper border';
              const className = `rounded-md px-5 py-3 font-mono text-[12px] font-medium tracking-[0.05em] uppercase transition-colors ${
                link.primary ? primaryClass : secondaryClass
              }`;
              return link.external ? (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {link.label} ↗
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={className}>
                  {link.label} →
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

/** Row of facts under the hero: role, venue, stack, status… */
export function MetaStrip({ items }: { items: { label: string; value: string; tone?: 'ok' | 'accent' }[] }) {
  return (
    <div className="border-line grid grid-cols-1 border-b sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`px-5 py-4 sm:px-8 ${i < items.length - 1 ? 'border-line border-b sm:border-r sm:border-b-0' : ''}`}
        >
          <p className="label-mono text-faint">{item.label}</p>
          <p
            className={`mt-1 text-sm font-medium ${item.tone === 'ok' ? 'text-ok' : item.tone === 'accent' ? 'text-accent' : ''}`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/** A numbered case-study section that reveals on scroll. */
export function CaseSection({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  const id = `s-${index}`;
  return (
    <Reveal as="section">
      <section aria-labelledby={id}>
        <h2 id={id} className="label-mono text-accent">
          {index} — {title}
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed">{children}</div>
      </section>
    </Reveal>
  );
}

/** Bulleted list styled as ruled field notes. */
export function RuledList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex list-none flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="border-line border-l-2 pl-4">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Named decisions / steps as a two-column card grid. */
export function DecisionGrid({ items }: { items: { title: string; copy: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.04}>
          <div className="module-card h-full p-4">
            <h3 className="text-[14px] font-semibold">{item.title}</h3>
            <p className="text-muted mt-1.5 text-[13px] leading-relaxed">{item.copy}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** A verified-data table — the class breakdown for datasets. */
export function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="module-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <caption className="label-mono text-faint border-line border-b px-4 py-3 text-left">{caption}</caption>
          <thead>
            <tr className="border-line border-b">
              {head.map((cell) => (
                <th
                  key={cell}
                  scope="col"
                  className="text-faint px-4 py-2.5 font-mono text-[10px] tracking-[0.08em] uppercase"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-line/60 border-b last:border-b-0">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'font-medium' : 'text-muted font-mono text-[12px]'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** For the ethics/limits notes that medical data and work case studies need. */
export function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <aside className="border-accent bg-accent/5 rounded-r-lg border-l-2 px-4 py-3.5">
      <p className="label-mono text-accent">{label}</p>
      <div className="text-muted mt-1.5 text-[13.5px] leading-relaxed">{children}</div>
    </aside>
  );
}

/** Formal citation block for publications and datasets. */
export function CitationBlock({ citation, doi }: { citation: string; doi?: string }) {
  return (
    <div className="bg-surface-2 border-line rounded-lg border p-4">
      <p className="label-mono text-faint">Cite this</p>
      <p className="text-muted mt-2 font-mono text-[11.5px] leading-relaxed break-words">{citation}</p>
      {doi && (
        <a
          href={doi}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent mt-2 inline-block font-mono text-[11px] underline underline-offset-4"
        >
          {doi.replace('https://', '')} ↗
        </a>
      )}
    </div>
  );
}

/** Prev / next navigation across the artifact index. */
export function CaseFooterNav({
  prev,
  next,
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <nav className="border-line text-faint flex flex-wrap items-center justify-between gap-3 border-t pt-6 font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
      {prev ? (
        <Link href={prev.href} className="hover:text-accent transition-colors">
          ← {prev.label}
        </Link>
      ) : (
        <Link href="/projects" className="hover:text-accent transition-colors">
          ← Back to index
        </Link>
      )}
      {next && (
        <Link href={next.href} className="text-ink hover:text-accent transition-colors">
          {next.label} →
        </Link>
      )}
    </nav>
  );
}

/** Shared page shell so every case study has identical rhythm. */
export function CaseBody({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-3xl flex-col gap-12 px-5 py-14 sm:px-8">{children}</div>;
}
