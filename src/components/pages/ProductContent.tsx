'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle, Zap, Lock, BarChart2, Globe, Clock, ArrowRight,
  Newspaper, Radio, TrendingUp, Building2, Activity, Brain, Shield, Eye, AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

const LAYER_COLORS: Record<string, string> = {
  'Ingest / Analyze': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Analyze': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'Compose': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  'Govern': 'bg-red-500/10 text-red-600 dark:text-red-400',
  'Emit / Monitor': 'bg-green-500/10 text-green-600 dark:text-green-400',
  'Operations': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

export function ProductContent() {
  const { lang } = useLanguage();
  const t = locales[lang].product;

  const steps = [
    { outputType: 'raw_data_batch', ...t.steps.ingest },
    { outputType: 'atomic_signal', ...t.steps.analyze },
    { outputType: 'composed_signal', ...t.steps.compose },
    { outputType: 'research_signal', ...t.steps.govern },
  ];

  const modules = [
    { icon: Newspaper, name: 'News', layer: 'Ingest / Analyze', desc: t.modules.News },
    { icon: Radio, name: 'New Media', layer: 'Ingest / Analyze', desc: t.modules.NewMedia },
    { icon: TrendingUp, name: 'Chart', layer: 'Ingest / Analyze', desc: t.modules.Chart },
    { icon: Building2, name: 'Companies', layer: 'Ingest / Analyze', desc: t.modules.Companies },
    { icon: Activity, name: 'Metrics', layer: 'Analyze', desc: t.modules.Metrics },
    { icon: Zap, name: 'Signal Engine', layer: 'Compose', desc: t.modules.SignalEngine },
    { icon: Brain, name: 'Brain', layer: 'Compose', desc: t.modules.Brain },
    { icon: Shield, name: 'Governor', layer: 'Govern', desc: t.modules.Governor },
    { icon: Eye, name: 'Eye', layer: 'Emit / Monitor', desc: t.modules.Eye },
    { icon: AlertTriangle, name: 'Watchdog', layer: 'Operations', desc: t.modules.Watchdog },
  ];

  const differentiators = [
    { icon: Zap, ...t.diff.latency },
    { icon: Lock, ...t.diff.audit },
    { icon: BarChart2, ...t.diff.confidence },
    { icon: Globe, ...t.diff.consensus },
    { icon: Clock, ...t.diff.uptime },
    { icon: CheckCircle, ...t.diff.compliance },
  ];

  const roadmap = [t.roadmap.now, t.roadmap.next, t.roadmap.later];

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero */}
        <div className="mb-16 text-center">
          <Badge variant="accent" className="mb-4">{t.badge}</Badge>
          <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="mb-10 text-2xl font-semibold">{t.howItWorksTitle}</h2>
          <div className="relative">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:block" />
            <div className="space-y-0">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex gap-6 pb-10 last:pb-0">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-sm font-bold text-primary">
                    {idx + 1}
                  </div>
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

        {/* Modules */}
        <section className="mb-20">
          <h2 className="mb-3 text-2xl font-semibold">{t.modulesTitle}</h2>
          <p className="mb-8 text-muted-foreground">{t.modulesSubtitle}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const layerStyle = LAYER_COLORS[mod.layer] ?? 'bg-muted text-muted-foreground';
              return (
                <div key={mod.name} className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${layerStyle}`}>
                      {mod.layer}
                    </span>
                  </div>
                  <h3 className="mb-1 font-semibold">{mod.name}</h3>
                  <p className="text-sm text-muted-foreground">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Example Research Artifact */}
        <section className="mb-20">
          <h2 className="mb-3 text-center text-2xl font-semibold">{t.artifactTitle}</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">{t.artifactSubtitle}</p>
          <div className="overflow-x-auto rounded-xl border border-border bg-muted/30">
            <pre className="p-6 text-xs leading-relaxed text-foreground/90">
              <code>{`{
  "trace_id":    "research_20260525_a4f2b9c1",
  "output_type": "research_signal",
  "symbol":      "SAMPLE_SYMBOL",
  "confidence":  0.68,
  "strength":    "moderate",
  "sources":     ["news", "chart", "metrics"],
  "modules": {
    "news":     { "sentiment": 0.72, "urgency": 0.81, "articles": 3 },
    "chart":    { "structure": "bullish", "timeframes": 2, "score": 0.64 },
    "metrics":  { "volatility": "normal", "regime": "trending", "quality": 0.71 }
  },
  "reasons": [
    "Positive sentiment across 3 recent articles (urgency: 0.81)",
    "Technical structure confirmed across 2 timeframes",
    "Volatility within normal range, trending regime confirmed"
  ],
  "atomic_count":  3,
  "has_conflict":  false,
  "governor":      "passed",
  "brain":         "pattern_confirmed",
  "advice":        false,
  "created_at":    "2026-05-25T09:14:22.384Z"
}`}</code>
            </pre>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">{t.artifactDisclaimer}</p>
        </section>

        {/* Differentiators */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">{t.differentiators}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => {
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
          <h2 className="mb-8 text-center text-2xl font-semibold">{t.roadmapTitle}</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {roadmap.map((r) => (
                    <th key={r.phase} className="px-6 py-4 text-left font-semibold">{r.phase}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(...roadmap.map((r) => r.items.length)) }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {roadmap.map((r) => (
                      <td key={r.phase} className="px-6 py-3 text-muted-foreground">{r.items[i] ?? ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl border border-border bg-muted/20 p-10 text-center">
          <h2 className="mb-2 text-2xl font-semibold">{t.ctaTitle}</h2>
          <p className="mb-6 text-muted-foreground">{t.ctaSubtitle}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                {t.ctaButton} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/docs/${lang}/getting-started`}>
              <Button variant="outline" size="lg">{t.ctaDocs}</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
