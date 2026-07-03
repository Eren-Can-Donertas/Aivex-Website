import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from './test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import { Hero } from '@/components/sections/Hero';

// ---------------------------------------------------------------------------
// Hero CTAs
// ---------------------------------------------------------------------------

describe('Hero CTAs', () => {
  it('renders the primary Request Research Access button', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByRole('link', { name: /Request Product Demo/i })).toBeDefined();
  });

  it('Request Research Access routes to /contact', () => {
    renderWithProviders(<Hero />);
    const link = screen.getByRole('link', { name: /Request Product Demo/i });
    expect(link.getAttribute('href')).toBe('/contact');
  });

  it('renders the secondary View Methodology button', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByRole('link', { name: /View Methodology/i })).toBeDefined();
  });

  it('View Methodology routes to /methodology', () => {
    renderWithProviders(<Hero />);
    const link = screen.getByRole('link', { name: /View Methodology/i });
    expect(link.getAttribute('href')).toBe('/methodology');
  });

  it('renders both CTAs in the same section', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByRole('link', { name: /Request Product Demo/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /View Methodology/i })).toBeDefined();
  });
});
