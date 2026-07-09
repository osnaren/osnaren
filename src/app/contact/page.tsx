import { ContactForm } from '@/components/contact/ContactForm';
import { site } from '@/data/site';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Obuli Sai Naren by email, GitHub, LinkedIn, or X. Recruiters, collaborators, and product teams welcome.',
};

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'GitHub', value: 'github.com/osnaren', href: site.links.github },
  { label: 'LinkedIn', value: 'linkedin.com/in/osnaren', href: site.links.linkedin },
  { label: 'Kaggle', value: 'kaggle.com/obulisainaren', href: site.links.kaggle },
  { label: 'X', value: '@osnaren', href: site.links.x },
  { label: 'Instagram', value: '@osnaren', href: site.links.instagram },
];

export default function ContactPage() {
  return (
    <div className="bg-grid">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="label-mono text-accent">/CONTACT — OPEN CHANNEL</p>
          <h1 className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
            Got a problem worth building a tool for?
          </h1>
          <p className="text-muted mt-4 max-w-md text-[15px] leading-relaxed">
            Recruiters: the{' '}
            <a href="/resume" className="text-ink hover:text-accent underline underline-offset-4">
              resume module
            </a>{' '}
            is one tap away. Builders: bring a problem worth turning into a product.
          </p>
          <ul className="mt-8 flex max-w-md flex-col" aria-label="Direct channels">
            {channels.map((channel) => (
              <li key={channel.label} className="border-line border-b last:border-b-0">
                {(() => {
                  const external = !channel.href.startsWith('mailto:');
                  return (
                    <a
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between py-3.5"
                    >
                      <span className="text-faint font-mono text-[10px] font-medium tracking-[0.1em] uppercase">
                        {channel.label}
                      </span>
                      <span className="group-hover:text-accent font-mono text-[13px] transition-colors">
                        {channel.value}
                        {external ? ' ↗' : ''}
                      </span>
                    </a>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>

        <div className="module-card h-fit p-5 sm:p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
