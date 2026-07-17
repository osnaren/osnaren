import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import { MethodExplorer } from '@/components/case-study/MethodExplorer';
import { Callout, CaseClosing, CaseHero, Chapter, CitationBlock, MetaStrip } from '@/components/case-study/primitives';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retinal OCT Classification — Research',
  description:
    'IEEE ICCCI 2022 conference paper on classifying retinal OCT images with deep learning. Co-authored by Obuli Sai Naren.',
  alternates: { canonical: '/projects/retinal-oct-classification' },
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
    label: 'OCT scans',
    detail:
      'Optical coherence tomography produces cross-sectional scans of the retina that reveal disease changes earlier than symptoms appear.',
  },
  {
    label: 'Eight-class taxonomy',
    detail:
      'The task distinguishes healthy retinas from seven distinct retinal conditions — eight classes in total, published as the companion Retinal OCT-C8 dataset.',
  },
  {
    label: 'Deep learning',
    detail:
      'A deep-learning model performs multi-class classification across the eight conditions, presented at IEEE ICCCI 2022.',
  },
  {
    label: 'Balanced evaluation',
    detail:
      'Balanced train/validation/test folds make the comparison fair — a model reporting high accuracy has earned it, not learned the class distribution.',
  },
];

export default function RetinalOctResearchPage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-005 — Publication"
        status="◆ Peer-reviewed · IEEE ICCCI"
        artifactId="005"
        title="Classification of Retinal OCT Images Using Deep Learning"
        lede="Retinal disorders develop slowly and without obvious signs. By the time symptoms arrive, damage is done. Optical coherence tomography sees earlier — if something is watching the scans."
        links={[
          {
            label: 'Read the paper',
            href: 'https://doi.org/10.1109/ICCCI54379.2022.9740985',
            external: true,
            primary: true,
          },
          { label: 'The dataset', href: '/projects/retinal-oct-c8' },
        ]}
      />

      <MetaStrip
        items={[
          { label: 'Venue', value: 'IEEE ICCCI 2022' },
          { label: 'Year', value: '2022' },
          { label: 'Role', value: 'Co-author · undergrad research' },
          { label: 'DOI', value: '10.1109/ICCCI54379.2022.9740985', tone: 'accent' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-005"
        prev={{ label: 'Prev: OSN-004 Multi-Cancer', href: '/projects/multi-cancer-classification' }}
        next={{ label: 'Next: OSN-006 Multi Cancer Dataset', href: '/projects/multi-cancer-dataset' }}
      >
        <Chapter id="problem" index="01" title="The research problem">
          <p>
            Retinal disorders have become a serious public health concern, and they are unusually cruel: they progress
            quietly, without obvious signs, until vision is already lost. Optical coherence tomography produces
            cross-sectional scans of the retina that reveal those changes early — but reading them at population scale
            requires more ophthalmologists than exist.
          </p>
        </Chapter>

        <Chapter id="method" index="02" title="Method" wide>
          <p className="max-w-170">
            The paper applies deep learning to multi-class classification of retinal OCT images, distinguishing healthy
            retinas from a set of distinct retinal conditions. It was presented at the 2022 International Conference on
            Computer Communication and Informatics.
          </p>
          <MethodExplorer
            stages={stages}
            note="Illustrative pipeline — the DOI resolves to the authoritative IEEE Xplore record."
          />
          <p className="text-muted max-w-170">
            The companion artifact is the{' '}
            <a href="/projects/retinal-oct-c8" className="text-ink hover:text-accent underline underline-offset-4">
              Retinal OCT-C8 dataset
            </a>{' '}
            — 24,000 images across 8 conditions with balanced folds, now indexed in the openmedlab
            Awesome-Medical-Dataset collection.
          </p>
        </Chapter>

        <Chapter id="results" index="03" title="Results scope">
          <Callout label="Public source">
            The DOI above resolves to the authoritative IEEE Xplore record. Because the full accuracy tables are not
            fully exposed in the public landing-page text, this case study avoids restating result numbers outside the
            paper.
          </Callout>
        </Chapter>

        <Chapter id="scope" index="04" title="Scope and authorship">
          <Callout label="Authorship scope">
            Co-authored with Malliga Subramanian, Kogilavani Shanmugavadivel, K. Premkumar, and K. Rankish, from
            undergraduate research at Kongu Engineering College. The per-author contribution split is not publicly
            documented.
          </Callout>
          <Callout label="Responsible use — medical data">
            This is academic research, not a diagnostic tool. A classifier trained on this data has learned a corpus,
            not ophthalmology; clinical use requires clinical validation and a doctor.
          </Callout>
          <CitationBlock
            citation="Subramanian, M., Shanmugavadivel, K., Naren, O. S., Premkumar, K., & Rankish, K. (2022). Classification of Retinal OCT Images Using Deep Learning. 2022 International Conference on Computer Communication and Informatics (ICCCI)."
            doi="https://doi.org/10.1109/ICCCI54379.2022.9740985"
          />
        </Chapter>

        <CaseClosing
          lessons={[
            'This was the first artifact of mine that other people built on. Watching strangers train models on the OCT-C8 dataset taught me that infrastructure outlives results.',
            'Balanced folds are a kindness to whoever comes next. Most of the effort was not modelling — it was making the data trustworthy.',
            'Eight classes of retinal disease is a taxonomy, and taxonomies are interface design. Naming things well is the same skill in a hospital and in a component library.',
          ]}
          links={[
            { label: 'The dataset', href: '/projects/retinal-oct-c8' },
            {
              label: 'Read the paper',
              href: 'https://doi.org/10.1109/ICCCI54379.2022.9740985',
              external: true,
              primary: true,
            },
          ]}
          prev={{ label: 'Prev: OSN-004 Multi-Cancer', href: '/projects/multi-cancer-classification' }}
          next={{ label: 'Next: OSN-006 Multi Cancer Dataset', href: '/projects/multi-cancer-dataset' }}
        />
      </CaseScaffold>
    </article>
  );
}
