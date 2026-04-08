import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/analytics', () => ({
  trackWaitlistSignup: vi.fn(),
}));

import { Hero } from '@/components/sections/Hero';
import { ProductOverview } from '@/components/sections/ProductOverview';
import { TrustSection } from '@/components/sections/TrustSection';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

describe('Hero', () => {
  it('renders without crashing', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).not.toBeNull();
  });

  it('contains the main headline text', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
    expect(screen.getByText(/AI signal research/i)).toBeDefined();
  });

  it('renders the research preview badge', () => {
    render(<Hero />);
    expect(screen.getByText(/Research Preview/i)).toBeDefined();
  });

  it('renders the Request Demo CTA', () => {
    render(<Hero />);
    const demoLink = screen.getByRole('link', { name: /Request Demo/i });
    expect(demoLink).toBeDefined();
    expect(demoLink.getAttribute('href')).toBe('/contact');
  });

  it('renders the View Docs CTA', () => {
    render(<Hero />);
    const docsLink = screen.getByRole('link', { name: /View Docs/i });
    expect(docsLink).toBeDefined();
    expect(docsLink.getAttribute('href')).toBe('/docs/getting-started');
  });

  it('renders the stats strip', () => {
    render(<Hero />);
    expect(screen.getByText('Signal Modules')).toBeDefined();
    expect(screen.getByText('Uptime Target')).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// ProductOverview
// ---------------------------------------------------------------------------

describe('ProductOverview', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProductOverview />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the section heading', () => {
    render(<ProductOverview />);
    expect(screen.getByText('Modular Signal Architecture')).toBeDefined();
  });

  it('renders all six module cards', () => {
    render(<ProductOverview />);
    expect(screen.getByText('News Signal')).toBeDefined();
    expect(screen.getByText('Chart Signal')).toBeDefined();
    expect(screen.getByText('Metrics Signal')).toBeDefined();
    expect(screen.getByText('Signal Engine')).toBeDefined();
    expect(screen.getByText('Governor')).toBeDefined();
    expect(screen.getByText('Eye (API)')).toBeDefined();
  });

  it('renders at least one prototype badge', () => {
    render(<ProductOverview />);
    const prototypeBadges = screen.getAllByText('prototype');
    expect(prototypeBadges.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// TrustSection
// ---------------------------------------------------------------------------

describe('TrustSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<TrustSection />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the section heading', () => {
    render(<TrustSection />);
    expect(screen.getByText('Built on Three Principles')).toBeDefined();
  });

  it('renders all three principle titles', () => {
    render(<TrustSection />);
    expect(screen.getByText('Measurable')).toBeDefined();
    expect(screen.getByText('Auditable')).toBeDefined();
    expect(screen.getByText('Responsible')).toBeDefined();
  });

  it('renders the research disclaimer', () => {
    render(<TrustSection />);
    expect(screen.getByText(/research and analysis platform/i)).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// ArchitectureDiagram
// ---------------------------------------------------------------------------

describe('ArchitectureDiagram', () => {
  it('renders without crashing', () => {
    const { container } = render(<ArchitectureDiagram />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the section heading', () => {
    render(<ArchitectureDiagram />);
    expect(screen.getByText('System Architecture')).toBeDefined();
  });

  it('renders the SVG diagram element', () => {
    const { container } = render(<ArchitectureDiagram />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders the Watchdog label in the diagram', () => {
    render(<ArchitectureDiagram />);
    expect(screen.getByText(/Watchdog/i)).toBeDefined();
  });
});
