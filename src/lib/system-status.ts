import type { PublicSystemStatus, ModuleHealth } from '@/types/system-status';

const FALLBACK_MODULES: Record<string, ModuleHealth> = {
  news:          { label: 'news',          health: 'unknown', last_cycle_ago_minutes: null },
  chart:         { label: 'chart',         health: 'unknown', last_cycle_ago_minutes: null },
  metrics:       { label: 'metrics',       health: 'unknown', last_cycle_ago_minutes: null },
  signal_engine: { label: 'signal_engine', health: 'unknown', last_cycle_ago_minutes: null },
  governor:      { label: 'governor',      health: 'unknown', last_cycle_ago_minutes: null },
  eye_api:       { label: 'eye_api',       health: 'unknown', last_cycle_ago_minutes: null },
};

function makeFallback(): PublicSystemStatus {
  return {
    updated_at: new Date().toISOString(),
    overall: 'unavailable',
    mode: 'fallback',
    modules: FALLBACK_MODULES,
    signal_count_24h: null,
    active_symbols: null,
    governor_status: 'unknown',
    api_status: 'unknown',
  };
}

function parseMinutes(value: unknown): number | null {
  if (typeof value === 'number' && isFinite(value) && value >= 0) return Math.round(value);
  return null;
}

function parseHealth(value: unknown): ModuleHealth['health'] {
  const valid = ['fresh', 'stale', 'very_stale', 'offline', 'unknown'] as const;
  if (typeof value === 'string' && (valid as readonly string[]).includes(value)) {
    return value as ModuleHealth['health'];
  }
  return 'unknown';
}

function sanitizeEyeResponse(raw: unknown): PublicSystemStatus {
  if (typeof raw !== 'object' || raw === null) return makeFallback();

  const r = raw as Record<string, unknown>;

  const modulesRaw = typeof r.modules === 'object' && r.modules !== null
    ? (r.modules as Record<string, unknown>)
    : {};

  const modules: Record<string, ModuleHealth> = {};
  for (const key of Object.keys(FALLBACK_MODULES)) {
    const m = modulesRaw[key];
    if (typeof m === 'object' && m !== null) {
      const mobj = m as Record<string, unknown>;
      modules[key] = {
        label: key,
        health: parseHealth(mobj.health),
        last_cycle_ago_minutes: parseMinutes(mobj.last_cycle_ago_minutes),
      };
    } else {
      modules[key] = { ...FALLBACK_MODULES[key] };
    }
  }

  const overallRaw = r.overall as string | undefined;
  const validOverall = ['operational', 'degraded', 'offline', 'unavailable'] as const;
  const overall = validOverall.includes(overallRaw as typeof validOverall[number])
    ? (overallRaw as PublicSystemStatus['overall'])
    : 'unavailable';

  const govRaw = r.governor_status as string | undefined;
  const validGov = ['open', 'restricted', 'closed', 'unknown'] as const;
  const governor_status = validGov.includes(govRaw as typeof validGov[number])
    ? (govRaw as PublicSystemStatus['governor_status'])
    : 'unknown';

  const apiRaw = r.api_status as string | undefined;
  const validApi = ['online', 'offline', 'unknown'] as const;
  const api_status = validApi.includes(apiRaw as typeof validApi[number])
    ? (apiRaw as PublicSystemStatus['api_status'])
    : 'unknown';

  return {
    updated_at: new Date().toISOString(),
    overall,
    mode: 'live',
    modules,
    signal_count_24h:
      typeof r.signal_count_24h === 'number' ? Math.round(r.signal_count_24h) : null,
    active_symbols:
      typeof r.active_symbols === 'number' ? Math.round(r.active_symbols) : null,
    governor_status,
    api_status,
  };
}

export async function getPublicSystemStatus(): Promise<PublicSystemStatus> {
  const eyeBaseUrl = process.env.AIVEX_EYE_API_BASE_URL;
  const eyeToken = process.env.AIVEX_EYE_API_TOKEN;

  if (!eyeBaseUrl) {
    return makeFallback();
  }

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (eyeToken) headers['Authorization'] = `Bearer ${eyeToken}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${eyeBaseUrl}/eye/status/runtime`, {
      headers,
      signal: controller.signal,
      cache: 'no-store',
    }).finally(() => clearTimeout(timer));

    if (!res.ok) return makeFallback();

    const raw: unknown = await res.json();
    return sanitizeEyeResponse(raw);
  } catch {
    return makeFallback();
  }
}
