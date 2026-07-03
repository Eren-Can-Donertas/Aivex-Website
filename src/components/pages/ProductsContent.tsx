'use client';

import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { SignalField } from '@/components/ui/SignalField';
import { ProductCard } from '@/components/research/ProductCard';
import { products } from '@/data/products';

export function ProductsContent() {
  const { lang } = useLanguage();
  const t = locales[lang].products;
  const ordered = [...products].sort((a, b) => a.order - b.order);

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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-border bg-surface/50 p-5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">{t.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
