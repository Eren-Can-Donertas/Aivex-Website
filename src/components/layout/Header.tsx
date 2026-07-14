'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { MobileMenu } from './MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import type { NavItem } from '@/types';

export function Header() {
  const { lang } = useLanguage();
  const t = locales[lang].nav;

  const NAV_ITEMS: NavItem[] = [
    { label: t.products, href: '/products' },
    { label: t.docs, href: `/docs/${lang}/getting-started` },
    { label: t.blog, href: '/blog' },
    { label: t.about, href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-sm border border-border bg-white">
              <Image
                src="/logo.jpeg"
                alt="AIVEX Analytics"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                priority
              />
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.14em] leading-none">
              AIVEX<span className="text-primary">&nbsp;Analytics</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden rounded-sm bg-foreground px-4 py-2 text-xs font-bold tracking-[0.06em] text-background transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex"
            >
              {t.requestAccess}
            </Link>
            <MobileMenu items={NAV_ITEMS} />
          </div>
        </div>
        <div className="ruler" aria-hidden="true" />
      </div>
    </header>
  );
}
