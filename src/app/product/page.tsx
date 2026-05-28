import type { Metadata } from 'next';
import { ProductContent } from '@/components/pages/ProductContent';

export const metadata: Metadata = {
  title: 'Product',
  description:
    'How AIVEX works — modular AI signal research infrastructure from data ingestion to governed, auditable output.',
};

export default function ProductPage() {
  return <ProductContent />;
}
