'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

const METERS = [
  { k: 'news', val: '0.79', width: '79%' },
  { k: 'chart', val: '0.67', width: '67%' },
  { k: 'metrics', val: '0.74', width: '74%' },
];

export function Hero() {
  const { lang } = useLanguage();
  const t = locales[lang].home.hero;

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
              {t.titleMain}{' '}
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

          {/* Right column — instrument readout panel */}
          <div className="overflow-hidden rounded-md border-[1.5px] border-foreground bg-card">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b-[1.5px] border-foreground px-4 py-2.5 text-[0.64rem] uppercase tracking-[0.18em]">
              <span className="text-muted-foreground">research_signal</span>
              <span className="flex items-center gap-1.5 font-bold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                {t.terminalStatus}
              </span>
            </div>

            {/* Big readout */}
            <div className="px-4 pb-4 pt-5">
              <div className="font-mono text-5xl font-bold leading-none tabular-nums text-primary">
                0.72
              </div>
              <div className="mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                composite confidence · trace a4f2b9c1
              </div>

              {/* Tick scale with marker */}
              <div className="scale-ticks relative mt-5 h-6" aria-hidden="true">
                <span className="absolute bottom-0 left-[72%] h-6 w-0.5 bg-primary" />
                <span className="absolute -top-1 left-[72%] -translate-x-1/2 font-mono text-[0.62rem] font-bold text-primary">
                  0.72
                </span>
              </div>
              <div className="mb-4 mt-1 flex justify-between font-mono text-[0.58rem] text-muted-foreground" aria-hidden="true">
                <span>0.00</span><span>0.25</span><span>0.50</span><span>0.75</span><span>1.00</span>
              </div>

              {/* Channel meters */}
              <div className="space-y-2 border-t border-border pt-3.5">
                {METERS.map((m) => (
                  <div key={m.k} className="grid grid-cols-[4.4rem_1fr_2.6rem] items-center gap-3 font-mono text-[0.66rem]">
                    <span className="text-muted-foreground">{m.k}</span>
                    <span className="h-[0.45rem] overflow-hidden rounded-sm bg-border">
                      <span className="block h-full bg-primary" style={{ width: m.width }} />
                    </span>
                    <span className="text-right tabular-nums">{m.val}</span>
                  </div>
                ))}
              </div>
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
