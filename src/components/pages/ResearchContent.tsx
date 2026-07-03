'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { SignalField } from '@/components/ui/SignalField';
import { ReportCard } from '@/components/research/ReportCard';
import { reports } from '@/data/research';

export function ResearchContent() {
  const { lang } = useLanguage();
  const t = locales[lang].research;
  const ordered = [...reports].sort((a, b) => b.order - a.order);
  const [featured, ...rest] = ordered;

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
        {featured && (
          <div className="mb-6">
            <ReportCard report={featured} featured />
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((report) => (
            <ReportCard key={report.slug} report={report} />
          ))}
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          {t.detail.disclaimer}
        </p>
      </section>
    </div>
  );
}
