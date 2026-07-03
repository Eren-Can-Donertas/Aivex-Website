import type { Metadata } from 'next';
import { LegalContent } from '@/components/pages/LegalContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Aivex Privacy Policy — what information this website collects, how it is used, and your choices.',
};

export default function PrivacyPage() {
  return <LegalContent doc="privacy" />;
}
