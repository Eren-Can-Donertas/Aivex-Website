import { NextResponse } from 'next/server';
import { getPublicSystemStatus } from '@/lib/system-status';

export const revalidate = 60;

export async function GET() {
  const status = await getPublicSystemStatus();
  return NextResponse.json(status, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
  });
}
