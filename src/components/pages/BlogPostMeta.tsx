'use client';

import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

interface HeaderProps {
  footer?: false;
  date: string;
  readingTime?: number;
  author?: string;
  title: string;
}

interface FooterProps {
  footer: true;
}

type Props = HeaderProps | FooterProps;

export function BlogPostMeta(props: Props) {
  const { lang } = useLanguage();
  const t = locales[lang].blog;

  if (props.footer) {
    return (
      <div className="mt-12 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> {t.backToBlog}
      </Link>

      <header className="mb-8">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{props.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={props.date}>{formatDate(props.date)}</time>
          {props.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {props.readingTime} {t.minRead}
            </span>
          )}
          {props.author && <span>{t.by} {props.author}</span>}
        </div>
      </header>
    </>
  );
}
