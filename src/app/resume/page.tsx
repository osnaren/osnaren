import { Github, Kaggle, Linkedin, Orcid, Gmail2026 } from '@thesvg/react';
import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Database,
  Gauge,
  Globe2,
  GraduationCap,
  Languages as LanguagesIcon,
  type LucideIcon,
  Users,
} from 'lucide-react';

import { PrintButton } from '@/components/resume/PrintButton';
import { datasets, education, experience, languages, leadership, publications, skills } from '@/data/resume';
import { site } from '@/data/site';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume: Obuli Sai Naren — Frontend Engineer at Victoria’s Secret & Co., previously Soliton Technologies. React, TypeScript, UX, accessibility, ecommerce.',
  alternates: { canonical: '/resume' },
};

const contactLinks = [
  { label: 'Email', href: `mailto:${site.email}`, text: site.email, icon: <Gmail2026 aria-hidden="true" /> },
  { label: 'Website', href: site.domain, text: 'osnaren.com', icon: <Globe2 size={17} aria-hidden="true" /> },
  {
    label: 'LinkedIn',
    href: site.links.linkedin,
    text: 'linkedin.com/in/osnaren',
    icon: <Linkedin aria-hidden="true" />,
  },
  {
    label: 'GitHub',
    href: site.links.github,
    text: 'github.com/osnaren',
    icon: <Github variant="mono" aria-hidden="true" />,
  },
  {
    label: 'Kaggle',
    href: site.links.kaggle,
    text: 'kaggle.com/obulisainaren',
    icon: <Kaggle variant="mono" aria-hidden="true" />,
  },
  {
    label: 'ORCID',
    href: site.links.orcid,
    text: '0000-0002-6656-9617',
    icon: <Orcid variant="mono" aria-hidden="true" />,
  },
] as const;

const skillGroups: ReadonlyArray<{ label: string; items: readonly string[]; icon: LucideIcon }> = [
  { label: 'Frontend', items: skills.frontend, icon: Code2 },
  { label: 'Engineering practice', items: skills.engineering, icon: Gauge },
  { label: 'Supporting stack', items: skills.supporting, icon: Database },
];

function SectionHeading({ id, icon: Icon, children }: { id: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="resume-section-heading border-line mb-3 flex items-center gap-2.5 border-b pb-2.5">
      <span className="border-line bg-surface-2 text-accent grid size-7 shrink-0 place-items-center rounded-md border">
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <h2 id={id} className="text-[13px] font-semibold tracking-[0.01em]">
        {children}
      </h2>
    </div>
  );
}

export default function ResumePage() {
  return (
    <article className="resume-document mx-auto max-w-5xl py-10 sm:py-14">
      <header className="resume-header relative py-7 px-5 sm:px-8">
        <div className="absolute top-0 right-0 print:hidden">
          <PrintButton />
        </div>
        <p className="label-mono text-accent pr-42 print:pr-0">Resume · Frontend engineering</p>
        <h1 className="mt-2 text-[2.15rem] leading-none font-semibold tracking-tight sm:text-[2.75rem]">{site.name}</h1>
        <p className="text-muted mt-2 text-[14px] font-medium">
          {site.role} <span aria-hidden="true">·</span> {site.location}
        </p>
        <p className="text-muted mt-4 max-w-3xl text-[13.5px] leading-relaxed text-pretty">
          Frontend engineer building accessible, high-performance ecommerce experiences and useful web products with
          React and TypeScript. Published researcher and creator of public datasets used across medical-imaging and
          computer-vision projects.
        </p>
        <address className="mt-4 not-italic">
          <ul className="resume-contact-grid grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {contactLinks.map(({ label, href, text, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`${label}: ${text}`}
                  title={label}
                  className="resume-contact-link border-line text-muted hover:border-accent hover:text-accent flex min-h-11 min-w-0 items-center gap-2.5 rounded-lg border px-3 font-mono text-[10.5px] transition-colors"
                >
                  <span className="resume-contact-icon grid size-4.25 shrink-0 place-items-center">{icon}</span>
                  <span className="resume-contact-copy min-w-0 break-all">{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </address>
      </header>

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="resume-experience mt-8 scroll-mt-24 px-5 sm:px-8"
      >
        <SectionHeading id="experience-heading" icon={BriefcaseBusiness}>
          Experience
        </SectionHeading>
        <div className="flex flex-col gap-4">
          {experience.map((block) => (
            <article key={block.id} className="resume-panel border-line bg-surface rounded-xl border p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-1.5">
                <div>
                  <h3 className="text-[17px] leading-tight font-semibold">{block.company}</h3>
                  <p className="text-muted mt-0.5 text-[12.5px]">{block.location}</p>
                </div>
                <p className="text-faint font-mono text-[10px] font-medium tracking-[0.06em] uppercase">{block.meta}</p>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                {block.roles.map((role) => (
                  <div key={role.title} className="resume-role">
                    <h4 className="text-[13.5px] font-semibold">{role.title}</h4>
                    <ul className="text-muted mt-1.5 flex list-disc flex-col gap-1.5 pl-5 text-[13px] leading-relaxed">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="resume-two-column mt-6 grid gap-5 md:grid-cols-2 px-5 sm:px-8">
        <section aria-labelledby="education-heading" className="resume-panel border-line rounded-xl border p-5">
          <SectionHeading id="education-heading" icon={GraduationCap}>
            Education
          </SectionHeading>
          <div className="flex flex-col gap-4">
            {education.map((entry) => (
              <div key={entry.school}>
                <h3 className="text-[13.5px] font-semibold">{entry.school}</h3>
                <p className="text-muted mt-0.5 text-[12.5px]">{entry.detail}</p>
                <p className="text-ok mt-1 font-mono text-[9.5px] font-medium tracking-[0.04em] uppercase">
                  {entry.note}
                </p>
              </div>
            ))}
          </div>
          <div className="border-line mt-4 border-t pt-3.5">
            <div className="flex items-center gap-2">
              <LanguagesIcon className="text-accent size-4" aria-hidden="true" />
              <h3 className="text-faint font-mono text-[9.5px] font-medium tracking-[0.08em] uppercase">Languages</h3>
            </div>
            <p className="text-muted mt-1.5 text-[12.5px] leading-relaxed">{languages.join(' · ')}</p>
          </div>
        </section>

        <section aria-labelledby="skills-heading" className="resume-panel border-line rounded-xl border p-5">
          <SectionHeading id="skills-heading" icon={Code2}>
            Skills
          </SectionHeading>
          <div className="flex flex-col gap-3.5">
            {skillGroups.map(({ label, items, icon: Icon }) => (
              <div key={label} className="grid grid-cols-[22px_minmax(0,1fr)] gap-2.5">
                <Icon className="text-accent mt-0.5 size-4" aria-hidden="true" />
                <div>
                  <h3 className="text-faint font-mono text-[9.5px] font-medium tracking-[0.08em] uppercase">{label}</h3>
                  <p className="text-muted mt-1 text-[12.5px] leading-relaxed">{items.join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="resume-two-column mt-5 grid gap-5 md:grid-cols-2 px-5 sm:px-8">
        <section aria-labelledby="publications-heading" className="resume-panel border-line rounded-xl border p-5">
          <SectionHeading id="publications-heading" icon={BookOpen}>
            Publications
          </SectionHeading>
          <ol className="flex list-decimal flex-col gap-3 pl-4.5 marker:text-faint">
            {publications.map((publication) => (
              <li key={publication.title} className="pl-1.5">
                <h3 className="text-[12.5px] leading-snug font-medium">
                  <a href={publication.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {publication.title}
                  </a>
                </h3>
                <p className="text-faint mt-1 font-mono text-[9.5px] leading-relaxed uppercase">{publication.venue}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="datasets-heading" className="resume-panel border-line rounded-xl border p-5">
          <SectionHeading id="datasets-heading" icon={Database}>
            Public datasets
          </SectionHeading>
          <ul className="flex flex-col gap-3.5">
            {datasets.map((dataset) => (
              <li key={dataset.title}>
                <h3 className="text-[12.5px] leading-snug font-semibold">
                  <a href={dataset.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {dataset.title}
                  </a>
                </h3>
                <p className="text-faint mt-1 font-mono text-[9.5px] leading-relaxed">{dataset.meta}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        aria-labelledby="leadership-heading"
        className="resume-panel border-line mt-5 rounded-xl border p-5 mx-5 sm:mx-8"
      >
        <SectionHeading id="leadership-heading" icon={Users}>
          Leadership &amp; service
        </SectionHeading>
        <div className="grid gap-3.5 md:grid-cols-2">
          {leadership.map((entry) => (
            <div key={entry.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <h3 className="text-[12.5px] leading-snug font-semibold">{entry.role}</h3>
                <p className="text-faint font-mono text-[9px] uppercase">{entry.period}</p>
              </div>
              <p className="text-muted mt-1 text-[12px] leading-relaxed">{entry.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-faint mt-7 text-center font-mono text-[10px] tracking-[0.06em] uppercase print:hidden">
        Print-ready · Save a clean PDF using the button above
      </p>
    </article>
  );
}
