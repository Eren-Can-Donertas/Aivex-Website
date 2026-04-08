import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Research updates, deep dives, and engineering notes from the AIVEX team.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4">Research Blog</Badge>
          <h1 className="mb-3 text-4xl font-bold">Latest Updates</h1>
          <p className="text-muted-foreground">
            Engineering notes, methodology deep dives, and research findings.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts yet. Check back soon.</p>
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
                        {post.readingTime} min read
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
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
