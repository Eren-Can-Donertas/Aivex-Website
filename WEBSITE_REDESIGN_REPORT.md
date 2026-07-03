# Aivex Website V2 — Redesign Report

A product- and research-first redesign of the Aivex website. All work was done
inside `Aivex-Website/` on the checked-out branch. No files outside this
directory were read or modified.

---

## 1. Design direction implemented

- **Research terminal meets editorial publication.** Deep charcoal/graphite dark
  theme (dark is now the default), with muted paper-like surfaces (`--surface`)
  for readable research sections and a light "paper" mode retained.
- **One restrained accent family:** electric blue / cyan (`--primary`) with a
  violet-undertone accent (`--accent` / `accent2`). No gold-black "trading guru"
  styling, no crypto/exchange look.
- **Custom visual texture, not stock imagery:** a reusable animated `SignalField`
  (SVG signal lines + blueprint grid with a radial fade mask), a `dot-field`
  motif, terminal-style output panels, research metadata rows (mono), status
  chips, and a per-lens hero "research view" panel. No stock photos, robot/AI
  art, Bitcoin imagery, fake logos, fake performance graphs, or fake testimonials.
- **Typography:** Inter (headings/body) + JetBrains Mono (technical metadata,
  scores, timestamps). Body text raised to comfortable sizes; `text-balance` /
  `text-pretty` used on headings and lead paragraphs.
- **Consistent buttons/controls:** single `Button` component with consistent
  heights (sm 36px / md 44px / lg 48px), padding, hover and visible focus rings.
  Interactive targets meet ~44px. Global `:focus-visible` ring added.
- **Motion respects `prefers-reduced-motion`** (global reduce rule in
  `globals.css`); animations are subtle (soft pulse, slow signal dashes, fade-in).

## 2. Routes / pages added or changed

Added:
- `/products` — portfolio of research products (`ProductsContent`)
- `/products/[slug]` — rich research-brief detail pages (`ProductDetailContent`)
- `/research` — engineering-research reports index (`ResearchContent`)
- `/research/[slug]` — report detail (`ReportDetailContent`)
- `/roadmap` — maturity-based roadmap (`RoadmapContent`)
- `/founders` — founder profiles (`FoundersContent`)

Changed:
- `/` — fully redesigned homepage (Hero + Why-modular + Product ecosystem +
  Methodology + Latest research + Roadmap preview + Founders strip + CTA).
- `/legal/privacy` and `/legal/terms` — now fully bilingual (`LegalContent`) with
  a table of contents and anchored sections.
- `/blog` — redesigned index with featured post, category filter, reading time,
  and bilingual titles/excerpts. `/blog/[slug]` now serves Turkish overlays.
- `/contact` — copy updated to "Request a demo" positioning (Supabase wiring
  preserved unchanged).
- `not-found`, `sitemap`, `robots`, root `metadata`/`<html lang>` updated.

Removed (superseded by the new IA) and redirected via `next.config.mjs`
(`permanent: true`):
- `/product` → `/products`
- `/about` → `/founders`
- `/methodology` → `/research`

Docs (`/docs/...`) were preserved unchanged and remain linked from the footer.

Navigation now prioritizes **Products · Research · Roadmap · Blog · Founders**,
with the language switcher and an explicit **Request Demo** CTA.

## 3. Mobile menu

- The hamburger opens an accessible nav **drawer** (backdrop, `Escape` to close,
  body-scroll lock, `aria-expanded`/`aria-controls`, active-item `aria-current`).
- It **never** triggers a demo-request modal. Demo request is an explicit
  user-initiated link inside the drawer (and in the header). Covered by an e2e
  assertion in `e2e/navigation.spec.ts`.

## 4. Localization coverage (TR + EN)

Full parity between `src/locales/en.ts` and `src/locales/tr.ts` (verified: key
structures are identical). Localized surfaces:
- Navigation, hero, why-modular, product ecosystem, methodology, latest research,
  roadmap preview, founders strip, CTAs, footer.
- Products index + all product detail sections; product content (name, tagline,
  studies/produces, purpose, market question, observations, method, interpretation,
  validation) lives bilingually in `src/data/products.ts`.
- Research index + report detail; report content bilingual in `src/data/research.ts`.
- Roadmap (`src/data/roadmap.ts`), Founders (`src/data/founders.ts`).
- **Privacy Policy and Terms of Service are now complete in both Turkish and
  English** (previously English-only).
- Contact form labels/validation/disclaimers, blog chrome, disclaimers, 404.
- Language selection persists (localStorage + cookie) and updates
  `document.documentElement.lang`. The blog detail route reads the language
  cookie server-side to serve the matching Turkish overlay.

## 5. Products represented

Modeled around the confirmed atomic product areas, with honest statuses:
- **News Intelligence** — Research
- **Chart Intelligence** — Research
- **Company Intelligence** — In Development
- **Metrics & Validation** — Research
- **Model Horizon Lab** — Experimental

Signal Engine, Brain, Governor, and Watchdog are **not** marketed as public
end-user products. Each product card links to its own internal detail page and
supports an optional verified `externalUrl` field (left undefined — no invented
URLs). Every example output is a designed UI panel labelled
"Illustrative output — not investment advice" / "Research only".

## 6. Reports and blog entries added

Research reports (month-level dates, April–June 2026) in `src/data/research.ts`:
1. Chart Runtime Intelligence: Foundations (Apr 2026)
2. Provider Reliability and Data Quality (Apr 2026)
3. Model Horizon Lab: Evaluating by Window and Regime (May 2026, research-only)
4. Research Interface: Presenting Analytical Outputs (Jun 2026, in-progress)
5. Explainability and Validation (Jun 2026)

Blog: existing 4 posts retained (now categorized). Added 3 new posts, each with
a Turkish overlay (`.tr.mdx`):
- Why One Market Signal Is Not Enough (Apr 2026)
- Designing Explainable Market-Research Products (May 2026)
- Data Quality Is Part of the Product (Jun 2026)

No fake citations, benchmarks, testimonials, or author personas were added.

## 7. Existing content preserved

- Contact form → Supabase wiring (`src/lib/supabase.ts`, `contact_submissions`)
  is unchanged.
- Docs system (`content/docs`, `.tr.mdx` overlay pattern) unchanged.
- Existing blog posts retained.
- Founder names and the two existing verified LinkedIn URLs
  (Eren Can Dönertaş, Enes Kerem Göksu) and the contact email/phone were carried
  over from the previous `AboutContent`.
- `src/lib/analytics.ts` left in place (not removed).

## 8. Intentionally unresolved placeholders

- **Koray Şenyüzlü's LinkedIn URL is not present anywhere in the website source.**
  In `src/data/founders.ts`, `linkedinUrl` is `null` with a visible
  `TODO(founders)` comment. The UI renders a "LinkedIn not listed / belirtilmedi"
  note instead of a fabricated link.
- Product `externalUrl` fields are supported but intentionally undefined until a
  verified standalone product site exists.

## 9. Claims discipline

- No guaranteed returns, performance percentages, fake availability, or
  regulatory/compliance certifications were added.
- Product statuses reflect real maturity (nothing marked "Available").
- "Not investment advice" / "Illustrative output" / "Research only" disclaimers
  appear on product examples, report detail, roadmap, homepage CTA, and the
  footer (bilingual).

## 10. Content / data architecture

New maintainable content model under `src/data/` (`types.ts`, `products.ts`,
`research.ts`, `roadmap.ts`, `founders.ts`) with bilingual `Localized<T>` fields,
so the team can edit content without touching components. Localization strings
live in `src/locales/{en,tr}.ts`; blog stays in `content/blog` MDX with `.tr.mdx`
overlays (consistent with the existing docs convention).

## 11. Commands run and their result

> **Environment limitation:** this sandbox has **no Node.js/npm runtime**
> (`node`, `npm`, `npx`, and `node_modules` are unavailable), so `lint`,
> `typecheck`, `test`, and `build` **could not be executed here.** This is a
> pre-existing environment constraint, not a code issue.

In place of running the toolchain, the changes were hand-verified:
- Locale `en.ts` / `tr.ts` key structures diffed — **identical**.
- All required fields present in every product (5×) and report (5×); `en`/`tr`
  parity confirmed in every data file; 3 founders complete.
- All `@/…` imports resolved to existing files; no references to deleted
  components or removed locale keys remain; no imports point outside
  `Aivex-Website/`.
- JSX scanned for `react/jsx-key` and `react/no-unescaped-entities` risks (clean);
  all list renders are keyed; text flows through localized variables.
- Unit tests (`__tests__/*.test.tsx`, `mdx.test.ts`) were rewritten to match the
  new components/IA and reviewed against the implementation.

**Please run the following in an environment with Node 18+ to confirm:**

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
# optional (needs browsers): npx playwright install && npm run test:e2e
```

## 12. Pre-existing issues that could not be fixed within Aivex-Website/

- No Node.js runtime in this environment (see §11) — prevents executing the
  build/test toolchain here.
- The e2e Playwright suites require a running dev server and a browser; they were
  updated to the new IA/copy but not executed here. `docs.spec.ts` was left as-is
  (docs pages are unchanged).
- The checked-out branch is
  `feature/aivex-website-v2-product-research-redesign` (the brief mentioned an
  expected `feature/revised-deploy`); per instructions, no branch switch was made.
