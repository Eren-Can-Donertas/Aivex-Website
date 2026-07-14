import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders as render, screen } from './test-utils';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
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

  it('contains a level-1 heading', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
  });

  it('headline contains "measuring instrument"', () => {
    render(<Hero />);
    expect(screen.getByText(/measuring instrument/i)).toBeDefined();
  });

  it('renders the primary Request Product Demo CTA', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /Request Product Demo/i });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/contact');
  });

  it('renders the secondary View Methodology CTA', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /View Methodology/i });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/methodology');
  });

  it('renders the stats strip with Signal Modules and Runtime Supervision', () => {
    render(<Hero />);
    expect(screen.getByText('Signal Modules')).toBeDefined();
    expect(screen.getByText('Runtime Supervision')).toBeDefined();
  });

  it('does not render a defensive badge before the headline', () => {
    render(<Hero />);
    expect(screen.queryByText(/Research Preview/i)).toBeNull();
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
    expect(screen.getByText('Eye API')).toBeDefined();
  });

  it('renders professional status dials (no "prototype" badges)', () => {
    render(<ProductOverview />);
    expect(screen.queryByText('prototype')).toBeNull();
    // Dial chips show short codes; the full status label lives in the title attribute
    const internalRuntimeDials = screen.getAllByTitle('Internal Runtime');
    expect(internalRuntimeDials.length).toBeGreaterThan(0);
    expect(screen.getByTitle('Risk Gate Active')).toBeDefined();
    expect(screen.getByText('GATE')).toBeDefined();
  });

  it('renders output descriptions for each module', () => {
    render(<ProductOverview />);
    const outputLabels = screen.getAllByText(/Output —/i);
    expect(outputLabels.length).toBeGreaterThan(0);
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
