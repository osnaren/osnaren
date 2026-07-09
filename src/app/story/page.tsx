import type { Metadata } from 'next';

import { Timeline } from '@/components/story/Timeline';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Story',
  description:
    'Field notes: the curated milestones of Obuli Sai Naren — school in Salem, first rank at Kongu, published research, ecommerce at scale, and the products built in between.',
};

export default function StoryPage() {
  return (
    <div>
      <PageHeader
        route="/STORY — FIELD NOTES"
        title="One artifact. One caption. One lesson."
        lede="A curated path through school, research, professional work, and shipped products, with one artifact attached to each milestone."
      />
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <Timeline />
      </div>
    </div>
  );
}
