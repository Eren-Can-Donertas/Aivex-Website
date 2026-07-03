import { cookies } from 'next/headers';
import { getPublicSystemStatus } from '@/lib/system-status';
import type { PublicSystemStatus } from '@/types/system-status';
import { locales } from '@/locales';

function relativeTime(isoString: string, t: { sec: string; min: string; hr: string }): string {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `${diff}${t.sec}`;
  if (diff < 3600) return `${Math.floor(diff / 60)}${t.min}`;
  return `${Math.floor(diff / 3600)}${t.hr}`;
}

function cycleLabel(minutes: number | null, t: { min: string; hr: string; none: string }): string {
  if (minutes === null) return t.none;
  if (minutes < 60) return `${minutes}${t.min}`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}${t.hr} ${m}${t.min}` : `${h}${t.hr}`;
}

function HealthDot({ health }: { health: string }) {
  const dots: Record<string, string> = {
    fresh:      'bg-green-500',
    stale:      'bg-yellow-500',
    very_stale: 'bg-orange-500',
    offline:    'bg-red-500',
    unknown:    'bg-muted-foreground/40',
  };
  const dot = dots[health] ?? dots.unknown;
  return <span className={`inline-block h-2 w-2 rounded-full shrink-0 ${dot}`} />;
}

const OVERALL_COLORS: Record<PublicSystemStatus['overall'], { color: string; dot: string }> = {
  operational: { color: 'text-green-500',        dot: 'bg-green-500'        },
  degraded:    { color: 'text-yellow-500',       dot: 'bg-yellow-500'       },
  offline:     { color: 'text-red-500',          dot: 'bg-red-500'          },
  unavailable: { color: 'text-muted-foreground', dot: 'bg-muted-foreground/40' },
};

export async function SystemSnapshot() {
  const cookieStore = cookies();
  const lang = cookieStore.get('aivex-lang')?.value === 'en' ? 'en' : 'tr';
  const t = locales[lang].home.systemSnapshot;

  const status = await getPublicSystemStatus();
  const overallCfg = OVERALL_COLORS[status.overall];
  const overallLabel = t.overall[status.overall];

  return (
    <section className="border-y border-border bg-muted/10 py-14">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header row */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.lastUpdated}: {relativeTime(status.updated_at, t.time)}
              {status.mode === 'fallback' && (
                <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs">
                  {t.demoMode}
                </span>
              )}
            </p>
          </div>
          <div className={`flex items-center gap-2 text-sm font-medium ${overallCfg.color}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${overallCfg.dot}`} />
            {overallLabel}
          </div>
        </div>

        {/* Module status table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.moduleHeader}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.healthHeader}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.lastCycleHeader}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(status.modules).map(([key, mod]) => {
                const healthLabel = t.health[mod.health as keyof typeof t.health] ?? t.health.unknown;
                return (
                  <tr key={key} className="border-b border-border last:border-0 hover:bg-muted/10">
                    <td className="px-4 py-2.5 text-foreground/80">{mod.label}</td>
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2">
                        <HealthDot health={mod.health} />
                        <span className="text-foreground/70">{healthLabel}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {cycleLabel(mod.last_cycle_ago_minutes, t.cycle)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Aggregate stats */}
        <div className="mt-4 flex flex-wrap gap-6 font-mono text-sm">
          <div>
            <span className="text-muted-foreground">{t.stats.signals24h}: </span>
            <span className="text-foreground/80">{status.signal_count_24h ?? '—'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{t.stats.activeSymbols}: </span>
            <span className="text-foreground/80">{status.active_symbols ?? '—'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{t.stats.governor}: </span>
            <span className="text-foreground/80 uppercase">{status.governor_status}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{t.stats.eyeApi}: </span>
            <span className="text-foreground/80">{status.api_status}</span>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          {t.disclaimer}{' '}
          {status.mode === 'fallback' && t.fallbackNote}
        </p>
      </div>
    </section>
  );
}

export function SystemSnapshotSkeleton() {
  return (
    <section className="border-y border-border bg-muted/10 py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6 h-12 w-64 animate-pulse rounded-lg bg-muted" />
        <div className="rounded-xl border border-border bg-card p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-4 border-b border-border py-2.5 last:border-0">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
