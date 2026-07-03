import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About AIVEX Analytics — mission, team, research principles, and roadmap for AI-driven signal research infrastructure.',
};

export default function AboutPage() {
  return <AboutContent />;
}
