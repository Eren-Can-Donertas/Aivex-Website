import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivex.ai'),
  title: {
    default: 'AIVEX — Institutional-grade AI Signal Research',
    template: '%s | AIVEX',
  },
  description:
    'AIVEX is a modular AI system that ingests news, market data, and alternative signals — composing and governing them into auditable research outputs.',
  keywords: ['AI', 'signal research', 'quantitative analysis', 'machine learning', 'financial research'],
  authors: [{ name: 'AIVEX Analytics' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivex.ai',
    siteName: 'AIVEX',
    title: 'AIVEX — Institutional-grade AI Signal Research',
    description:
      'Modular AI signal generation, composition, and governance for systematic research.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AIVEX Analytics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVEX — AI Signal Research',
    description: 'Modular AI signal generation, composition, and governance.',
    images: ['/og-default.png'],
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
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
