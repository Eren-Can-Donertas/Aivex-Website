'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { resolveIcon } from '@/components/ui/icon';
import { ProductStatusBadge } from '@/components/ui/StatusBadge';
import type { Product } from '@/data/types';

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const t = locales[lang].common;
  const Icon = resolveIcon(product.icon);
  const href = `/products/${product.slug}`;
  const accentText = product.accent === 'accent' ? 'text-accent' : 'text-primary';
  const accentBg = product.accent === 'accent' ? 'bg-accent/10' : 'bg-primary/10';

  return (
    <Link
      href={href}
      className="research-card group flex flex-col p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={product.name[lang]}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentBg}`}>
          <Icon className={`h-5 w-5 ${accentText}`} aria-hidden="true" />
        </span>
        <ProductStatusBadge status={product.status} />
      </div>

      <h3 className="text-lg font-semibold tracking-tight">{product.name[lang]}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.tagline[lang]}</p>

      <dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
        <div>
          <dt className="font-medium uppercase tracking-wide text-muted-foreground/70">{t.studies}</dt>
          <dd className="mt-0.5 text-foreground/80">{product.studies[lang]}</dd>
        </div>
        <div>
          <dt className="font-medium uppercase tracking-wide text-muted-foreground/70">{t.produces}</dt>
          <dd className="mt-0.5 text-foreground/80">{product.produces[lang]}</dd>
        </div>
      </dl>

      <span className={`mt-5 inline-flex items-center gap-1 text-sm font-medium ${accentText}`}>
        {t.viewProduct}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
