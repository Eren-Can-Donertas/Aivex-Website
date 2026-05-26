export interface ModuleHealth {
  label: string;
  health: 'fresh' | 'stale' | 'very_stale' | 'offline' | 'unknown';
  last_cycle_ago_minutes: number | null;
}

export interface PublicSystemStatus {
  updated_at: string;
  overall: 'operational' | 'degraded' | 'offline' | 'unavailable';
  /** 'live' = Eye API connected, 'fallback' = static demo values */
  mode: 'live' | 'fallback';
  modules: Record<string, ModuleHealth>;
  signal_count_24h: number | null;
  active_symbols: number | null;
  governor_status: 'open' | 'restricted' | 'closed' | 'unknown';
  api_status: 'online' | 'offline' | 'unknown';
}
