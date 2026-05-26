import { NextRequest, NextResponse } from 'next/server';
import type { ContactSubmission } from '@/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_FIELD_LENGTH = 2000;

const VALID_INTEREST_TYPES = new Set([
  'research_access',
  'investor_inquiry',
  'partnership',
  'technical_eval',
  'other',
]);

async function persistSubmission(entry: ContactSubmission & Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('No durable persistence configured for production.');
  }

  // Development-only: write to local filesystem
  const { default: fs } = await import('fs');
  const { default: path } = await import('path');
  const file = path.join(process.cwd(), 'data', 'contact_submissions.jsonl');
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(file, JSON.stringify(entry) + '\n', 'utf-8');
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json(
      { success: false, message: 'Request body must be a JSON object.' },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;

  const name         = typeof raw.name         === 'string' ? raw.name.trim()         : '';
  const email        = typeof raw.email        === 'string' ? raw.email.trim().toLowerCase() : '';
  const message      = typeof raw.message      === 'string' ? raw.message.trim()      : '';
  const organization = typeof raw.organization === 'string' ? raw.organization.trim() : undefined;
  const role         = typeof raw.role         === 'string' ? raw.role.trim()         : undefined;
  const interestType = typeof raw.interest_type === 'string' &&
    VALID_INTEREST_TYPES.has(raw.interest_type) ? raw.interest_type : undefined;

  if (!name || name.length > MAX_FIELD_LENGTH) {
    return NextResponse.json(
      { success: false, message: name ? 'Name is too long.' : 'Name is required.' },
      { status: 400 }
    );
  }

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, message: 'A valid email address is required.' },
      { status: 400 }
    );
  }

  if (!message || message.length > MAX_FIELD_LENGTH) {
    return NextResponse.json(
      { success: false, message: message ? 'Message is too long (max 2000 characters).' : 'Message is required.' },
      { status: 400 }
    );
  }

  const entry: ContactSubmission & Record<string, unknown> = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
    ...(organization ? { organization } : {}),
    ...(role         ? { role }         : {}),
    ...(interestType ? { interest_type: interestType } : {}),
  };

  try {
    await persistSubmission(entry);
  } catch (err) {
    console.error('[contact] Failed to persist submission:', err);
    const isProdMisconfig =
      process.env.NODE_ENV === 'production' && !process.env.CONTACT_WEBHOOK_URL;
    return NextResponse.json(
      {
        success: false,
        message: isProdMisconfig
          ? 'Submission service is not configured. Please contact us directly at the address in the footer.'
          : 'Server error — submission could not be saved. Please try again.',
      },
      { status: isProdMisconfig ? 503 : 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Request received. We'll be in touch within 2 business days." },
    { status: 201 }
  );
}
