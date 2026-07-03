import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, productSlugs } from '@/data/products';
import { ProductDetailContent } from '@/components/pages/ProductDetailContent';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name.en,
    description: product.tagline.en,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetailContent slug={params.slug} />;
}
