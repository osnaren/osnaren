import { CaseScaffold, type CaseChapter } from '@/components/case-study/CaseScaffold';
import {
  CaseClosing,
  CaseHero,
  Chapter,
  DecisionGrid,
  MetaStrip,
  ProcessStrip,
  PullQuote,
  RuledList,
} from '@/components/case-study/primitives';
import { VertlasVisual } from '@/illustrations/projects';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertlas — Case Study',
  description:
    'How a Reddit question about tracking vertical short dramas became Vertlas: search by any title, actor, or half-remembered plot, then track, rate, and discover what to watch next.',
  alternates: { canonical: '/projects/vertlas' },
};

const LAUNCH_POST =
  'https://www.reddit.com/r/CShortHaven/comments/1x40y8m/i_asked_how_you_all_track_short_dramas_i_finally/';
const UPDATE_POST =
  'https://www.reddit.com/r/CShortHaven/comments/1xclz4z/vertlas_update_better_recommendations_reviews/';
const QUESTION_POST =
  'https://www.reddit.com/r/CShortHaven/comments/1vw1mdn/how_does_everyone_keep_track_of_the_short_dramas/';

const chapters: CaseChapter[] = [
  { id: 'premise', label: 'Premise' },
  { id: 'problem', label: 'Problem' },
  { id: 'insight', label: 'Insight' },
  { id: 'loop', label: 'The loop' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'system', label: 'Under the hood' },
  { id: 'reception', label: 'Reception' },
  { id: 'lessons', label: 'Lessons' },
];

const loop = [
  {
    label: 'Find it',
    caption:
      'By any title, alias, original or romanised name, actor, character, or a plot described in your own words.',
  },
  {
    label: 'Understand it',
    caption: 'Official, verified places to watch, every version of the same story, and endings hidden until you ask.',
  },
  {
    label: 'Track and rate it',
    caption: 'Want to Watch, Watching, Watched, Dropped. Score it Overall, then Spice and Sweetness out of five.',
  },
  {
    label: 'Find the next one',
    caption: 'Recommendations, a “pick for me”, shareable lists, and a release radar for the actors you follow.',
  },
];

const decisions = [
  {
    title: 'A drama is not a listing',
    copy: 'The creative work and each platform’s localized release are separate records, so one drama can carry every title it was sold under.',
  },
  {
    title: 'Search knows every name',
    copy: 'Exact, alias, multilingual, fuzzy, and plot search coexist. Typing the title you saw, in whatever language, leads to the same page.',
  },
  {
    title: 'Spoilers only on request',
    copy: 'You can filter Discover by ending without seeing one. On a drama page the ending stays hidden until you press Reveal.',
  },
  {
    title: 'Faces stay on your phone',
    copy: 'Screenshot identification reads the face on the device and compares only 128 numbers. A match is a lead to check, not a claim.',
  },
  {
    title: 'Official links, marked plainly',
    copy: 'Where-to-watch lists official releases and labels re-uploads as unofficial. Vertlas is a companion, not a pirate index.',
  },
  {
    title: 'No comment section in V1',
    copy: 'Reviews and ratings, yes; threads, no. Vertlas links out to the communities that already discuss these dramas instead of moderating a new one.',
  },
];

export default function VertlasPage() {
  return (
    <article>
      <CaseHero
        eyebrow="OSN-018 — Product case study"
        status="● Live · Public beta"
        artifactId="018"
        title="Vertlas"
        lede="A discovery, tracking, and metadata companion for vertical short dramas. It finds a drama by whatever name you saw it under, keeps track of what you watched and how it felt, and suggests what to watch next."
        links={[
          { label: 'Open the live app', href: 'https://vertlas.com', external: true, primary: true },
          { label: 'Feature tour', href: 'https://vertlas.com/features', external: true },
        ]}
        aside={
          <figure className="module-card overflow-hidden">
            <div className="bg-surface-2 aspect-30/11 p-4">
              <VertlasVisual />
            </div>
            <figcaption className="label-mono text-faint border-line bg-surface border-t px-4 py-2.5">
              FIG 0.1 — Many titles, one canonical drama
            </figcaption>
          </figure>
        }
      />

      <MetaStrip
        items={[
          { label: 'Role', value: 'Product + full-stack build, solo' },
          { label: 'Stack', value: 'Next.js · Hono · Postgres' },
          { label: 'Status', value: 'Live · public beta', tone: 'ok' },
          { label: 'Surface', value: 'Web app · public API · admin' },
        ]}
      />

      <CaseScaffold
        chapters={chapters}
        artifactId="OSN-018"
        next={{ label: 'Next: OSN-001 ShadySide', href: '/projects/shadyside' }}
      >
        <Chapter id="premise" index="01" title="Premise">
          <p>
            Vertical short dramas are hour-long stories told in one- or two-minute 9:16 episodes, released across a
            crowd of apps, channels, and countries. Vertlas is the place to find one, understand it, track it, rate it,
            and discover the next. It is live at vertlas.com in public beta, starting with Chinese short dramas, where
            the problem is sharpest.
          </p>
        </Chapter>

        <Chapter id="problem" index="02" title="The problem">
          <p>
            The same drama is retitled for every app, country, and language. Many never get a page on mainstream drama
            databases. So fans build their own systems, and those systems break.
          </p>
          <p className="text-muted">
            Before writing any code I asked on Reddit{' '}
            <a
              href={QUESTION_POST}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink decoration-accent underline underline-offset-4"
            >
              how everyone keeps track of the short dramas they watch
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            . The answers were a catalogue of workarounds: folders of poster screenshots, colour-coded spreadsheets,
            Google Docs with English title, Chinese title, leads, and a review, Notes-app logs, Discord as a review
            diary, YouTube playlists, and screenshots of Chinese apps run through Google Translate. One person had 400+
            watched dramas with no database page at all, tracked only through saved posters.
          </p>
          <RuledList
            items={[
              'Screenshots and poster folders: the drama has no stable identity.',
              'Actor-by-actor searches on Chinese apps: filmographies are hard to see.',
              'Spreadsheets and Docs: tracking lives in five tools at once.',
              'Texting yourself links: uploads vanish, so where to watch is unstable.',
            ]}
          />
        </Chapter>

        <Chapter id="insight" index="03" title="The insight">
          <PullQuote cite="The core realisation behind Vertlas">
            The missing piece was not another watchlist. It was a clean catalog where every name a drama goes by points
            to the same drama.
          </PullQuote>
          <p className="text-muted">
            One reply put it plainly: they would use something like this mostly for discovery, not tracking. So search
            and discovery became the front door, and the catalog underneath them, with aliases, sources, and
            relationships, became the part that is hard to copy.
          </p>
        </Chapter>

        <Chapter id="loop" index="04" title="The loop" wide>
          <p className="max-w-170">
            Everything in the product serves one loop. Most of the catalog works without an account; signing in adds the
            personal half.
          </p>
          <ProcessStrip steps={loop} />
        </Chapter>

        <Chapter id="decisions" index="05" title="Product decisions" wide>
          <p className="max-w-170">
            A catalog like this earns trust or loses it in a handful of decisions about data, privacy, and restraint.
          </p>
          <DecisionGrid items={decisions} />
        </Chapter>

        <Chapter id="system" index="06" title="Under the hood">
          <p className="text-muted">
            Vertlas is a TypeScript monorepo of four apps and a set of shared packages, designed for a catalog of a
            million records rather than patched toward one later.
          </p>
          <RuledList
            items={[
              <>
                <strong className="text-ink">Web:</strong> Next.js 16 with Server Components, served from Cloudflare
                Workers. Public catalog pages cache hard; your library and ratings stay fresh and private.
              </>,
              <>
                <strong className="text-ink">API:</strong> a public, versioned REST API on Hono with a generated OpenAPI
                spec, so the web app and admin use the same contract anyone else would.
              </>,
              <>
                <strong className="text-ink">Data:</strong> Neon PostgreSQL through Drizzle. Search runs on{' '}
                <code>pg_trgm</code> and <code>pgvector</code> behind a provider abstraction, so a dedicated search
                engine can be swapped in only if measurements call for it.
              </>,
              <>
                <strong className="text-ink">Ingestion:</strong> scheduled source workers with provenance on every fact,
                entity resolution for duplicates, and an AI-assisted review step a maintainer approves in the admin app.
              </>,
            ]}
          />
        </Chapter>

        <Chapter id="reception" index="07" title="Reception, honestly">
          <p className="text-muted">
            Vertlas launched back to the same community that described the problem, in{' '}
            <a
              href={LAUNCH_POST}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink decoration-accent underline underline-offset-4"
            >
              a launch post that answered my original question
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            . Their feedback set the next release:{' '}
            <a
              href={UPDATE_POST}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink decoration-accent underline underline-offset-4"
            >
              the first update
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{' '}
            brought better recommendations and reviews. It is still a beta, and the roadmap is still being written in
            those threads.
          </p>
        </Chapter>

        <CaseClosing
          lessons={[
            'Ask the community before building. The replies were the spec.',
            'For a catalog product, the data model is the product. The UI is the easy part to copy.',
            'Privacy is a design input: faces on the device, endings behind a button, notes only you can read.',
            'Saying no to comments in V1 kept the scope on finding and tracking dramas.',
          ]}
          links={[
            { label: 'Open the live app', href: 'https://vertlas.com', external: true, primary: true },
            { label: 'Launch post', href: LAUNCH_POST, external: true },
            { label: 'Update post', href: UPDATE_POST, external: true },
          ]}
          next={{ label: 'Next: OSN-001 ShadySide', href: '/projects/shadyside' }}
        />
      </CaseScaffold>
    </article>
  );
}
