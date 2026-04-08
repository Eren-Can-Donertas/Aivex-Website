# website/ — Next.js 14 Public-Facing Frontend

Next.js 14 (App Router) frontend for the AIVEX trading intelligence platform. Provides public-facing marketing pages, product documentation, and methodology content. Runs independently of the Python backend services.

---

## Architecture

```
website/
|-- src/
|   |-- app/                 # Next.js App Router pages
|   |   |-- page.tsx         # Home page
|   |   |-- layout.tsx       # Root layout (fonts, metadata)
|   |   |-- globals.css      # Global styles
|   |   |-- about/           # About page
|   |   |-- blog/            # Blog section
|   |   |-- contact/         # Contact page
|   |   |-- docs/            # Documentation pages
|   |   |-- legal/           # Terms, privacy
|   |   |-- methodology/     # Strategy methodology
|   |   `-- product/         # Product overview
|   |-- components/          # Reusable React components
|   |-- lib/                 # Utility functions, helpers
|   `-- types/               # TypeScript type definitions
|-- public/                  # Static assets (images, icons)
|-- __tests__/               # Vitest unit tests
|-- e2e/                     # Playwright end-to-end tests
|-- content/                 # Static content / MDX files
|-- data/                    # Static JSON data files
|-- next.config.mjs          # Next.js configuration
|-- tailwind.config.ts       # Tailwind CSS configuration
|-- tsconfig.json            # TypeScript configuration
|-- vitest.config.ts         # Vitest unit test configuration
|-- playwright.config.ts     # Playwright e2e test configuration
`-- package.json             # Dependencies and scripts
```

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14 | App Router, SSR/SSG |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| Vitest | latest | Unit testing |
| Playwright | latest | End-to-end testing |

---

## Quick Start

```bash
# Prerequisites: Node.js 18+

cd website

# Install dependencies
npm install

# Development server (hot reload)
npm run dev
# Runs at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Pre-deploy validation (typecheck + production build)
npm run validate
```

---

## Testing

```bash
# Unit tests (Vitest)
npm test
npm run test:watch    # Watch mode

# End-to-end tests (Playwright)
npm run test:e2e
npx playwright test --ui   # Interactive UI mode

# Type checking
npm run typecheck

# Pre-deploy validation (typecheck + production build)
npm run validate
```

Unit tests live in `__tests__/`. End-to-end tests live in `e2e/`.

---

## Linting and Formatting

```bash
# Lint
npm run lint

# Format (if Prettier is configured)
npm run format
```

ESLint configuration is in `.eslintrc.json`.

---

## Environment Variables

The website frontend does not connect to the Python backend directly. It serves static/SSG content. If API calls to backend services are added in the future, set these in `website/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

---

## Build and Deployment

```bash
# Validate deploy readiness (typecheck + production build — run before every deploy)
npm run validate

# Production build only
npm run build

# Output: website/.next/ (server-side) + website/out/ (static export if configured)
```

`npm run validate` runs `tsc --noEmit` followed by `next build`. Both must pass before deployment. Type errors or build failures exit with a non-zero status and block the deploy.

Designed to be deployed as a standard Next.js application (Vercel, self-hosted Node.js, Docker).

---

## Integration with Python Backend

The website frontend is **decoupled** from the Python services. It does not share a database or import Python code. The Eye module (port 8001) is the internal developer dashboard — separate from this public-facing website.

| Service | URL | Purpose |
|---------|-----|---------|
| This website | http://localhost:3000 | Public marketing/docs |
| Eye dashboard | http://localhost:8001/dashboard | Internal monitoring |
| Brain API | http://localhost:8003 | Pattern discovery (internal) |

---

## Known Limitations / TODOs

- No live data integration with the Python trading pipeline yet
- Content in `content/` and `data/` is static; future versions may pull from the Eye API
- E2E tests in `e2e/` may require Playwright browsers installed (`npx playwright install`)
