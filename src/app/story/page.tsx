import { StoryIntro } from '@/components/story/StoryIntro';
import { Timeline } from '@/components/story/Timeline';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Story',
  description:
    'A field log of the work, research, experiments, and small decisions that shaped how Obuli Sai Naren builds — from school in Salem and first rank at Kongu, through published research, ecommerce at scale, and the products in between.',
};

export default function StoryPage() {
  return (
    <div>
      <StoryIntro />
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <Timeline />
      </div>
    </div>
  );
}
