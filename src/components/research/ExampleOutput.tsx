'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';
import type { ExampleOutput as ExampleOutputData } from '@/data/types';

const TONE: Record<'pos' | 'neg' | 'neu', string> = {
  pos: 'text-status-available',
  neg: 'text-red-500 dark:text-red-400',
  neu: 'text-muted-foreground',
};

const TONE_BAR: Record<'pos' | 'neg' | 'neu', string> = {
  pos: 'bg-status-available',
  neg: 'bg-red-500/70',
  neu: 'bg-muted-foreground/50',
};

export function ExampleOutput({ data, compact = false }: { data: ExampleOutputData; compact?: boolean }) {
  const { lang } = useLanguage();
  const common = locales[lang].common;

  return (
    <figure className="panel-terminal not-prose">
      {/* Chrome header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-status-available/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-status-experimental/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-status-research/60" />
        </div>
        <span className="truncate font-mono text-xs text-muted-foreground">{data.title[lang]}</span>
        <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
          {common.researchOnly}
        </span>
      </div>

      <div className={`space-y-4 ${compact ? 'p-4' : 'p-5'}`}>
        {/* Score / metric rows */}
        {data.rows && data.rows.length > 0 && (
          <div className="space-y-2.5">
            {data.rows.map((row) => (
              <div key={row.label[lang]} className="flex items-center gap-3">
                <span className="w-40 shrink-0 truncate font-mono text-xs text-muted-foreground">
                  {row.label[lang]}
                </span>
                {typeof row.bar === 'number' ? (
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${Math.max(2, Math.min(100, row.bar))}%` }}
                    />
                  </span>
                ) : (
                  <span className="h-px flex-1 bg-border" />
                )}
                <span className="w-24 shrink-0 text-right font-mono text-xs font-semibold text-foreground">
                  {row.value}
                </span>
                {row.chip && (
                  <span className="hidden shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[0.65rem] text-primary sm:inline">
                    {row.chip}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* List items — headlines / leaderboard / events */}
        {data.items && data.items.length > 0 && (
          <ul className="space-y-2 border-t border-border pt-3">
            {data.items.map((item) => (
              <li key={item.title[lang]} className="flex items-start gap-3">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${TONE_BAR[item.tone]}`} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-foreground">{item.title[lang]}</span>
                  <span className="meta-row">{item.meta}</span>
                </span>
                <span className={`shrink-0 font-mono text-xs font-semibold ${TONE[item.tone]}`}>
                  {item.score > 0 ? `+${item.score.toFixed(2)}` : item.score.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <figcaption className="border-t border-border bg-muted/20 px-5 py-2.5 font-mono text-[0.7rem] text-muted-foreground">
        {common.illustrativeOutput}
      </figcaption>
    </figure>
  );
}
