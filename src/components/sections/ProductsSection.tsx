'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

const STATUS_DIALS: Record<string, string> = {
  prototype: 'PROTO',
  development: 'DEV',
};

/** Homepage products grid — mirrors the /products index cards */
export function ProductsSection() {
  const { lang } = useLanguage();
  const t = locales[lang].products.index;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading idx="01" title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-5 md:grid-cols-2">
          {t.items.map((product) => {
            const statusLabel = t.statusLabels[product.status as keyof typeof t.statusLabels];
            return (
              <article
                key={product.id}
                className="flex flex-col rounded-md border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="mb-1 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <span
                    title={statusLabel}
                    className="shrink-0 rounded-sm border border-border px-2 py-1 font-mono text-[0.62rem] text-muted-foreground"
                  >
                    {STATUS_DIALS[product.status] ?? product.status}
                  </span>
                </div>
                <p className="mb-2 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-primary">
                  {product.role}
                </p>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{product.description}</p>
                <div className="mb-4 border-t border-dashed border-border pt-2.5 font-mono text-[0.68rem]">
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
      </div>
    </section>
  );
}
