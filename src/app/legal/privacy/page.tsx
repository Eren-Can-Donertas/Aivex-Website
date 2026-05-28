import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'AIVEX Privacy Policy — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10">
          <Badge className="mb-4">Legal</Badge>
          <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: February 20, 2026</p>
        </div>

        <div className="prose">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly via our contact form, including your
            name, email address, organization, role, and message. We do not collect payment
            information.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            Submitted information is used solely to respond to your inquiry and to communicate
            about AIVEX product updates, early access invitations, and research publications. We
            do not sell or share your personal information with third parties for marketing
            purposes.
          </p>

          <h2>Analytics</h2>
          <p>
            We may use privacy-preserving analytics tools (Plausible or PostHog) to understand
            page traffic. These tools do not use cookies and do not collect personally identifiable
            information beyond anonymized session data.
          </p>

          <h2>Data Retention</h2>
          <p>
            Contact submissions are retained until you request removal. You may request deletion
            of your data at any time by contacting us.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related requests, contact us via the contact form on this website.
          </p>
        </div>
      </div>
    </div>
  );
}
