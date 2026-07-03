'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

/** A single footer navigation link. Mirrors the shape in the locale data. */
type FooterLink = { label: string; href: string };
/** A footer link column (Products / Company / Resources). */
type FooterColumn = { label: string; items: readonly FooterLink[] };

export function Footer() {
  const { lang } = useLanguage();
  const t = locales[lang].footer;
  const year = new Date().getFullYear();
  const columns: FooterColumn[] = Object.values(t.columns);

  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-md" aria-label="Aivex — home">
              <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-border">
                <Image src="/logo.jpeg" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
              </span>
              <span className="text-lg font-bold">
                <span className="gradient-text">AIVEX</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t.tagline}</p>
            <div className="mt-4 space-y-2">
              <a
                href="mailto:aivex.analytics@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                aivex.analytics@gmail.com
              </a>
              <a
                href="tel:+905425623440"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                +90 542 562 3440
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((section) => (
            <nav key={section.label} aria-label={section.label}>
              <h2 className="mb-3 text-sm font-semibold">{section.label}</h2>
              <ul className="space-y-2">
                {section.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">{t.disclaimer}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            &copy; {year} {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
