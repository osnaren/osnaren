import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { MethodExplorer } from '@/components/case-study/MethodExplorer';
import {
  Callout,
  CaseClosing,
  CaseHero,
  Chapter,
  ChapterMoment,
  CitationBlock,
  DataTable,
  MetaStrip,
} from '@/components/case-study/primitives';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forest Fire & Smoke Detection — Research',
  description:
    'Peer-reviewed Fire Ecology research on forest fire and smoke detection, later evolved into a public TensorFlow.js classifier demo by Obuli Sai Naren.',
};

const chapters: CaseChapter[] = [
  { id: 'origin', label: 'Origin' },
  { id: 'problem', label: 'Research problem' },
  { id: 'method', label: 'Method' },
  { id: 'results', label: 'Results' },
  { id: 'scope', label: 'Scope' },
  { id: 'lessons', label: 'Lessons' },
];

const stages = [
  {
    label: 'Imagery',
    detail:
      'Forest imagery collected and sorted into four classes — fire, nofire, smoke, and smokefire — the corpus published separately as the Forest Fire C4 dataset.',
  },
  {
    label: 'Transfer learning',
    detail:
      'Pretrained models (VGG16, InceptionV3, Xception) are fine-tuned rather than trained from scratch, which allows training on a smaller dataset and lowers computational complexity without degrading accuracy.',
  },
  {
    label: 'Learning without Forgetting',
    detail:
      'LwF trains the network on the new task while preserving the network’s preexisting abilities, directly targeting catastrophic forgetting.',
  },
  {
    label: 'Two-way evaluation',
    detail:
      'Models are evaluated both with and without LwF, and against a novel, unseen dataset (BowFire), to test whether learning new data destroys old accuracy.',
  },
  {
    label: 'Report',
    detail:
      'Accuracy is reported on the original dataset and the new task, with and without LwF. Of the three architectures, Xception excelled.',
  },
];

export default function ForestFireResearchPage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-003 — Publication"
        status="◆ Peer-reviewed · Open access"
        artifactId="003"
        title="Forest fire and smoke detection using deep learning-based learning without forgetting"
        lede="A sixth-semester college project became a dataset, a Fire Ecology paper, and eventually a public classifier demo. The research question: can a fire-detection model learn new data without forgetting the old data?"
        links={[
          {
            label: 'Read the paper (open access)',
            href: 'https://doi.org/10.1186/s42408-022-00165-0',
            external: true,
            primary: true,
          },
          { label: 'Live classifier', href: 'https://forestfire.osnaren.com/', external: true },
          { label: 'Code', href: 'https://github.com/osnaren/forest-fire', external: true },
        ]}
      />

      <MetaStrip
        items={[
          { label: 'Venue', value: 'Fire Ecology 19(1), Springer' },
          { label: 'Year', value: '2023' },
          { label: 'Role', value: 'Co-author · undergrad research' },
          { label: 'DOI', value: '10.1186/s42408-022-00165-0', tone: 'accent' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-003"
        prev={{ label: 'Prev: OSN-002 TheFlames', href: '/projects/theflames' }}
        next={{ label: 'Next: OSN-004 Multi-Cancer', href: '/projects/multi-cancer-classification' }}
      >
        <Chapter id="origin" index="01" title="Origin">
          <p>
            The first version began in 2020 as a sixth-semester college project: collect forest imagery, train a Python
            model, and see whether computer vision could flag fire, smoke, both, or neither. The public v2 demo is a
            cleaner rewrite of that idea, but this page focuses on the peer-reviewed research layer that came out of it.
          </p>
        </Chapter>

        <Chapter id="problem" index="02" title="The research problem">
          <p>
            Forests are slow to grow and fast to burn, so early detection matters. Deep learning can spot fire and smoke
            in imagery — but a model fine-tuned on a new fire dataset tends to lose its accuracy on the dataset it
            originally learned. That failure mode is called catastrophic forgetting, and it makes detectors brittle
            exactly where you want them robust: on conditions they have seen before but not recently.
          </p>
        </Chapter>

        <Chapter id="method" index="03" title="Method" wide>
          <p className="max-w-170">
            In plain terms: start from models that already know how to see, teach them fire, and stop them from
            forgetting what they learned first. Step through the pipeline below.
          </p>
          <MethodExplorer
            stages={stages}
            note="Illustrative pipeline — see the paper for exact architecture and hyperparameters."
          />
        </Chapter>

        <Chapter id="results" index="04" title="Results, as published" wide>
          <p className="max-w-170">
            These numbers are taken from the paper’s abstract and kept in the same form for traceability.
          </p>
          <ChapterMoment>
            <DataTable
              caption="Xception — accuracy reported in the paper"
              head={['Condition', 'Dataset', 'Accuracy']}
              rows={[
                ['Best model overall', 'Original dataset', '98.72%'],
                ['Without LwF', 'New task (BowFire)', '79.23%'],
                ['With LwF', 'New task (BowFire)', '91.41%'],
                ['With LwF', 'Original dataset', '96.89%'],
              ]}
            />
          </ChapterMoment>
          <p className="text-muted max-w-170 text-[14px]">
            The takeaway: fine-tuning with LwF performed comparably well on the original dataset while still
            successfully categorising novel, unseen data. Of the three architectures tested, Xception excelled.
          </p>
        </Chapter>

        <Chapter id="scope" index="05" title="Scope and authorship">
          <Callout label="Authorship scope">
            I am a co-author on this paper alongside V. E. Sathishkumar, Jaehyuk Cho, and Malliga Subramanian — work
            done as an undergraduate researcher at Kongu Engineering College. The per-author contribution split is not
            publicly documented, so I do not claim any specific portion of it beyond co-authorship.
          </Callout>
          <Callout label="Responsible framing">
            The public demo exists because people believe what they can test — but the site frames itself as a technical
            showcase, not a wildfire monitoring system.
          </Callout>
          <CitationBlock
            citation="Sathishkumar, V.E., Cho, J., Subramanian, M., Naren, O.S. (2023). Forest fire and smoke detection using deep learning-based learning without forgetting. Fire Ecology, 19(1)."
            doi="https://doi.org/10.1186/s42408-022-00165-0"
          />
        </Chapter>

        <CaseClosing
          lessons={[
            'A model that forgets is a liability, not a curiosity — continual learning is an engineering requirement, not an academic footnote.',
            'The dataset is half the paper. Building the four-class corpus forced precision about what “detection” even means.',
            'The public demo matters because people believe what they can test — but honest scope framing matters more.',
            'Writing research taught me to state limitations plainly. That habit followed me into product work.',
          ]}
          links={[
            { label: 'The dataset', href: '/projects/forest-fire-c4' },
            {
              label: 'Read the paper',
              href: 'https://doi.org/10.1186/s42408-022-00165-0',
              external: true,
              primary: true,
            },
          ]}
          prev={{ label: 'Prev: OSN-002 TheFlames', href: '/projects/theflames' }}
          next={{ label: 'Next: OSN-004 Multi-Cancer', href: '/projects/multi-cancer-classification' }}
        />
      </CaseScaffold>
    </article>
  );
}
