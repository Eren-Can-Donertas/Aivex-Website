import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fs module
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
    mkdirSync: vi.fn(),
  },
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  mkdirSync: vi.fn(),
}));

// Mock path
vi.mock('path', async () => {
  const actual = await vi.importActual<typeof import('path')>('path');
  return {
    ...actual,
    default: actual,
  };
});

import fs from 'fs';
import { NextRequest } from 'next/server';

async function importRoute() {
  // Re-import fresh each time to reset module state
  const mod = await import('@/app/api/waitlist/route');
  return { POST: mod.POST, GET: mod.GET };
}

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue('[]');
    vi.mocked(fs.writeFileSync).mockImplementation(() => undefined);
  });

  it('accepts a valid email and returns 201', async () => {
    const { POST } = await importRoute();
    const req = makeRequest({ email: 'test@example.com' });
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it('returns 400 for invalid email', async () => {
    const { POST } = await importRoute();
    const req = makeRequest({ email: 'not-an-email' });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
  });

  it('returns 409 for duplicate email', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify([{ email: 'existing@example.com', createdAt: '2024-01-01T00:00:00Z' }])
    );
    const { POST } = await importRoute();
    const req = makeRequest({ email: 'existing@example.com' });
    const res = await POST(req);
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.success).toBe(true); // 409 still returns success:true for idempotency
  });

  it('returns 400 for missing email field', async () => {
    const { POST } = await importRoute();
    const req = makeRequest({ name: 'no email here' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});

describe('GET /api/waitlist', () => {
  it('returns count of entries', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify([
        { email: 'a@example.com', createdAt: '2024-01-01T00:00:00Z' },
        { email: 'b@example.com', createdAt: '2024-01-02T00:00:00Z' },
      ])
    );
    const { GET } = await importRoute();
    const res = await GET();
    const body = await res.json();
    expect(body.count).toBe(2);
  });
});
