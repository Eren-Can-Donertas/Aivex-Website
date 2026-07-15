'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

const STATUS_DIALS: Record<string, string> = {
  prototype: 'PROTO',
  development: 'DEV',
};

export function Hero() {
  const { lang } = useLanguage();
  const t = locales[lang].home.hero;
  const products = locales[lang].products.index;

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_24rem] lg:gap-14">

          {/* Left column — copy */}
          <div className="animate-fade-in">
            <p className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-primary">
              {t.badge}
            </p>

            <h1 className="mb-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.02em] md:text-5xl">
              {t.titleMain}
              <br />
              <em className="not-italic text-primary">{t.titleHighlight}</em>
            </h1>

            <p className="mb-9 max-w-xl text-muted-foreground">
              {t.subtitle}
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
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {t.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl font-bold tabular-nums text-primary">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — product roster panel */}
          <div className="overflow-hidden rounded-md border-[1.5px] border-foreground bg-card">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b-[1.5px] border-foreground px-4 py-2.5 text-[0.64rem] uppercase tracking-[0.18em]">
              <span className="text-muted-foreground">product_index</span>
              <span className="flex items-center gap-1.5 font-bold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                {t.terminalStatus}
              </span>
            </div>

            {/* Product rows */}
            <div className="divide-y divide-border">
              {products.items.map((product) => {
                const statusLabel = products.statusLabels[product.status as keyof typeof products.statusLabels];
                const row = (
                  <>
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className="font-bold">{product.name}</span>
                      <span
                        title={statusLabel}
                        className="shrink-0 rounded-sm border border-border px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground"
                      >
                        {STATUS_DIALS[product.status] ?? product.status}
                      </span>
                    </div>
                    <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary">
                      {product.role}
                    </p>
                    <p className="font-mono text-[0.66rem] leading-relaxed text-muted-foreground">
                      {product.output}
                    </p>
                  </>
                );
                return product.href ? (
                  <Link
                    key={product.id}
                    href={product.href}
                    className="block px-4 py-4 transition-colors hover:bg-muted/40"
                  >
                    {row}
                  </Link>
                ) : (
                  <div key={product.id} className="px-4 py-4">
                    {row}
                  </div>
                );
              })}
            </div>

            {/* Panel footer */}
            <div className="border-t-[1.5px] border-foreground px-4 py-2.5 font-mono text-[0.62rem] text-muted-foreground">
              <span className="font-bold text-primary">✓ deterministic</span> · reproducible arithmetic · advice: false
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
