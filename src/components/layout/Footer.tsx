import Link from 'next/link';

const FOOTER_LINKS = {
  Product: [
    { label: 'Overview', href: '/product' },
    { label: 'Methodology', href: '/methodology' },
    { label: 'Docs', href: '/docs/getting-started' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              <span className="gradient-text">AIVEX</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              AI-driven multi-module signal generation and evaluation for systematic research.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              For research and analysis purposes only. Not financial advice.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-3 text-sm font-semibold">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {year} AIVEX Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
