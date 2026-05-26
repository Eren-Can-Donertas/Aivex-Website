import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About AIVEX Analytics — mission, team, research principles, and roadmap for AI-driven signal research infrastructure.',
};

const ROADMAP = [
  {
    phase: 'Now',
    items: [
      'Modular signal architecture in active runtime',
      'Eye API observability layer',
      'Signal Engine composition and governance',
      'Governor risk gating with audit logging',
      'Research output trace ID and attribution',
    ],
  },
  {
    phase: 'Next',
    items: [
      'Stronger live data integration',
      'Validation and backtesting harness',
      'Runtime status dashboard',
      'Investor and demo access polish',
    ],
  },
  {
    phase: 'Later',
    items: [
      'Broader asset class coverage',
      'Advanced allocation governance',
      'Partner pilot programs',
      'Custom signal module SDK',
    ],
  },
];

const TEAM = [
  {
    name: 'Eren Can Dönertaş',
    title: 'Co-founder',
    initials: 'ED',
    bio: 'Architect of the AIVEX signal governance layer, product strategy, and research methodology. Computer Engineering, TOBB ETÜ. Focused on AI-driven financial research systems, signal infrastructure, and institutional product execution.',
    linkedin: 'https://www.linkedin.com/in/eren-can-donertas/',
  },
  {
    name: 'Enes Kerem Göksu',
    title: 'Co-founder',
    initials: 'EG',
    bio: 'Leads system architecture, backend reliability, runtime supervision, and Eye API design. Computer Engineering, TOBB ETÜ. Focused on distributed AI systems, infrastructure, and operational reliability.',
    linkedin: 'https://www.linkedin.com/in/enes-kerem-göksu-198428407/',
  },
  {
    name: 'Koray Şenyüzlü',
    title: 'Co-founder',
    initials: 'KŞ',
    bio: 'Leads business development, strategic partnerships, and institutional go-to-market. Focused on the commercial infrastructure connecting AIVEX research capabilities to systematic research workflows.',
    linkedin: undefined,
  },
];

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            About AIVEX
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight">
            Building the Infrastructure Layer for AI-Driven Market Research
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            AIVEX is not a product that predicts markets. It is infrastructure that makes
            AI-assisted market research traceable, governed, and auditable.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Mission</h2>
          <p className="text-muted-foreground">
            Systematic market research requires systematic infrastructure. Most AI-powered tools in
            this space are opaque, unauditable, and designed for retail audiences. AIVEX exists to
            provide a different foundation: every computation traceable, every signal scored, every
            governance decision logged.
          </p>
        </section>

        {/* Why */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Why AIVEX Exists</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              The signal-to-noise problem in financial data is not solved by more data. It is solved
              by better evaluation infrastructure: pipelines that score quality, detect conflict,
              apply governance, and emit auditable outputs — not black-box predictions.
            </p>
            <p>
              We built AIVEX because the infrastructure for rigorous AI-assisted research did not
              exist in accessible form. Institutional-quality tooling was locked behind proprietary
              systems. We are building the open research layer.
            </p>
          </div>
        </section>

        {/* What we're building */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">What We Are Building</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Modular Signal Pipelines',
                body: 'Independent modules for news, chart, and fundamental data — each producing scored, attributed atomic signals.',
              },
              {
                title: 'Composition & Governance',
                body: 'Signal Engine merges atomic signals with conflict resolution. Governor applies risk gates and human override policies.',
              },
              {
                title: 'Auditability by Design',
                body: 'Every output carries a trace_id. Every gating decision is logged. Evaluation is deterministic and reproducible.',
              },
              {
                title: 'Operational Reliability',
                body: 'Watchdog process supervision with heartbeat monitoring, crash-loop detection, and exponential-backoff restart.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border p-5">
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Progress */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Current Progress</h2>
          <div className="rounded-xl border border-border bg-muted/20 p-6">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                'Modular signal architecture implemented and in internal runtime',
                'Eye API observability layer in active development',
                'Signal Engine, Governor, and runtime dashboard under active validation',
                'Research outputs are informational artifacts — not financial advice',
                'Infrastructure focused on traceability, auditability, and governed emission',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Research Principles */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Research Principles</h2>
          <div className="prose">
            <p>AIVEX operates on three non-negotiable research principles:</p>
            <ul>
              <li>
                <strong>Falsifiability:</strong> A signal that cannot be evaluated against ground
                truth is speculation. Every module produces verifiable outputs.
              </li>
              <li>
                <strong>Traceability:</strong> Every output carries a trace ID linking it to its
                exact pipeline run, source signals, and governance decision.
              </li>
              <li>
                <strong>Responsibility:</strong> AI-driven research carries responsibility. The
                Governor exists to prevent outputs from being misused as financial advice.
              </li>
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="mb-2 text-2xl font-semibold">Team</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Three co-founders with complementary backgrounds in engineering and business development.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {TEAM.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Roadmap</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {ROADMAP.map((r) => (
                    <th key={r.phase} className="px-5 py-3 text-left font-semibold">
                      {r.phase}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.max(...ROADMAP.map((r) => r.items.length)),
                }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {ROADMAP.map((r) => (
                      <td key={r.phase} className="px-5 py-3 text-muted-foreground">
                        {r.items[i] ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl border border-border bg-muted/20 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">Investor &amp; Partner Inquiry</h2>
          <p className="mb-6 text-muted-foreground">
            We work with researchers, quant teams, and academic institutions. If you are evaluating
            AIVEX for systematic research workflows or strategic partnerships, we would like to hear
            from you.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button size="lg">Investor &amp; Partner Inquiry</Button>
            </Link>
            <Link href="/methodology">
              <Button variant="outline" size="lg">
                View Research Principles
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
