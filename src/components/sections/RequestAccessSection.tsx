'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

export function RequestAccessSection() {
  const { lang } = useLanguage();
  const t = locales[lang].home.requestAccess;

  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-3 text-3xl font-bold">{t.title}</h2>
        <p className="mb-8 text-muted-foreground">{t.subtitle}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              {t.primaryButton} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/product">
            <Button variant="outline" size="lg">
              {t.secondaryButton}
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">{t.disclaimer}</p>
      </div>
    </section>
  );
}
