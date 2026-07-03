'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignalField } from '@/components/ui/SignalField';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

// Illustrative per-lens readings shown in the hero research panel.
const LENS_READINGS = [
  { value: '+0.42', label: { en: 'sentiment', tr: 'duygu' }, conf: 68 },
  { value: 'trending', label: { en: 'regime', tr: 'rejim' }, conf: 64 },
  { value: '18.4x', label: { en: 'P/E', tr: 'F/K' }, conf: 52 },
  { value: '0.71', label: { en: 'quality', tr: 'kalite' }, conf: 71 },
] as const;

export function Hero() {
  const { lang } = useLanguage();
  const t = locales[lang].home.hero;

  return (
    <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
      <SignalField />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-in">
            <p className="eyebrow mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              {t.eyebrow}
            </p>

            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.4rem]">
              {t.titleMain}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  {t.ctaPrimary} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/research">
                <Button variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
                  {t.ctaSecondary} <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Research view panel */}
          <div className="animate-fade-in">
            <div className="panel-terminal">
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
                <span className="font-mono text-xs text-muted-foreground">{t.panelTitle}</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" aria-hidden="true" />
                  <span className="font-mono text-xs text-primary">{t.panelStatus}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                {t.lenses.map((lens, i) => {
                  const reading = LENS_READINGS[i];
                  return (
                    <div key={lens} className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                          {lens}
                        </span>
                        <span className="font-mono text-sm font-semibold text-foreground">{reading.value}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                          <span
                            className="block h-full rounded-full bg-primary"
                            style={{ width: `${reading.conf}%` }}
                          />
                        </span>
                        <span className="meta-row">{reading.conf}%</span>
                      </div>
                      <p className="meta-row mt-1.5">{reading.label[lang]}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border bg-muted/20 px-4 py-3">
                <p className="font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
                  <span className="mr-1.5 text-primary">▸</span>
                  {t.annotation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
