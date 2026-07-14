import type { Metadata } from 'next';
import { FeedProductContent } from '@/components/pages/FeedProductContent';

export const metadata: Metadata = {
  title: 'AIVEX Feed',
  description:
    'AIVEX Feed — multi-source news ingestion, Turkish→English translation, and financial sentiment scoring. Turns financial news into machine-readable, auditable outputs.',
};

export default function FeedProductPage() {
  return <FeedProductContent />;
}
