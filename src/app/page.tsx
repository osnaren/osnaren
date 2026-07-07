import { ProjectWorkbench } from '@/components/site/project-workbench';
import { ScrollReveal } from '@/components/site/scroll-reveal';
import { projects, storyItems } from '@/lib/portfolio-data';
import { ArrowUpRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="site-page">
      <section className="hero">
        <div className="hero-copy">
          <h1>Frontend systems for commerce, tools for everyday life.</h1>
          <p>
            Obuli Sai Naren builds accessible React ecommerce experiences, product interfaces, and small tools that turn
            real annoyances into useful software.
          </p>
          <div className="hero-actions">
            <Link href="/work" className="button button-primary">
              View work
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
            <Link href="/resume" className="button button-secondary">
              Resume
              <FileText aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="metric-strip" aria-label="Current work summary">
            <div>
              <span>Now</span>
              <strong>Victoria&apos;s Secret & Co.</strong>
            </div>
            <div>
              <span>Before</span>
              <strong>Soliton Technologies</strong>
            </div>
            <div>
              <span>Base</span>
              <strong>Salem / Bengaluru</strong>
            </div>
          </div>
        </div>

        <ProjectWorkbench />
      </section>

      <section className="section-tight" aria-labelledby="index-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Project index</p>
            <h2 id="index-heading">Useful things, honestly labeled.</h2>
          </div>
          <Link href="/work" className="text-link">
            Full work archive
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="project-index">
          {projects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="project-row">
              <span className="mini-label">{project.index}</span>
              <div>
                <h3>{project.name}</h3>
                <p>{project.oneLine}</p>
              </div>
              <p>{project.problem}</p>
              <span className={`status-dot status-${project.statusTone}`}>{project.status}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="story-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Story</p>
            <h2 id="story-heading">Not a dump, more like evidence.</h2>
          </div>
          <Link href="/story" className="text-link">
            Open story
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="artifact-grid">
          {storyItems.slice(1, 4).map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={item.title} delay={index * 0.08} className="artifact-card">
                <span className="mini-label">{item.year}</span>
                <Icon aria-hidden="true" size={22} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
