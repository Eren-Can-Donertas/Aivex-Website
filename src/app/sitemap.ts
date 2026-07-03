import type { MetadataRoute } from 'next';
import { getAllPostSlugs, getAllDocSlugs } from '@/lib/mdx';
import { productSlugs } from '@/data/products';
import { reportSlugs } from '@/data/research';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivexanalytics.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/research`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/roadmap`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/founders`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const reportRoutes: MetadataRoute.Sitemap = reportSlugs.map((slug) => ({
    url: `${BASE_URL}/research/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const docSlugs = getAllDocSlugs();
  const docRoutes: MetadataRoute.Sitemap = (['en', 'tr'] as const).flatMap((lang) =>
    docSlugs.map((slugParts) => ({
      url: `${BASE_URL}/docs/${lang}/${slugParts.join('/')}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  );

  return [...staticRoutes, ...productRoutes, ...reportRoutes, ...blogRoutes, ...docRoutes];
}
