import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllDocSlugs, getDocPageBySlugAndLang } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { cn } from '@/lib/utils';
import type { DocNavItem } from '@/types';

type DocLang = 'en' | 'tr';

interface Props {
  params: { lang: string; slug?: string[] };
}

function buildNav(lang: DocLang): DocNavItem[] {
  const labels = lang === 'tr'
    ? {
        gettingStarted: 'Başlarken',
        outputs:        'Çıktılar',
        pipeline:       'Hat',
        turkishPath:    'Türkçe Yol',
        integration:    'Entegrasyon',
      }
    : {
        gettingStarted: 'Getting Started',
        outputs:        'Outputs',
        pipeline:       'Pipeline',
        turkishPath:    'Turkish Path',
        integration:    'Integration',
      };
  const feed = `/docs/${lang}/aivex-feed`;
  return [
    {
      title: 'AIVEX Feed',
      children: [
        { title: labels.gettingStarted, href: `${feed}/getting-started` },
        { title: labels.outputs,        href: `${feed}/outputs` },
        { title: labels.pipeline,       href: `${feed}/pipeline` },
        { title: labels.turkishPath,    href: `${feed}/turkish-path` },
        { title: labels.integration,    href: `${feed}/integration` },
      ],
    },
  ];
}

function NavItem({ item, currentPath }: { item: DocNavItem; currentPath: string }) {
  const isActive = currentPath === item.href;
  const isParentOfActive = item.children?.some((c) => currentPath === c.href);
  return (
    <li>
      {item.href ? (
        <Link
          href={item.href}
          className={cn(
            'block rounded-md px-3 py-1.5 text-sm transition-colors',
            isActive
              ? 'bg-primary/10 font-medium text-primary'
              : isParentOfActive
              ? 'font-medium text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
          )}
        >
          {item.title}
        </Link>
      ) : (
        <span
          className={cn(
            'block px-3 py-1.5 text-sm font-medium',
            isParentOfActive ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {item.title}
        </span>
      )}
      {item.children && (
        <ul className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
          {item.children.map((child) => (
            <NavItem key={child.href} item={child} currentPath={currentPath} />
          ))}
        </ul>
      )}
    </li>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.lang !== 'en' && params.lang !== 'tr') return {};
  const slugParts = params.slug ?? ['aivex-feed', 'getting-started'];
  const page = getDocPageBySlugAndLang(slugParts, params.lang);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export function generateStaticParams() {
  const langs: DocLang[] = ['en', 'tr'];
  const slugs = getAllDocSlugs();
  // Emit (lang, slug) for each combination, plus the lang-only root that
  // defaults to getting-started (the optional catch-all matches slug=undefined).
  const params: Array<{ lang: DocLang; slug?: string[] }> = [];
  for (const lang of langs) {
    params.push({ lang });
    for (const slug of slugs) params.push({ lang, slug });
  }
  return params;
}

export default function DocsPage({ params }: Props) {
  if (params.lang !== 'en' && params.lang !== 'tr') notFound();
  const lang = params.lang as DocLang;

  const slugParts = params.slug ?? ['aivex-feed', 'getting-started'];
  const page = getDocPageBySlugAndLang(slugParts, lang);
  if (!page) notFound();

  const currentPath = `/docs/${lang}/${slugParts.join('/')}`;
  const DOC_NAV = buildNav(lang);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      {/* Mobile nav breadcrumb */}
      <div className="mb-6 flex flex-wrap gap-1 text-sm text-muted-foreground lg:hidden">
        {DOC_NAV.map((item) => {
          const isActive = currentPath === item.href;
          const childActive = item.children?.find((c) => currentPath === c.href);
          if (!isActive && !childActive) return null;
          return (
            <div key={item.href ?? item.title} className="flex items-center gap-1">
              {item.href ? (
                <Link href={item.href} className="hover:text-foreground">{item.title}</Link>
              ) : (
                <span>{item.title}</span>
              )}
              {childActive && childActive.href && (
                <>
                  <span>/</span>
                  <Link href={childActive.href} className="font-medium text-foreground">{childActive.title}</Link>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {lang === 'tr' ? 'Belgeler' : 'Documentation'}
            </p>
            <nav>
              <ul className="space-y-1">
                {DOC_NAV.map((item) => (
                  <NavItem key={item.href} item={item} currentPath={currentPath} />
                ))}
              </ul>
            </nav>

            <div className="mt-8 border-t border-border pt-4">
              <p className="mb-2 text-xs text-muted-foreground">
                {lang === 'tr' ? 'Ayrıca bakın' : 'Also see'}
              </p>
              <Link href="/products" className="block text-sm text-muted-foreground hover:text-foreground py-0.5">
                {lang === 'tr' ? 'Ürünler' : 'Products'}
              </Link>
              <Link href="/products/feed" className="block text-sm text-muted-foreground hover:text-foreground py-0.5">
                AIVEX Feed
              </Link>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-8 border-b border-border pb-6">
            <h1 className="text-3xl font-bold">{page.title}</h1>
            {page.description && (
              <p className="mt-2 text-lg text-muted-foreground">{page.description}</p>
            )}
          </div>
          <div className="prose">
            <MDXRemote
              source={page.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {lang === 'tr' ? 'Sorularınız mı var? Ekiple iletişime geçin →' : 'Questions? Contact the team →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
