import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllDocSlugs, getAllDocPages, getDocPageBySlug } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { cn } from '@/lib/utils';
import type { DocNavItem } from '@/types';

interface Props {
  params: { slug?: string[] };
}

const DOC_NAV: DocNavItem[] = [
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

function NavItem({ item, currentPath }: { item: DocNavItem; currentPath: string }) {
  const isActive = currentPath === item.href;
  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          'block rounded-md px-3 py-1.5 text-sm transition-colors',
          isActive
            ? 'bg-primary/10 font-medium text-primary'
            : 'text-muted-foreground hover:text-foreground'
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
  const page = getDocPageBySlug(slugParts);
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
  const page = getDocPageBySlug(slugParts);
  if (!page) notFound();

  const currentPath = '/docs/' + slugParts.join('/');

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Documentation
            </h2>
            <nav>
              <ul className="space-y-1">
                {DOC_NAV.map((item) => (
                  <NavItem key={item.href} item={item} currentPath={currentPath} />
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h1 className="mb-2 text-3xl font-bold">{page.title}</h1>
          {page.description && (
            <p className="mb-8 text-lg text-muted-foreground">{page.description}</p>
          )}
          <div className="prose">
            <MDXRemote source={page.content} components={mdxComponents} />
          </div>
        </div>
      </div>
    </div>
  );
}
