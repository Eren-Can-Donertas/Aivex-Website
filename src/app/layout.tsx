import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivexanalytics.com'),
  title: {
    default: 'AIVEX — Explainable Market-Research Products',
    template: '%s | AIVEX',
  },
  description:
    'Aivex builds explainable market-research products that examine news flow, price behavior, company data, and performance evidence through distinct analytical lenses.',
  keywords: [
    'explainable market research',
    'market intelligence',
    'news intelligence',
    'chart intelligence',
    'company fundamentals research',
    'signal validation',
    'model evaluation',
    'research tooling',
    'modular market analysis',
  ],
  authors: [{ name: 'Aivex' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivexanalytics.com',
    siteName: 'Aivex',
    title: 'AIVEX — Explainable Market-Research Products',
    description:
      'A portfolio of specialized, explainable market-research products. News, chart, company, and validation lenses — kept separate, with confidence and evidence attached.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aivex — Explainable Market-Research Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVEX — Explainable Market-Research Products',
    description:
      'Explainable market research through separate, specialized analytical lenses — not one opaque signal.',
    images: ['/og-default.png'],
  },
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
