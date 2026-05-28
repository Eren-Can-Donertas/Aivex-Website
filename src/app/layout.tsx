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
    default: 'AIVEX — AI Research Infrastructure for Systematic Signal Intelligence',
    template: '%s | AIVEX',
  },
  description:
    'AIVEX Analytics is an AI-first research infrastructure platform for generating, evaluating, and governing systematic market signals with traceability and auditability.',
  keywords: [
    'AI signal governance',
    'auditable market research',
    'systematic signal research',
    'financial research infrastructure',
    'AI research pipeline',
    'market intelligence platform',
    'traceable research signals',
    'signal composition',
    'quantitative research infrastructure',
  ],
  authors: [{ name: 'AIVEX Analytics' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivexanalytics.com',
    siteName: 'AIVEX Analytics',
    title: 'AIVEX — AI Research Infrastructure for Systematic Signal Intelligence',
    description:
      'Modular AI signal generation, composition, and governance for systematic research. Traceable, auditable, and governed outputs.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AIVEX Analytics — AI Research Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVEX — AI Research Infrastructure',
    description:
      'Traceable, governed, auditable AI signal research infrastructure for systematic workflows.',
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
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
