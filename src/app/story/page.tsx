import { ScrollReveal } from '@/components/site/scroll-reveal';
import { publications, storyItems } from '@/lib/portfolio-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Story',
  description: 'Education, work history, publications, and personal lab context for Obuli Sai Naren.',
};

export default function StoryPage() {
  return (
    <main className="site-page">
      <section className="page-title">
        <h1>A timeline of work, study, and useful side quests.</h1>
        <p>
          The personal parts work best as artifacts: dates, places, work, photos when they matter, and small captions
          with proof. That keeps the page warm without turning it into a diary.
        </p>
      </section>

      <section className="section-tight story-timeline" aria-label="Personal timeline">
        {storyItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <ScrollReveal key={item.title} delay={index * 0.05} className="story-item">
              <p className="mini-label">{item.year}</p>
              <div className="story-pin">
                <Icon aria-hidden="true" size={19} />
              </div>
              <div className="story-copy">
                <p className="mini-label">{item.label}</p>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      <section className="section" aria-labelledby="publication-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Academic notes</p>
            <h2 id="publication-heading">Published research threads.</h2>
          </div>
        </div>
        <div className="artifact-grid">
          {publications.map((publication, index) => (
            <ScrollReveal key={publication} delay={index * 0.06} className="artifact-card">
              <span className="mini-label">Publication</span>
              <h3>{publication}</h3>
              <p>
                Part of the academic thread behind the portfolio: applied deep learning, classification, and model
                behavior under practical constraints.
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
