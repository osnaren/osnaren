import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { DatasetExplorer } from '@/components/case-study/DatasetExplorer';
import { Callout, CaseClosing, CaseHero, Chapter, CitationBlock, MetaStrip } from '@/components/case-study/primitives';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retinal OCT-C8 — Dataset',
  description:
    'A 24,000-image Kaggle dataset of retinal OCT scans across 8 retinal conditions with balanced train/validation/test folds, published by Obuli Sai Naren.',
};

const chapters: CaseChapter[] = [
  { id: 'contains', label: 'What it contains' },
  { id: 'why', label: 'Why it exists' },
  { id: 'classes', label: 'The eight classes' },
  { id: 'uses', label: 'How it is used' },
  { id: 'responsible', label: 'Responsible use' },
  { id: 'lessons', label: 'Lessons' },
];

const classes = [
  { name: 'AMD', count: 3000, detail: 'Age-related Macular Degeneration' },
  { name: 'CNV', count: 3000, detail: 'Choroidal Neovascularization' },
  { name: 'CSR', count: 3000, detail: 'Central Serous Retinopathy' },
  { name: 'DME', count: 3000, detail: 'Diabetic Macular Edema' },
  { name: 'DR', count: 3000, detail: 'Diabetic Retinopathy' },
  { name: 'DRUSEN', count: 3000, detail: 'Yellow deposits under the retina' },
  { name: 'MH', count: 3000, detail: 'Macular Hole' },
  { name: 'NORMAL', count: 3000, detail: 'Healthy, no abnormalities' },
];

export default function RetinalOctC8Page() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-007 — Dataset"
        status="● Public · CC BY-NC-SA 4.0"
        artifactId="007"
        title="Retinal OCT Image Classification — C8"
        lede="24,000 retinal OCT scans across eight conditions, split into balanced folds — a benchmark you can trust to be fair before you trust your model to be good."
        links={[
          {
            label: 'Open on Kaggle',
            href: 'https://www.kaggle.com/datasets/obulisainaren/retinal-oct-c8',
            external: true,
            primary: true,
          },
          { label: 'Dataset DOI', href: 'https://doi.org/10.34740/KAGGLE/DSV/2736749', external: true },
        ]}
      />

      <MetaStrip
        items={[
          { label: 'Images', value: '24,000 · JPEG' },
          { label: 'Classes', value: '8 retinal conditions' },
          { label: 'Splits', value: '18,400 / 2,800 / 2,800' },
          { label: 'Licence', value: 'CC BY-NC-SA 4.0' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-007"
        prev={{ label: 'Prev: OSN-006 Multi Cancer Dataset', href: '/projects/multi-cancer-dataset' }}
        next={{ label: 'Next: OSN-008 Forest Fire Dataset', href: '/projects/forest-fire-c4' }}
      >
        <Chapter id="contains" index="01" title="What the dataset is">
          <p>
            Optical coherence tomography scans of the retina, compiled from multiple reputable sources and sorted into
            eight clinical conditions. Every class holds exactly 3,000 images, split 2,300 train / 350 validation / 350
            test — so a model that reports 90% accuracy has genuinely earned it rather than learned the class
            distribution.
          </p>
        </Chapter>

        <Chapter id="why" index="02" title="Why it exists">
          <p>
            The companion research needed a multi-class OCT benchmark, and the widely used public OCT datasets at the
            time were smaller in their class taxonomy. Consolidating eight conditions with equal representation made the
            comparison between architectures meaningful.
          </p>
        </Chapter>

        <Chapter id="classes" index="03" title="The eight classes" wide>
          <p className="max-w-170">
            Perfectly balanced by construction — 3,000 images per class. Select a class to read its condition; the tiles
            are illustrative, never real scans.
          </p>
          <DatasetExplorer classes={classes} unit="images" accentTone="ok" />
          <p className="text-muted max-w-170 text-[14px]">
            Image dimensions are deliberately left non-uniform — resizing is left to the consumer, since the right input
            size depends on the backbone.
          </p>
        </Chapter>

        <Chapter id="uses" index="04" title="How people use it">
          <p>
            Beyond the companion paper, the dataset is indexed in the{' '}
            <a
              href="https://github.com/openmedlab/Awesome-Medical-Dataset/blob/main/resources/Retinal_OCT-C8.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-accent underline underline-offset-4"
            >
              openmedlab Awesome-Medical-Dataset
            </a>{' '}
            collection, and Kaggle hosts 45 public notebooks using it for transfer-learning baselines such as VGG16.
          </p>
        </Chapter>

        <Chapter id="responsible" index="05" title="Responsible use">
          <Callout label="Responsible use — medical data">
            A research and education benchmark, not a diagnostic tool. The images are compiled from existing public
            sources under a non-commercial share-alike licence. A classifier trained here has learned this corpus, not
            ophthalmology — clinical use requires clinical validation, regulatory review, and a doctor.
          </Callout>
          <CitationBlock
            citation="Obuli Sai Naren. (2021). Retinal OCT Image Classification - C8 [Data set]. Kaggle."
            doi="https://doi.org/10.34740/KAGGLE/DSV/2736749"
          />
        </Chapter>

        <CaseClosing
          lessons={[
            'Publishing this as an undergraduate was the first time my work left my hands and kept going without me. That is still the goal.',
            'A benchmark’s value is its fairness, not its size. Equal class counts cost weeks and saved every downstream comparison.',
            'Documentation determines adoption. The README is why people cite it correctly.',
          ]}
          links={[
            { label: 'The paper', href: '/projects/retinal-oct-classification' },
            {
              label: 'Open on Kaggle',
              href: 'https://www.kaggle.com/datasets/obulisainaren/retinal-oct-c8',
              external: true,
              primary: true,
            },
          ]}
          prev={{ label: 'Prev: OSN-006 Multi Cancer Dataset', href: '/projects/multi-cancer-dataset' }}
          next={{ label: 'Next: OSN-008 Forest Fire Dataset', href: '/projects/forest-fire-c4' }}
        />
      </CaseScaffold>
    </article>
  );
}
