import type { WaitlistEntry, ContactSubmission } from '@/types';

const WAITLIST_KEY = 'aivex:waitlist:v1';
const CONTACT_KEY = 'aivex:contact-submissions:v1';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_FIELD_LENGTH = 2000;

const memFallback: Map<string, string> = new Map();

function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return memFallback.get(key) ?? null;
  }
}

function storageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    memFallback.set(key, value);
  }
}

function readWaitlist(): WaitlistEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = storageGet(WAITLIST_KEY);
    return raw ? (JSON.parse(raw) as WaitlistEntry[]) : [];
  } catch {
    return [];
  }
}

function readContacts(): ContactSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = storageGet(CONTACT_KEY);
    return raw ? (JSON.parse(raw) as ContactSubmission[]) : [];
  } catch {
    return [];
  }
}

export function addWaitlistEntry(
  rawEmail: string
): { ok: true; alreadyExists: boolean } | { ok: false; reason: string } {
  if (typeof window === 'undefined') return { ok: true, alreadyExists: false };

  const email = rawEmail.trim().toLowerCase();

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return { ok: false, reason: 'Please provide a valid email address.' };
  }

  const entries = readWaitlist();
  if (entries.some((e) => e.email === email)) {
    return { ok: true, alreadyExists: true };
  }

  entries.push({ email, createdAt: new Date().toISOString() });
  storageSet(WAITLIST_KEY, JSON.stringify(entries));
  return { ok: true, alreadyExists: false };
}

export function addContactSubmission(input: {
  name: string;
  email: string;
  message: string;
  organization?: string;
}): { ok: true } | { ok: false; reason: string } {
  if (typeof window === 'undefined') return { ok: true };

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const message = input.message.trim();
  const organization = input.organization?.trim();

  if (!name) return { ok: false, reason: 'Name is required.' };
  if (name.length > MAX_FIELD_LENGTH) return { ok: false, reason: 'Name is too long.' };

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return { ok: false, reason: 'A valid email address is required.' };
  }

  if (!message) return { ok: false, reason: 'Message is required.' };
  if (message.length > MAX_FIELD_LENGTH) {
    return { ok: false, reason: 'Message is too long (max 2000 characters).' };
  }

  const entry: ContactSubmission = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
    ...(organization ? { organization } : {}),
  };

  const entries = readContacts();
  entries.push(entry);
  storageSet(CONTACT_KEY, JSON.stringify(entries));
  return { ok: true };
}
