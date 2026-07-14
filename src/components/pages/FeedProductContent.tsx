'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

const SAMPLE_MESSAGE = `{
  "stream":       "news:articles",
  "language":     "tr -> en",
  "sentiment":    "negative",
  "confidence":   0.83,
  "theme":        "macro",
  "companies":    ["SAMPLE_ID"],
  "relevance":    0.60,
  "translated":   true,
  "published_at": "2026-07-05T08:41:00Z"
}`;

export function FeedProductContent() {
  const { lang } = useLanguage();
  const t = locales[lang].products.feed;

  return (
    <div className="py-14 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <div className="animate-fade-in">
            <p className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-primary">
              {t.badge}
            </p>
            <h1 className="mb-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.02em] md:text-5xl">
              {t.titleMain}{' '}
              <em className="not-italic text-primary">{t.titleHighlight}</em>
            </h1>
            <p className="mb-6 max-w-xl text-muted-foreground">{t.subtitle}</p>
            <p className="mb-9 inline-flex rounded-sm border border-border px-3 py-1.5 font-mono text-[0.68rem] text-muted-foreground">
              {t.statusChip}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  {t.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="gap-2">
                  {t.ctaSecondary} <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
              {t.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl font-bold tabular-nums text-primary">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Instrument readout — sample stream message */}
          <div className="overflow-hidden rounded-md border-[1.5px] border-foreground bg-card">
            <div className="flex items-center justify-between border-b-[1.5px] border-foreground px-4 py-2.5 text-[0.64rem] uppercase tracking-[0.18em]">
              <span className="text-muted-foreground">{t.panel.header}</span>
              <span className="flex items-center gap-1.5 font-bold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                {t.panel.status}
              </span>
            </div>
            <pre className="overflow-x-auto px-4 py-5 font-mono text-[0.72rem] leading-relaxed text-foreground/90">
              <code>{SAMPLE_MESSAGE}</code>
            </pre>
            <div className="border-t-[1.5px] border-foreground px-4 py-2.5 font-mono text-[0.62rem] text-muted-foreground">
              {t.panel.footer}
            </div>
          </div>
        </div>

        {/* ── 01 · Problem ─────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading idx={t.problem.idx} title={t.problem.title} subtitle={t.problem.subtitle} />
          <div className="grid gap-6 md:grid-cols-3">
            {t.problem.cards.map((card, i) => (
              <article key={card.title} className="border-t-2 border-foreground pt-4">
                <span className="font-mono text-[0.66rem] font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 mt-1.5 text-base font-bold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 rounded-md border border-border bg-muted/30 px-5 py-4 text-sm font-medium">
            {t.problem.note}
          </p>
        </section>

        {/* ── 02 · Outputs ─────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading idx={t.outputs.idx} title={t.outputs.title} subtitle={t.outputs.subtitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {t.outputs.items.map((item) => (
              <div key={item.name} className="rounded-md border border-border bg-card p-5">
                <div className="mb-2 font-mono text-sm font-bold text-primary">{item.name}</div>
                <p className="mb-2 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {item.kind}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-md bg-foreground px-6 py-5 text-background">
            <div className="mb-1.5 font-mono text-sm font-bold">{t.outputs.entry.name}</div>
            <p className="text-sm leading-relaxed text-background/70">{t.outputs.entry.body}</p>
          </div>
        </section>

        {/* ── 03 · Pipeline ────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading idx={t.pipeline.idx} title={t.pipeline.title} subtitle={t.pipeline.subtitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.pipeline.steps.map((step, i) => (
              <div key={step.title} className="rounded-md border border-border bg-card p-5">
                <span className="font-mono text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-1.5 mt-1 font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 rounded-md border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
            {t.pipeline.note}
          </p>
        </section>

        {/* ── 04 · Design rule ─────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading idx={t.designRule.idx} title={t.designRule.title} subtitle={t.designRule.subtitle} />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-md bg-foreground p-6 text-background">
              <p className="mb-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-background/60">
                {t.designRule.fast.label}
              </p>
              <h3 className="mb-2 text-lg font-bold">{t.designRule.fast.title}</h3>
              <p className="text-sm leading-relaxed text-background/70">{t.designRule.fast.body}</p>
            </div>
            <div className="rounded-md border border-border bg-card p-6">
              <p className="mb-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-primary">
                {t.designRule.slow.label}
              </p>
              <h3 className="mb-2 text-lg font-bold">{t.designRule.slow.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.designRule.slow.body}</p>
            </div>
          </div>
          <p className="mt-5 rounded-md border border-primary/40 bg-primary/5 px-5 py-4 text-sm font-medium">
            {t.designRule.note}
          </p>
        </section>

        {/* ── 05 · Turkish path ────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading idx={t.turkish.idx} title={t.turkish.title} subtitle={t.turkish.subtitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {t.turkish.steps.map((step, i) => (
              <div key={step.title} className="rounded-md border border-border bg-card p-5">
                <span className="font-mono text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-1.5 mt-1 font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-md border border-primary/40 bg-primary/5 p-5">
              <h3 className="mb-1.5 font-bold">{t.turkish.principle.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.turkish.principle.body}</p>
            </div>
            <div className="rounded-md border border-border bg-card p-5">
              <h3 className="mb-1.5 font-bold">{t.turkish.thresholds.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.turkish.thresholds.body}</p>
            </div>
          </div>
        </section>

        {/* ── 06 · Integration ─────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading idx={t.integration.idx} title={t.integration.title} subtitle={t.integration.subtitle} />
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    {t.integration.tableHeaders.map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-[0.68rem] font-bold uppercase tracking-[0.12em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.integration.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-bold">{row[0]}</td>
                      <td className="px-5 py-3 text-muted-foreground">{row[1]}</td>
                      <td className="px-5 py-3 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-5">
              <div className="rounded-md border border-border bg-card p-5">
                <h3 className="mb-1.5 font-bold">{t.integration.contract.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.integration.contract.body}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-5">
                <h3 className="mb-1.5 font-bold">{t.integration.desktop.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.integration.desktop.body}</p>
              </div>
            </div>
          </div>
          <p className="mt-5 font-mono text-xs text-muted-foreground">{t.integration.requirements}</p>
        </section>

        {/* ── 07 · Status ──────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading idx={t.status.idx} title={t.status.title} subtitle={t.status.subtitle} />
          <div className="grid gap-8 md:grid-cols-2">
            <ul className="space-y-3">
              {t.status.facts.map((fact) => (
                <li key={fact} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1 font-mono text-xs font-bold text-primary" aria-hidden="true">—</span>
                  {fact}
                </li>
              ))}
            </ul>
            <div className="rounded-md border border-border bg-card p-6">
              <h3 className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary">
                {t.status.nextTitle}
              </h3>
              <ul className="space-y-3">
                {t.status.next.map((item, i) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-mono text-xs font-bold text-primary" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-md bg-foreground px-8 py-10 text-background md:px-10">
            <div className="max-w-xl">
              <h2 className="mb-2 text-2xl font-bold tracking-[-0.01em]">{t.cta.title}</h2>
              <p className="text-sm text-background/70">{t.cta.subtitle}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-background px-7 py-3.5 text-sm font-bold tracking-[0.04em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t.cta.primaryButton} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{t.cta.disclaimer}</p>
        </section>

      </div>
    </div>
  );
}
