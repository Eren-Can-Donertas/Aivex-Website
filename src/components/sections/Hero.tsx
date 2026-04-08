import Link from 'next/link';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 text-center">
        <div className="animate-fade-in">
          <Badge variant="accent" className="mb-6">
            Research Preview — Not Financial Advice
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Institutional-grade{' '}
            <span className="gradient-text">AI signal research.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            AIVEX is a modular AI system that ingests news, market data, and alternative signals —
            then composes, governs, and evaluates them into auditable research outputs.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Request Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs/getting-started">
              <Button variant="outline" size="lg" className="gap-2">
                <BarChart2 className="h-4 w-4" /> View Docs
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-3 gap-4 border-t border-border pt-12 md:grid-cols-3">
          {[
            { label: 'Signal Modules', value: '6' },
            { label: 'Runtime Supervision', value: '24/7' },
            { label: 'Output Format', value: 'JSON' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
