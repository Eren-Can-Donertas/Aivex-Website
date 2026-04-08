import { CheckCircle, FileSearch, AlertTriangle } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: CheckCircle,
    title: 'Measurable',
    description:
      'Every signal is scored with a confidence value and backtested against historical data. No black boxes — every output has a traceable computation path.',
    color: 'text-green-500',
  },
  {
    icon: FileSearch,
    title: 'Auditable',
    description:
      'Structured JSON crash records, per-cycle logs, and immutable audit trails. Run any evaluation again and get the same result — deterministic by design.',
    color: 'text-primary',
  },
  {
    icon: AlertTriangle,
    title: 'Responsible',
    description:
      'The Governor module enforces hard limits, cooldowns, and human override policies. Research outputs are never financial advice — compliance language is built in.',
    color: 'text-accent',
  },
];

export function TrustSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Built on Three Principles</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            AIVEX was designed from the ground up for research integrity and operational safety.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Icon className={`h-7 w-7 ${p.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{p.title}</h3>
                <p className="text-muted-foreground">{p.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Research Disclaimer:</strong> AIVEX is a research and analysis platform.
            All outputs are for informational purposes only and do not constitute financial, investment,
            or trading advice. Past performance of any signal does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
}
