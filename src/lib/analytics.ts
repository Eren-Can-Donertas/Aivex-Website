type EventProps = Record<string, string>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    posthog?: { capture: (event: string, props?: EventProps) => void };
  }
}

const PROVIDER = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

export function trackEvent(name: string, props?: EventProps): void {
  if (typeof window === 'undefined') return;
  if (!PROVIDER) return; // no-op in development or when not configured

  try {
    if (PROVIDER === 'plausible' && window.plausible) {
      window.plausible(name, { props });
    } else if (PROVIDER === 'posthog' && window.posthog) {
      window.posthog.capture(name, props);
    }
  } catch {
    // analytics must never crash the app
  }
}

export function trackPageView(path: string): void {
  trackEvent('pageview', { path });
}

export function trackWaitlistSignup(email: string): void {
  trackEvent('waitlist_signup', { email_domain: email.split('@')[1] ?? 'unknown' });
}

export function trackCTAClick(cta: string, location: string): void {
  trackEvent('cta_click', { cta, location });
}
