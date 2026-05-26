'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SIGNAL_ARTIFACT = `{
  "trace_id":    "research_20260526_a4f2b9c1",
  "output_type": "research_signal",
  "symbol":      "SAMPLE_SYMBOL",
  "confidence":  0.72,
  "strength":    "moderate",
  "sources":     ["news", "chart"],
  "reasons": [
    "Sentiment consensus across 4 sources (0.81)",
    "Technical structure confirmed 2 timeframes"
  ],
  "governor":    "passed",
  "advice":      false,
  "created_at":  "2026-05-26T09:14:22.384Z"
}`;

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/4 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-accent/4 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left column — copy */}
          <div className="animate-fade-in">
            <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span className="h-px w-8 bg-border" />
              AI Research Infrastructure
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
              Not a Black Box.{' '}
              <span className="text-primary">A Research Pipeline.</span>
            </h1>

            <p className="mb-10 max-w-xl text-lg text-muted-foreground">
              AIVEX converts market data, news, and technical signals into governed research outputs
              with confidence scores, source attribution, trace IDs, and risk-gated evaluation.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Request Research Access <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/methodology">
                <Button variant="outline" size="lg" className="gap-2">
                  View Methodology <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {[
                { label: 'Signal Modules', value: '6' },
                { label: 'Runtime Supervision', value: '24/7' },
                { label: 'Output Format', value: 'JSON' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — terminal panel */}
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
              {/* Chrome bar */}
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  eye.research_signal
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400">live</span>
                </div>
              </div>

              {/* Code body */}
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-foreground/85">
                <code>{SIGNAL_ARTIFACT}</code>
              </pre>

              {/* Footer annotation */}
              <div className="border-t border-border bg-muted/20 px-5 py-3">
                <p className="font-mono text-xs text-muted-foreground">
                  <span className="mr-2 text-green-400">✓</span>
                  Governor passed · trace_id links to full pipeline run
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
