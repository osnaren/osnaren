import type { Metadata } from 'next';

import {
  Callout,
  CaseBody,
  CaseFooterNav,
  CaseHero,
  CaseSection,
  CitationBlock,
  DataTable,
  MetaStrip,
  RuledList,
} from '@/components/case-study/primitives';

export const metadata: Metadata = {
  title: 'Retinal OCT-C8 — Dataset',
  description:
    'A 24,000-image Kaggle dataset of retinal OCT scans across 8 retinal conditions with balanced train/validation/test folds, published by Obuli Sai Naren.',
};

export default function RetinalOctC8Page() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-007 — Dataset"
        status="● Public · CC BY-NC-SA 4.0"
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
          { label: 'The paper', href: '/projects/retinal-oct-classification' },
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

      <CaseBody>
        <CaseSection index="01" title="What the dataset is">
          <p>
            Optical coherence tomography scans of the retina, compiled from multiple reputable sources and sorted into
            eight clinical conditions. Every class holds exactly 3,000 images, split 2,300 train / 350 validation / 350
            test — so a model that reports 90% accuracy has genuinely earned it rather than learned the class
            distribution.
          </p>
        </CaseSection>

        <CaseSection index="02" title="Why it exists">
          <p>
            The companion research needed a multi-class OCT benchmark, and the widely used public OCT datasets at the
            time were smaller in their class taxonomy. Consolidating eight conditions with equal representation made the
            comparison between architectures meaningful.
          </p>
        </CaseSection>

        <CaseSection index="03" title="The eight classes">
          <DataTable
            caption="Verified class breakdown — Kaggle data card"
            head={['Class', 'Condition', 'Total images']}
            rows={[
              ['AMD', 'Age-related Macular Degeneration', '3,000'],
              ['CNV', 'Choroidal Neovascularization', '3,000'],
              ['CSR', 'Central Serous Retinopathy', '3,000'],
              ['DME', 'Diabetic Macular Edema', '3,000'],
              ['DR', 'Diabetic Retinopathy', '3,000'],
              ['DRUSEN', 'Yellow deposits under the retina', '3,000'],
              ['MH', 'Macular Hole', '3,000'],
              ['NORMAL', 'Healthy, no abnormalities', '3,000'],
            ]}
          />
          <p className="text-muted text-[14px]">
            Image dimensions are deliberately left non-uniform — resizing is left to the consumer, since the right input
            size depends on the backbone.
          </p>
        </CaseSection>

        <CaseSection index="04" title="How people use it">
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
        </CaseSection>

        <Callout label="Responsible use — medical data">
          A research and education benchmark, not a diagnostic tool. The images are compiled from existing public
          sources under a non-commercial share-alike licence. A classifier trained here has learned this corpus, not
          ophthalmology — clinical use requires clinical validation, regulatory review, and a doctor.
        </Callout>

        <CaseSection index="05" title="What I learned">
          <RuledList
            items={[
              'Publishing this as an undergraduate was the first time my work left my hands and kept going without me. That is still the goal.',
              'A benchmark’s value is its fairness, not its size. Equal class counts cost weeks and saved every downstream comparison.',
              'Documentation determines adoption. The README is why people cite it correctly.',
            ]}
          />
        </CaseSection>

        <CitationBlock
          citation="Obuli Sai Naren. (2021). Retinal OCT Image Classification - C8 [Data set]. Kaggle."
          doi="https://doi.org/10.34740/KAGGLE/DSV/2736749"
        />

        <CaseFooterNav
          prev={{ label: 'Prev: OSN-006 Multi Cancer Dataset', href: '/projects/multi-cancer-dataset' }}
          next={{ label: 'Next: OSN-008 Forest Fire Dataset', href: '/projects/forest-fire-c4' }}
        />
      </CaseBody>
    </article>
  );
}
