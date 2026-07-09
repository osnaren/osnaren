'use client';

import { useState } from 'react';

import { site } from '@/data/site';

/** The form composes a mailto draft in the visitor's own mail app. */
export function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`[osnaren.com] Message from ${name || 'a visitor'}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" aria-label="Contact form">
      <div className="text-faint flex items-center justify-between font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase">
        <span>Transmission form</span>
        <span className="text-ok">● Channel open</span>
      </div>
      <div>
        <label
          htmlFor="contact-name"
          className="text-faint mb-1.5 block font-mono text-[10px] tracking-[0.08em] uppercase"
        >
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-line-strong bg-surface focus:border-accent w-full rounded-lg border px-3.5 py-2.5 font-mono text-[13px] outline-none"
          placeholder="Ada Lovelace"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="text-faint mb-1.5 block font-mono text-[10px] tracking-[0.08em] uppercase"
        >
          What should I know?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-line-strong bg-surface focus:border-accent w-full resize-y rounded-lg border px-3.5 py-2.5 font-mono text-[13px] outline-none"
          placeholder="Role, project, collaboration idea, or context…"
        />
      </div>
      <button
        type="submit"
        className="bg-accent hover:bg-accent-press rounded-lg px-5 py-3 font-mono text-[12px] font-medium tracking-[0.06em] text-white uppercase shadow-[0_2px_0_var(--accent-press)] transition-colors"
      >
        Compose email →
      </button>
      <p className="text-faint text-[11px] leading-relaxed">
        This opens a draft in your own mail app addressed to {site.email} — nothing is sent from this page, and nothing
        is stored.
      </p>
    </form>
  );
}
