'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import type { BlogPost } from '@/types';

interface Props {
  posts: BlogPost[];
}

export function BlogListContent({ posts }: Props) {
  const { lang } = useLanguage();
  const t = locales[lang].blog;

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4">{t.badge}</Badge>
          <h1 className="mb-3 text-4xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">{t.emptyMessage}</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-border p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.readingTime && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} {t.minRead}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="mb-2 text-xl font-semibold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
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
    </div>
  );
}
