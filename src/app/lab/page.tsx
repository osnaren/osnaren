import { LabBench } from '@/components/lab/LabBench';
import { LabIntro } from '@/components/lab/LabIntro';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'The lab: a live test bench of small studies in motion, interaction, data, and interface behaviour by Obuli Sai Naren.',
};

export default function LabPage() {
  return (
    <div>
      <LabIntro />
      <div className="pt-8">
        <LabBench />
      </div>
    </div>
  );
}
