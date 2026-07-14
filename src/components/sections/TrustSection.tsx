'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

export function TrustSection() {
  const { lang } = useLanguage();
  const t = locales[lang].home.trust;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading idx="03" title={t.title} subtitle={t.subtitle} />

        {/* Calibration principles — ink-ruled columns */}
        <div className="grid gap-6 md:grid-cols-3">
          {t.principles.map((p) => (
            <article key={p.number} className="border-t-2 border-foreground pt-4">
              <span className="font-mono text-[0.66rem] font-bold text-primary">
                CAL-{p.number}
              </span>
              <h3 className="mb-2 mt-1.5 text-base font-bold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </article>
          ))}
        </div>

        {/* Research disclaimer */}
        <p className="mt-10 max-w-4xl text-xs leading-relaxed text-muted-foreground">
          <strong className="font-bold text-foreground/70">
            {lang === 'tr' ? 'Araştırma Sorumluluk Reddi:' : 'Research Disclaimer:'}
          </strong>{' '}
          {lang === 'tr'
            ? 'AIVEX bir araştırma ve analiz platformudur. Tüm çıktılar yalnızca bilgilendirme amaçlıdır ve finansal, yatırım veya ticaret tavsiyesi teşkil etmez. Herhangi bir sinyalin geçmiş performansı gelecekteki sonuçları garanti etmez.'
            : 'AIVEX is a research and analysis platform. All outputs are for informational purposes only and do not constitute financial, investment, or trading advice. Past performance of any signal does not guarantee future results.'}
        </p>
      </div>
    </section>
  );
}
