import { Newspaper, BarChart2, TrendingUp, Brain, Shield, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ModuleStatus =
  | 'internal-runtime'
  | 'data-connected'
  | 'in-validation'
  | 'api-ready'
  | 'beta'
  | 'risk-gate-active';

const MODULES = [
  {
    id: 'news',
    name: 'News Signal',
    role: 'Atomic Signal Layer',
    output: 'Sentiment · Event entities · Source attribution',
    description:
      'Converts financial news from verified sources into source-attributed atomic research signals with NLP-derived sentiment and event classification.',
    icon: Newspaper,
    status: 'internal-runtime' as ModuleStatus,
  },
  {
    id: 'chart',
    name: 'Chart Signal',
    role: 'Atomic Signal Layer',
    output: 'Technical structure · Indicator readings',
    description:
      'Evaluates OHLCV structure across timeframes, computing technical indicators and emitting structured technical research signals.',
    icon: BarChart2,
    status: 'in-validation' as ModuleStatus,
  },
  {
    id: 'metrics',
    name: 'Metrics Signal',
    role: 'Atomic Signal Layer',
    output: 'Fundamental ratios · Analyst estimates',
    description:
      'Processes fundamental data — earnings, valuation ratios, and macro indicators — from verified sources into scored research signals.',
    icon: TrendingUp,
    status: 'data-connected' as ModuleStatus,
  },
  {
    id: 'brain',
    name: 'Signal Engine',
    role: 'Composition Layer',
    output: 'Composite signal · Confidence score · Trace ID',
    description:
      'Merges atomic signals using confidence weighting and conflict resolution. Every composite output carries a trace ID linking to its source signals.',
    icon: Brain,
    status: 'internal-runtime' as ModuleStatus,
  },
  {
    id: 'governor',
    name: 'Governor',
    role: 'Risk Gate',
    output: 'Allow · Suppress · Flag',
    description:
      'Applies hard limits, cooldowns, and human-override policies before output emission. Every gating decision is logged with full context.',
    icon: Shield,
    status: 'risk-gate-active' as ModuleStatus,
  },
  {
    id: 'eye',
    name: 'Eye API',
    role: 'Output Layer',
    output: 'REST API · Structured JSON · Authenticated',
    description:
      'REST API gateway exposing governed research outputs with authentication, rate limiting, and structured JSON responses.',
    icon: Eye,
    status: 'beta' as ModuleStatus,
  },
];

const statusConfig: Record<
  ModuleStatus,
  { label: string; variant: 'default' | 'outline' | 'accent' | 'success' | 'warning' }
> = {
  'internal-runtime': { label: 'Internal Runtime', variant: 'default' },
  'data-connected':   { label: 'Data Connected',   variant: 'default' },
  'in-validation':    { label: 'In Validation',     variant: 'outline' },
  'api-ready':        { label: 'API Ready',          variant: 'success' },
  'beta':             { label: 'Beta',               variant: 'accent'  },
  'risk-gate-active': { label: 'Risk Gate Active',   variant: 'success' },
};

export function ProductOverview() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Modular Signal Architecture</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Every module runs independently with dedicated supervision, fault isolation, and
            structured logging. Each layer in the pipeline has a defined role and auditable output.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const status = statusConfig[mod.status];
            return (
              <div
                key={mod.id}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="mb-0.5 font-semibold">{mod.name}</h3>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
                  {mod.role}
                </p>
                <p className="mb-3 text-sm text-muted-foreground">{mod.description}</p>
                <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">Output: </span>
                  {mod.output}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
