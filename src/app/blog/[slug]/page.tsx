import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { ArrowLeft, Clock } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readingTime} min read
              </span>
            )}
            {post.author && <span>by {post.author}</span>}
          </div>
        </header>

        <div className="prose">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            For research and informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
