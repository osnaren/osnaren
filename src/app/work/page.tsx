import { ProjectCard } from '@/components/site/project-card';
import { projects } from '@/lib/portfolio-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected product engineering and personal lab projects by Obuli Sai Naren.',
};

export default function WorkPage() {
  return (
    <main className="site-page">
      <section className="page-title">
        <h1>Work that earns its status label.</h1>
        <p>
          ShadySide is public and shipped. InboxCtrl is an active build. TreeGenius is a prototype. The portfolio should
          make those boundaries obvious instead of flattening everything into the same shiny card.
        </p>
      </section>

      <section className="section-tight project-grid" aria-label="Selected projects">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} />
        ))}
      </section>
    </main>
  );
}
