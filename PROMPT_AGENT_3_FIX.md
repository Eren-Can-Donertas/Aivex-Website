# AGENT 3 — POST-AUDIT FIX PASS

You are the **Audit Remediation Agent**. You run **after** Agents 1 and 2 have already stripped the backend and configured the repo for static deployment. A subsequent deployability + security audit found a small set of concrete defects. Your job is to fix exactly those defects — nothing more, nothing less.

This document is a hard contract. Do not deviate. Do not negotiate scope. Do not "improve" things outside the scope. If a step looks redundant, do it anyway — it is part of the verification surface.

---

## 0. GROUND TRUTH — WHAT THE AUDIT FOUND

You inherit these facts from a finished audit; do not re-debate them, do not re-explore the repo before starting:

- **The backend strip is correct.** `src/app/api/` and `data/` are gone. The three call sites (`WaitlistForm.tsx`, `contact/page.tsx`, `ChatWidget.tsx`) talk to `src/lib/mock-store.ts`. `npm run typecheck` is clean.
- **The static-export pipeline works on both build modes.** Apex-domain build (`npm run build` with no env) produces a valid `out/`. Subpath build (`NEXT_PUBLIC_BASE_PATH=/Aivex-Website npm run build`) correctly prefixes every asset, every `<Link>`, `og:url`, `og:image`, the sitemap, and the `/docs/` meta-refresh redirect.
- **Provider configs exist:** `vercel.json`, `netlify.toml`, `public/_redirects`, `public/_headers`, `.github/workflows/deploy-pages.yml`. The meta-refresh in `src/app/docs/[[...slug]]/page.tsx` is the GitHub-Pages fallback for the `/docs` → `/docs/getting-started/` redirect.
- **Known build noise:** there is one ESLint warning — `'getAllDocPages' is defined but never used` in `src/app/docs/[[...slug]]/page.tsx`. It is genuinely unused after Agent 2's edits.

Do **not** re-run a full audit. Do **not** reconsider the architecture. Your scope is the punch list in §2.

---

## 1. NON-NEGOTIABLE RULES

1. **Touch only the files this document names.** If you find yourself reaching for a file not listed in §2, stop — it's out of scope. No `prettier --write` on the tree. No drive-by refactors. No "while I'm here" cleanups.
2. **No new dependencies.** Every fix below is achievable with existing tools.
3. **No comments explaining the fix.** Do not write `// removed cleanUrls because of trailingSlash conflict` or `// added per audit`. Git history records the change.
4. **No half-finished work.** Every fix lands cleanly. Run typecheck after the code change in §2.3. Run a full build matrix in §3.
5. **Do not modify `src/lib/mock-store.ts`, the form components, the chat widget, or any MDX loader code.** The data layer is locked.
6. **Do not modify `next.config.mjs`.** The static-export setup is correct.
7. **Do not add a CI workflow.** Out of scope. The audit flagged its absence as informational; the user has not asked for it.
8. **Do not change ElevenLabs agent configuration.** The audit's note about locking down "Allowed origins" in the ElevenLabs dashboard is an **operational** step the user performs outside this repo. Do not invent code to enforce it.
9. **Do not add a Content-Security-Policy.** The audit flagged it as optional and explicitly noted that a correct CSP requires investigating the `next-themes` inline script and the ElevenLabs websocket. That investigation is out of scope for this pass. Only the three uncontroversial response headers in §2.4 are in scope.
10. **No backwards-compatibility shims.** Delete dead lines outright.

---

## 2. THE PUNCH LIST (DO IN THIS ORDER)

### 2.1 — Add `out/` to `.gitignore`

**File:** `.gitignore`

Currently the file gitignores `dist/` and `build/` but not `out/`. Since Agent 2 changed `next.config.mjs` to `output: 'export'`, builds now land in `out/` — a future `git add .` will commit the build artifact.

**Action:** insert `out/` as a new line immediately after the existing `build/` line (line 3 in the current file). Preserve all other content exactly.

**Verify:** `git check-ignore out/` must print `out/` (or exit 0 quietly, depending on the git version).

### 2.2 — Remove `cleanUrls` from `vercel.json`

**File:** `vercel.json`

Current contents include `"cleanUrls": true`. `next.config.mjs` sets `trailingSlash: true`, which makes every emitted URL look like `/foo/` and writes to `out/foo/index.html`. Vercel's `cleanUrls` is designed to strip `.html` extensions and would conflict with the trailing-slash policy by issuing an extra 308. There are no `*.html`-suffixed routes in our export to begin with.

**Action:** delete the `"cleanUrls": true,` line from `vercel.json`. Leave `trailingSlash: true` alone — that one is correct and matches the Next.js config. Leave the `redirects` block alone. Leave `framework: null`, `buildCommand`, and `outputDirectory` alone.

**Verify:** `vercel.json` should now contain exactly these top-level keys: `buildCommand`, `outputDirectory`, `framework`, `trailingSlash`, `redirects`. Re-parse it with `node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf-8'))"` and confirm exit 0.

### 2.3 — Drop the unused import in the docs catch-all

**File:** `src/app/docs/[[...slug]]/page.tsx`

Line 5 currently imports `getAllDocSlugs, getAllDocPages, getDocPageBySlug` from `@/lib/mdx`. `getAllDocPages` is unused — the audit confirmed it surfaces as `@typescript-eslint/no-unused-vars` during `npm run build`.

**Action:** remove `getAllDocPages` from the import list on line 5. Leave the other two named imports intact. Do not change anything else in this file — the meta-refresh redirect block, `generateStaticParams`, `generateMetadata`, and the rendering body are all correct and load-bearing.

**Verify:** `npm run typecheck` passes. A fresh `npm run build` must complete with no `@typescript-eslint/no-unused-vars` warning for this file.

### 2.4 — Add three uncontroversial response headers to every host that supports them

The audit recommended a minimal headers block — **just three headers** that have no compatibility cost and require no per-page reasoning:

- `X-Content-Type-Options: nosniff` — prevents MIME-sniffing-based XSS, no downside.
- `Referrer-Policy: strict-origin-when-cross-origin` — already the browser default in modern browsers, but explicit. No downside.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — denies powerful permissions the marketing site never uses. No downside.

**Do NOT add** `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, `Cross-Origin-Opener-Policy`, or anything else. Those have non-trivial interactions with `next-themes`' inline script, the ElevenLabs iframe-or-not behavior, and HSTS preload commitments that the user has not opted into.

Apply the three headers to **all paths** (`/*`) for each provider that supports per-path headers. GitHub Pages cannot set custom headers — there is nothing to do for that target; do not invent a workaround.

#### a. `public/_headers` (Cloudflare Pages; also read by Netlify as fallback)

The file currently contains only:
```
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

**Action:** prepend a `/*` rule **above** the existing `/_next/static/*` rule (more-specific rules must come last in `_headers` semantics). After your edit the file must read exactly:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

Two-space indentation under each path matcher is required by the `_headers` parser. A single blank line between the two blocks.

#### b. `netlify.toml` (Netlify primary)

The file currently has a `[build]` table, one `[[redirects]]` block, and one `[[headers]]` block (for `/_next/static/*`). Add a second `[[headers]]` block above or below the existing one, scoped to `/*`. Order does not matter for `[[headers]]` in `netlify.toml` (Netlify merges them).

The new block must read exactly:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

Do not touch the existing `[[redirects]]` or `[build]` tables.

#### c. `vercel.json` (Vercel)

The file does not currently declare a `headers` key. Add one as a top-level array, alongside `redirects`. The final shape after both §2.2 and this step must be:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": null,
  "trailingSlash": true,
  "redirects": [
    { "source": "/docs", "destination": "/docs/getting-started/", "permanent": false }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

Note `"source": "/(.*)"` — that is the correct Vercel pattern for "every path". `"/*"` is **not** valid in Vercel's path syntax.

#### d. GitHub Pages — explicitly do nothing

GitHub Pages does not support custom response headers. Do not modify `.github/workflows/deploy-pages.yml` to try to inject any. Do not invent a workaround via meta tags (`<meta http-equiv="Content-Security-Policy">` is the only one of the three that has a meta-equivalent at all, and it's not in scope). Skip this target silently.

---

## 3. VERIFICATION (RUN ALL OF THESE)

Run, in order, and capture output for your final report:

1. **Static-incompatibility audit (sanity check that nothing regressed):**
   ```
   grep -rE "force-dynamic|export const revalidate|from ['\"]next/headers['\"]" src/
   ```
   Must produce zero hits.

2. **Backend-stripout sanity (sanity check):**
   ```
   grep -rE "/api/|process\.cwd|from ['\"]fs['\"]" src/
   ```
   Acceptable hits: only `src/lib/mdx.ts` (uses `fs` and `process.cwd()` at build time) and possibly references inside MDX prose under `content/` (which §2 doesn't touch — grep `src/` only).

3. **`vercel.json` is valid JSON:**
   ```
   node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf-8'))" && echo "OK"
   ```
   Must print `OK`.

4. **`netlify.toml` is valid TOML:**
   If `npx --yes @iarna/toml-cli parse netlify.toml` is too heavy, simpler check: run `npm run build` (Step 6 below) and confirm Netlify-irrelevant tools still work. Or visually verify the file against the template in §2.4.b.

5. **Typecheck:**
   ```
   npm run typecheck
   ```
   Must exit 0.

6. **Apex-domain build:**
   ```
   rm -rf .next out
   npm run build
   ```
   Must exit 0. Confirm `out/index.html` exists. Confirm the previously-flagged `getAllDocPages` warning is gone from the output.

7. **Subpath build (GitHub Pages mode):**
   ```
   rm -rf .next out
   NEXT_PUBLIC_BASE_PATH=/Aivex-Website NEXT_PUBLIC_SITE_URL=https://example.github.io/Aivex-Website npm run build
   ```
   Must exit 0. Confirm `out/index.html` contains `/Aivex-Website/_next/` asset prefixes (one quick `grep` is sufficient). Confirm `out/docs/index.html` contains `<meta http-equiv="refresh" content="0; url=./getting-started/"/>`.

8. **`.gitignore` is honoring `out/`:**
   ```
   git check-ignore out
   ```
   Must exit 0 and print `out` (or `out/`).

---

## 4. FINAL REPORT (REQUIRED FORMAT)

Produce a closing report with **exactly** these six sections, in this order, no extras:

1. **Files modified** — bullet list with one-line justification each. Should be exactly: `.gitignore`, `vercel.json`, `src/app/docs/[[...slug]]/page.tsx`, `public/_headers`, `netlify.toml`.
2. **Diff summary** — `git diff --stat` output.
3. **Final `vercel.json`** — paste the file contents verbatim.
4. **Final `public/_headers`** — paste the file contents verbatim.
5. **Verification output** — paste each of the eight commands from §3 with its result. The two build commands' "Route" tables can be summarized to the totals line only (e.g. "✓ Generating static pages (24/24)") to keep the report short.
6. **What was deliberately NOT done** — a short bullet list reaffirming the explicit non-goals from §1 (no CSP, no CI workflow, no ElevenLabs config changes, no mock-store changes, no other touched files). This section is required — its purpose is to make it impossible for a reviewer to wonder whether you forgot something vs. consciously skipped it.

---

## 5. DEFINITION OF DONE

You are done when **all** of the following are simultaneously true:

1. `out/` is in `.gitignore`.
2. `vercel.json` has no `cleanUrls` key and has a `headers` block containing exactly the three audit-approved headers under `"/(.*)"`.
3. `netlify.toml` contains a second `[[headers]]` block scoped `/*` with exactly the three audit-approved headers.
4. `public/_headers` contains a `/*` block with exactly the three audit-approved headers, placed above the existing `/_next/static/*` cache block.
5. `src/app/docs/[[...slug]]/page.tsx` no longer imports `getAllDocPages`.
6. `npm run typecheck` passes.
7. Both build modes in §3 (apex and subpath) complete successfully and show no `getAllDocPages` warning.
8. Your closing report follows the six-section structure in §4 exactly.

Anything less is incomplete. Re-read this document before declaring done.
