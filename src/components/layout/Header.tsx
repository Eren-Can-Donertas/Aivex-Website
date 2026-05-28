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
    { label: t.product, href: '/product' },
    { label: t.methodology, href: '/methodology' },
    { label: t.docs, href: '/docs/getting-started' },
    { label: t.blog, href: '/blog' },
    { label: t.about, href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 shrink-0 overflow-hidden rounded bg-white shadow-sm">
            <Image
              src="/logo.jpeg"
              alt="AIVEX Analytics"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
          </span>
          <span className="text-lg font-bold tracking-tight leading-none">
            <span className="gradient-text">AIVEX</span>
            <span className="ml-1 hidden text-xs font-medium text-muted-foreground sm:inline">Analytics</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            {t.requestAccess}
          </Link>
          <MobileMenu items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
