export function ArchitectureDiagram() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">System Architecture</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A parallel, fault-isolated pipeline from raw data to governed research signals.
          </p>
        </div>

        {/* SVG Architecture Diagram */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card p-6 shadow-sm">
          <svg
            viewBox="0 0 900 420"
            className="mx-auto w-full max-w-4xl"
            aria-label="AIVEX system architecture diagram"
          >
            {/* Data Sources */}
            <g>
              <rect x="20" y="170" width="120" height="40" rx="6" fill="hsl(221 83% 48% / 0.15)" stroke="hsl(221 83% 48%)" strokeWidth="1.5" />
              <text x="80" y="195" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">News APIs</text>

              <rect x="20" y="230" width="120" height="40" rx="6" fill="hsl(221 83% 48% / 0.15)" stroke="hsl(221 83% 48%)" strokeWidth="1.5" />
              <text x="80" y="255" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Market Data</text>

              <rect x="20" y="110" width="120" height="40" rx="6" fill="hsl(221 83% 48% / 0.15)" stroke="hsl(221 83% 48%)" strokeWidth="1.5" />
              <text x="80" y="135" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Fundamentals</text>
            </g>

            {/* Arrows to modules */}
            <line x1="140" y1="130" x2="200" y2="150" stroke="hsl(221 83% 48%)" strokeWidth="1.5" strokeDasharray="4,2" />
            <line x1="140" y1="190" x2="200" y2="210" stroke="hsl(221 83% 48%)" strokeWidth="1.5" strokeDasharray="4,2" />
            <line x1="140" y1="250" x2="200" y2="270" stroke="hsl(221 83% 48%)" strokeWidth="1.5" strokeDasharray="4,2" />

            {/* Signal Modules */}
            <rect x="200" y="130" width="140" height="45" rx="6" fill="hsl(188 95% 43% / 0.15)" stroke="hsl(188 95% 43%)" strokeWidth="1.5" />
            <text x="270" y="158" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">News Signal</text>

            <rect x="200" y="190" width="140" height="45" rx="6" fill="hsl(188 95% 43% / 0.15)" stroke="hsl(188 95% 43%)" strokeWidth="1.5" />
            <text x="270" y="218" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Chart Signal</text>

            <rect x="200" y="250" width="140" height="45" rx="6" fill="hsl(188 95% 43% / 0.15)" stroke="hsl(188 95% 43%)" strokeWidth="1.5" />
            <text x="270" y="278" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Metrics Signal</text>

            {/* Arrows to Signal Engine */}
            <line x1="340" y1="153" x2="420" y2="200" stroke="hsl(188 95% 43%)" strokeWidth="2" />
            <line x1="340" y1="213" x2="420" y2="210" stroke="hsl(188 95% 43%)" strokeWidth="2" />
            <line x1="340" y1="273" x2="420" y2="220" stroke="hsl(188 95% 43%)" strokeWidth="2" />

            {/* Signal Engine */}
            <rect x="420" y="175" width="140" height="60" rx="6" fill="hsl(221 83% 48% / 0.25)" stroke="hsl(221 83% 48%)" strokeWidth="2" />
            <text x="490" y="200" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="700">Signal Engine</text>
            <text x="490" y="220" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">(Brain)</text>

            {/* Arrow to Governor */}
            <line x1="560" y1="205" x2="630" y2="205" stroke="hsl(221 83% 48%)" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Governor */}
            <rect x="630" y="175" width="130" height="60" rx="6" fill="hsl(0 72% 51% / 0.1)" stroke="hsl(0 72% 51%)" strokeWidth="1.5" />
            <text x="695" y="200" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="700">Governor</text>
            <text x="695" y="218" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">Risk Gating</text>

            {/* Arrow to API */}
            <line x1="760" y1="205" x2="820" y2="205" stroke="currentColor" strokeWidth="2" opacity="0.5" markerEnd="url(#arrowhead2)" />

            {/* API output */}
            <rect x="820" y="175" width="60" height="60" rx="6" fill="hsl(221 83% 48% / 0.1)" stroke="hsl(221 83% 48%)" strokeWidth="1.5" />
            <text x="850" y="200" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">Eye</text>
            <text x="850" y="218" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">API</text>

            {/* Watchdog bar at bottom */}
            <rect x="20" y="360" width="860" height="36" rx="6" fill="hsl(222 47% 8% / 0.1)" stroke="hsl(215 20% 65%)" strokeWidth="1" strokeDasharray="6,3" />
            <text x="450" y="383" textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.7" fontWeight="600">Watchdog — 24/7 process supervision, auto-restart, heartbeat monitoring</text>

            {/* Arrowhead markers */}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(221 83% 48%)" />
              </marker>
              <marker id="arrowhead2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="currentColor" opacity="0.5" />
              </marker>
            </defs>

            {/* Legend */}
            <text x="20" y="40" fontSize="11" fill="currentColor" opacity="0.5" fontWeight="500">DATA SOURCES</text>
            <text x="200" y="40" fontSize="11" fill="currentColor" opacity="0.5" fontWeight="500">ATOMIC SIGNALS</text>
            <text x="420" y="40" fontSize="11" fill="currentColor" opacity="0.5" fontWeight="500">COMPOSITION</text>
            <text x="630" y="40" fontSize="11" fill="currentColor" opacity="0.5" fontWeight="500">RISK GATE</text>
            <text x="820" y="40" fontSize="11" fill="currentColor" opacity="0.5" fontWeight="500">OUTPUT</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
