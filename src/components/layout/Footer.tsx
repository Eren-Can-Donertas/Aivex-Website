'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

export function Footer() {
  const { lang } = useLanguage();
  const t = locales[lang].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded bg-white shadow-sm">
                <Image
                  src="/logo.jpeg"
                  alt="AIVEX Analytics"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </span>
              <span className="text-lg font-bold">
                <span className="gradient-text">AIVEX</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
            <div className="mt-4 space-y-2">
              <a
                href="mailto:aivex.analytics@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                aivex.analytics@gmail.com
              </a>
              <a
                href="tel:+905425623440"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +90 542 562 3440
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t.disclaimer}</p>
          </div>

          {/* Link columns */}
          {Object.entries(t.links).map(([key, section]) => (
            <div key={key}>
              <h3 className="mb-3 text-sm font-semibold">{section.label}</h3>
              <ul className="space-y-2">
                {section.items.map((link: { label: string; href: string }) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {year} {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
