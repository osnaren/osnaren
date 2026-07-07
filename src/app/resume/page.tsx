import { ResumeActions } from '@/components/site/resume-actions';
import { publications, resumeSections, skills } from '@/lib/portfolio-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Obuli Sai Naren, frontend web developer and React product engineer.',
};

export default function ResumePage() {
  return (
    <main className="site-page">
      <section className="resume-header">
        <p className="eyebrow">Resume</p>
        <h1>Obuli Sai Naren</h1>
        <p className="section-lede">
          Frontend web developer focused on React ecommerce, accessibility, experimentation, performance, and useful
          product interfaces.
        </p>
        <ResumeActions />
      </section>

      <section className="resume-shell section-tight">
        <div className="resume-main">
          {resumeSections.map((section) => (
            <article key={`${section.title}-${section.role}`} className="resume-block">
              <p className="mini-label">
                {section.period} / {section.location}
              </p>
              <h2>{section.title}</h2>
              <h3>{section.role}</h3>
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="resume-side">
          <section className="resume-block">
            <p className="mini-label">Core stack</p>
            <div className="tag-row">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>
          <section className="resume-block">
            <p className="mini-label">Education</p>
            <h2>Kongu Engineering College</h2>
            <p className="mt-2 leading-7 text-[var(--muted)]">B.E. Computer Science, August 2018 - June 2022.</p>
          </section>
          <section className="resume-block">
            <p className="mini-label">Awards</p>
            <ul>
              <li>First Rank in B.E. - CSE</li>
              <li>Best Student in Academic Activities</li>
            </ul>
          </section>
          <section className="resume-block">
            <p className="mini-label">Publications</p>
            <ul>
              {publications.map((publication) => (
                <li key={publication}>{publication}</li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}
