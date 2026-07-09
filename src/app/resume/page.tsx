import type { Metadata } from 'next';

import { PrintButton } from '@/components/resume/PrintButton';
import { certifications, datasets, education, experience, languages, publications, skills } from '@/data/resume';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume: Obuli Sai Naren — Frontend Engineer at Victoria’s Secret & Co., previously Soliton Technologies. React, TypeScript, UX, accessibility, ecommerce.',
};

const contactLinks = [
  { label: 'Email', href: `mailto:${site.email}`, text: site.email },
  { label: 'GitHub', href: site.links.github, text: 'github.com/osnaren' },
  { label: 'LinkedIn', href: site.links.linkedin, text: 'linkedin.com/in/osnaren' },
  { label: 'Kaggle', href: site.links.kaggle, text: 'kaggle.com/obulisainaren' },
  { label: 'ORCID', href: site.links.orcid, text: 'orcid.org/0000-0002-6656-9617' },
  { label: 'Web', href: site.domain, text: 'osnaren.com' },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      {/* header */}
      <header className="border-line flex flex-wrap items-end justify-between gap-5 border-b pb-6">
        <div>
          <p className="label-mono text-accent">/RESUME — SPEC SHEET</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{site.name}</h1>
          <p className="text-muted mt-1.5 text-[14px]">
            {site.role} · {site.location}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px]">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-muted hover:text-accent underline-offset-4 hover:underline">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <PrintButton />
      </header>

      {/* experience */}
      <section id="experience" aria-labelledby="experience-heading" className="mt-8 scroll-mt-24">
        <h2 id="experience-heading" className="sr-only">
          Experience
        </h2>
        <div className="flex flex-col gap-4">
          {experience.map((block) => (
            <article key={block.id} className="module-card print-flat p-5">
              <div className="text-faint flex flex-wrap items-center justify-between gap-2 font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase">
                <span>
                  {block.id} — {block.label}
                </span>
                <span>{block.meta}</span>
              </div>
              <h3 className="mt-2.5 text-[17px] font-semibold">
                {block.company} <span className="text-faint text-[13px] font-normal">· {block.location}</span>
              </h3>
              {block.roles.map((role) => (
                <div key={role.title} className="mt-3.5">
                  <p className="text-[13.5px] font-medium">
                    {role.title} <span className="text-faint font-mono text-[11px]">— {role.period}</span>
                  </p>
                  <ul className="text-muted mt-1.5 flex list-disc flex-col gap-1 pl-5 text-[13px] leading-relaxed">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      {/* education + skills */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <section aria-labelledby="education-heading" className="module-card print-flat p-5">
          <h2
            id="education-heading"
            className="text-faint font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase"
          >
            Block 03 — Education
          </h2>
          <div className="mt-2.5 flex flex-col gap-3.5">
            {education.map((entry) => (
              <div key={entry.school}>
                <p className="text-[13.5px] font-medium">{entry.school}</p>
                <p className="text-muted text-[12.5px]">{entry.detail}</p>
                <p className="text-ok mt-0.5 font-mono text-[10px] tracking-[0.06em] uppercase">✓ {entry.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-heading" className="module-card print-flat p-5">
          <h2 id="skills-heading" className="text-faint font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase">
            Block 04 — Skills
          </h2>
          {(
            [
              ['Core', skills.core],
              ['Practice', skills.practice],
              ['Also speaks', skills.alsoSpeaks],
            ] as const
          ).map(([group, items]) => (
            <div key={group} className="mt-2.5">
              <p className="text-faint font-mono text-[10px] tracking-[0.08em] uppercase">{group}</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="border-line rounded-full border px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-[0.04em] uppercase"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      {/* publications + honors */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <section aria-labelledby="publications-heading" className="module-card print-flat p-5">
          <h2
            id="publications-heading"
            className="text-faint font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase"
          >
            Block 05 — Publications
          </h2>
          <ul className="mt-2.5 flex flex-col gap-3">
            {publications.map((pub) => (
              <li key={pub.title}>
                <p className="text-[12.5px] leading-snug font-medium">
                  {pub.href ? (
                    <a href={pub.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {pub.title} ↗
                    </a>
                  ) : (
                    pub.title
                  )}
                </p>
                <p className="text-faint mt-0.5 font-mono text-[10px] uppercase">{pub.venue}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="datasets-heading" className="module-card print-flat p-5">
          <h2
            id="datasets-heading"
            className="text-faint font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase"
          >
            Block 06 — Public datasets
          </h2>
          <ul className="mt-2.5 flex flex-col gap-3">
            {datasets.map((dataset) => (
              <li key={dataset.title}>
                <p className="text-[12.5px] leading-snug font-medium">
                  <a href={dataset.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {dataset.title} ↗
                  </a>
                </p>
                <p className="text-faint mt-0.5 font-mono text-[10px]">{dataset.meta}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="also-heading" className="module-card print-flat p-5">
          <h2 id="also-heading" className="text-faint font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase">
            Block 07 — Certifications &amp; Languages
          </h2>
          <ul className="text-muted mt-2.5 flex list-disc flex-col gap-1 pl-5 text-[12.5px] leading-relaxed">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
          <p className="text-faint mt-3 font-mono text-[10px] tracking-[0.06em] uppercase">
            Languages: {languages.join(' · ')}
          </p>
        </section>
      </div>

      <p className="text-faint mt-6 text-center font-mono text-[10px] tracking-[0.08em] uppercase print:hidden">
        Printer-friendly — use the button above to save this page as a PDF.
      </p>
    </div>
  );
}
