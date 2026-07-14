import type { Metadata } from 'next';
import { ProductsContent } from '@/components/pages/ProductsContent';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'AIVEX products — focused measurement instruments that convert market news and technical data into governed, machine-readable research outputs.',
};

export default function ProductsPage() {
  return <ProductsContent />;
}
