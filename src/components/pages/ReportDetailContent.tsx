'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { ReportStatusBadge } from '@/components/ui/StatusBadge';
import { getReport } from '@/data/research';
import { getProduct } from '@/data/products';

export function ReportDetailContent({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const t = locales[lang].research.detail;
  const report = getReport(slug);
  if (!report) return null;

  const related = report.relatedProducts.map(getProduct).filter(Boolean);

  return (
    <article className="pb-8">
      <header className="border-b border-border bg-surface/50 py-14 md:py-16">
        <div className="container-page max-w-3xl">
          <Link
            href="/research"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t.backToResearch}
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <ReportStatusBadge status={report.status} />
            <span className="meta-row rounded-full border border-border px-2 py-0.5">{report.type[lang]}</span>
            <span className="meta-row">{report.period[lang]}</span>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{report.title[lang]}</h1>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {report.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="container-page max-w-3xl py-12">
        <section className="rounded-xl border border-border bg-card p-6">
          <p className="eyebrow mb-2">{t.abstract}</p>
          <p className="leading-relaxed text-foreground/85">{report.abstract[lang]}</p>
        </section>

        <div className="prose mt-10">
          {report.body[lang].map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <section className="mt-10 rounded-xl border border-border bg-surface/50 p-6">
          <h2 className="text-lg font-semibold">{t.findings}</h2>
          <ul className="mt-4 space-y-2.5">
            {report.findings[lang].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold">{t.related}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((product) => (
                <Link
                  key={product!.slug}
                  href={`/products/${product!.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-card p-4 text-sm font-medium transition-colors hover:border-primary/40"
                >
                  {product!.name[lang]}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">{t.disclaimer}</p>
      </div>
    </article>
  );
}
