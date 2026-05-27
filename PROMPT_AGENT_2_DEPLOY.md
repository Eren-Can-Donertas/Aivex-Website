# AGENT 2 — STATIC FRONTEND DEPLOYMENT TARGETING

You are the **Static Deployment Agent**. You run **after** Agent 1 has finished stripping the backend. Your single job is to make this repository build, output, and deploy as a **pure static site** on Vercel, Netlify, Cloudflare Pages, **and** GitHub Pages, with no runtime server, no serverless functions, and no platform lock-in.

This document is a hard contract. Do not deviate. Do not negotiate scope. If a step looks redundant, do it anyway — it is part of the verification surface.

---

## 0. PRECONDITIONS — VERIFY BEFORE YOU START

Before changing anything, confirm Agent 1's work landed cleanly. If any of the following is false, **stop and report**; do not paper over an incomplete strip:

- [ ] `src/app/api/` does not exist.
- [ ] `data/` does not exist.
- [ ] `grep -r "/api/" src/` shows no `fetch` target to a local API route.
- [ ] `grep -rE "from ['\"]fs['\"]" src/` returns only `src/lib/mdx.ts`.
- [ ] `npm run typecheck` is clean.
- [ ] `npm run build` succeeds under the **current** (unmodified by you) `next.config.mjs`.

Inherited project facts you do not get to relitigate:

- **Framework:** Next.js 14.2.30 App Router (`src/app/` layout).
- **Content:** MDX under `content/blog/*.mdx` and `content/docs/**/*.mdx`, loaded at build time via `src/lib/mdx.ts` (uses `fs` + `gray-matter`). Routes consuming it: `src/app/blog/`, `src/app/docs/`, `src/app/sitemap.ts`, `src/app/robots.ts`.
- **Dynamic content boundary:** the chat widget opens a websocket directly to ElevenLabs from the browser using `NEXT_PUBLIC_AGENT_ID_AIVEX`. That is a client→3rd-party call and remains live in a static deployment.
- **Existing env vars (all client-safe, `NEXT_PUBLIC_*`):** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_AGENT_ID_AIVEX`. No server secrets exist. Do not invent any.
- **Existing redirect in `next.config.mjs`:** `/docs` → `/docs/getting-started` via `async redirects()`. This **does not survive static export** and must be handled.

---

## 1. NON-NEGOTIABLE RULES

1. **The output must be a fully static bundle** producible by `npm run build` alone, with **no** post-build server step, **no** Vercel-only edge functions, **no** ISR, and **no** middleware. The output directory must be a folder of `*.html` / `*.css` / `*.js` / static assets that can be `rsync`-ed to any object store.

2. **The same build artifact must deploy unchanged to all four targets:** Vercel, Netlify, Cloudflare Pages, and GitHub Pages. Provider-specific config files are allowed (and required — see §3) but the produced static folder is identical.

3. **GitHub Pages requires a configurable `basePath`** because it serves projects under `https://<user>.github.io/<repo>/`. The build must work both with **no basePath** (apex-domain hosts like Vercel/Netlify/Cloudflare Pages) and with a **non-empty basePath** (GitHub Pages). One env var controls this. Do not hardcode.

4. **No dead config.** If a file exists today and is unused after your work, delete it. If a config field exists today and is unused or actively breaks static export, remove it.

5. **No new dependencies unless required by the static-export path itself.** Do not add `serve`, `http-server`, or "deploy helper" packages. `next build` with `output: 'export'` already produces a static folder; that is sufficient.

6. **No comments explaining the migration.** No `// switched to static export` annotations. Git history records the migration; the code reads as if it were always static.

7. **No half-finished work.** Every config file you touch must build green. Every config file you add must be referenced by an actual deploy path.

---

## 2. EXECUTION ORDER (DO NOT REORDER)

### Step 1 — Reconcile `next.config.mjs` with static export

Edit `next.config.mjs` to be exactly the following shape (preserve `pageExtensions` and `experimental.mdxRs`, drop incompatibles, add export + basePath plumbing):

```js
/** @type {import('next').NextConfig} */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: { mdxRs: false },
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

Mandatory consequences of each line — verify each one explicitly:

- **`output: 'export'`** — Next.js writes the static bundle to `out/` instead of running a server. The `next start` script becomes meaningless; see Step 5.
- **`async redirects()` is removed.** Static export does not support `redirects()` in `next.config.mjs`. The existing `/docs` → `/docs/getting-started` redirect must be handled at the **page** layer instead: replace `src/app/docs/page.tsx` (or create it if absent) with a tiny RSC that renders `<meta http-equiv="refresh" content="0; url=./getting-started/" />` and a `<link rel="canonical" href="./getting-started/">`, **and** also export `redirect('/docs/getting-started/')` from `next/navigation` at the top of the component so SSG produces an HTML page that both meta-refreshes and is canonicalised. (Meta-refresh is the portable cross-host fallback; provider-level redirects in Step 3 handle the same path for crawlers that ignore meta refresh.)
- **`basePath` + `assetPrefix`** — driven by `NEXT_PUBLIC_BASE_PATH`. When unset, both fall through to `undefined`, which Next.js treats as "no prefix" (the apex-domain case). When set to e.g. `/Aivex-Website`, every internal route and asset URL is rewritten on build. **Do not** set this in committed env files; it is a deploy-time variable.
- **`trailingSlash: true`** — required for GitHub Pages and for object-store hosts that resolve `/foo/` to `/foo/index.html`. It also makes the meta-refresh redirect target `./getting-started/` resolve correctly.
- **`images.unoptimized: true`** — the `next/image` optimizer is a server feature; static export cannot use it. If any `<Image>` component depends on optimization, accept the size penalty; do not introduce a third-party image CDN.

After saving, run `npm run build` and confirm the build emits to `out/` and exits 0. Inspect `out/` and confirm `out/index.html`, `out/blog/`, `out/docs/getting-started/index.html`, `out/sitemap.xml`, and `out/robots.txt` all exist.

### Step 2 — Audit code for static-export incompatibilities

Grep the codebase and fix every hit:

- **`export const dynamic = 'force-dynamic'`** anywhere under `src/app/` — incompatible. Remove or convert to `'force-static'` only if the page genuinely needs the marker; usually delete the line.
- **`export const revalidate = <number>`** — ISR is a server feature; remove.
- **`cookies()`, `headers()`, `draftMode()` from `next/headers`** — server-only request APIs. None should exist in this repo; if any do, they are dead code and must be deleted.
- **`middleware.ts` at any depth** — incompatible with `output: 'export'`. Delete if present.
- **`generateStaticParams()` on dynamic segments** — required for `[slug]` routes under static export. Confirm `src/app/blog/[slug]/` and `src/app/docs/[...slug]/` (or whatever the actual route shapes are) export `generateStaticParams`. If any dynamic route is missing it, add it — derive the param list from `src/lib/mdx.ts` exports (`getAllPostSlugs`, `getAllDocSlugs`).
- **`fetch()` to absolute URLs at module top-level** — fine at build time, but verify any such calls do not assume an origin under our control. (Inventory says only `@elevenlabs/react` opens external network, and that's client-side.)

### Step 3 — Add provider configs (one each, minimal, committed)

Create **exactly** these files. No more. No deploy scripts, no CI YAML beyond what is required for GitHub Pages.

a. **`vercel.json`** (repo root):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": null,
  "cleanUrls": true,
  "trailingSlash": true,
  "redirects": [
    { "source": "/docs", "destination": "/docs/getting-started/", "permanent": false }
  ]
}
```
Setting `"framework": null` tells Vercel not to apply its Next.js preset, which would otherwise try to spin up serverless functions. We are shipping a plain static folder.

b. **`netlify.toml`** (repo root):
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/docs"
  to   = "/docs/getting-started/"
  status = 302

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

c. **`public/_headers`** and **`public/_redirects`** for Cloudflare Pages (Cloudflare reads these from the publish folder; `next export` copies `public/` verbatim into `out/`):

`public/_redirects`:
```
/docs  /docs/getting-started/  302
```

`public/_headers`:
```
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

d. **`.github/workflows/deploy-pages.yml`** for GitHub Pages — the only target that genuinely needs a CI workflow because `basePath` must be injected at build time:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Build (with basePath)
        env:
          NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
          NEXT_PUBLIC_SITE_URL: https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}
        run: npm run build
      - name: Add .nojekyll
        run: touch out/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The `.nojekyll` file is mandatory; without it, GitHub Pages refuses to serve paths beginning with underscores (which Next.js generates under `_next/`).

### Step 4 — Update `.env.example` and document the new variable

Open `.env.example`. Add **exactly** the following line (preserving existing content), so a deployer knows the basePath knob exists:

```
# Set only when deploying under a subpath (e.g. GitHub Pages: /<repo-name>).
# Leave unset for Vercel, Netlify, Cloudflare Pages, or any apex-domain host.
NEXT_PUBLIC_BASE_PATH=
```

Do not commit a populated `.env` file. Confirm `.env` is in `.gitignore` (it already is — line 8 of `.gitignore`).

### Step 5 — Update `package.json` scripts

The current scripts are:
```
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"lint:fix": "next lint --fix",
"typecheck": "tsc --noEmit",
"validate": "tsc --noEmit && next build",
"format": "prettier --write \"src/**/*.{ts,tsx,css}\" \"content/**/*.mdx\"",
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

Mutations required:

- **Replace `"start": "next start"`** with `"start": "npx serve out -l 3000"` **only if** the team relies on a local preview script — otherwise delete the `start` entry entirely. Static export makes `next start` a hard error. Do not leave the dead script.
- **Add `"preview": "npx serve out -l 4000"`** for parity with Vite-era expectations and as the canonical "look at the built site" command. (Using `npx` keeps this out of `dependencies`.)
- Keep every other script.

### Step 6 — Clean dead root-level files

Inspect the repo root after Agent 1's pass. The audit at handoff time identified these definitely-present files: `Makefile`, `README.md`, `components.json`, `content/`, `e2e/`, `next-env.d.ts`, `next.config.mjs`, `package-lock.json`, `package.json`, `playwright.config.ts`, `postcss.config.js`, `public/`, `src/`, `tailwind.config.ts`, `tsconfig.json`, `tsconfig.tsbuildinfo`, `vitest.config.ts`. Apply:

- **`Makefile`** — the `clean` target uses POSIX `rm -rf`. Update its `clean` target to `rm -rf out .next node_modules` so the static `out/` folder is also wiped on cleanup. Leave the rest alone.
- **`tsconfig.tsbuildinfo`** — incremental compile cache. It is in `.gitignore` (line 23) but is tracked here. Delete it from the working tree if it is currently tracked; otherwise leave it.
- **`next-env.d.ts`** — keep. Next.js regenerates it; deleting breaks the build.
- **`components.json`** — shadcn config. Keep only if `src/components/ui/` was generated by shadcn. If yes, keep; if it's an orphan from an aborted setup, delete. Verify before deciding.
- **Anything else surprising at the root that you cannot tie to an active code path** — delete it. Examples worth checking for, even if not in the original audit: `Dockerfile`, `docker-compose*.yml`, `Procfile`, `fly.toml`, `railway.json`, `render.yaml`, `vercel/`, `.vercel/`, `.netlify/`, `nginx.conf`, `server.js`, `server.ts`, top-level `api/`, top-level `pages/api/`. If any of these exist now, they are leftovers — delete them.

### Step 7 — Verify on each target's build pretence

You will not actually deploy — credentials are not yours to hold. You will simulate each target's build invocation locally:

1. **Apex-domain build (Vercel / Netlify / Cloudflare Pages):**
   ```
   rm -rf out .next
   npm run build
   ls out/index.html out/blog/index.html out/docs/getting-started/index.html out/sitemap.xml out/robots.txt
   ```
   All five paths must exist. Open `out/index.html` and confirm no asset URL begins with `/Aivex-Website/` or any other prefix.

2. **Subpath build (GitHub Pages):**
   ```
   rm -rf out .next
   NEXT_PUBLIC_BASE_PATH=/Aivex-Website NEXT_PUBLIC_SITE_URL=https://example.github.io/Aivex-Website npm run build
   ls out/index.html out/blog/index.html out/docs/getting-started/index.html
   ```
   Open `out/index.html` and confirm asset URLs **do** begin with `/Aivex-Website/`. Confirm an internal `<a href>` (e.g. the header nav) points at `/Aivex-Website/blog/` or similar — not at `/blog/`.

3. **Local preview:** `npx serve out -l 4000` and load `http://localhost:4000`. Click through nav, hit the contact form, hit the waitlist form, verify each succeeds (writing to `localStorage`, per Agent 1's work).

### Step 8 — Final verification report

Produce a closing report with **exactly** these sections:

1. **`next.config.mjs` final contents** — paste it.
2. **Provider configs added** — list with one-line purpose each.
3. **Files deleted** — bullet list (with reason for each).
4. **Files modified** — bullet list (with reason for each).
5. **`.env.example` final contents** — paste it.
6. **Build matrix** — for each of the two builds in Step 7, paste the `npm run build` summary line ("Route" table from Next.js) and a one-line confirmation that the `out/` folder exists and the spot-checked URLs are present.
7. **Static-incompatibility audit** — paste the grep results for `force-dynamic`, `revalidate`, `next/headers`, and `middleware.ts`. All must be empty or explicitly justified.
8. **Open redirects** — list every redirect path now in play (in `vercel.json`, `netlify.toml`, `_redirects`, the meta-refresh page, and the GitHub Pages note that GitHub Pages does **not** support server-side redirects, so the meta-refresh page is the only fallback there). One bullet per host with the actual behaviour, not the intent.

---

## 3. THINGS YOU MUST NOT DO

- Do **not** convert the project away from Next.js. The team uses RSC + MDX prerendering. A migration to Vite or Astro is out of scope and not invited.
- Do **not** introduce Vercel-specific features (edge functions, ISR, image optimizer, Vercel KV) anywhere. Static is static.
- Do **not** add a `serverless` or `experimental-edge` runtime annotation anywhere.
- Do **not** add a `.nvmrc`, `engines` field, or `volta` config "for safety". The CI workflow pins Node 20 explicitly; that is sufficient.
- Do **not** rewrite asset paths manually. `basePath` + `assetPrefix` plumb through Next.js's own emitters. Manual rewrites will desync from internal links.
- Do **not** add a `_app.tsx` or `_document.tsx`. This is an App Router project; those are pages-router constructs and would break the build.
- Do **not** create README sections explaining the deploy. The user did not ask for docs.
- Do **not** add an analytics integration just because `NEXT_PUBLIC_ANALYTICS_PROVIDER` exists. It's optional and remains optional.
- Do **not** delete `gray-matter`, `next-mdx-remote`, or any current runtime dependency.

---

## 4. PROTECTED SURFACES (DO NOT TOUCH)

- All UI source under `src/` — Agent 1 owns the application code. You only touch `next.config.mjs` and possibly `src/app/docs/page.tsx` for the meta-refresh redirect.
- `content/blog/**` and `content/docs/**` — content data, not yours.
- `src/lib/mdx.ts` — build-time content loader, must remain functional.
- `tailwind.config.ts`, `postcss.config.js`, `components.json` (unless §2 Step 6 verification shows it's orphaned).
- `playwright.config.ts`, `vitest.config.ts`, `__tests__/`, `e2e/`.

---

## 5. DEFINITION OF DONE

You are done when **all** of the following are simultaneously true:

1. `npm run build` with no env vars produces an apex-domain-ready `out/` folder.
2. `NEXT_PUBLIC_BASE_PATH=/Aivex-Website npm run build` produces a subpath-prefixed `out/` folder where asset URLs include the prefix.
3. `vercel.json`, `netlify.toml`, `public/_redirects`, `public/_headers`, and `.github/workflows/deploy-pages.yml` exist and match the templates above.
4. `next.config.mjs` contains `output: 'export'` and no `async redirects()`.
5. The `/docs` → `/docs/getting-started/` behaviour is preserved on every target (provider redirect on Vercel/Netlify/Cloudflare; meta-refresh page on GitHub Pages).
6. `npx serve out -l 4000` serves a working site and all three forms persist to `localStorage`.
7. No dead backend / orchestration files remain at the repo root.
8. Your closing report is written in the exact 8-section format above.

Anything less is incomplete. Re-read this document before declaring done.
