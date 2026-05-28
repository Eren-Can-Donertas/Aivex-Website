'use client';

import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

export default function MethodologyPage() {
  const { lang } = useLanguage();
  const t = locales[lang].methodology;
  const s = t.sections;

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge variant="accent" className="mb-4">
            {t.badge}
          </Badge>
          <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* 1. Evaluation-First Design */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {s.evaluationFirst.number}
            </span>
            <h2 className="text-2xl font-semibold">{s.evaluationFirst.title}</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>{s.evaluationFirst.p1}</p>
            <p>{s.evaluationFirst.p2}</p>
          </div>
        </section>

        {/* 2. Signal Lifecycle */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {s.signalLifecycle.number}
            </span>
            <h2 className="text-2xl font-semibold">{s.signalLifecycle.title}</h2>
          </div>
          <div className="mt-4 overflow-x-auto">
            <div className="flex min-w-max items-center gap-2 rounded-xl border border-border bg-muted/20 px-6 py-5 font-mono text-sm">
              {s.signalLifecycle.steps.map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-card px-3 py-1.5 text-foreground/80">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-muted-foreground/50">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{s.signalLifecycle.annotation}</p>
        </section>

        {/* 3. Confidence Scoring */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {s.confidenceScoring.number}
            </span>
            <h2 className="text-2xl font-semibold">{s.confidenceScoring.title}</h2>
          </div>
          <p className="mt-4 text-muted-foreground">{s.confidenceScoring.intro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left font-semibold">{s.confidenceScoring.tableHeaders[0]}</th>
                  <th className="px-5 py-3 text-left font-semibold">{s.confidenceScoring.tableHeaders[1]}</th>
                </tr>
              </thead>
              <tbody>
                {s.confidenceScoring.factors.map(([factor, desc]) => (
                  <tr key={factor} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-medium">{factor}</td>
                    <td className="px-5 py-3 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{s.confidenceScoring.note}</p>
        </section>

        {/* 4. Cooldown Logic */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {s.cooldownLogic.number}
            </span>
            <h2 className="text-2xl font-semibold">{s.cooldownLogic.title}</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>{s.cooldownLogic.p1}</p>
            <p>{s.cooldownLogic.p2}</p>
          </div>
        </section>

        {/* 5. Governor Gating */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {s.governorGating.number}
            </span>
            <h2 className="text-2xl font-semibold">{s.governorGating.title}</h2>
          </div>
          <p className="mt-4 text-muted-foreground">{s.governorGating.intro}</p>
          <div className="mt-4 space-y-2">
            {s.governorGating.gates.map(({ label, body }) => (
              <div key={label} className="flex gap-3 rounded-lg border border-border p-4">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <span className="font-semibold">{label}: </span>
                  <span className="text-sm text-muted-foreground">{body}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Data Quality */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {s.dataQuality.number}
            </span>
            <h2 className="text-2xl font-semibold">{s.dataQuality.title}</h2>
          </div>
          <p className="mt-4 text-muted-foreground">{s.dataQuality.intro}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {s.dataQuality.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Research Boundaries */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {s.researchBoundaries.number}
            </span>
            <h2 className="text-2xl font-semibold">{s.researchBoundaries.title}</h2>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-muted/20 p-6">
            <p className="text-sm text-muted-foreground">
              {s.researchBoundaries.disclaimer1}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{s.researchBoundaries.disclaimer2}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
