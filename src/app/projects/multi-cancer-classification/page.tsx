import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { MethodExplorer } from '@/components/case-study/MethodExplorer';
import { Callout, CaseClosing, CaseHero, Chapter, CitationBlock, MetaStrip } from '@/components/case-study/primitives';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi-Cancer Classification — Research',
  description:
    'IEEE Access journal article classifying eight cancer types from CT/MRI images using Bayesian-optimised CNNs and Learning without Forgetting. Co-authored by Obuli Sai Naren.',
  alternates: { canonical: '/projects/multi-cancer-classification' },
};

const chapters: CaseChapter[] = [
  { id: 'problem', label: 'Research problem' },
  { id: 'method', label: 'Method' },
  { id: 'results', label: 'Results scope' },
  { id: 'scope', label: 'Scope' },
  { id: 'lessons', label: 'Lessons' },
];

const stages = [
  {
    label: 'CT/MRI imagery',
    detail:
      'Images carrying cancer traits across eight kinds of cancer — including lung, brain, breast, and cervical — drawn from the companion Multi Cancer Dataset.',
  },
  {
    label: 'Pretrained backbones',
    detail:
      'MobileNet, VGGNet, and DenseNet variants transfer ImageNet representations to medical imagery, sidestepping the need for a from-scratch corpus.',
  },
  {
    label: 'Bayesian optimisation',
    detail:
      'Hyperparameters are searched with Bayesian optimisation rather than hand-tuned, making the comparison between architectures fairer.',
  },
  {
    label: 'Learning without Forgetting',
    detail:
      'The network trains on new task data while regularisation preserves its responses on previously learned tasks.',
  },
  {
    label: 'Two-way evaluation',
    detail:
      'Models are measured both on the freshly learned dataset and on the datasets they had already been trained on.',
  },
];

export default function MultiCancerResearchPage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-004 — Publication"
        status="◆ Peer-reviewed · IEEE Access"
        artifactId="004"
        title="Multiple Types of Cancer Classification Using CT/MRI Images Based on Learning Without Forgetting Powered Deep Learning Models"
        lede="Cancer is one of the world’s leading causes of death. AI-assisted screening can help evaluate more cases in less time — if the model can hold onto everything it has learned."
        links={[
          {
            label: 'Read the paper',
            href: 'https://doi.org/10.1109/ACCESS.2023.3240443',
            external: true,
            primary: true,
          },
          { label: 'The dataset', href: '/projects/multi-cancer-dataset' },
        ]}
      />

      <MetaStrip
        items={[
          { label: 'Venue', value: 'IEEE Access, vol. 11' },
          { label: 'Pages / Year', value: '10336–10354 · 2023' },
          { label: 'Role', value: 'Co-author · undergrad research' },
          { label: 'DOI', value: '10.1109/ACCESS.2023.3240443', tone: 'accent' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-004"
        prev={{ label: 'Prev: OSN-003 Forest Fire', href: '/projects/forest-fire-detection' }}
        next={{ label: 'Next: OSN-005 Retinal OCT', href: '/projects/retinal-oct-classification' }}
      >
        <Chapter id="problem" index="01" title="The research problem">
          <p>
            Early detection significantly improves survival, and AI-assisted screening could evaluate far more cases
            than human review alone. But a single model that handles eight different cancers faces the same trap as the
            fire work: transfer learning onto a new cancer dataset can destroy the model’s ability to classify the
            datasets it was originally trained on.
          </p>
        </Chapter>

        <Chapter id="method" index="02" title="Method" wide>
          <p className="max-w-170">
            In plain terms: one model screens images for eight different cancers, tuned automatically rather than by
            hand — without losing old skills as it learns new ones.
          </p>
          <MethodExplorer
            stages={stages}
            note="Illustrative pipeline — the paper reports the exact architectures and search space."
          />
        </Chapter>

        <Chapter id="results" index="03" title="Results, as published">
          <p className="text-muted">
            The paper reports that the proposed transfer-learning models are more accurate than the then
            state-of-the-art techniques, and that LwF classifies both new datasets and previously trained datasets
            better than the alternatives. The article spans 19 pages in IEEE Access volume 11 and contributes to UN
            Sustainable Development Goal 3 (Good Health and Well-being).
          </p>
          <Callout label="Results scope">
            The abstract reports relative improvements rather than one headline accuracy figure. The detailed per-model
            accuracy tables live in the paper itself; the DOI above is the authoritative source, and this page does not
            restate numbers it cannot verify from the public record.
          </Callout>
        </Chapter>

        <Chapter id="scope" index="04" title="Scope and authorship">
          <Callout label="Authorship scope">
            Co-authored with Malliga Subramanian, Jaehyuk Cho (corresponding author, Jeonbuk National University), and
            Veerappampalayam Easwaramoorthy Sathishkumar, from undergraduate research at Kongu Engineering College. The
            per-author contribution split is not publicly documented, so this page attributes only co-authorship and the
            related dataset work.
          </Callout>
          <Callout label="Responsible use — medical ML">
            A classifier like this is a screening aid, never a diagnosis. Medical machine learning has a duty of
            humility, and no model here is validated for clinical use.
          </Callout>
          <CitationBlock
            citation="Subramanian, M., Cho, J., Sathishkumar, V. E., & Naren, O. S. (2023). Multiple Types of Cancer Classification Using CT/MRI Images Based on Learning Without Forgetting Powered Deep Learning Models. IEEE Access, 11, 10336–10354."
            doi="https://doi.org/10.1109/ACCESS.2023.3240443"
          />
        </Chapter>

        <CaseClosing
          lessons={[
            'Publishing the dataset alongside the paper multiplied its reach far beyond what the paper alone achieved — the Kaggle corpus has since seeded well over a hundred community notebooks.',
            'Bayesian optimisation over hand-tuning is the same instinct as A/B testing over opinion: let the search tell you, not the loudest engineer.',
            'Medical machine learning has a duty of humility. A classifier is a screening aid, never a diagnosis.',
          ]}
          links={[
            { label: 'The dataset', href: '/projects/multi-cancer-dataset' },
            {
              label: 'Read the paper',
              href: 'https://doi.org/10.1109/ACCESS.2023.3240443',
              external: true,
              primary: true,
            },
          ]}
          prev={{ label: 'Prev: OSN-003 Forest Fire', href: '/projects/forest-fire-detection' }}
          next={{ label: 'Next: OSN-005 Retinal OCT', href: '/projects/retinal-oct-classification' }}
        />
      </CaseScaffold>
    </article>
  );
}
