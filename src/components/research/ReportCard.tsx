'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { ReportStatusBadge } from '@/components/ui/StatusBadge';
import type { Report } from '@/data/types';

export function ReportCard({ report, featured = false }: { report: Report; featured?: boolean }) {
  const { lang } = useLanguage();
  const t = locales[lang].research;
  const href = `/research/${report.slug}`;

  return (
    <article className={`research-card flex flex-col p-6 ${featured ? 'md:p-8' : ''}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ReportStatusBadge status={report.status} />
        <span className="meta-row rounded-full border border-border px-2 py-0.5">{report.type[lang]}</span>
        <span className="meta-row ml-auto">{report.period[lang]}</span>
      </div>

      <h3 className={`font-semibold tracking-tight ${featured ? 'text-2xl' : 'text-lg'}`}>
        <Link
          href={href}
          className="rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {report.title[lang]}
        </Link>
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{report.abstract[lang]}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {report.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {t.readReport}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
