'use client';

import { useState } from 'react';
import Link from 'next/link';
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

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        className="w-9 px-0"
        onClick={() => setOpen(!open)}
        aria-label="Toggle mobile menu"
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-border bg-background px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full">{t.requestAccess}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
