import type { Metadata } from 'next';
import { FoundersContent } from '@/components/pages/FoundersContent';

export const metadata: Metadata = {
  title: 'Founders',
  description:
    'The three co-founders building Aivex — complementary responsibilities across product and research architecture, engineering systems, and business strategy.',
};

export default function FoundersPage() {
  return <FoundersContent />;
}
