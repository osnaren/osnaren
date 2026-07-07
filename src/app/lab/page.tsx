import { ScrollReveal } from '@/components/site/scroll-reveal';
import { labModules } from '@/lib/portfolio-data';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Experimental interface modules and in-progress product ideas by Obuli Sai Naren.',
};

export default function LabPage() {
  return (
    <main className="site-page">
      <section className="page-title">
        <h1>Lab work stays allowed to be weird.</h1>
        <p>
          This is where useful experiments can be visible before they become polished case studies: product ideas,
          motion studies, interface prototypes, and the small tools that start as personal irritation.
        </p>
      </section>

      <section className="section-tight artifact-grid" aria-label="Lab modules">
        {labModules.map((module, index) => {
          const Icon = module.icon;

          return (
            <ScrollReveal key={module.id} delay={index * 0.06} className="lab-card">
              <span className="mini-label">{module.type}</span>
              <Icon aria-hidden="true" size={24} />
              <h2>{module.name}</h2>
              <p>{module.body}</p>
            </ScrollReveal>
          );
        })}
      </section>

      <section className="section">
        <div className="terminal-panel">
          <p className="terminal-line">next module</p>
          <h2 className="text-2xl font-bold">InboxCtrl and TreeGenius can become build-log pages.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
            The strongest portfolio version will show active product thinking through short build notes: what changed,
            what got verified, what is still deliberately unfinished, and what the next useful milestone is.
          </p>
          <Link href="/work" className="text-link mt-5">
            See current projects
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
