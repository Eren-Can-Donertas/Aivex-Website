import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/analytics', () => ({
  trackWaitlistSignup: vi.fn(),
}));

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

import { Hero } from '@/components/sections/Hero';
import { WaitlistForm } from '@/components/sections/WaitlistForm';

function mockApiResponse(body: object, status: number) {
  return Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  );
}

// ---------------------------------------------------------------------------
// Hero CTAs
// ---------------------------------------------------------------------------

describe('Hero CTAs', () => {
  it('renders the primary Request Research Access button', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Request Research Access/i })).toBeDefined();
  });

  it('Request Research Access routes to /contact', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /Request Research Access/i });
    expect(link.getAttribute('href')).toBe('/contact');
  });

  it('renders the secondary View Methodology button', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /View Methodology/i })).toBeDefined();
  });

  it('View Methodology routes to /methodology', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /View Methodology/i });
    expect(link.getAttribute('href')).toBe('/methodology');
  });

  it('renders both CTAs in the same section', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Request Research Access/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /View Methodology/i })).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// WaitlistForm — rendering
// ---------------------------------------------------------------------------

describe('WaitlistForm rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<WaitlistForm />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the section heading', () => {
    render(<WaitlistForm />);
    expect(screen.getByText('Get Early Access')).toBeDefined();
  });

  it('renders the email input', () => {
    render(<WaitlistForm />);
    expect(screen.getByRole('textbox', { name: /email/i })).toBeDefined();
  });

  it('renders the Join Waitlist submit button', () => {
    render(<WaitlistForm />);
    expect(screen.getByRole('button', { name: /Join Waitlist/i })).toBeDefined();
  });

  it('renders the no-spam disclaimer', () => {
    render(<WaitlistForm />);
    expect(screen.getByText(/No spam/i)).toBeDefined();
  });

  it('submit button is enabled on initial render', () => {
    render(<WaitlistForm />);
    const btn = screen.getByRole('button', { name: /Join Waitlist/i });
    expect((btn as HTMLButtonElement).disabled).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// WaitlistForm — validation
// ---------------------------------------------------------------------------

describe('WaitlistForm validation', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('shows a validation error for empty email on submit', async () => {
    render(<WaitlistForm />);
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(screen.getByText(/valid email/i)).toBeDefined();
  });

  it('shows a validation error for malformed email', async () => {
    render(<WaitlistForm />);
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'notanemail');
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(screen.getByText(/valid email/i)).toBeDefined();
  });

  it('does not call fetch when email is invalid', async () => {
    render(<WaitlistForm />);
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'bad@');
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('does not show success state when email is invalid', async () => {
    render(<WaitlistForm />);
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'notvalid');
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(screen.queryByText(/on the list/i)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// WaitlistForm — submission states
// ---------------------------------------------------------------------------

describe('WaitlistForm submission', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('calls fetch with correct endpoint on valid submit', async () => {
    mockFetch.mockReturnValueOnce(
      mockApiResponse({ success: true, message: "You're on the list!" }, 201)
    );
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'investor@vc.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/waitlist',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('shows success state after 201 response', async () => {
    mockFetch.mockReturnValueOnce(
      mockApiResponse({ success: true, message: "You're on the list!" }, 201)
    );
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/on the list/i)).toBeDefined());
  });

  it('shows already-on-list message for 409 response', async () => {
    mockFetch.mockReturnValueOnce(
      mockApiResponse({ success: true, message: 'Already on list' }, 409)
    );
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'existing@example.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/already on the list/i)).toBeDefined());
  });

  it('shows error state on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/network error/i)).toBeDefined());
  });

  it('clears the email input after successful submission', async () => {
    mockFetch.mockReturnValueOnce(
      mockApiResponse({ success: true, message: "You're on the list!" }, 201)
    );
    render(<WaitlistForm />);
    const input = screen.getByRole('textbox', { name: /email/i }) as HTMLInputElement;
    await userEvent.type(input, 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/on the list/i)).toBeDefined());
    expect(input.value).toBe('');
  });
});
