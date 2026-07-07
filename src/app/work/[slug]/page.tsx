import { ProjectVisual } from '@/components/site/project-visual';
import { projects, type ProjectSlug } from '@/lib/portfolio-data';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
  params: Promise<{
    slug: ProjectSlug;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: 'Project',
    };
  }

  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="site-page">
      <section className="case-study-title">
        <p className="eyebrow">{project.index}</p>
        <h1>{project.name}</h1>
        <p>{project.summary}</p>
        <div className="hero-actions">
          <span className={`status-dot status-${project.statusTone}`}>{project.status}</span>
          {project.links
            .filter((link) => link.href.startsWith('http'))
            .map((link) => (
              <a key={link.href} href={link.href} className="text-link" target="_blank" rel="noreferrer">
                {link.label}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            ))}
        </div>
      </section>

      <section className="section-tight case-study-grid">
        <ProjectVisual slug={project.slug} priority />
        <div className="resume-main">
          <div className="proof-card">
            <p className="mini-label">Role</p>
            <h3>{project.role}</h3>
            <p>{project.timeline}</p>
          </div>
          <div className="proof-card">
            <p className="mini-label">Stack</p>
            <div className="tag-row">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="proof-card">
            <p className="mini-label">Proof</p>
            <ul className="proof-list">
              {project.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section proof-grid" aria-label={`${project.name} notes`}>
        {project.caseStudy.map((section) => (
          <article key={section.heading} className="proof-card">
            <p className="mini-label">{section.heading}</p>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="section-tight">
        <Link href="/work" className="button button-secondary">
          Back to work
        </Link>
      </section>
    </main>
  );
}
