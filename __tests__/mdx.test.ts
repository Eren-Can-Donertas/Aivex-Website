import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';

// Mock fs module
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
}));

import fs from 'fs';

const MOCK_POST_CONTENT = `---
title: "Test Post"
date: "2024-01-15"
excerpt: "A test post excerpt."
author: "Test Author"
tags: ["test"]
---

# Test Post

This is test content for the blog post.
`;

const MOCK_DOC_CONTENT = `---
title: Getting Started
description: A test doc page.
order: 1
---

# Getting Started

This is test doc content.
`;

describe('getAllPosts', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns empty array when blog directory does not exist', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const { getAllPosts } = await import('@/lib/mdx');
    const posts = getAllPosts();
    expect(posts).toEqual([]);
  });

  it('returns parsed posts from blog directory', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockReturnValue(['2024-01-15-test.mdx'] as never);
    vi.mocked(fs.readFileSync).mockReturnValue(MOCK_POST_CONTENT as never);

    const { getAllPosts } = await import('@/lib/mdx');
    const posts = getAllPosts();

    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('Test Post');
    expect(posts[0].date).toBe('2024-01-15');
    expect(posts[0].excerpt).toBe('A test post excerpt.');
  });
});

describe('getPostBySlug', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns null when file does not exist', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const { getPostBySlug } = await import('@/lib/mdx');
    const post = getPostBySlug('nonexistent-slug');
    expect(post).toBeNull();
  });

  it('returns parsed post when file exists', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(MOCK_POST_CONTENT as never);

    const { getPostBySlug } = await import('@/lib/mdx');
    const post = getPostBySlug('2024-01-15-test');

    expect(post).not.toBeNull();
    expect(post?.title).toBe('Test Post');
    expect(post?.author).toBe('Test Author');
  });
});
