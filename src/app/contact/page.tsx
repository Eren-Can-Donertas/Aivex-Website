'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

type State = 'idle' | 'loading' | 'success' | 'error';

const INTEREST_OPTIONS = [
  { value: 'research_access',    label: 'Research access' },
  { value: 'investor_inquiry',   label: 'Investor inquiry' },
  { value: 'partnership',        label: 'Partnership' },
  { value: 'technical_eval',     label: 'Technical evaluation' },
  { value: 'other',              label: 'Other' },
];

export default function ContactPage() {
  const [state, setState] = useState<State>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    interestType: '',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          ...(form.organization ? { organization: form.organization } : {}),
          ...(form.role ? { role: form.role } : {}),
          ...(form.interestType ? { interest_type: form.interestType } : {}),
        }),
      });

      const data = (await res.json()) as { success: boolean; message: string };

      if (res.ok && data.success) {
        setState('success');
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setState('error');
      }
    } catch {
      setErrorMessage('Network error — please check your connection and try again.');
      setState('error');
    }
  }

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4">Contact</Badge>
          <h1 className="mb-4 text-4xl font-bold">Request Research Access</h1>
          <p className="text-muted-foreground">
            Tell us about your research workflow and intended use. We will be in touch within 2
            business days.
          </p>
        </div>

        {state === 'success' ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/10 p-10 text-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-semibold">Request Received</h2>
            <p className="text-muted-foreground">
              Thank you for your interest in AIVEX. We will reach out within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border p-8">
            {state === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
                  Name <span className="text-muted-foreground">*</span>
                </label>
                <Input
                  id="contact-name"
                  required
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
                  Email <span className="text-muted-foreground">*</span>
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="jane@institution.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-org" className="mb-1 block text-sm font-medium">
                  Organization
                </label>
                <Input
                  id="contact-org"
                  placeholder="Research firm, university, hedge fund..."
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="contact-role" className="mb-1 block text-sm font-medium">
                  Role / Title
                </label>
                <Input
                  id="contact-role"
                  placeholder="Quantitative researcher, analyst..."
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-interest" className="mb-1 block text-sm font-medium">
                Interest type
              </label>
              <select
                id="contact-interest"
                value={form.interestType}
                onChange={(e) => setForm({ ...form, interestType: e.target.value })}
                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="">Select an interest type...</option>
                {INTEREST_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
                Message / Use case <span className="text-muted-foreground">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Describe your research workflow and what you are hoping to evaluate..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button type="submit" className="w-full" disabled={state === 'loading'}>
              {state === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                'Send Request'
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              For research, investor, and partnership inquiries only. We do not provide financial
              advice.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
