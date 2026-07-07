'use client';

import { RotateCcw, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="terminal-panel success-panel">
        <p className="terminal-line">message staged</p>
        <h2>Thanks. I will read this with actual attention.</h2>
        <p>
          The live backend can be wired later. For now, the safest direct route is
          <a href="mailto:66naren@gmail.com"> 66naren@gmail.com</a>.
        </p>
        <button className="button button-secondary" type="button" onClick={() => setSent(false)}>
          <RotateCcw aria-hidden="true" size={16} />
          Reset
        </button>
      </div>
    );
  }

  return (
    <form
      className="terminal-panel contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <p className="terminal-line">contact channel</p>
      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>
      <button className="button button-primary" type="submit">
        Transmit
        <Send aria-hidden="true" size={16} />
      </button>
    </form>
  );
}
