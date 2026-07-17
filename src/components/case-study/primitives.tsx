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
 * Case-study hero. `tone` swaps between the inverted evidence-board header
 * (products, research) and a paper header (work). An optional `aside` turns it
 * into a split visual hero; `artifactId` prints a large index number behind the
 * title so each hero reads as an inspected record without new tokens.
 */
export function CaseHero({
  eyebrow,
  status,
  title,
  lede,
  links,
  tone = 'ink',
  artifactId,
  aside,
}: {
  eyebrow: string;
  status?: string;
  title: string;
  lede: string;
  links?: CaseLink[];
  tone?: 'ink' | 'paper';
  artifactId?: string;
  aside?: React.ReactNode;
}) {
  const inverted = tone === 'ink';
  return (
    <header
      className={`relative isolate overflow-hidden ${inverted ? 'bg-[#17191e] text-[#f0eee7]' : 'border-line bg-grid border-b'}`}
    >
      <ReadingProgress />
      {inverted && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_-10%,color-mix(in_srgb,#e8834a_16%,transparent),transparent_60%)]"
        />
      )}
      {artifactId && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -top-6 right-3 font-mono text-[120px] leading-none font-semibold tracking-tighter select-none sm:text-[180px] ${
            inverted ? 'text-white/4' : 'text-ink/[0.04]'
          }`}
        >
          {artifactId}
        </span>
      )}
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
        <div className="min-w-0">
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
                const className = `inline-flex min-h-11 items-center rounded-md px-5 py-3 font-mono text-[12px] font-medium tracking-wider uppercase transition-colors ${
                  link.primary ? primaryClass : secondaryClass
                }`;
                return link.external ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {link.label} ↗<span className="sr-only">(opens in a new tab)</span>
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
        {aside && <div className="min-w-0 lg:w-90 xl:w-105">{aside}</div>}
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

/**
 * A numbered case-study chapter. Registers `id` + `data-chapter` + `data-label`
 * so the sticky chapter rail can track it. `wide` lets a chapter host a moment
 * that breaks the reading column.
 */
export function Chapter({
  id,
  index,
  title,
  children,
  wide = false,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const headingId = `h-${id}`;
  return (
    <Reveal as="section">
      <section id={id} data-chapter data-label={title} aria-labelledby={headingId} className="scroll-mt-28">
        <p className="text-faint font-mono text-[10px] font-medium tracking-[0.14em] uppercase">Chapter {index}</p>
        <h2 id={headingId} className="mt-1.5 text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
          {title}
        </h2>
        <div className={`mt-4 flex flex-col gap-4 text-[15px] leading-relaxed ${wide ? '' : 'max-w-170'}`}>
          {children}
        </div>
      </section>
    </Reveal>
  );
}

/** Legacy numbered section kept for compatibility. */
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

/**
 * A wide visual moment that breaks the narrow reading column, with an optional
 * oversized label behind it for narrative drama.
 */
export function ChapterMoment({
  label,
  children,
  className = '',
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <div className={`relative ${className}`}>
        {label && (
          <span
            aria-hidden="true"
            className="text-line-strong/40 pointer-events-none absolute -top-7 left-0 font-mono text-4xl font-semibold tracking-tighter select-none sm:text-5xl"
          >
            {label}
          </span>
        )}
        <div className="relative">{children}</div>
      </div>
    </Reveal>
  );
}

/**
 * Annotated evidence frame. Renders the reusable annotation language:
 * FIG id, a status tag (verified / illustrative / real screenshot), the visual,
 * and a caption + optional source label.
 */
export function Figure({
  id,
  caption,
  source,
  status = 'illustration',
  children,
}: {
  id: string;
  caption: string;
  source?: string;
  status?: 'illustration' | 'verified' | 'screenshot' | 'diagram';
  children: React.ReactNode;
}) {
  const statusLabel = {
    illustration: 'Status — Illustrative model',
    verified: 'Status — Verified data',
    screenshot: 'Source — Real screenshot',
    diagram: 'Status — Diagram from public facts',
  }[status];
  const statusTone = status === 'verified' || status === 'screenshot' ? 'text-ok' : 'text-accent';

  return (
    <figure className="module-card overflow-hidden">
      <figcaption className="border-line text-faint flex items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[9.5px] font-medium tracking-widest uppercase">
        <span>{id}</span>
        <span className={statusTone}>{statusLabel}</span>
      </figcaption>
      <div className="bg-surface-2">{children}</div>
      <div className="border-line flex items-center justify-between gap-3 border-t px-4 py-2.5">
        <p className="text-muted text-[12px] leading-snug">{caption}</p>
        {source && (
          <span className="text-faint shrink-0 font-mono text-[9px] tracking-[0.08em] uppercase">{source}</span>
        )}
      </div>
    </figure>
  );
}

/** inputs → process → output, as a connected strip. */
export function ProcessStrip({ steps }: { steps: { label: string; caption: string }[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Process">
      {steps.map((step, i) => (
        <Reveal key={step.label} delay={i * 0.05} as="li">
          <div className="module-card relative h-full p-4">
            <span className="text-faint font-mono text-[10px] font-medium tracking-widest">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 text-[13.5px] font-semibold">{step.label}</h3>
            <p className="text-muted mt-1.5 text-[12.5px] leading-relaxed">{step.caption}</p>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="text-line-strong absolute top-1/2 -right-2.5 hidden -translate-y-1/2 font-mono text-sm lg:block"
              >
                →
              </span>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
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

/** A short, deliberate pull quote. Use sparingly. */
export function PullQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <Reveal>
      <figure className="border-accent border-l-2 py-1 pl-5">
        <blockquote className="text-[19px] leading-snug font-medium tracking-[-0.01em] text-balance sm:text-[22px]">
          {children}
        </blockquote>
        {cite && (
          <figcaption className="text-faint mt-2 font-mono text-[10px] tracking-widest uppercase">{cite}</figcaption>
        )}
      </figure>
    </Reveal>
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
      <p className="text-muted mt-2 font-mono text-[11.5px] leading-relaxed wrap-break-word">{citation}</p>
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

/** Strong closing: lessons, links, prev/next, and a clean handoff into the footer. */
export function CaseClosing({
  lessons,
  links,
  prev,
  next,
  statement = 'Artifact closed. Next inspection ready.',
}: {
  lessons: React.ReactNode[];
  links?: CaseLink[];
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
  statement?: string;
}) {
  return (
    <Reveal as="section">
      <section aria-labelledby="h-lessons" className="scroll-mt-28" id="lessons" data-chapter data-label="Lessons">
        <p className="text-faint font-mono text-[10px] font-medium tracking-[0.14em] uppercase">Lessons</p>
        <h2 id="h-lessons" className="mt-1.5 text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
          What it taught me
        </h2>
        <ul className="text-muted mt-4 flex max-w-170 list-none flex-col gap-2.5 text-[15px] leading-relaxed">
          {lessons.map((lesson, i) => (
            <li key={i} className="border-line border-l-2 pl-4">
              {lesson}
            </li>
          ))}
        </ul>

        {links && links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map((link) => {
              const className = `inline-flex min-h-11 items-center rounded-md px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.06em] uppercase transition-colors ${
                link.primary ? 'bg-ink text-paper hover:bg-accent' : 'border-ink hover:bg-ink hover:text-paper border'
              }`;
              return link.external ? (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {link.label} ↗<span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={className}>
                  {link.label} →
                </Link>
              );
            })}
          </div>
        )}

        <div className="border-line mt-10 flex items-center justify-between gap-3 border-t pt-5">
          <span className="text-accent font-mono text-[10px] font-medium tracking-[0.12em] uppercase">
            <span className="bg-accent mr-2 inline-block size-1.5 animate-pulse rounded-full align-middle motion-reduce:animate-none" />
            {statement}
          </span>
        </div>
        <div className="mt-4">
          <CaseFooterNav prev={prev} next={next} />
        </div>
      </section>
    </Reveal>
  );
}

/** Shared page shell so every case study has identical rhythm. */
export function CaseBody({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-3xl flex-col gap-12 px-5 py-14 sm:px-8">{children}</div>;
}
