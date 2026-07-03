'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import type { BlogPost } from '@/types';

interface Props {
  posts: BlogPost[];
}

const CATEGORY_LABELS: Record<string, { en: string; tr: string }> = {
  research: { en: 'Research', tr: 'Araştırma' },
  engineering: { en: 'Engineering', tr: 'Mühendislik' },
  product: { en: 'Product', tr: 'Ürün' },
  company: { en: 'Company', tr: 'Şirket' },
};

export function BlogListContent({ posts }: Props) {
  const { lang } = useLanguage();
  const t = locales[lang].blog;
  const [active, setActive] = useState<string>('all');

  const title = (p: BlogPost) => (lang === 'tr' && p.titleTr ? p.titleTr : p.title);
  const excerpt = (p: BlogPost) => (lang === 'tr' && p.excerptTr ? p.excerptTr : p.excerpt);
  const catLabel = (c?: string) => (c && CATEGORY_LABELS[c] ? CATEGORY_LABELS[c][lang] : c);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(set)];
  }, [posts]);

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);
  const [featured, ...rest] = filtered;

  return (
    <div className="pb-8">
      <section className="border-b border-border bg-surface/50 py-14">
        <div className="container-page max-w-4xl">
          <p className="eyebrow mb-3">{t.badge}</p>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{t.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <div className="container-page max-w-4xl py-12">
        {/* Category filter */}
        {categories.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter posts">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`min-h-[36px] rounded-full border px-4 text-sm font-medium transition-colors ${
                  active === c
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {c === 'all' ? t.allTag : catLabel(c)}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">{t.emptyMessage}</p>
        ) : (
          <div className="space-y-6">
            {/* Featured */}
            {featured && (
              <article className="research-card p-7">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                    {t.featured}
                  </span>
                  {featured.category && (
                    <span className="rounded-full bg-muted px-2 py-0.5">{catLabel(featured.category)}</span>
                  )}
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  {featured.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {featured.readingTime} {t.minRead}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  <Link href={`/blog/${featured.slug}`} className="transition-colors hover:text-primary">
                    {title(featured)}
                  </Link>
                </h2>
                <p className="mt-2 text-pretty text-muted-foreground">{excerpt(featured)}</p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  {t.readMore}
                </Link>
              </article>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                {rest.map((post) => (
                  <article key={post.slug} className="research-card flex flex-col p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {post.category && (
                        <span className="rounded-full bg-muted px-2 py-0.5">{catLabel(post.category)}</span>
                      )}
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      {post.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {post.readingTime} {t.minRead}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold">
                      <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
                        {title(post)}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{excerpt(post)}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      {t.readMore}
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
