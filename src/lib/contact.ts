import { site } from '@/data/site';

export interface ContactDraft {
  name: string;
  email: string;
  reason: string;
  message: string;
}

/** Pragmatic email check — good enough to gate a mailto draft, not RFC-perfect. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** The composed subject line. */
export function buildSubject(draft: ContactDraft): string {
  const name = draft.name.trim() || 'a visitor';
  return `Portfolio contact — ${draft.reason} — ${name}`;
}

/** A readable, plain-text email body. Uses CRLF so mail clients render line breaks. */
export function buildBody(draft: ContactDraft): string {
  const name = draft.name.trim() || 'a visitor';
  const lines = [
    'Hi Naren,',
    '',
    `My name is ${name}.`,
    `Reason for reaching out: ${draft.reason}`,
    '',
    draft.message.trim(),
    '',
    `You can reply to me at ${draft.email.trim()}.`,
  ];
  return lines.join('\r\n');
}

/** A correctly-encoded mailto: URL for the visitor's own mail client. */
export function buildMailto(draft: ContactDraft): string {
  const subject = encodeURIComponent(buildSubject(draft));
  const body = encodeURIComponent(buildBody(draft));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/** Plain-text version for the copy-message fallback. */
export function buildPlainText(draft: ContactDraft): string {
  return `To: ${site.email}\r\nSubject: ${buildSubject(draft)}\r\n\r\n${buildBody(draft)}`;
}
