import { Newspaper, BarChart2, TrendingUp, Brain, Shield, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MODULES = [
  {
    id: 'news',
    name: 'News Signal',
    description:
      'Scrapes and analyzes financial news from 8 sources. NLP pipeline extracts sentiment, entities, and event types in real time.',
    icon: Newspaper,
    status: 'prototype' as const,
  },
  {
    id: 'chart',
    name: 'Chart Signal',
    description:
      'Technical analysis engine computing 8 indicators across multiple timeframes. Pattern recognition and trend detection.',
    icon: BarChart2,
    status: 'prototype' as const,
  },
  {
    id: 'metrics',
    name: 'Metrics Signal',
    description:
      'Fundamental data processing: earnings, valuation ratios, analyst estimates, and macro indicators from verified sources.',
    icon: TrendingUp,
    status: 'prototype' as const,
  },
  {
    id: 'brain',
    name: 'Signal Engine',
    description:
      'Composition layer that merges atomic signals using confidence weighting, conflict resolution, and cooldown logic.',
    icon: Brain,
    status: 'prototype' as const,
  },
  {
    id: 'governor',
    name: 'Governor',
    description:
      'Risk gating layer that applies thresholds, kill switches, and human-override policies before any signal is emitted.',
    icon: Shield,
    status: 'beta' as const,
  },
  {
    id: 'eye',
    name: 'Eye (API)',
    description:
      'REST API gateway exposing evaluated signals with authentication, rate limiting, and structured JSON responses.',
    icon: Eye,
    status: 'prototype' as const,
  },
];

const statusVariant: Record<string, 'success' | 'warning' | 'default'> = {
  prototype: 'warning',
  beta: 'warning',
  planned: 'default',
};

export function ProductOverview() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Modular Signal Architecture</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Every module runs independently with dedicated supervision, fault isolation, and
            structured logging. Compose any combination for your research workflow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Card key={mod.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={statusVariant[mod.status]}>{mod.status}</Badge>
                  </div>
                  <CardTitle>{mod.name}</CardTitle>
                  <CardDescription>{mod.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
