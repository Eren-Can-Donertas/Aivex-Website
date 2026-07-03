import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from './test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import { Hero } from '@/components/sections/Hero';
import { HomeCTA } from '@/components/sections/HomeSections';

// ---------------------------------------------------------------------------
// Hero CTAs
// ---------------------------------------------------------------------------

describe('Hero CTAs', () => {
  it('primary CTA routes to /products', () => {
    renderWithProviders(<Hero />);
    const link = screen.getByRole('link', { name: /Explore products/i });
    expect(link.getAttribute('href')).toBe('/products');
  });

  it('secondary CTA routes to /research', () => {
    renderWithProviders(<Hero />);
    const link = screen.getByRole('link', { name: /Read the research/i });
    expect(link.getAttribute('href')).toBe('/research');
  });
});

// ---------------------------------------------------------------------------
// Closing CTA — the demo request is an explicit, user-initiated action
// ---------------------------------------------------------------------------

describe('Home closing CTA', () => {
  it('renders a demo request link to /contact', () => {
    renderWithProviders(<HomeCTA />);
    const link = screen.getByRole('link', { name: /Request a demo/i });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/contact');
  });

  it('renders a not-investment-advice disclaimer', () => {
    renderWithProviders(<HomeCTA />);
    expect(screen.getByText(/not financial, investment/i)).toBeDefined();
  });
});
