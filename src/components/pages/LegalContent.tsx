'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import { slugify } from '@/lib/utils';

export function LegalContent({ doc }: { doc: 'privacy' | 'terms' }) {
  const { lang } = useLanguage();
  const t = locales[lang].legal;
  const content = t[doc];

  return (
    <div className="py-14">
      <div className="container-page max-w-3xl">
        <header className="mb-10 border-b border-border pb-8">
          <p className="eyebrow mb-3">{t.badge}</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{content.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {t.lastUpdated}: {t.lastUpdatedDate}
          </p>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{content.intro}</p>
        </header>

        {/* Table of contents */}
        <nav aria-label={t.tocTitle} className="mb-10 rounded-xl border border-border bg-surface/50 p-5">
          <p className="eyebrow mb-3">{t.tocTitle}</p>
          <ol className="space-y-1.5">
            {content.sections.map((s, i) => (
              <li key={s.heading}>
                <a
                  href={`#${slugify(s.heading)}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-8">
          {content.sections.map((s) => (
            <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
