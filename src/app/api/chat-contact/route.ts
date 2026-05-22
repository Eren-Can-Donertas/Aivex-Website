import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { ContactSubmission } from '@/types';

// Leads captured by the chat assistant are appended to the same newline-delimited
// store as the contact form, tagged with `source: 'chat-agent'` so they remain
// distinguishable. Mirrors the persistence pattern in /api/contact.
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'contact_submissions.jsonl');
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_FIELD_LENGTH = 2000;

function appendSubmission(entry: ContactSubmission): void {
  const dir = path.dirname(SUBMISSIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(SUBMISSIONS_FILE, JSON.stringify(entry) + '\n', 'utf-8');
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

  // The assistant's save_contact_info tool maps its params to these fields
  // client-side: customer_name -> name, customer_mail -> email, customer_brief -> message.
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';

  if (!name) {
    return NextResponse.json(
      { success: false, message: 'Name is required.' },
      { status: 400 }
    );
  }
  if (name.length > MAX_FIELD_LENGTH) {
    return NextResponse.json(
      { success: false, message: 'Name is too long.' },
      { status: 400 }
    );
  }

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, message: 'A valid email address is required.' },
      { status: 400 }
    );
  }

  if (message.length > MAX_FIELD_LENGTH) {
    return NextResponse.json(
      { success: false, message: 'Message is too long (max 2000 characters).' },
      { status: 400 }
    );
  }

  const entry: ContactSubmission = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
    source: 'chat-agent',
  };

  try {
    appendSubmission(entry);
  } catch (err) {
    console.error('[chat-contact] Failed to persist submission:', err);
    return NextResponse.json(
      { success: false, message: 'Server error — submission could not be saved.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: `Contact info saved for ${name}.` },
    { status: 201 }
  );
}
