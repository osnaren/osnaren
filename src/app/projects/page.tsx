import { ArtifactIndex } from '@/components/projects/ArtifactIndex';
import { PageHeader } from '@/components/ui/PageHeader';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artifacts',
  description:
    'The artifact index: products, research papers, public datasets, professional work, and experiments by Obuli Sai Naren.',
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        route="/PROJECTS — THE ARTIFACT INDEX"
        title="Everything on the bench, indexed."
        lede="Products, papers, public datasets, professional work, and experiments, with clear status labels and source links where the work is public."
      />
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <ArtifactIndex />
      </div>
    </div>
  );
}
