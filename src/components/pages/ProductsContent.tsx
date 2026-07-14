'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

const STATUS_DIALS: Record<string, string> = {
  prototype: 'PROTO',
  development: 'DEV',
};

export function ProductsContent() {
  const { lang } = useLanguage();
  const t = locales[lang].products.index;

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero */}
        <div className="mb-14 text-center">
          <Badge variant="accent" className="mb-4">{t.badge}</Badge>
          <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Product cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {t.items.map((product) => {
            const statusLabel = t.statusLabels[product.status as keyof typeof t.statusLabels];
            return (
              <article
                key={product.id}
                className="flex flex-col rounded-md border border-border bg-card p-7 transition-colors hover:border-primary/50"
              >
                <div className="mb-1.5 flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <span
                    title={statusLabel}
                    className="shrink-0 rounded-sm border border-border px-2 py-1 font-mono text-[0.62rem] text-muted-foreground"
                  >
                    {STATUS_DIALS[product.status] ?? product.status}
                  </span>
                </div>
                <p className="mb-3 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-primary">
                  {product.role}
                </p>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <div className="mb-5 border-t border-dashed border-border pt-3 font-mono text-[0.68rem]">
                  <span className="text-muted-foreground">Output — </span>
                  {product.output}
                </div>
                {product.href ? (
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.04em] text-primary transition-colors hover:underline"
                  >
                    {t.viewProduct} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {t.comingSoon}
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <p className="mt-10 max-w-4xl text-xs leading-relaxed text-muted-foreground">{t.disclaimer}</p>
      </div>
    </div>
  );
}
