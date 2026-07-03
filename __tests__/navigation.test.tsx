import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from './test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
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

  it('renders all five primary navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Products' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Research' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Roadmap' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Blog' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Founders' })).toBeDefined();
  });

  it('nav links point to correct hrefs', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Products' }).getAttribute('href')).toBe('/products');
    expect(screen.getByRole('link', { name: 'Research' }).getAttribute('href')).toBe('/research');
    expect(screen.getByRole('link', { name: 'Roadmap' }).getAttribute('href')).toBe('/roadmap');
    expect(screen.getByRole('link', { name: 'Blog' }).getAttribute('href')).toBe('/blog');
    expect(screen.getByRole('link', { name: 'Founders' }).getAttribute('href')).toBe('/founders');
  });

  it('renders the Request Demo CTA pointing to /contact', () => {
    renderWithProviders(<Header />);
    const cta = screen.getByRole('link', { name: 'Request Demo' });
    expect(cta).toBeDefined();
    expect(cta.getAttribute('href')).toBe('/contact');
  });

  it('renders a theme toggle button', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('button', { name: /Toggle theme/i })).toBeDefined();
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
    expect(screen.getByText('Resources')).toBeDefined();
  });

  it('renders footer links with correct hrefs', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByRole('link', { name: 'All products' }).getAttribute('href')).toBe('/products');
    expect(screen.getByRole('link', { name: 'Founders' }).getAttribute('href')).toBe('/founders');
    expect(screen.getByRole('link', { name: 'Contact' }).getAttribute('href')).toBe('/contact');
    expect(screen.getByRole('link', { name: 'Privacy Policy' }).getAttribute('href')).toBe('/legal/privacy');
  });

  it('renders the not-financial-advice disclaimer', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/not financial.*advice/i)).toBeDefined();
  });

  it('renders the copyright notice', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
  });
});
