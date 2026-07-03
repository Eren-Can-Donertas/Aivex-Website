'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';
import { ProductCard } from '@/components/research/ProductCard';
import { ReportCard } from '@/components/research/ReportCard';
import { products } from '@/data/products';
import { reports } from '@/data/research';
import { roadmap } from '@/data/roadmap';
import { founders } from '@/data/founders';

// ── Why modular ────────────────────────────────────────────────────────────
export function WhyModular() {
  const { lang } = useLanguage();
  const t = locales[lang].home.whyModular;
  return (
    <section className="border-b border-border py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.body} />
        <div className="grid gap-4 sm:grid-cols-1">
          {t.points.map((p, i) => (
            <div key={p.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Product ecosystem ──────────────────────────────────────────────────────
export function ProductEcosystem() {
  const { lang } = useLanguage();
  const t = locales[lang].home.ecosystem;
  const ordered = [...products].sort((a, b) => a.order - b.order);
  return (
    <section className="border-b border-border py-20">
      <div className="container-page">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
          <Link
            href="/products"
            className="research-card flex items-center justify-center gap-2 p-6 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Methodology strip ──────────────────────────────────────────────────────
export function HomeMethodology() {
  const { lang } = useLanguage();
  const t = locales[lang].home.methodology;
  return (
    <section className="border-b border-border bg-surface/50 py-20">
      <div className="container-page">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} center />
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {t.steps.map((step) => (
            <div key={step.step} className="rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-sm font-semibold text-primary">{step.step}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Latest research ────────────────────────────────────────────────────────
export function LatestResearch() {
  const { lang } = useLanguage();
  const t = locales[lang].home.latestResearch;
  const latest = [...reports].sort((a, b) => b.order - a.order).slice(0, 3);
  return (
    <section className="border-b border-border py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
          <Link
            href="/research"
            className="mb-10 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {latest.map((report) => (
            <ReportCard key={report.slug} report={report} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Roadmap preview ────────────────────────────────────────────────────────
export function RoadmapPreview() {
  const { lang } = useLanguage();
  const t = locales[lang].home.roadmapPreview;
  const stages = locales[lang].roadmap.stages;
  const order = ['foundation', 'in-progress', 'next', 'longer-term'] as const;
  return (
    <section className="border-b border-border bg-surface/50 py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
          <Link
            href="/roadmap"
            className="mb-10 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((stage) => {
            const count = roadmap.filter((r) => r.stage === stage).length;
            return (
              <div key={stage} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <h3 className="text-sm font-semibold">{stages[stage].title}</h3>
                </div>
                <p className="font-mono text-3xl font-bold text-foreground">{count}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stages[stage].hint}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Founders strip ─────────────────────────────────────────────────────────
export function FoundersStrip() {
  const { lang } = useLanguage();
  const t = locales[lang].home.founders;
  return (
    <section className="border-b border-border py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
          <Link
            href="/founders"
            className="mb-10 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {founders.map((f) => (
            <div key={f.slug} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted font-semibold text-muted-foreground ring-1 ring-border">
                {f.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.role[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA ────────────────────────────────────────────────────────────
export function HomeCTA() {
  const { lang } = useLanguage();
  const t = locales[lang].home.cta;
  const disclaimer = locales[lang].common.disclaimerLong;
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 -z-10 dot-field opacity-40" aria-hidden="true" />
          <div className="max-w-2xl">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">{t.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.body}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  {t.primary} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/research">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t.secondary}
                </Button>
              </Link>
            </div>
            <p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">{disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
