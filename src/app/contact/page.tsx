import { ContactForm } from '@/components/site/contact-form';
import { ExternalLink, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Obuli Sai Naren for frontend roles, product work, and collaborations.',
};

export default function ContactPage() {
  return (
    <main className="site-page">
      <section className="page-title">
        <h1>Open to useful, interesting work.</h1>
        <p>
          Roles, product builds, collaboration, frontend systems, UX-heavy interfaces, or a sharp everyday problem that
          deserves better software.
        </p>
      </section>

      <section className="section-tight contact-layout">
        <div className="resume-main">
          <article className="proof-card">
            <p className="mini-label">Best fit</p>
            <h3>Frontend product engineering</h3>
            <p>
              React, TypeScript, ecommerce, experimentation, accessibility, performance, product detail experiences, and
              polished interfaces that still ship.
            </p>
          </article>
          <article className="proof-card">
            <p className="mini-label">Links</p>
            <div className="tag-row mt-4">
              <a href="mailto:66naren@gmail.com">
                <Mail aria-hidden="true" size={15} /> Email
              </a>
              <a href="https://www.linkedin.com/in/osnaren/" target="_blank" rel="noreferrer">
                <ExternalLink aria-hidden="true" size={15} /> LinkedIn
              </a>
              <a href="https://github.com/osnaren" target="_blank" rel="noreferrer">
                <ExternalLink aria-hidden="true" size={15} /> GitHub
              </a>
            </div>
          </article>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}
