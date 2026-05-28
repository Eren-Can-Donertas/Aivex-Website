'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales } from '@/locales';

const ROADMAP_EN = [
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

const ROADMAP_TR = [
  {
    phase: 'Şimdi',
    items: [
      'Modüler sinyal mimarisi aktif çalışma zamanında',
      'Eye API gözlemlenebilirlik katmanı',
      'Sinyal Motoru bileşimi ve yönetişimi',
      'Vali risk geçişi ve denetim kayıtları',
      'Araştırma çıktısı iz kimliği ve atıf',
    ],
  },
  {
    phase: 'Sonraki',
    items: [
      'Daha güçlü canlı veri entegrasyonu',
      'Doğrulama ve geri test altyapısı',
      'Çalışma süresi durum panosu',
      'Yatırımcı ve demo erişimi iyileştirmesi',
    ],
  },
  {
    phase: 'Daha Sonra',
    items: [
      'Daha geniş varlık sınıfı kapsamı',
      'Gelişmiş tahsisat yönetişimi',
      'Ortak pilot programları',
      'Özel sinyal modülü SDK\'sı',
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

export function AboutContent() {
  const { lang } = useLanguage();
  const t = locales[lang].about;
  const roadmap = lang === 'tr' ? ROADMAP_TR : ROADMAP_EN;

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t.badge}
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight">{t.title}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">{t.missionTitle}</h2>
          <p className="text-muted-foreground">{t.missionText}</p>
        </section>

        {/* Why */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">{t.whyTitle}</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>{t.whyP1}</p>
            <p>{t.whyP2}</p>
          </div>
        </section>

        {/* What we're building */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">{t.buildingTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.buildingItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-border p-5">
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Progress */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">{t.progressTitle}</h2>
          <div className="rounded-xl border border-border bg-muted/20 p-6">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.progressItems.map((item) => (
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
          <h2 className="mb-4 text-2xl font-semibold">{t.principlesTitle}</h2>
          <div className="prose">
            <p>{t.principlesIntro}</p>
            <ul>
              {t.principles.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong> {p.text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="mb-2 text-2xl font-semibold">{t.teamTitle}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{t.teamSubtitle}</p>
          <div className="grid gap-6 sm:grid-cols-3">
            {TEAM.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">{t.roadmapTitle}</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {roadmap.map((r) => (
                    <th key={r.phase} className="px-5 py-3 text-left font-semibold">{r.phase}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(...roadmap.map((r) => r.items.length)) }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {roadmap.map((r) => (
                      <td key={r.phase} className="px-5 py-3 text-muted-foreground">{r.items[i] ?? ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl border border-border bg-muted/20 p-8">
          <div className="text-center mb-6">
            <h2 className="mb-2 text-xl font-semibold">{t.ctaTitle}</h2>
            <p className="text-muted-foreground">{t.ctaText}</p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center mb-6">
            <Link href="/contact">
              <Button size="lg">{t.ctaButton}</Button>
            </Link>
            <Link href="/methodology">
              <Button variant="outline" size="lg">{t.ctaSecondary}</Button>
            </Link>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-center text-sm text-muted-foreground mb-4">{t.ctaDirectContact}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:aivex.analytics@gmail.com"
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                aivex.analytics@gmail.com
              </a>
              <a
                href="tel:+905425623440"
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                +90 542 562 3440
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
