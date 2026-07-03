import type { Metadata } from 'next';
import { RoadmapContent } from '@/components/pages/RoadmapContent';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'The Aivex product and research roadmap, organized by maturity: foundation, in progress, next, and longer-term research.',
};

export default function RoadmapPage() {
  return <RoadmapContent />;
}
