'use client';

import { Newspaper, BarChart2, TrendingUp, Brain, Shield, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

type ModuleStatus =
  | 'internal-runtime'
  | 'data-connected'
  | 'in-validation'
  | 'api-ready'
  | 'beta'
  | 'risk-gate-active';

const MODULE_ICONS: Record<string, React.ElementType> = {
  news: Newspaper,
  chart: BarChart2,
  metrics: TrendingUp,
  brain: Brain,
  governor: Shield,
  eye: Eye,
};

const MODULE_STATUSES: Record<string, ModuleStatus> = {
  news: 'internal-runtime',
  chart: 'in-validation',
  metrics: 'data-connected',
  brain: 'internal-runtime',
  governor: 'risk-gate-active',
  eye: 'beta',
};

const STATUS_VARIANTS: Record<ModuleStatus, 'default' | 'outline' | 'accent' | 'success' | 'warning'> = {
  'internal-runtime': 'default',
  'data-connected':   'default',
  'in-validation':    'outline',
  'api-ready':        'success',
  'beta':             'accent',
  'risk-gate-active': 'success',
};

export function ProductOverview() {
  const { lang } = useLanguage();
  const t = locales[lang].home.productOverview;

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">{t.title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.modules.map((mod) => {
            const Icon = MODULE_ICONS[mod.id] ?? Newspaper;
            const status = MODULE_STATUSES[mod.id] ?? 'internal-runtime';
            const statusLabel = t.statusLabels[status];
            const statusVariant = STATUS_VARIANTS[status];
            return (
              <div
                key={mod.id}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <Badge variant={statusVariant}>{statusLabel}</Badge>
                </div>
                <h3 className="mb-0.5 font-semibold">{mod.name}</h3>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
                  {mod.role}
                </p>
                <p className="mb-3 text-sm text-muted-foreground">{mod.description}</p>
                <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">{t.outputLabel}: </span>
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
