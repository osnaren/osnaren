import { Download } from 'lucide-react';

const resumePath = '/assets/obuli-sai-naren-resume-2026.pdf';

export function ResumeDownloadButton() {
  return (
    <a
      href={resumePath}
      download="Obuli Sai Naren - Resume 2026.pdf"
      className="bg-ink text-paper hover:bg-accent print-hidden inline-flex min-h-11 items-center gap-2 rounded-md px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.06em] uppercase transition-colors"
    >
      <Download className="size-4" aria-hidden="true" />
      Download PDF
    </a>
  );
}
