import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        ring: 'hsl(var(--ring))',
        surface: 'hsl(var(--surface))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        accent2: 'hsl(var(--accent-2))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        status: {
          available: 'hsl(var(--status-available))',
          research: 'hsl(var(--status-research))',
          experimental: 'hsl(var(--status-experimental))',
          development: 'hsl(var(--status-development))',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: '0.625rem',
        md: '0.45rem',
        sm: '0.3rem',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
