import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { WaitlistEntry } from '@/types';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

function readWaitlist(): WaitlistEntry[] {
  try {
    if (!fs.existsSync(WAITLIST_FILE)) return [];
    const raw = fs.readFileSync(WAITLIST_FILE, 'utf-8');
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

function writeWaitlist(entries: WaitlistEntry[]): void {
  const dir = path.dirname(WAITLIST_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2), 'utf-8');
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

  if (typeof body !== 'object' || body === null || !('email' in body)) {
    return NextResponse.json(
      { success: false, message: 'Missing email field.' },
      { status: 400 }
    );
  }

  const email = String((body as Record<string, unknown>).email).trim().toLowerCase();

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, message: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  const entries = readWaitlist();
  const alreadyExists = entries.some((e) => e.email === email);

  if (alreadyExists) {
    return NextResponse.json(
      { success: true, message: "You're already on the waitlist!" },
      { status: 409 }
    );
  }

  const newEntry: WaitlistEntry = {
    email,
    createdAt: new Date().toISOString(),
  };

  entries.push(newEntry);
  writeWaitlist(entries);

  return NextResponse.json(
    { success: true, message: "You're on the list! We'll be in touch soon." },
    { status: 201 }
  );
}

export async function GET() {
  const entries = readWaitlist();
  return NextResponse.json({ count: entries.length });
}
