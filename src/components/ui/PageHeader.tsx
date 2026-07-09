export function PageHeader({
  route,
  title,
  lede,
  children,
}: {
  route: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-line border-b">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="label-mono text-accent">{route}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h1 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">{title}</h1>
          {children}
        </div>
        {lede && <p className="text-muted mt-3 max-w-xl text-[15px] leading-relaxed">{lede}</p>}
      </div>
    </div>
  );
}
