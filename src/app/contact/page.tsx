import { SignalComposer } from '@/components/contact/SignalComposer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Open a direct channel to Obuli Sai Naren — frontend roles, product engineering, useful web tools, and research collaboration. Email, GitHub, LinkedIn, Kaggle, and X.',
};

export default function ContactPage() {
  return (
    <div className="bg-grid relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(80%_100%_at_50%_-20%,color-mix(in_srgb,var(--ok)_7%,transparent),transparent_70%)]"
      />
      {/* opening — compact, keeps the composer in the first viewport */}
      <section className="relative mx-auto max-w-6xl px-5 pt-12 pb-8 sm:px-8 sm:pt-16">
        <p className="label-mono text-accent">/CONTACT — OPEN CHANNEL</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-[42px] sm:leading-[1.08]">
          Bring me a problem worth solving.
        </h1>
        <p className="text-muted mt-4 max-w-xl text-[15px] leading-relaxed sm:text-[16px]">
          Frontend roles, product engineering, thoughtful collaborations, or a useful idea that deserves to exist. Tell
          me what you are building, fixing, or trying to understand.
        </p>
      </section>

      <SignalComposer />
    </div>
  );
}
