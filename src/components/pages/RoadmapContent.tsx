'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { SignalField } from '@/components/ui/SignalField';
import { roadmap } from '@/data/roadmap';
import { getProduct } from '@/data/products';
import type { RoadmapStage } from '@/data/types';

const STAGE_ORDER: RoadmapStage[] = ['foundation', 'in-progress', 'next', 'longer-term'];

const STAGE_DOT: Record<RoadmapStage, string> = {
  foundation: 'bg-status-available',
  'in-progress': 'bg-status-experimental',
  next: 'bg-status-research',
  'longer-term': 'bg-status-development',
};

export function RoadmapContent() {
  const { lang } = useLanguage();
  const t = locales[lang].roadmap;

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
        <SignalField />
        <div className="container-page">
          <p className="eyebrow mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t.badge}
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="space-y-12">
          {STAGE_ORDER.map((stage) => {
            const items = roadmap.filter((r) => r.stage === stage);
            const meta = t.stages[stage];
            return (
              <div key={stage}>
                <div className="mb-5 flex items-center gap-3 border-b border-border pb-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${STAGE_DOT[stage]}`} aria-hidden="true" />
                  <h2 className="text-xl font-semibold">{meta.title}</h2>
                  <span className="meta-row ml-auto">{meta.hint}</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => {
                    const product = getProduct(item.area);
                    return (
                      <div key={item.title[lang]} className="flex flex-col rounded-xl border border-border bg-card p-5">
                        <div className="mb-2 flex items-center gap-2">
                          {product && (
                            <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                              {product.name[lang]}
                            </span>
                          )}
                          {item.researchOnly && (
                            <span className="rounded-full border border-status-research/30 bg-status-research/10 px-2 py-0.5 text-[0.65rem] font-semibold text-status-research">
                              {t.researchOnly}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold">{item.title[lang]}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">{item.detail[lang]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">{t.disclaimer}</p>
      </section>
    </div>
  );
}
