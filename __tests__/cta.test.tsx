import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/analytics', () => ({
  trackWaitlistSignup: vi.fn(),
}));

vi.mock('@/lib/mock-store', () => ({
  addWaitlistEntry: vi.fn(),
  addContactSubmission: vi.fn(),
}));

import { Hero } from '@/components/sections/Hero';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { addWaitlistEntry } from '@/lib/mock-store';

// ---------------------------------------------------------------------------
// Hero CTAs
// ---------------------------------------------------------------------------

describe('Hero CTAs', () => {
  it('renders the primary Request Demo button', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Request Demo/i })).toBeDefined();
  });

  it('Request Demo routes to /contact', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /Request Demo/i });
    expect(link.getAttribute('href')).toBe('/contact');
  });

  it('renders the secondary View Docs button', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /View Docs/i })).toBeDefined();
  });

  it('View Docs routes to /docs/getting-started', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /View Docs/i });
    expect(link.getAttribute('href')).toBe('/docs/getting-started');
  });

  it('renders both CTAs in the same section', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Request Demo/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /View Docs/i })).toBeDefined();
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
    vi.mocked(addWaitlistEntry).mockReset();
  });

  it('shows a validation error for empty email on submit', async () => {
    render(<WaitlistForm />);
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(screen.getByText(/valid email/i)).toBeDefined();
  });

  it('shows a validation error for malformed email', async () => {
    const { container } = render(<WaitlistForm />);
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'notanemail');
    fireEvent.submit(container.querySelector('form')!);
    await waitFor(() => expect(screen.getByText(/valid email/i)).toBeDefined());
  });

  it('does not call addWaitlistEntry when email is invalid', async () => {
    render(<WaitlistForm />);
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'bad@');
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(addWaitlistEntry).not.toHaveBeenCalled();
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
    vi.mocked(addWaitlistEntry).mockReset();
  });

  it('calls addWaitlistEntry with correct email on valid submit', async () => {
    vi.mocked(addWaitlistEntry).mockReturnValueOnce({ ok: true, alreadyExists: false });
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'investor@vc.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    expect(addWaitlistEntry).toHaveBeenCalledWith('investor@vc.com');
  });

  it('shows success state after successful submission', async () => {
    vi.mocked(addWaitlistEntry).mockReturnValueOnce({ ok: true, alreadyExists: false });
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/on the list/i)).toBeDefined());
  });

  it('shows already-on-list message when alreadyExists is true', async () => {
    vi.mocked(addWaitlistEntry).mockReturnValueOnce({ ok: true, alreadyExists: true });
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'existing@example.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/already on the list/i)).toBeDefined());
  });

  it('shows error state when addWaitlistEntry returns ok: false', async () => {
    vi.mocked(addWaitlistEntry).mockReturnValueOnce({ ok: false, reason: 'Please provide a valid email address.' });
    render(<WaitlistForm />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    );
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/valid email/i)).toBeDefined());
  });

  it('email input is no longer visible after successful submission', async () => {
    vi.mocked(addWaitlistEntry).mockReturnValueOnce({ ok: true, alreadyExists: false });
    render(<WaitlistForm />);
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join Waitlist/i }));
    await waitFor(() => expect(screen.getByText(/on the list/i)).toBeDefined());
    expect(screen.queryByRole('textbox', { name: /email/i })).toBeNull();
  });
});
