export function ArchitectureDiagram() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">System Architecture</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A parallel, fault-isolated pipeline from raw data to governed research signals.
            Every output is traceable from source to emission.
          </p>
        </div>

        {/* SVG Architecture Diagram — using hsla() for cross-browser SVG attribute compat */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card p-6 shadow-sm">
          <svg
            viewBox="0 0 920 440"
            className="mx-auto w-full max-w-4xl"
            aria-label="AIVEX system architecture diagram showing data flow from sources through signal modules to governed API output"
          >
            <defs>
              <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsla(217, 62%, 50%, 0.9)" />
              </marker>
              <marker id="arrow-steel" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsla(213, 50%, 54%, 0.9)" />
              </marker>
              <marker id="arrow-muted" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="currentColor" opacity="0.4" />
              </marker>
            </defs>

            {/* Legend row */}
            <text x="20"  y="38" fontSize="10" fill="currentColor" opacity="0.45" fontWeight="600" letterSpacing="1">DATA SOURCES</text>
            <text x="210" y="38" fontSize="10" fill="currentColor" opacity="0.45" fontWeight="600" letterSpacing="1">ATOMIC SIGNALS</text>
            <text x="430" y="38" fontSize="10" fill="currentColor" opacity="0.45" fontWeight="600" letterSpacing="1">COMPOSITION</text>
            <text x="640" y="38" fontSize="10" fill="currentColor" opacity="0.45" fontWeight="600" letterSpacing="1">RISK GATE</text>
            <text x="835" y="38" fontSize="10" fill="currentColor" opacity="0.45" fontWeight="600" letterSpacing="1">OUTPUT</text>

            {/* Data Sources */}
            <rect x="20" y="105" width="125" height="40" rx="5" fill="hsla(217, 62%, 50%, 0.12)" stroke="hsla(217, 62%, 50%, 0.7)" strokeWidth="1.5" />
            <text x="83" y="130" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Fundamentals</text>

            <rect x="20" y="165" width="125" height="40" rx="5" fill="hsla(217, 62%, 50%, 0.12)" stroke="hsla(217, 62%, 50%, 0.7)" strokeWidth="1.5" />
            <text x="83" y="190" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">News APIs</text>

            <rect x="20" y="225" width="125" height="40" rx="5" fill="hsla(217, 62%, 50%, 0.12)" stroke="hsla(217, 62%, 50%, 0.7)" strokeWidth="1.5" />
            <text x="83" y="250" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Market Data</text>

            {/* Source → Module arrows */}
            <line x1="145" y1="125" x2="210" y2="152" stroke="hsla(217, 62%, 50%, 0.5)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-blue)" />
            <line x1="145" y1="185" x2="210" y2="212" stroke="hsla(217, 62%, 50%, 0.5)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-blue)" />
            <line x1="145" y1="245" x2="210" y2="272" stroke="hsla(217, 62%, 50%, 0.5)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-blue)" />

            {/* Atomic Signal modules */}
            <rect x="210" y="132" width="148" height="44" rx="5" fill="hsla(213, 50%, 54%, 0.12)" stroke="hsla(213, 50%, 54%, 0.8)" strokeWidth="1.5" />
            <text x="284" y="159" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Metrics Signal</text>

            <rect x="210" y="192" width="148" height="44" rx="5" fill="hsla(213, 50%, 54%, 0.12)" stroke="hsla(213, 50%, 54%, 0.8)" strokeWidth="1.5" />
            <text x="284" y="219" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">News Signal</text>

            <rect x="210" y="252" width="148" height="44" rx="5" fill="hsla(213, 50%, 54%, 0.12)" stroke="hsla(213, 50%, 54%, 0.8)" strokeWidth="1.5" />
            <text x="284" y="279" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">Chart Signal</text>

            {/* Module → Signal Engine arrows */}
            <line x1="358" y1="154" x2="428" y2="198" stroke="hsla(213, 50%, 54%, 0.7)" strokeWidth="2" markerEnd="url(#arrow-steel)" />
            <line x1="358" y1="214" x2="428" y2="212" stroke="hsla(213, 50%, 54%, 0.7)" strokeWidth="2" markerEnd="url(#arrow-steel)" />
            <line x1="358" y1="274" x2="428" y2="226" stroke="hsla(213, 50%, 54%, 0.7)" strokeWidth="2" markerEnd="url(#arrow-steel)" />

            {/* Signal Engine */}
            <rect x="428" y="178" width="148" height="64" rx="6" fill="hsla(217, 62%, 50%, 0.18)" stroke="hsla(217, 62%, 50%, 0.9)" strokeWidth="2" />
            <text x="502" y="205" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="700">Signal Engine</text>
            <text x="502" y="225" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">Confidence · Trace ID</text>

            {/* Signal Engine → Governor */}
            <line x1="576" y1="210" x2="640" y2="210" stroke="hsla(217, 62%, 50%, 0.8)" strokeWidth="2" markerEnd="url(#arrow-blue)" />

            {/* Governor */}
            <rect x="640" y="178" width="140" height="64" rx="6" fill="hsla(0, 62%, 50%, 0.08)" stroke="hsla(0, 62%, 50%, 0.6)" strokeWidth="1.5" />
            <text x="710" y="205" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="700">Governor</text>
            <text x="710" y="222" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">Risk Gate · Audit Log</text>

            {/* Governor → Eye API */}
            <line x1="780" y1="210" x2="838" y2="210" stroke="currentColor" strokeWidth="2" opacity="0.4" markerEnd="url(#arrow-muted)" />

            {/* Eye API */}
            <rect x="838" y="178" width="64" height="64" rx="6" fill="hsla(217, 62%, 50%, 0.1)" stroke="hsla(217, 62%, 50%, 0.7)" strokeWidth="1.5" />
            <text x="870" y="205" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">Eye</text>
            <text x="870" y="222" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">API</text>

            {/* Trace ID / audit path annotation */}
            <line x1="502" y1="242" x2="502" y2="310" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.25" />
            <line x1="502" y1="310" x2="710" y2="310" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.25" />
            <line x1="710" y1="310" x2="710" y2="242" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.25" />
            <text x="606" y="328" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.35" fontStyle="italic">trace_id propagation</text>

            {/* Watchdog bar */}
            <rect x="20" y="370" width="882" height="38" rx="5" fill="hsla(220, 14%, 9%, 0.08)" stroke="hsla(215, 16%, 58%, 0.35)" strokeWidth="1" strokeDasharray="6,4" />
            <text x="461" y="394" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.55" fontWeight="600">
              Watchdog — 24/7 process supervision · heartbeat monitoring · auto-restart
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
