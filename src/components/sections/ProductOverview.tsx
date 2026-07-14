'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

type ModuleStatus =
  | 'internal-runtime'
  | 'data-connected'
  | 'in-validation'
  | 'api-ready'
  | 'beta'
  | 'risk-gate-active';

const MODULE_STATUSES: Record<string, ModuleStatus> = {
  news: 'internal-runtime',
  chart: 'in-validation',
  metrics: 'data-connected',
  brain: 'internal-runtime',
  governor: 'risk-gate-active',
  eye: 'beta',
};

/* Short dial codes shown on each spec card, instrument-panel style */
const STATUS_DIALS: Record<ModuleStatus, string> = {
  'internal-runtime': 'RT',
  'data-connected':   'DATA',
  'in-validation':    'VAL',
  'api-ready':        'API',
  'beta':             'BETA',
  'risk-gate-active': 'GATE',
};

export function ProductOverview() {
  const { lang } = useLanguage();
  const t = locales[lang].home.productOverview;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading idx="01" title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.modules.map((mod) => {
            const status = MODULE_STATUSES[mod.id] ?? 'internal-runtime';
            const statusLabel = t.statusLabels[status];
            return (
              <div
                key={mod.id}
                className="rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="mb-1 flex items-start justify-between gap-3">
                  <h3 className="font-bold">{mod.name}</h3>
                  <span
                    title={statusLabel}
                    className="shrink-0 rounded-sm border border-border px-2 py-1 font-mono text-[0.62rem] text-muted-foreground"
                  >
                    {STATUS_DIALS[status]}
                  </span>
                </div>
                <p className="mb-2 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-primary">
                  {mod.role}
                </p>
                <p className="mb-3 text-sm text-muted-foreground">{mod.description}</p>
                <div className="border-t border-dashed border-border pt-2.5 font-mono text-[0.68rem]">
                  <span className="text-muted-foreground">{t.outputLabel} — </span>
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
