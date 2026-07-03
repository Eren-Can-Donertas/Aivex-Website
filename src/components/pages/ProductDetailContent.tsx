'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { Button } from '@/components/ui/button';
import { SignalField } from '@/components/ui/SignalField';
import { resolveIcon } from '@/components/ui/icon';
import { ProductStatusBadge } from '@/components/ui/StatusBadge';
import { ExampleOutput } from '@/components/research/ExampleOutput';
import { getProduct } from '@/data/products';
import { getReport } from '@/data/research';

function BulletList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accent}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProductDetailContent({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const t = locales[lang].products.detail;
  const product = getProduct(slug);
  if (!product) return null;

  const Icon = resolveIcon(product.icon);
  const accentText = product.accent === 'accent' ? 'text-accent' : 'text-primary';
  const accentBg = product.accent === 'accent' ? 'bg-accent/10' : 'bg-primary/10';
  const related = product.relatedReports.map(getReport).filter(Boolean);

  return (
    <article className="pb-8">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border py-14 md:py-16">
        <SignalField />
        <div className="container-page max-w-4xl">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t.backToProducts}
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <span className={`flex h-14 w-14 items-center justify-center rounded-xl ${accentBg}`}>
              <Icon className={`h-6 w-6 ${accentText}`} aria-hidden="true" />
            </span>
            <ProductStatusBadge status={product.status} />
          </div>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">{product.name[lang]}</h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">{product.tagline[lang]}</p>
          {product.externalUrl && (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {locales[lang].products.externalLink}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      <div className="container-page max-w-4xl py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Main column */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold">{t.overview}</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">{product.purpose[lang]}</p>
            </section>

            <section className="rounded-xl border border-border bg-surface/50 p-6">
              <p className="eyebrow mb-2">{t.marketQuestion}</p>
              <p className="text-lg font-medium text-balance">“{product.marketQuestion[lang]}”</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">{t.observes}</h2>
              <div className="mt-4">
                <BulletList items={product.observes[lang]} accent={accentText} />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">{t.method}</h2>
              <div className="mt-4">
                <BulletList items={product.method[lang]} accent={accentText} />
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">{t.example}</h2>
              <ExampleOutput data={product.example} />
            </section>

            <section>
              <h2 className="text-xl font-semibold">{t.interpretation}</h2>
              <div className="mt-4">
                <BulletList items={product.interpretation[lang]} accent={accentText} />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-surface/50 p-6">
              <h2 className="text-xl font-semibold">{t.validation}</h2>
              <ul className="mt-4 space-y-2.5">
                {product.validation[lang].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="eyebrow mb-3">{t.status}</p>
              <ProductStatusBadge status={product.status} />
              <dl className="mt-4 space-y-3 border-t border-border pt-4 text-xs">
                <div>
                  <dt className="font-medium uppercase tracking-wide text-muted-foreground/70">
                    {locales[lang].common.studies}
                  </dt>
                  <dd className="mt-0.5 text-foreground/80">{product.studies[lang]}</dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-wide text-muted-foreground/70">
                    {locales[lang].common.produces}
                  </dt>
                  <dd className="mt-0.5 text-foreground/80">{product.produces[lang]}</dd>
                </div>
              </dl>
            </div>

            {related.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="eyebrow mb-3">{t.related}</p>
                <ul className="space-y-3">
                  {related.map((report) => (
                    <li key={report!.slug}>
                      <Link
                        href={`/research/${report!.slug}`}
                        className="group flex items-start gap-2 text-sm text-foreground/85 hover:text-primary"
                      >
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                        {report!.title[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* CTA */}
        <section className="mt-14 rounded-2xl border border-border bg-card p-8 text-center md:p-10">
          <h2 className="text-2xl font-semibold">{t.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{t.ctaBody}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="w-full gap-2 sm:w-auto">
                {t.ctaContact} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t.ctaProducts}
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
