'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader2, AlertCircle, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = locales[lang].contact;

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

    // Load the Supabase client on demand so its ~50 kB stays out of the
    // initial page bundle — it's only needed when someone actually submits.
    const { supabase, isSupabaseConfigured } = await import('@/lib/supabase');

    if (!isSupabaseConfigured) {
      setErrorMessage(t.error.generic);
      setState('error');
      return;
    }

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
        organization: form.organization.trim() || null,
        role: form.role.trim() || null,
        interest_type: form.interestType || null,
      });

      if (error) {
        setErrorMessage(error.message || t.error.generic);
        setState('error');
        return;
      }

      setState('success');
    } catch {
      setErrorMessage(t.error.network);
      setState('error');
    }
  }

  const interestOptions = [
    { value: 'research_access',  label: t.interests.research_access },
    { value: 'investor_inquiry', label: t.interests.investor_inquiry },
    { value: 'partnership',      label: t.interests.partnership },
    { value: 'technical_eval',   label: t.interests.technical_eval },
    { value: 'other',            label: t.interests.other },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4">{t.badge}</Badge>
          <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          {state === 'success' ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/10 p-10 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h2 className="text-xl font-semibold">{t.success.title}</h2>
              <p className="text-muted-foreground">{t.success.message}</p>
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
                    {t.form.name} <span className="text-muted-foreground">{t.form.nameRequired}</span>
                  </label>
                  <Input
                    id="contact-name"
                    required
                    placeholder={t.form.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
                    {t.form.email} <span className="text-muted-foreground">{t.form.nameRequired}</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    placeholder={t.form.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-org" className="mb-1 block text-sm font-medium">
                    {t.form.org}
                  </label>
                  <Input
                    id="contact-org"
                    placeholder={t.form.orgPlaceholder}
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-role" className="mb-1 block text-sm font-medium">
                    {t.form.role}
                  </label>
                  <Input
                    id="contact-role"
                    placeholder={t.form.rolePlaceholder}
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-interest" className="mb-1 block text-sm font-medium">
                  {t.form.interest}
                </label>
                <select
                  id="contact-interest"
                  value={form.interestType}
                  onChange={(e) => setForm({ ...form, interestType: e.target.value })}
                  className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="">{t.form.interestDefault}</option>
                  {interestOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
                  {t.form.message} <span className="text-muted-foreground">{t.form.nameRequired}</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder={t.form.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button type="submit" className="w-full" disabled={state === 'loading'}>
                {state === 'loading' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> {t.form.sending}</>
                ) : (
                  t.form.send
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">{t.form.disclaimer}</p>
            </form>
          )}

          {/* Direct contact card */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-1 text-base font-semibold">{t.directContactTitle}</h2>
              <p className="mb-5 text-sm text-muted-foreground">{t.directContactSubtitle}</p>

              <div className="space-y-4">
                <a
                  href="mailto:aivex.analytics@gmail.com"
                  className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{t.emailLabel}</p>
                    <p className="text-sm font-medium">aivex.analytics@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+905425623440"
                  className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{t.phoneLabel}</p>
                    <p className="text-sm font-medium">+90 542 562 3440</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">{t.responseTitle}</p>
              <p className="text-sm text-muted-foreground">{t.responseText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
