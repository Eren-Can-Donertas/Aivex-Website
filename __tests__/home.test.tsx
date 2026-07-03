import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders as render, screen } from './test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import { Hero } from '@/components/sections/Hero';
import { WhyModular, ProductEcosystem, HomeMethodology } from '@/components/sections/HomeSections';

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

describe('Hero', () => {
  it('renders without crashing', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).not.toBeNull();
  });

  it('contains a level-1 heading', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
  });

  it('headline communicates the anti-single-signal positioning', () => {
    render(<Hero />);
    expect(screen.getByText(/single signal/i)).toBeDefined();
  });

  it('renders the primary Explore products CTA to /products', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /Explore products/i });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/products');
  });

  it('renders the secondary Read the research CTA to /research', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /Read the research/i });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/research');
  });

  it('renders the four analytical lenses in the research panel', () => {
    render(<Hero />);
    expect(screen.getByText('News')).toBeDefined();
    expect(screen.getByText('Chart')).toBeDefined();
    expect(screen.getByText('Company')).toBeDefined();
    expect(screen.getByText('Metrics')).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// WhyModular
// ---------------------------------------------------------------------------

describe('WhyModular', () => {
  it('renders without crashing', () => {
    const { container } = render(<WhyModular />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a heading about markets being noisy / multi-causal', () => {
    render(<WhyModular />);
    expect(screen.getByText(/multi-causal/i)).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// ProductEcosystem
// ---------------------------------------------------------------------------

describe('ProductEcosystem', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProductEcosystem />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the five product names', () => {
    render(<ProductEcosystem />);
    expect(screen.getByText('News Intelligence')).toBeDefined();
    expect(screen.getByText('Chart Intelligence')).toBeDefined();
    expect(screen.getByText('Company Intelligence')).toBeDefined();
    expect(screen.getByText('Metrics & Validation')).toBeDefined();
    expect(screen.getByText('Model Horizon Lab')).toBeDefined();
  });

  it('renders honest product status labels', () => {
    render(<ProductEcosystem />);
    expect(screen.getAllByText('Research').length).toBeGreaterThan(0);
    expect(screen.getByText('In Development')).toBeDefined();
    expect(screen.getByText('Experimental')).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// HomeMethodology
// ---------------------------------------------------------------------------

describe('HomeMethodology', () => {
  it('renders without crashing', () => {
    const { container } = render(<HomeMethodology />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the observe / interpret / validate steps', () => {
    render(<HomeMethodology />);
    expect(screen.getByText('Observe')).toBeDefined();
    expect(screen.getByText('Interpret')).toBeDefined();
    expect(screen.getByText('Validate')).toBeDefined();
  });
});
