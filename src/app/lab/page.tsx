import { Suspense } from 'react';

import { LabBench } from '@/components/lab/LabBench';
import { LabIntro } from '@/components/lab/LabIntro';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'The lab: a live test bench of small studies in motion, interaction, data, and interface behaviour by Obuli Sai Naren.',
  alternates: { canonical: '/lab' },
};

export default function LabPage() {
  return (
    <div>
      <LabIntro />
      <div className="pt-8">
        <Suspense
          fallback={
            <div className="mx-auto min-h-96 max-w-6xl px-5 pb-16 sm:px-8" aria-label="Loading interactive lab">
              <div className="border-line bg-surface h-16 animate-pulse rounded-lg border motion-reduce:animate-none" />
            </div>
          }
        >
          <LabBench />
        </Suspense>
      </div>
    </div>
  );
}
