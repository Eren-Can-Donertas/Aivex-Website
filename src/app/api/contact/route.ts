import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { ContactSubmission } from '@/types';

// Submissions are appended as newline-delimited JSON so the file survives
// large volumes without reading everything into memory on each write.
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

  // ── Required field validation ────────────────────────────────────────────
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';
  const organization =
    typeof raw.organization === 'string' ? raw.organization.trim() : undefined;

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

  if (!message) {
    return NextResponse.json(
      { success: false, message: 'Message is required.' },
      { status: 400 }
    );
  }
  if (message.length > MAX_FIELD_LENGTH) {
    return NextResponse.json(
      { success: false, message: 'Message is too long (max 2000 characters).' },
      { status: 400 }
    );
  }

  // ── Persist ───────────────────────────────────────────────────────────────
  const entry: ContactSubmission = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
    ...(organization ? { organization } : {}),
  };

  try {
    appendSubmission(entry);
  } catch (err) {
    console.error('[contact] Failed to persist submission:', err);
    return NextResponse.json(
      { success: false, message: 'Server error — submission could not be saved. Please try again.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Message received. We'll be in touch within 2 business days." },
    { status: 201 }
  );
}
