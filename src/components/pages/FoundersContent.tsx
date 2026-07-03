'use client';

import Link from 'next/link';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { Button } from '@/components/ui/button';
import { SignalField } from '@/components/ui/SignalField';
import { founders } from '@/data/founders';

export function FoundersContent() {
  const { lang } = useLanguage();
  const t = locales[lang].founders;

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
        <SignalField />
        <div className="container-page">
          <p className="eyebrow mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t.badge}
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {founders.map((f) => (
            <article key={f.slug} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-bold text-muted-foreground ring-1 ring-border">
                  {f.initials}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">{f.name}</h2>
                  <p className="text-sm font-medium text-primary">{f.role[lang]}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <p className="eyebrow mb-1.5">{t.responsibilityLabel}</p>
                <p className="text-sm text-foreground/85">{f.responsibility[lang]}</p>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{f.bio[lang]}</p>

              <div className="mt-5">
                <p className="eyebrow mb-2">{t.focusLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {f.focus[lang].map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                {f.linkedinUrl ? (
                  <a
                    href={f.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    {t.linkedin}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground/70">
                    {t.linkedinPending}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-14 rounded-2xl border border-border bg-surface/50 p-8 text-center md:p-10">
          <h2 className="text-2xl font-semibold">{t.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{t.ctaText}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact">
              <Button size="lg">{t.ctaButton}</Button>
            </Link>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-border pt-6 sm:flex-row">
            <a
              href="mailto:aivex.analytics@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              aivex.analytics@gmail.com
            </a>
            <a
              href="tel:+905425623440"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              +90 542 562 3440
            </a>
          </div>
        </section>
      </section>
    </div>
  );
}
