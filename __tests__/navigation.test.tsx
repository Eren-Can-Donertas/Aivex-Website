import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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
    const { container } = render(<Header />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the AIVEX brand name', () => {
    render(<Header />);
    expect(screen.getByText('AIVEX')).toBeDefined();
  });

  it('renders all five main navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Product' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Methodology' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Docs' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Blog' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'About' })).toBeDefined();
  });

  it('nav links point to correct hrefs', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Product' }).getAttribute('href')).toBe('/product');
    expect(screen.getByRole('link', { name: 'Methodology' }).getAttribute('href')).toBe('/methodology');
    expect(screen.getByRole('link', { name: 'Blog' }).getAttribute('href')).toBe('/blog');
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about');
  });

  it('Docs nav link points to getting-started', () => {
    render(<Header />);
    expect(
      screen.getByRole('link', { name: 'Docs' }).getAttribute('href')
    ).toBe('/docs/getting-started');
  });

  it('renders the Request Access CTA', () => {
    render(<Header />);
    const cta = screen.getByRole('link', { name: 'Request Access' });
    expect(cta).toBeDefined();
    expect(cta.getAttribute('href')).toBe('/contact');
  });

  it('renders a theme toggle button', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: /Toggle theme/i });
    expect(toggle).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

describe('Footer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the AIVEX brand in footer', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'AIVEX' })).toBeDefined();
  });

  it('renders footer section headings', () => {
    render(<Footer />);
    expect(screen.getByText('Product')).toBeDefined();
    expect(screen.getByText('Company')).toBeDefined();
    expect(screen.getByText('Legal')).toBeDefined();
  });

  it('renders footer links with correct hrefs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Overview' }).getAttribute('href')).toBe('/product');
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about');
    expect(screen.getByRole('link', { name: 'Contact' }).getAttribute('href')).toBe('/contact');
  });

  it('renders the disclaimer text', () => {
    render(<Footer />);
    expect(screen.getByText(/not financial.*advice/i)).toBeDefined();
  });

  it('renders the copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/AIVEX Analytics/i)).toBeDefined();
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
  });
});
