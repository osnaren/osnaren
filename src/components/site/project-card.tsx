import { ProjectVisual } from '@/components/site/project-visual';
import { ScrollReveal } from '@/components/site/scroll-reveal';
import type { Project } from '@/lib/portfolio-data';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <ScrollReveal className="project-card">
      <ProjectVisual slug={project.slug} priority={priority} />
      <div className="project-card-content">
        <div className="project-meta-row">
          <span>{project.index}</span>
          <span className={`status-dot status-${project.statusTone}`}>{project.status}</span>
        </div>
        <h2>{project.name}</h2>
        <p>{project.summary}</p>
        <div className="tag-row" aria-label={`${project.name} stack`}>
          {project.stack.slice(0, 5).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-actions">
          <Link href={`/work/${project.slug}`} className="button button-primary">
            Case study
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
          {project.links
            .filter((link) => link.href.startsWith('http'))
            .slice(0, 1)
            .map((link) => (
              <a key={link.href} href={link.href} className="button button-secondary" target="_blank" rel="noreferrer">
                {link.label}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
