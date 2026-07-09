import type { Metadata } from 'next';

import {
  Callout,
  CaseBody,
  CaseFooterNav,
  CaseHero,
  CaseSection,
  CitationBlock,
  DecisionGrid,
  MetaStrip,
  RuledList,
} from '@/components/case-study/primitives';

export const metadata: Metadata = {
  title: 'Multi-Cancer Classification — Research',
  description:
    'IEEE Access journal article classifying eight cancer types from CT/MRI images using Bayesian-optimised CNNs and Learning without Forgetting. Co-authored by Obuli Sai Naren.',
};

export default function MultiCancerResearchPage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-004 — Publication"
        status="◆ Peer-reviewed · IEEE Access"
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

      <CaseBody>
        <CaseSection index="01" title="The research problem">
          <p>
            Early detection significantly improves survival, and AI-assisted screening could evaluate far more cases
            than human review alone. But a single model that handles eight different cancers faces the same trap as the
            fire work: transfer learning onto a new cancer dataset can destroy the model&rsquo;s ability to classify the
            datasets it was originally trained on.
          </p>
        </CaseSection>

        <CaseSection index="02" title="Method">
          <p className="text-muted">
            In plain terms: one model screens images for eight different cancers, tuned automatically rather than by
            hand — without losing old skills as it learns new ones.
          </p>
          <p>
            The paper evaluates convolutional neural networks against images carrying cancer traits across eight kinds
            of cancer — including lung, brain, breast, and cervical. Pretrained CNN variants transfer what they learned
            from ImageNet to detect cancer cells, and Learning without Forgetting trains the network on new task data
            while keeping the network&rsquo;s original abilities.
          </p>
          <DecisionGrid
            items={[
              {
                title: 'Pretrained backbones',
                copy: 'MobileNet, VGGNet, and DenseNet variants transfer ImageNet representations to medical imagery, sidestepping the need for a from-scratch corpus.',
              },
              {
                title: 'Bayesian optimisation',
                copy: 'Hyperparameters are searched with Bayesian optimisation rather than hand-tuned, making the comparison between architectures fairer.',
              },
              {
                title: 'Learning without Forgetting',
                copy: 'The network trains on new task data only, while regularisation preserves its responses on previously learned tasks.',
              },
              {
                title: 'Two-way evaluation',
                copy: 'Models are measured both on the freshly learned dataset and on the datasets they had already been trained on.',
              },
            ]}
          />
        </CaseSection>

        <CaseSection index="03" title="Results, as published">
          <p>
            The paper reports that the transfer-learning models proposed are more accurate than the then
            state-of-the-art techniques, and that LwF classifies both new datasets and previously trained datasets
            better than the alternatives. The article spans 19 pages in IEEE Access volume 11 and contributes to UN
            Sustainable Development Goal 3 (Good Health and Well-being).
          </p>
          <Callout label="Results scope">
            The abstract reports relative improvements rather than one headline accuracy figure. The detailed per-model
            accuracy tables live in the paper itself; the DOI above is the authoritative source.
          </Callout>
        </CaseSection>

        <CaseSection index="04" title="What it taught me">
          <RuledList
            items={[
              'Publishing the dataset alongside the paper multiplied its reach far beyond what the paper alone achieved — the Kaggle corpus has since seeded well over a hundred community notebooks.',
              'Bayesian optimisation over hand-tuning is the same instinct as A/B testing over opinion: let the search tell you, not the loudest engineer.',
              'Medical machine learning has a duty of humility. A classifier is a screening aid, never a diagnosis.',
            ]}
          />
        </CaseSection>

        <Callout label="Authorship scope">
          Co-authored with Malliga Subramanian, Jaehyuk Cho (corresponding author, Jeonbuk National University), and
          Veerappampalayam Easwaramoorthy Sathishkumar, from undergraduate research at Kongu Engineering College. The
          per-author contribution split is not publicly documented, so this page attributes only co-authorship and the
          related dataset work.
        </Callout>

        <CitationBlock
          citation="Subramanian, M., Cho, J., Sathishkumar, V. E., & Naren, O. S. (2023). Multiple Types of Cancer Classification Using CT/MRI Images Based on Learning Without Forgetting Powered Deep Learning Models. IEEE Access, 11, 10336–10354."
          doi="https://doi.org/10.1109/ACCESS.2023.3240443"
        />

        <CaseFooterNav
          prev={{ label: 'Prev: OSN-003 Forest Fire', href: '/projects/forest-fire-detection' }}
          next={{ label: 'Next: OSN-005 Retinal OCT', href: '/projects/retinal-oct-classification' }}
        />
      </CaseBody>
    </article>
  );
}
