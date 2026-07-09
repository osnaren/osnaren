import type { Metadata } from 'next';

import {
  Callout,
  CaseBody,
  CaseFooterNav,
  CaseHero,
  CaseSection,
  CitationBlock,
  MetaStrip,
  RuledList,
} from '@/components/case-study/primitives';

export const metadata: Metadata = {
  title: 'Retinal OCT Classification — Research',
  description:
    'IEEE ICCCI 2022 conference paper on classifying retinal OCT images with deep learning. Co-authored by Obuli Sai Naren.',
};

export default function RetinalOctResearchPage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-005 — Publication"
        status="◆ Peer-reviewed · IEEE ICCCI"
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

      <CaseBody>
        <CaseSection index="01" title="The research problem">
          <p>
            Retinal disorders have become a serious public health concern, and they are unusually cruel: they progress
            quietly, without obvious signs, until vision is already lost. Optical coherence tomography produces
            cross-sectional scans of the retina that reveal those changes early — but reading them at population scale
            requires more ophthalmologists than exist.
          </p>
        </CaseSection>

        <CaseSection index="02" title="Method">
          <p>
            The paper applies deep learning to multi-class classification of retinal OCT images, distinguishing healthy
            retinas from a set of distinct retinal conditions. It was presented at the 2022 International Conference on
            Computer Communication and Informatics (ICCCI).
          </p>
          <p className="text-muted">
            The companion artifact is the{' '}
            <a href="/projects/retinal-oct-c8" className="text-ink hover:text-accent underline underline-offset-4">
              Retinal OCT-C8 dataset
            </a>{' '}
            — 24,000 images across 8 conditions with balanced train/validation/test folds, which I published on Kaggle
            and which is now indexed in the openmedlab Awesome-Medical-Dataset collection.
          </p>
        </CaseSection>

        <CaseSection index="03" title="Results scope">
          <Callout label="Public source">
            The DOI above resolves to the authoritative IEEE Xplore record. Because the full accuracy tables are not
            fully exposed in the public landing-page text, this case study avoids restating result numbers outside the
            paper.
          </Callout>
        </CaseSection>

        <CaseSection index="04" title="What it taught me">
          <RuledList
            items={[
              'This was the first artifact of mine that other people built on. Watching strangers train models on the OCT-C8 dataset taught me that infrastructure outlives results.',
              'Balanced folds are a kindness to whoever comes next. Most of the effort was not modelling — it was making the data trustworthy.',
              'Eight classes of retinal disease is a taxonomy, and taxonomies are interface design. Naming things well is the same skill in a hospital and in a component library.',
            ]}
          />
        </CaseSection>

        <Callout label="Authorship scope">
          Co-authored with Malliga Subramanian, Kogilavani Shanmugavadivel, K. Premkumar, and K. Rankish, from
          undergraduate research at Kongu Engineering College. The per-author contribution split is not publicly
          documented.
        </Callout>

        <CitationBlock
          citation="Subramanian, M., Shanmugavadivel, K., Naren, O. S., Premkumar, K., & Rankish, K. (2022). Classification of Retinal OCT Images Using Deep Learning. 2022 International Conference on Computer Communication and Informatics (ICCCI)."
          doi="https://doi.org/10.1109/ICCCI54379.2022.9740985"
        />

        <CaseFooterNav
          prev={{ label: 'Prev: OSN-004 Multi-Cancer', href: '/projects/multi-cancer-classification' }}
          next={{ label: 'Next: OSN-006 Multi Cancer Dataset', href: '/projects/multi-cancer-dataset' }}
        />
      </CaseBody>
    </article>
  );
}
