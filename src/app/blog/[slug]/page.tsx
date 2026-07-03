import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { BlogPostMeta } from '@/components/pages/BlogPostMeta';

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
        <BlogPostMeta
          date={post.date}
          readingTime={post.readingTime}
          author={post.author}
          title={post.title}
        />

        <div className="prose">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <BlogPostMeta footer />
      </div>
    </div>
  );
}
