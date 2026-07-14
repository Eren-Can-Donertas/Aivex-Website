'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

export function RequestAccessSection() {
  const { lang } = useLanguage();
  const t = locales[lang].home.requestAccess;

  return (
    <section className="pb-16 pt-4 md:pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Ink CTA panel */}
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-md bg-foreground px-8 py-10 text-background md:px-10">
          <div className="max-w-xl">
            <h2 className="mb-2 text-2xl font-bold tracking-[-0.01em]">{t.title}</h2>
            <p className="text-sm text-background/70">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-background px-7 py-3.5 text-sm font-bold tracking-[0.04em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t.primaryButton} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center whitespace-nowrap rounded-sm border-[1.5px] border-background/40 px-7 py-3.5 text-sm font-bold tracking-[0.04em] text-background transition-colors hover:border-background hover:bg-background/10"
            >
              {t.secondaryButton}
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">{t.disclaimer}</p>
      </div>
    </section>
  );
}
