'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { MobileMenu } from './MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import type { NavItem } from '@/types';

export function Header() {
  const { lang } = useLanguage();
  const t = locales[lang].nav;
  const pathname = usePathname();

  const NAV_ITEMS: NavItem[] = [
    { label: t.products, href: '/products' },
    { label: t.research, href: '/research' },
    { label: t.roadmap, href: '/roadmap' },
    { label: t.blog, href: '/blog' },
    { label: t.founders, href: '/founders' },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md"
          aria-label="Aivex — home"
        >
          <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-border">
            <Image
              src="/logo.jpeg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </span>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">AIVEX</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t.primary}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
          >
            {t.requestDemo}
          </Link>
          <MobileMenu items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
