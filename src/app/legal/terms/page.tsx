import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'AIVEX Terms of Service.',
};

export default function TermsPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10">
          <Badge className="mb-4">Legal</Badge>
          <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: February 20, 2026</p>
        </div>

        <div className="prose">
          <h2>Acceptance</h2>
          <p>
            By accessing AIVEX or its documentation, you agree to these terms. If you do not agree,
            do not use the platform.
          </p>

          <h2>Research Use Only</h2>
          <p>
            AIVEX is a research and analysis platform. All outputs — including signal scores,
            confidence values, and composed research outputs — are provided for informational and
            research purposes only. They do not constitute financial, investment, trading, or
            professional advice of any kind.
          </p>
          <p>
            You acknowledge that no signal output from AIVEX should be used as the sole or primary
            basis for any investment, trading, or financial decision.
          </p>

          <h2>No Warranty</h2>
          <p>
            AIVEX is provided &quot;as is&quot; without any warranty, express or implied. We make no
            representations regarding the accuracy, completeness, or fitness for any particular
            purpose of any output.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, AIVEX Analytics shall not be liable for any
            direct, indirect, incidental, special, or consequential damages arising from your use
            of or reliance on the platform or its outputs.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms at any time. Continued use of the platform constitutes
            acceptance of the updated terms.
          </p>
        </div>
      </div>
    </div>
  );
}
