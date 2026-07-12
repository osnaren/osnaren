import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { DatasetExplorer } from '@/components/case-study/DatasetExplorer';
import { CaseClosing, CaseHero, Chapter, DataTable, MetaStrip } from '@/components/case-study/primitives';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forest Fire Image Classification Dataset — Dataset',
  description:
    'The 4,823-image Forest Fire C4 dataset behind Obuli Sai Naren’s Fire Ecology paper and public TensorFlow.js classifier demo.',
  alternates: { canonical: '/projects/forest-fire-c4' },
};

const chapters: CaseChapter[] = [
  { id: 'contains', label: 'What it contains' },
  { id: 'why', label: 'Why it exists' },
  { id: 'structure', label: 'Structure' },
  { id: 'uses', label: 'How it is used' },
  { id: 'demo', label: 'The v2 demo' },
  { id: 'lessons', label: 'Lessons' },
];

const classes = [
  { name: 'fire', count: 1200, detail: 'Visible flame' },
  { name: 'nofire', count: 1200, detail: 'No fire or smoke' },
  { name: 'smoke', count: 1200, detail: 'Smoke without visible flame' },
  { name: 'smokefire', count: 1200, detail: 'Flame and smoke together' },
];

export default function ForestFireC4Page() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-008 — Dataset"
        status="● Public · CC BY-NC-SA 4.0"
        artifactId="008"
        title="Forest Fire Image Classification Dataset"
        lede="The dataset that turned a sixth-semester prototype into research and, later, a public classifier demo: fire, no fire, smoke, and fire+smoke."
        links={[
          {
            label: 'Open on Kaggle',
            href: 'https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4',
            external: true,
            primary: true,
          },
          { label: 'Try the classifier', href: 'https://forestfire.osnaren.com/tool', external: true },
        ]}
      />

      <MetaStrip
        items={[
          { label: 'Images', value: '4,823 · JPEG · 250×250' },
          { label: 'Classes', value: 'fire · nofire · smoke · smokefire' },
          { label: 'Splits', value: '3,200 / 800 / 800 (+23 tester)' },
          { label: 'Licence', value: 'CC BY-NC-SA 4.0' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-008"
        prev={{ label: 'Prev: OSN-007 Retinal OCT-C8', href: '/projects/retinal-oct-c8' }}
        next={{ label: 'Next: OSN-009 Commerce Frontend', href: '/projects/commerce-frontend' }}
      >
        <Chapter id="contains" index="01" title="What the dataset is">
          <p>
            Forest imagery sorted into four conditions and standardised to 250×250 pixels, balanced across
            train/validation/test subsets. A separate <em>Forest Fire Tester</em> folder holds 23 additional images for
            eyeballing a trained model by hand — the sanity check before you trust a confusion matrix.
          </p>
        </Chapter>

        <Chapter id="why" index="02" title="Why it exists">
          <p>
            Most fire datasets are binary: fire, or not fire. The original college-project question was more specific:
            could a simple image classifier tell fire, smoke, fire+smoke, and no-fire scenes apart? Smoke may appear
            before flame. Flame without visible smoke is different from smoke without visible flame. Collapsing them
            into one label throws away the distinction the model is supposed to learn.
          </p>
        </Chapter>

        <Chapter id="structure" index="03" title="Structure, as published" wide>
          <p className="max-w-170">
            Perfectly balanced by design — 1,200 images per class across the splits. The tiles are illustrative, not
            real samples.
          </p>
          <DatasetExplorer classes={classes} unit="images" />
          <DataTable
            caption="Verified split — Kaggle data card"
            head={['Subset', 'fire', 'nofire', 'smoke', 'smokefire', 'Total']}
            rows={[
              ['train', 800, 800, 800, 800, '3,200'],
              ['val', 200, 200, 200, 200, '800'],
              ['test', 200, 200, 200, 200, '800'],
            ]}
          />
        </Chapter>

        <Chapter id="uses" index="04" title="How people use it">
          <p>
            It underpins the{' '}
            <a
              href="/projects/forest-fire-detection"
              className="text-ink hover:text-accent underline underline-offset-4"
            >
              Fire Ecology paper
            </a>{' '}
            and its Learning-without-Forgetting experiments, and it feeds public Kaggle notebooks training MobileNet and
            similar baselines for environmental monitoring. A small live demo of the trained classifier is published at{' '}
            <a
              href="https://forestfire.osnaren.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-accent underline underline-offset-4"
            >
              forestfire.osnaren.com
            </a>
            .
          </p>
        </Chapter>

        <Chapter id="demo" index="05" title="The v2 demo">
          <p>
            The current Forest Fire Classifier v2 is a Next.js and TensorFlow.js rewrite of the old project. It runs
            server-side inference, treats uploaded images as in-memory inputs, and rate-limits the API so the demo stays
            usable. The site is explicit about its scope: this is a serious technical showcase, not a replacement for
            real wildfire monitoring systems.
          </p>
        </Chapter>

        <CaseClosing
          lessons={[
            'Choosing the label taxonomy is the real modelling decision. Everything downstream inherits it.',
            'Four balanced classes at 250×250 beat forty thousand messy images. Constraints made the corpus usable.',
            'Shipping a live demo alongside the dataset changed who engaged with it — people believe what they can click.',
          ]}
          links={[
            { label: 'The paper', href: '/projects/forest-fire-detection' },
            {
              label: 'Open on Kaggle',
              href: 'https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4',
              external: true,
              primary: true,
            },
          ]}
          prev={{ label: 'Prev: OSN-007 Retinal OCT-C8', href: '/projects/retinal-oct-c8' }}
          next={{ label: 'Next: OSN-009 Commerce Frontend', href: '/projects/commerce-frontend' }}
        />
      </CaseScaffold>
    </article>
  );
}
