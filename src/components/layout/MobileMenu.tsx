'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import type { NavItem } from '@/types';

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const t = locales[lang].nav;
  const pathname = usePathname();

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        className="w-9 px-0"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.close : t.menu}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t.close}
            className="fixed inset-0 top-16 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div
            id="mobile-nav"
            className="absolute left-0 right-0 top-16 z-50 border-b border-border bg-background px-4 py-4 shadow-xl"
          >
            <nav className="flex flex-col gap-1" aria-label={t.primary}>
              {items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium transition-colors ${
                      active ? 'bg-muted text-foreground' : 'text-foreground hover:bg-muted'
                    }`}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-border pt-4">
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full">{t.requestDemo}</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
