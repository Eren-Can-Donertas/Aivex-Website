import { getPublicSystemStatus } from '@/lib/system-status';
import type { PublicSystemStatus } from '@/types/system-status';

function relativeTime(isoString: string): string {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function cycleLabel(minutes: number | null): string {
  if (minutes === null) return '—';
  if (minutes < 60) return `${minutes}m ago`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m ago` : `${h}h ago`;
}

const HEALTH_CONFIG = {
  fresh:      { dot: 'bg-green-500',              label: 'Fresh'     },
  stale:      { dot: 'bg-yellow-500',             label: 'Delayed'   },
  very_stale: { dot: 'bg-orange-500',             label: 'Very Stale' },
  offline:    { dot: 'bg-red-500',                label: 'Offline'   },
  unknown:    { dot: 'bg-muted-foreground/40',    label: 'Unknown'   },
};

const OVERALL_CONFIG: Record<
  PublicSystemStatus['overall'],
  { label: string; color: string; dot: string }
> = {
  operational: { label: 'Operational',  color: 'text-green-500',        dot: 'bg-green-500'        },
  degraded:    { label: 'Degraded',     color: 'text-yellow-500',       dot: 'bg-yellow-500'       },
  offline:     { label: 'Offline',      color: 'text-red-500',          dot: 'bg-red-500'          },
  unavailable: { label: 'Unavailable',  color: 'text-muted-foreground', dot: 'bg-muted-foreground/40' },
};

function HealthDot({ health }: { health: string }) {
  const cfg = HEALTH_CONFIG[health as keyof typeof HEALTH_CONFIG] ?? HEALTH_CONFIG.unknown;
  return <span className={`inline-block h-2 w-2 rounded-full shrink-0 ${cfg.dot}`} />;
}

export async function SystemSnapshot() {
  const status = await getPublicSystemStatus();
  const overall = OVERALL_CONFIG[status.overall];

  return (
    <section className="border-y border-border bg-muted/10 py-14">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header row */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Research Runtime Snapshot</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Last updated: {relativeTime(status.updated_at)}
              {status.mode === 'fallback' && (
                <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs">
                  demo mode
                </span>
              )}
            </p>
          </div>
          <div className={`flex items-center gap-2 text-sm font-medium ${overall.color}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${overall.dot}`} />
            {overall.label}
          </div>
        </div>

        {/* Module status table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Module
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Health
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Last Cycle
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(status.modules).map(([key, mod]) => {
                const hcfg =
                  HEALTH_CONFIG[mod.health as keyof typeof HEALTH_CONFIG] ??
                  HEALTH_CONFIG.unknown;
                return (
                  <tr key={key} className="border-b border-border last:border-0 hover:bg-muted/10">
                    <td className="px-4 py-2.5 text-foreground/80">{mod.label}</td>
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2">
                        <HealthDot health={mod.health} />
                        <span className="text-foreground/70">{hcfg.label}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {cycleLabel(mod.last_cycle_ago_minutes)}
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
            <span className="text-muted-foreground">signals_24h: </span>
            <span className="text-foreground/80">{status.signal_count_24h ?? '—'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">active_symbols: </span>
            <span className="text-foreground/80">{status.active_symbols ?? '—'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">governor: </span>
            <span className="text-foreground/80 uppercase">{status.governor_status}</span>
          </div>
          <div>
            <span className="text-muted-foreground">eye_api: </span>
            <span className="text-foreground/80">{status.api_status}</span>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Research runtime status only. Outputs are informational research artifacts, not financial
          advice.{' '}
          {status.mode === 'fallback' &&
            'Live status data is not currently connected; showing demo values.'}
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
