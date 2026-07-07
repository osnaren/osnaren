'use client';

import { Download, Mail } from 'lucide-react';

export function ResumeActions() {
  return (
    <div className="resume-actions">
      <button className="button button-primary" type="button" onClick={() => window.print()}>
        Print / save PDF
        <Download aria-hidden="true" size={16} />
      </button>
      <a className="button button-secondary" href="mailto:66naren@gmail.com">
        Email
        <Mail aria-hidden="true" size={16} />
      </a>
    </div>
  );
}
