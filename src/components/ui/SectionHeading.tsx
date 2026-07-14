interface SectionHeadingProps {
  idx: string;
  title: string;
  subtitle?: string;
}

/** Instrument-style section rule: mono index · bold title · hairline fill */
export function SectionHeading({ idx, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs font-bold text-primary">{idx}</span>
        <h2 className="text-lg font-bold tracking-[0.02em] md:text-xl">{title}</h2>
        <span className="flex-1 border-b border-border" aria-hidden="true" />
      </div>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
