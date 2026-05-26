import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'AIVEX evaluation-first approach to AI signal research — confidence scoring, governor gating, and data quality principles.',
};

export default function MethodologyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge variant="accent" className="mb-4">
            Research Framework
          </Badge>
          <h1 className="mb-4 text-4xl font-bold">Methodology</h1>
          <p className="text-lg text-muted-foreground">
            How AIVEX approaches signal generation, evaluation, and governance — from raw data to
            auditable research output.
          </p>
        </div>

        {/* 1. Evaluation-First Design */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              01
            </span>
            <h2 className="text-2xl font-semibold">Evaluation-First Design</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              AIVEX was built with evaluation as the primary concern, not prediction. Every signal
              module is required to produce a confidence score alongside its output, and every
              composition step must be reproducible from the same inputs.
            </p>
            <p>
              This means we prioritize falsifiability: a signal that cannot be evaluated against a
              ground truth is not a signal — it is speculation. Our backtesting harness validates
              that module outputs remain well-calibrated over time.
            </p>
          </div>
        </section>

        {/* 2. Signal Lifecycle */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              02
            </span>
            <h2 className="text-2xl font-semibold">Signal Lifecycle</h2>
          </div>
          <div className="mt-4 overflow-x-auto">
            <div className="flex min-w-max items-center gap-2 rounded-xl border border-border bg-muted/20 px-6 py-5 font-mono text-sm">
              {[
                'Data Ingest',
                'Atomic Signal',
                'Confidence Score',
                'Composition',
                'Governor Gate',
                'Emission',
              ].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-card px-3 py-1.5 text-foreground/80">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-muted-foreground/50">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Every step in the lifecycle is logged. The trace_id on each output links it back to the
            exact pipeline run, input data, and governance decision.
          </p>
        </section>

        {/* 3. Confidence Scoring */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              03
            </span>
            <h2 className="text-2xl font-semibold">Confidence Scoring</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Each atomic signal module produces a scalar confidence value in [0, 1]. Confidence is
            derived from multiple factors:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left font-semibold">Factor</th>
                  <th className="px-5 py-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Source reliability',        'Historical accuracy score of the data source'],
                  ['Cross-module agreement',    'Degree of consensus across independent signal modules'],
                  ['Recency / freshness',        'Age of underlying data relative to configured threshold'],
                  ['Historical calibration error','Divergence of past module outputs from ground truth'],
                  ['Governance status',          'Whether the Governor flagged or modified this output'],
                ].map(([factor, desc]) => (
                  <tr key={factor} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-medium">{factor}</td>
                    <td className="px-5 py-3 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Signals below a configurable minimum confidence threshold (default: 0.35) are filtered
            before reaching the composition layer, preventing low-quality inputs from polluting the
            composite signal.
          </p>
        </section>

        {/* 4. Cooldown Logic */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              04
            </span>
            <h2 className="text-2xl font-semibold">Cooldown Logic</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              To prevent signal churn, each module enforces a per-symbol cooldown period after
              emitting a signal. During cooldown, new signals for the same symbol are suppressed
              unless their confidence exceeds the previous signal by a configurable margin (default:
              0.15).
            </p>
            <p>
              Cooldown periods are adaptive: higher-volatility periods automatically shorten cooldown
              windows to allow faster signal updates.
            </p>
          </div>
        </section>

        {/* 5. Governor Gating */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              05
            </span>
            <h2 className="text-2xl font-semibold">Governor Gating</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            The Governor is the final checkpoint before any signal reaches the API. It applies:
          </p>
          <div className="mt-4 space-y-2">
            {[
              {
                label: 'Hard limits',
                body: 'Symbol-level exposure caps and sector concentration limits.',
              },
              {
                label: 'Kill switch',
                body: 'Global disable flag controllable via environment variable — takes effect immediately.',
              },
              {
                label: 'Human override',
                body: 'Manually blocked symbols are excluded for a configurable window.',
              },
              {
                label: 'Audit logging',
                body: 'Every gating decision — allow or deny — is logged with full context and timestamp.',
              },
            ].map(({ label, body }) => (
              <div key={label} className="flex gap-3 rounded-lg border border-border p-4">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <span className="font-semibold">{label}: </span>
                  <span className="text-sm text-muted-foreground">{body}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Data Quality */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              06
            </span>
            <h2 className="text-2xl font-semibold">Data Quality Principles</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            AIVEX enforces strict data quality checks at ingestion:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              'All timestamps normalized to UTC with microsecond precision',
              'Price data validated against exchange-reported OHLCV bounds',
              'News sources scored for historical reliability and deduplicated by content hash',
              'Stale data (age exceeding configurable threshold) is quarantined, not silently used',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Research Boundaries */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              07
            </span>
            <h2 className="text-2xl font-semibold">Research Boundaries</h2>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-muted/20 p-6">
            <p className="text-sm text-muted-foreground">
              <strong>Important:</strong> All outputs generated by AIVEX are for research and
              informational purposes only. They do not constitute financial, investment, trading, or
              any other form of professional advice. Past signal performance does not guarantee future
              results. AIVEX Analytics is not a registered investment advisor, broker-dealer, or
              commodity trading advisor. Users are responsible for their own investment decisions.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Signal outputs may contain errors, omissions, or outdated information. AIVEX Analytics
              makes no representations or warranties regarding the accuracy, completeness, or
              timeliness of any research output.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
