'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackWaitlistSignup } from '@/lib/analytics';
import { CheckCircle, Loader2 } from 'lucide-react';
import { addWaitlistEntry } from '@/lib/mock-store';

type State = 'idle' | 'loading' | 'success' | 'error';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setState('loading');

    const result = addWaitlistEntry(email);

    if (result.ok && !result.alreadyExists) {
      setState('success');
      setMessage("You're on the list! We'll be in touch soon.");
      trackWaitlistSignup(email);
      setEmail('');
    } else if (result.ok && result.alreadyExists) {
      setState('success');
      setMessage("You're already on the list — we'll be in touch.");
    } else if (!result.ok) {
      setState('error');
      setMessage(result.reason);
    }
  }

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h2 className="mb-3 text-3xl font-bold">Get Early Access</h2>
        <p className="mb-8 text-muted-foreground">
          Join researchers and quant teams evaluating AIVEX for systematic signal research.
        </p>

        {state === 'success' ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-8">
            <CheckCircle className="h-10 w-10 text-green-500" />
            <p className="font-semibold text-green-600 dark:text-green-400">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="you@institution.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              disabled={state === 'loading'}
              className="flex-1"
              aria-label="Email address"
            />
            <Button type="submit" disabled={state === 'loading'} className="shrink-0">
              {state === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </form>
        )}

        {state === 'error' && (
          <p className="mt-3 text-sm text-red-500">{message}</p>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          No spam. Research updates only. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
