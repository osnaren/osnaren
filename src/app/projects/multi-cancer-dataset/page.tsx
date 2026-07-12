import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { DatasetExplorer } from '@/components/case-study/DatasetExplorer';
import { Callout, CaseClosing, CaseHero, Chapter, CitationBlock, MetaStrip } from '@/components/case-study/primitives';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi Cancer Dataset — Dataset',
  description:
    'A 130,000-image Kaggle dataset covering 8 cancer types across 26 subclasses, published by Obuli Sai Naren under CC BY-NC-SA 4.0.',
  alternates: { canonical: '/projects/multi-cancer-dataset' },
};

const chapters: CaseChapter[] = [
  { id: 'contains', label: 'What it contains' },
  { id: 'why', label: 'Why it exists' },
  { id: 'structure', label: 'Structure' },
  { id: 'uses', label: 'How it is used' },
  { id: 'responsible', label: 'Responsible use' },
  { id: 'lessons', label: 'Lessons' },
];

const classes = [
  { name: 'Cervical', count: 25000, detail: '5 subclasses' },
  { name: 'Lung & Colon', count: 25000, detail: '5 subclasses' },
  { name: 'Leukemia (ALL)', count: 20000, detail: 'Acute Lymphoblastic Leukemia · 4 subclasses' },
  { name: 'Brain', count: 15000, detail: '3 subclasses' },
  { name: 'Lymphoma', count: 15000, detail: '3 subclasses' },
  { name: 'Breast', count: 10000, detail: '2 subclasses' },
  { name: 'Kidney', count: 10000, detail: '2 subclasses' },
  { name: 'Oral', count: 10000, detail: '2 subclasses' },
];

export default function MultiCancerDatasetPage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-006 — Dataset"
        status="● Public · CC BY-NC-SA 4.0"
        artifactId="006"
        title="Multi Cancer Dataset"
        lede="130,000 uniform images spanning eight cancer types and twenty-six subclasses — assembled so that researchers can stop spending their first week on file plumbing."
        links={[
          {
            label: 'Open on Kaggle',
            href: 'https://www.kaggle.com/datasets/obulisainaren/multi-cancer',
            external: true,
            primary: true,
          },
          { label: 'Dataset DOI', href: 'https://doi.org/10.34740/KAGGLE/DSV/3415848', external: true },
        ]}
      />

      <MetaStrip
        items={[
          { label: 'Images', value: '130,000 · JPEG · 512×512' },
          { label: 'Taxonomy', value: '8 classes · 26 subclasses' },
          { label: 'Licence', value: 'CC BY-NC-SA 4.0' },
          { label: 'Kaggle signal', value: 'Bronze medal · 141 notebooks', tone: 'ok' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-006"
        prev={{ label: 'Prev: OSN-005 Retinal OCT', href: '/projects/retinal-oct-classification' }}
        next={{ label: 'Next: OSN-007 Retinal OCT-C8', href: '/projects/retinal-oct-c8' }}
      >
        <Chapter id="contains" index="01" title="What the dataset is">
          <p>
            A consolidated corpus of cancer imagery: eight main cancer classes, each broken into subclasses, every image
            standardised to 512×512 JPEG with a predictable{' '}
            <code className="bg-surface-2 rounded px-1.5 py-0.5 font-mono text-[13px]">
              &lt;subclass&gt;_&lt;serial&gt;.jpg
            </code>{' '}
            filename. Each subclass folder holds 5,000 images, so the classes are balanced by construction.
          </p>
        </Chapter>

        <Chapter id="why" index="02" title="Why it exists">
          <p>
            The research it supports needed one model to handle many cancers. The imagery for that existed — but
            scattered across half a dozen separate Kaggle and Figshare datasets, each with its own resolution, directory
            convention, and naming scheme. Before any modelling could begin, someone had to normalise them. That
            normalisation turned out to be the more reusable contribution.
          </p>
        </Chapter>

        <Chapter id="structure" index="03" title="Structure, as published" wide>
          <p className="max-w-170">
            Select a class to see its verified share of the corpus. The distribution below uses the counts from the
            Kaggle data card; the tiles are illustrative, not real medical scans.
          </p>
          <DatasetExplorer classes={classes} unit="images" />
          <p className="text-muted max-w-170 text-[14px]">
            Images were augmented with Keras’ <code className="font-mono text-[13px]">ImageDataGenerator</code> — modest
            rotation, shift, shear, zoom, horizontal flip, and brightness variation — then cropped and renamed for
            uniformity.
          </p>
        </Chapter>

        <Chapter id="uses" index="04" title="How people use it">
          <p>
            It is the most-used artifact I have published. As of July 2026, the Kaggle data card shows a bronze dataset
            medal, 163 upvotes, and 141 public notebooks built on it — training everything from VGG16 and MobileNetV3
            baselines to lymphoma-specific classifiers.
          </p>
        </Chapter>

        <Chapter id="responsible" index="05" title="Responsible use">
          <Callout label="Responsible use — medical data">
            This is a research and education dataset, not a clinical instrument. It is a derivative compilation: every
            constituent source is credited on the Kaggle data card, the licence is non-commercial and share-alike, and
            no model trained on it should be used to diagnose a human being. Compiled imagery inherits the biases of its
            sources, and those sources were not sampled to represent any population.
          </Callout>
          <CitationBlock
            citation="Obuli Sai Naren. (2022). Multi Cancer Dataset [Data set]. Kaggle."
            doi="https://doi.org/10.34740/KAGGLE/DSV/3415848"
          />
        </Chapter>

        <CaseClosing
          lessons={[
            'The unglamorous work — renaming, resizing, balancing — is what other researchers actually reuse. The paper got cited; the dataset got built upon.',
            'Provenance is a feature. Linking every source dataset made this trustworthy in a field where mystery corpora are common.',
            'A good README is an API. The dataset scores highly on usability because the structure is documented, not because the images are special.',
          ]}
          links={[
            { label: 'The paper', href: '/projects/multi-cancer-classification' },
            {
              label: 'Open on Kaggle',
              href: 'https://www.kaggle.com/datasets/obulisainaren/multi-cancer',
              external: true,
              primary: true,
            },
          ]}
          prev={{ label: 'Prev: OSN-005 Retinal OCT', href: '/projects/retinal-oct-classification' }}
          next={{ label: 'Next: OSN-007 Retinal OCT-C8', href: '/projects/retinal-oct-c8' }}
        />
      </CaseScaffold>
    </article>
  );
}
