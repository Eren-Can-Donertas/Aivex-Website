import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from './test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Header />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the AIVEX brand name', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('AIVEX')).toBeDefined();
  });

  it('renders all four main navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Products' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Docs' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Blog' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'About' })).toBeDefined();
  });

  it('nav links point to correct hrefs', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Products' }).getAttribute('href')).toBe('/products');
    expect(screen.getByRole('link', { name: 'Blog' }).getAttribute('href')).toBe('/blog');
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about');
  });

  it('Docs nav link points to the EN getting-started route', () => {
    renderWithProviders(<Header />, { lang: 'en' });
    expect(
      screen.getByRole('link', { name: 'Docs' }).getAttribute('href')
    ).toBe('/docs/en/getting-started');
  });

  it('Docs nav link uses the TR getting-started route when language is TR', () => {
    renderWithProviders(<Header />, { lang: 'tr' });
    expect(
      screen.getByRole('link', { name: /Belgeler|Docs/i }).getAttribute('href')
    ).toBe('/docs/tr/getting-started');
  });

  it('renders the Request Access CTA', () => {
    renderWithProviders(<Header />);
    const cta = screen.getByRole('link', { name: 'Request Access' });
    expect(cta).toBeDefined();
    expect(cta.getAttribute('href')).toBe('/contact');
  });

  it('renders a theme toggle button', () => {
    renderWithProviders(<Header />);
    const toggle = screen.getByRole('button', { name: /Toggle theme/i });
    expect(toggle).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

describe('Footer', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the AIVEX brand home link in footer', () => {
    renderWithProviders(<Footer />);
    const homeLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href') === '/');
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(homeLinks[0].textContent ?? '').toMatch(/AIVEX/i);
  });

  it('renders footer section headings', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText('Products')).toBeDefined();
    expect(screen.getByText('Company')).toBeDefined();
    expect(screen.getByText('Legal')).toBeDefined();
  });

  it('renders footer links with correct hrefs', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByRole('link', { name: 'All Products' }).getAttribute('href')).toBe('/products');
    expect(screen.getByRole('link', { name: 'AIVEX Feed' }).getAttribute('href')).toBe('/products/feed');
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about');
    expect(screen.getByRole('link', { name: 'Contact' }).getAttribute('href')).toBe('/contact');
  });

  it('renders the disclaimer text', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/not financial.*advice/i)).toBeDefined();
  });

  it('renders the copyright notice', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/AIVEX Analytics/i)).toBeDefined();
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
  });
});
