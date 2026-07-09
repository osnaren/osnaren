'use client';

/**
 * Honest PDF story: the page itself is print-styled, so "Save as PDF" in the
 * print dialog produces the document. No fake download of a file that
 * doesn't exist.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="bg-ink text-paper hover:bg-accent print-hidden rounded-md px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.06em] uppercase transition-colors"
    >
      Print / Save as PDF ↓
    </button>
  );
}
