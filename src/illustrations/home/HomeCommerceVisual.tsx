/** Work — a schematic product page: gallery, title lines, size chips, CTA. */
export function HomeCommerceVisual() {
  return (
    <svg viewBox="0 0 140 56" className="w-full flex-1" aria-hidden="true">
      <rect x="4" y="6" width="44" height="44" rx="4" fill="var(--well)" />
      <path d="M12 40 L24 26 L32 34 L40 22" stroke="var(--faint)" strokeWidth="1.5" fill="none" />
      <rect x="56" y="8" width="70" height="6" rx="3" fill="var(--well)" />
      <rect x="56" y="18" width="46" height="5" rx="2.5" fill="var(--well)" />
      <rect x="56" y="28" width="10" height="8" rx="2" fill="var(--well)" />
      <rect x="69" y="28" width="10" height="8" rx="2" fill="var(--ok)" opacity="0.85" />
      <rect x="82" y="28" width="10" height="8" rx="2" fill="var(--well)" />
      <rect x="56" y="42" width="52" height="9" rx="3" fill="var(--accent)" />
    </svg>
  );
}
