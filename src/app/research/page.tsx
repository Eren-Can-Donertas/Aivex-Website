import type { Metadata } from 'next';
import { ResearchContent } from '@/components/pages/ResearchContent';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Monthly engineering-research reports documenting how Aivex builds and validates its market-research products.',
};

export default function ResearchPage() {
  return <ResearchContent />;
}
