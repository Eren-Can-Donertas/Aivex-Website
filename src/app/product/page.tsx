import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Zap, Lock, BarChart2, Globe, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Product',
  description: 'How AIVEX works — modular AI signal research from ingestion to governed output.',
};

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Ingest',
    description: 'Parallel data pipelines pull news, OHLCV data, and fundamental metrics from verified sources on configurable schedules.',
  },
  {
    step: '02',
    title: 'Analyze',
    description: 'Each atomic signal module applies domain-specific models — NLP for news, technical indicators for charts, ratio analysis for metrics.',
  },
  {
    step: '03',
    title: 'Compose',
    description: 'The Signal Engine merges outputs with confidence weighting. Conflicting signals are resolved using priority rules and cooldown logic.',
  },
  {
    step: '04',
    title: 'Govern & Emit',
    description: 'The Governor applies risk thresholds and kill switches. Approved signals are exposed via the Eye REST API with structured JSON.',
  },
];

const DIFFERENTIATORS = [
  { icon: Zap, title: 'Sub-second latency', description: 'In-process signal composition without message queues for the critical path.' },
  { icon: Lock, title: 'Audit trails', description: 'Every signal includes a traceable computation path. Full JSON crash records for every exception.' },
  { icon: BarChart2, title: 'Confidence scoring', description: 'Every output includes a 0–1 confidence value computed from source quality and agreement.' },
  { icon: Globe, title: 'Multi-source consensus', description: 'Signals require agreement across independent sources before reaching the composition layer.' },
  { icon: Clock, title: '24/7 supervision', description: 'Watchdog process with exponential-backoff restart, crash-loop detection, and heartbeat monitoring.' },
  { icon: CheckCircle, title: 'Research compliance', description: 'Built-in disclaimer enforcement. All outputs are research artifacts, never trading recommendations.' },
];

const ROADMAP = [
  { phase: 'Now', items: ['News, Chart, Metrics modules', 'Signal Engine composition', 'Governor gating', 'Eye REST API', 'Watchdog 24/7 runtime'] },
  { phase: 'Next', items: ['Alternative data module (social, satellite)', 'Vector store memory for signal context', 'Real-time WebSocket stream API', 'Multi-symbol portfolio views'] },
  { phase: 'Later', items: ['LLM-based signal narrative generation', 'Backtesting harness v2', 'Custom signal module SDK', 'Institutional data feed connectors'] },
];

export default function ProductPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero */}
        <div className="mb-16 text-center">
          <Badge variant="accent" className="mb-4">Platform Overview</Badge>
          <h1 className="mb-4 text-4xl font-bold">What AIVEX Does</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            AIVEX is an end-to-end AI research platform that transforms raw market data into
            governed, auditable signal outputs — without the black box.
          </p>
        </div>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="relative rounded-xl border border-border p-6">
                <div className="mb-3 text-4xl font-black text-primary/20">{step.step}</div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">Key Differentiators</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d) => {
              const Icon = d.icon;
              return (
                <Card key={d.title}>
                  <CardHeader>
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">{d.title}</CardTitle>
                    <CardDescription>{d.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Example Output */}
        <section className="mb-20">
          <h2 className="mb-3 text-center text-2xl font-semibold">Example Output</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Real signal record from the Eye REST API (<code>/eye/signals</code>).
            Fields map directly to the <code>final_signals</code> database schema.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border bg-muted/30">
            <pre className="p-6 text-xs leading-relaxed text-foreground/90">
              <code>{`{
  "signal_id":    "sig_4a7f2b3c9d1e",
  "symbol":       "AAPL",
  "direction":    "BUY",
  "confidence":   0.74,
  "strength":     "moderate",
  "sources":      ["news", "chart"],
  "reasons": [
    "Positive sentiment across 3 recent articles (urgency: 0.81)",
    "RSI divergence with price above 20-day moving average"
  ],
  "atomic_count": 2,
  "has_conflict": false,
  "trace_id":     "tr_9e1a4b7f2c3d8e0a",
  "created_at":   "2026-03-30T09:14:22.384Z"
}`}</code>
            </pre>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            <code>trace_id</code> links every signal back to its exact pipeline run.{' '}
            <code>sources</code> lists which atomic modules contributed.{' '}
            <code>confidence</code> is always in [0, 1].
          </p>
        </section>

        {/* Roadmap */}
        <section>
          <h2 className="mb-8 text-center text-2xl font-semibold">Roadmap</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {ROADMAP.map((r) => (
                    <th key={r.phase} className="px-6 py-4 text-left font-semibold">{r.phase}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(...ROADMAP.map((r) => r.items.length)) }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {ROADMAP.map((r) => (
                      <td key={r.phase} className="px-6 py-3 text-muted-foreground">
                        {r.items[i] ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
