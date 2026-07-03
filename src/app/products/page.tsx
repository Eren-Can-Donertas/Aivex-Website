import type { Metadata } from 'next';
import { ProductsContent } from '@/components/pages/ProductsContent';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Aivex builds a portfolio of specialized, explainable market-research products — News, Chart, Company, Metrics & Validation, and the Model Horizon Lab.',
};

export default function ProductsPage() {
  return <ProductsContent />;
}
