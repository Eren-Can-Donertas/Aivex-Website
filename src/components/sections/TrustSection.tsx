const PRINCIPLES = [
  {
    number: '01',
    title: 'Measurable',
    description:
      'Every signal is scored with a confidence value and evaluated against historical data. No black boxes — every output has a traceable computation path with deterministic, reproducible results.',
  },
  {
    number: '02',
    title: 'Auditable',
    description:
      'Structured JSON records, per-cycle logs, and immutable audit trails. Every output carries a trace_id linking it to its exact pipeline run, source signals, and governance decision.',
  },
  {
    number: '03',
    title: 'Responsible',
    description:
      'The Governor module enforces hard limits, cooldowns, and human override policies. Research outputs are never financial advice — compliance language is built into the emission layer.',
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-border py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">

          {/* Left — heading block */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Research Standards
            </p>
            <h2 className="mb-4 text-3xl font-bold">Built on Three Principles</h2>
            <p className="text-sm text-muted-foreground">
              AIVEX was designed from the ground up for research integrity and operational safety.
            </p>
          </div>

          {/* Right — principles list */}
          <div className="space-y-8">
            {PRINCIPLES.map((p) => (
              <div
                key={p.number}
                className="grid grid-cols-[3rem_1fr] gap-4 rounded-xl border border-border bg-card p-6"
              >
                {/* Number */}
                <div className="font-mono text-sm font-bold text-primary/40">{p.number}</div>
                {/* Content */}
                <div>
                  <h3 className="mb-2 text-base font-semibold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </div>
            ))}

            {/* Research disclaimer */}
            <div className="rounded-xl border border-border bg-muted/20 px-6 py-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground/60">Research Disclaimer:</strong>{' '}
                AIVEX is a research and analysis platform. All outputs are for informational
                purposes only and do not constitute financial, investment, or trading advice.
                Past performance of any signal does not guarantee future results.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
