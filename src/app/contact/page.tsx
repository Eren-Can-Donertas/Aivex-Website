'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { addContactSubmission } from '@/lib/mock-store';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [state, setState] = useState<State>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMessage('');

    const result = addContactSubmission({
      name: form.name,
      email: form.email,
      message: form.message,
      ...(form.organization ? { organization: form.organization } : {}),
    });

    if (result.ok) {
      setState('success');
    } else {
      setErrorMessage(result.reason);
      setState('error');
    }
  }

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4">Contact</Badge>
          <h1 className="mb-4 text-4xl font-bold">Request a Demo</h1>
          <p className="text-muted-foreground">
            Tell us about your research workflow and we will be in touch within 2 business days.
          </p>
        </div>

        {state === 'success' ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/10 p-10 text-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-semibold">Message Received</h2>
            <p className="text-muted-foreground">
              Thank you for your interest in AIVEX. We will reach out within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border p-8">
            {state === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name *</label>
                <Input
                  required
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  required
                  placeholder="jane@institution.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Organization</label>
              <Input
                placeholder="Research firm, university, hedge fund..."
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Message *</label>
              <textarea
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
                'Send Message'
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              For research and analysis inquiries only.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
