'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import type { ProductStatus, ResearchStatus } from '@/data/types';

const PRODUCT_STYLES: Record<ProductStatus, string> = {
  available: 'text-status-available border-status-available/30 bg-status-available/10',
  research: 'text-status-research border-status-research/30 bg-status-research/10',
  experimental: 'text-status-experimental border-status-experimental/30 bg-status-experimental/10',
  'in-development': 'text-status-development border-status-development/30 bg-status-development/10',
};

const REPORT_STYLES: Record<ResearchStatus, string> = {
  published: 'text-status-available border-status-available/30 bg-status-available/10',
  'in-progress': 'text-status-experimental border-status-experimental/30 bg-status-experimental/10',
  'research-only': 'text-status-research border-status-research/30 bg-status-research/10',
};

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />;
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const { lang } = useLanguage();
  const label = locales[lang].common.status[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold ${PRODUCT_STYLES[status]}`}
    >
      <Dot />
      {label}
    </span>
  );
}

export function ReportStatusBadge({ status }: { status: ResearchStatus }) {
  const { lang } = useLanguage();
  const label = locales[lang].common.reportStatus[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold ${REPORT_STYLES[status]}`}
    >
      <Dot />
      {label}
    </span>
  );
}
