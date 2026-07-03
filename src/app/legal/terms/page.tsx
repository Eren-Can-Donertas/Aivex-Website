import type { Metadata } from 'next';
import { LegalContent } from '@/components/pages/LegalContent';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Aivex Terms of Service governing use of this website and its research and analytical content.',
};

export default function TermsPage() {
  return <LegalContent doc="terms" />;
}
