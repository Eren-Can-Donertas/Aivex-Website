import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { BlogListContent } from '@/components/pages/BlogListContent';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Research updates, deep dives, and engineering notes from the AIVEX team.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListContent posts={posts} />;
}
