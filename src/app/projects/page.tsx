import { ArtifactIndex } from '@/components/projects/ArtifactIndex';
import { ProjectsIntro } from '@/components/projects/ProjectsIntro';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artifacts',
  description:
    'The artifact scanner: products, research papers, public datasets, professional work, and experiments by Obuli Sai Naren — honestly labelled and open for inspection.',
};

export default function ProjectsPage() {
  return (
    <div>
      <ProjectsIntro />
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <ArtifactIndex />
      </div>
    </div>
  );
}
