// Decorative signal-field motif: a faint blueprint grid with a few animated
// signal lines. Purely presentational; hidden from assistive tech and paused
// under prefers-reduced-motion (handled globally in globals.css).

export function SignalField({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-grid mask-fade opacity-60" />
      <svg
        className="absolute inset-0 h-full w-full mask-fade"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 260 L120 250 L200 210 L280 230 L360 150 L440 180 L520 110 L620 140 L720 90 L800 120"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeOpacity="0.55"
          className="animate-signal"
        />
        <path
          d="M0 320 L120 300 L220 315 L300 280 L400 300 L500 250 L600 275 L700 235 L800 255"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="animate-signal"
          style={{ animationDelay: '-2s' }}
        />
      </svg>
    </div>
  );
}
