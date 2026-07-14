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

  it('renders the secondary Explore Products button', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByRole('link', { name: /Explore Products/i })).toBeDefined();
  });

  it('Explore Products routes to /products', () => {
    renderWithProviders(<Hero />);
    const link = screen.getByRole('link', { name: /Explore Products/i });
    expect(link.getAttribute('href')).toBe('/products');
  });

  it('renders both CTAs in the same section', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByRole('link', { name: /Request Product Demo/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /Explore Products/i })).toBeDefined();
  });
});
