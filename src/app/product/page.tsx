import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Lock, BarChart2, Globe, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Product',
  description:
    'How AIVEX works — modular AI signal research infrastructure from data ingestion to governed, auditable output.',
};

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Ingest',
    outputType: 'raw_data_batch',
    description:
      'Parallel data pipelines pull news, OHLCV data, and fundamental metrics from verified sources on configurable schedules.',
  },
  {
    step: '02',
    title: 'Analyze',
    outputType: 'atomic_signal',
    description:
      'Each atomic signal module applies domain-specific models — NLP for news, technical indicators for charts, ratio analysis for metrics.',
  },
  {
    step: '03',
    title: 'Compose',
    outputType: 'composed_signal',
    description:
      'The Signal Engine merges outputs with confidence weighting. Conflicting signals are resolved using priority rules and cooldown logic.',
  },
  {
    step: '04',
    title: 'Govern & Emit',
    outputType: 'research_signal',
    description:
      'The Governor applies risk thresholds and kill switches. Approved signals are exposed via the Eye REST API with trace IDs and structured JSON.',
  },
];

const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: 'Sub-second latency',
    description:
      'In-process signal composition without message queues for the critical path.',
  },
  {
    icon: Lock,
    title: 'Audit trails',
    description:
      'Every signal includes a traceable computation path. Full JSON crash records for every exception.',
  },
  {
    icon: BarChart2,
    title: 'Confidence scoring',
    description:
      'Every output includes a 0–1 confidence value computed from source quality and agreement.',
  },
  {
    icon: Globe,
    title: 'Multi-source consensus',
    description:
      'Signals require agreement across independent sources before reaching the composition layer.',
  },
  {
    icon: Clock,
    title: '24/7 supervision',
    description:
      'Watchdog process with exponential-backoff restart, crash-loop detection, and heartbeat monitoring.',
  },
  {
    icon: CheckCircle,
    title: 'Research compliance',
    description:
      'Built-in disclaimer enforcement. All outputs are research artifacts, never trading recommendations.',
  },
];

const ROADMAP = [
  {
    phase: 'Now',
    items: [
      'News, Chart, Metrics modules',
      'Signal Engine composition',
      'Governor gating',
      'Eye REST API',
      'Watchdog 24/7 runtime',
    ],
  },
  {
    phase: 'Next',
    items: [
      'Alternative data module',
      'Vector store signal memory',
      'Real-time WebSocket stream',
      'Multi-symbol portfolio views',
    ],
  },
  {
    phase: 'Later',
    items: [
      'LLM signal narrative generation',
      'Backtesting harness v2',
      'Custom signal module SDK',
      'Institutional data connectors',
    ],
  },
];

export default function ProductPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero */}
        <div className="mb-16 text-center">
          <Badge variant="accent" className="mb-4">
            Platform Overview
          </Badge>
          <h1 className="mb-4 text-4xl font-bold">What AIVEX Does</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            AIVEX is an end-to-end AI research infrastructure that transforms raw market data into
            governed, auditable signal outputs — without the black box.
          </p>
        </div>

        {/* How it works — pipeline flow */}
        <section className="mb-20">
          <h2 className="mb-10 text-2xl font-semibold">How It Works</h2>
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:block" />

            <div className="space-y-0">
              {HOW_IT_WORKS.map((step, idx) => (
                <div key={step.step} className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Step circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-sm font-bold text-primary">
                    {idx + 1}
                  </div>
                  {/* Content */}
                  <div className="mt-1 rounded-xl border border-border bg-card px-6 py-5 flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="font-semibold">{step.title}</h3>
                      <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {step.outputType}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Research Artifact */}
        <section className="mb-20">
          <h2 className="mb-3 text-center text-2xl font-semibold">
            Example Research Artifact
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Sample output from the Eye REST API (<code>/eye/signals</code>).
            The <code>trace_id</code> links every signal to its exact pipeline run.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border bg-muted/30">
            <pre className="p-6 text-xs leading-relaxed text-foreground/90">
              <code>{`{
  "trace_id":    "research_20260525_a4f2b9c1",
  "output_type": "research_signal",
  "symbol":      "SAMPLE_SYMBOL",
  "confidence":  0.68,
  "strength":    "moderate",
  "sources":     ["news", "chart"],
  "reasons": [
    "Positive sentiment across 3 recent articles (urgency: 0.81)",
    "Technical structure confirmed across 2 timeframes"
  ],
  "atomic_count":  2,
  "has_conflict":  false,
  "governor":      "passed",
  "advice":        false,
  "created_at":    "2026-05-25T09:14:22.384Z"
}`}</code>
            </pre>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Example research artifact — not a recommendation.{' '}
            <code>advice: false</code> is enforced by the Governor on every emission.
          </p>
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

        {/* Roadmap */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">Roadmap</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {ROADMAP.map((r) => (
                    <th key={r.phase} className="px-6 py-4 text-left font-semibold">
                      {r.phase}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.max(...ROADMAP.map((r) => r.items.length)),
                }).map((_, i) => (
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

        {/* CTA */}
        <section className="rounded-xl border border-border bg-muted/20 p-10 text-center">
          <h2 className="mb-2 text-2xl font-semibold">
            Evaluate AIVEX for Your Workflow
          </h2>
          <p className="mb-6 text-muted-foreground">
            Research infrastructure for systematic quant teams, institutional analysts, and academic
            researchers who need traceable, governed signal outputs.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Request Research Access <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs/getting-started">
              <Button variant="outline" size="lg">
                Read Docs
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
