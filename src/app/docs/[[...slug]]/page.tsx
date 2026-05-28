import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllDocSlugs, getDocPageBySlugAndLang } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { cn } from '@/lib/utils';
import type { DocNavItem } from '@/types';

interface Props {
  params: { slug?: string[] };
}

const DOC_NAV_EN: DocNavItem[] = [
  { title: 'Getting Started', href: '/docs/getting-started' },
  { title: 'Architecture Overview', href: '/docs/architecture-overview' },
  {
    title: 'Modules',
    href: '/docs/modules',
    children: [
      { title: 'Atomic Signals', href: '/docs/modules/atomic-signals' },
      { title: 'Signal Engine', href: '/docs/modules/signal-engine' },
      { title: 'Governor', href: '/docs/modules/governor' },
      { title: 'Watchdog', href: '/docs/modules/watchdog' },
    ],
  },
];

const DOC_NAV_TR: DocNavItem[] = [
  { title: 'Başlarken', href: '/docs/getting-started' },
  { title: 'Mimari Genel Bakış', href: '/docs/architecture-overview' },
  {
    title: 'Modüller',
    href: '/docs/modules',
    children: [
      { title: 'Atomik Sinyaller', href: '/docs/modules/atomic-signals' },
      { title: 'Sinyal Motoru', href: '/docs/modules/signal-engine' },
      { title: 'Vali', href: '/docs/modules/governor' },
      { title: 'İzleyici', href: '/docs/modules/watchdog' },
    ],
  },
];

function NavItem({ item, currentPath }: { item: DocNavItem; currentPath: string }) {
  const isActive = currentPath === item.href;
  const isParentOfActive = item.children?.some((c) => currentPath === c.href);
  return (
    <li>
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
  const slugParts = params.slug ?? ['getting-started'];
  const page = getDocPageBySlugAndLang(slugParts, 'en');
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export default function DocsPage({ params }: Props) {
  const slugParts = params.slug ?? ['getting-started'];

  const cookieStore = cookies();
  const lang = cookieStore.get('aivex-lang')?.value === 'en' ? 'en' : 'tr';

  const page = getDocPageBySlugAndLang(slugParts, lang);
  if (!page) notFound();

  const currentPath = '/docs/' + slugParts.join('/');
  const DOC_NAV = lang === 'tr' ? DOC_NAV_TR : DOC_NAV_EN;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      {/* Mobile nav breadcrumb */}
      <div className="mb-6 flex flex-wrap gap-1 text-sm text-muted-foreground lg:hidden">
        {DOC_NAV.map((item) => {
          const isActive = currentPath === item.href;
          const childActive = item.children?.find((c) => currentPath === c.href);
          if (!isActive && !childActive) return null;
          return (
            <div key={item.href} className="flex items-center gap-1">
              <Link href={item.href} className="hover:text-foreground">{item.title}</Link>
              {childActive && (
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
              <Link href="/product" className="block text-sm text-muted-foreground hover:text-foreground py-0.5">
                {lang === 'tr' ? 'Ürüne Genel Bakış' : 'Product Overview'}
              </Link>
              <Link href="/methodology" className="block text-sm text-muted-foreground hover:text-foreground py-0.5">
                {lang === 'tr' ? 'Metodoloji' : 'Methodology'}
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
