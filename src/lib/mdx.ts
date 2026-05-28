import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { estimateReadingTime } from './utils';
import type { BlogPost, DocPage } from '@/types';

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_ROOT, 'blog');
const DOCS_DIR = path.join(CONTENT_ROOT, 'docs');

// ---------------------------------------------------------------------------
// Blog utilities
// ---------------------------------------------------------------------------

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      author: data.author,
      tags: data.tags ?? [],
      content,
      readingTime: estimateReadingTime(content),
    } satisfies BlogPost;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    author: data.author,
    tags: data.tags ?? [],
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

// ---------------------------------------------------------------------------
// Docs utilities
// ---------------------------------------------------------------------------

function walkDocsDir(dir: string, baseSlug: string[] = []): DocPage[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages: DocPage[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      pages.push(...walkDocsDir(path.join(dir, entry.name), [...baseSlug, entry.name]));
    } else if (entry.name.endsWith('.mdx')) {
      const slug = [...baseSlug, entry.name.replace(/\.mdx$/, '')];
      const filePath = path.join(dir, entry.name);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      pages.push({
        slug,
        title: data.title ?? slug.join('/'),
        description: data.description,
        content,
        order: data.order ?? 999,
        section: data.section,
      });
    }
  }

  return pages;
}

export function getAllDocPages(): DocPage[] {
  return walkDocsDir(DOCS_DIR).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getDocPageBySlug(slugParts: string[]): DocPage | null {
  const filePath = path.join(DOCS_DIR, ...slugParts) + '.mdx';
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug: slugParts,
    title: data.title ?? slugParts.join('/'),
    description: data.description,
    content,
    order: data.order,
    section: data.section,
  };
}

export function getDocPageBySlugAndLang(slugParts: string[], lang: string): DocPage | null {
  if (lang === 'tr') {
    const trPath = path.join(DOCS_DIR, ...slugParts) + '.tr.mdx';
    if (fs.existsSync(trPath)) {
      const raw = fs.readFileSync(trPath, 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug: slugParts,
        title: data.title ?? slugParts.join('/'),
        description: data.description,
        content,
        order: data.order,
        section: data.section,
      };
    }
  }
  return getDocPageBySlug(slugParts);
}

export function getAllDocSlugs(): string[][] {
  return walkDocsDir(DOCS_DIR).map((p) => p.slug);
}
