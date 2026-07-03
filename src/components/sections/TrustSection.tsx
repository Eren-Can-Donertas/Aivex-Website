'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

export function TrustSection() {
  const { lang } = useLanguage();
  const t = locales[lang].home.trust;

  return (
    <section className="border-y border-border py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">

          {/* Left — heading block */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t.badge}
            </p>
            <h2 className="mb-4 text-3xl font-bold">{t.title}</h2>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Right — principles list */}
          <div className="space-y-8">
            {t.principles.map((p) => (
              <div
                key={p.number}
                className="grid grid-cols-[3rem_1fr] gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div className="font-mono text-sm font-bold text-primary/40">{p.number}</div>
                <div>
                  <h3 className="mb-2 text-base font-semibold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </div>
            ))}

            {/* Research disclaimer */}
            <div className="rounded-xl border border-border bg-muted/20 px-6 py-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground/60">{lang === 'tr' ? 'Araştırma Sorumluluk Reddi:' : 'Research Disclaimer:'}</strong>{' '}
                {lang === 'tr'
                  ? 'AIVEX bir araştırma ve analiz platformudur. Tüm çıktılar yalnızca bilgilendirme amaçlıdır ve finansal, yatırım veya ticaret tavsiyesi teşkil etmez. Herhangi bir sinyalin geçmiş performansı gelecekteki sonuçları garanti etmez.'
                  : 'AIVEX is a research and analysis platform. All outputs are for informational purposes only and do not constitute financial, investment, or trading advice. Past performance of any signal does not guarantee future results.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
