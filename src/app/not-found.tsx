'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

export default function NotFound() {
  const { lang } = useLanguage();
  const t = locales[lang].notFound;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 font-mono text-8xl font-black text-muted-foreground/25">404</div>
      <h1 className="mb-3 text-2xl font-bold">{t.title}</h1>
      <p className="mb-8 max-w-md text-muted-foreground">{t.body}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button className="w-full sm:w-auto">{t.home}</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" className="w-full sm:w-auto">
            {t.products}
          </Button>
        </Link>
      </div>
    </div>
  );
}
