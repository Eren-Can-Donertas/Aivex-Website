# AGENT 1 — BACKEND STRIP & FRONTEND DECOUPLING

You are the **Backend Strip Agent**. Your single job is to convert this Next.js 14 repository into a **pure frontend application** with **zero server-side persistence**, **zero API routes**, and **zero filesystem reads at request time**, while keeping every visible UI feature fully functional.

This document is a hard contract. Do not deviate. Do not negotiate scope. Do not "improve" things outside the scope. If a step looks redundant, do it anyway — it is part of the verification surface.

---

## 0. GROUND TRUTH — WHAT EXISTS TODAY

The architect agent has already audited the repo. You inherit these facts; do not re-debate them:

- **Framework:** Next.js 14.2.30 App Router, TypeScript, Tailwind, MDX content.
- **No database.** No ORM. No Docker. No docker-compose. No SQL. No Prisma. Persistence is **flat-file JSON/JSONL** written by Next.js Route Handlers using Node `fs`.
- **Backend surface (the only three API routes):**
  - `src/app/api/waitlist/route.ts` — `POST` + `GET`, writes/reads `data/waitlist.json`.
  - `src/app/api/contact/route.ts` — `POST`, appends to `data/contact_submissions.jsonl`.
  - `src/app/api/chat-contact/route.ts` — `POST`, appends to `data/contact_submissions.jsonl` tagged `source: 'chat-agent'`.
- **Frontend → backend call sites (the only three `fetch` calls to `/api/*`):**
  - `src/components/sections/WaitlistForm.tsx` — `POST /api/waitlist`.
  - `src/app/contact/page.tsx` — `POST /api/contact`.
  - `src/components/chat/ChatWidget.tsx` — `POST /api/chat-contact` (invoked by ElevenLabs `save_contact_info` client tool).
- **Server-only filesystem reads at build:** `src/lib/mdx.ts` reads `content/blog/*.mdx` and `content/docs/**/*.mdx` via `fs` + `gray-matter`. These are consumed by RSC pages under `src/app/blog/`, `src/app/docs/`, `src/app/sitemap.ts`. **These are not backend** — they are build-time content loading. You **MUST KEEP** them working under static export.
- **Third-party live socket:** `@elevenlabs/react` opens a websocket from the browser directly to ElevenLabs. This is a client→3rd-party call, not "our backend". **Leave it intact.** Only the `save_contact_info` client tool's `fetch('/api/chat-contact', …)` must be rewired.
- **Env vars in use:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_AGENT_ID_AIVEX`. All `NEXT_PUBLIC_*`. No server secrets exist anywhere in the repo. Do not invent any.

If anything in this section disagrees with the live tree when you start, **stop and report** — do not silently adapt. The plan below depends on the inventory above being exact.

---

## 1. NON-NEGOTIABLE RULES

1. **No backend artifacts may remain.** After your work, the following must be true:
   - `src/app/api/` directory **does not exist**.
   - The top-level `data/` directory **does not exist**.
   - No source file imports `fs`, `node:fs`, `fs/promises`, or `path` for **request-time** code paths. (`src/lib/mdx.ts` is allowed to keep `fs` because it runs at build time only — see §4.)
   - No source file references `process.cwd()` at request time.
   - No file references `/api/` as a fetch target.
   - No `route.ts` / `route.js` file exists anywhere under `src/app/`.
   - `package.json` contains **no** server-only deps that exist solely to support the stripped endpoints. (Inventory check: the current `dependencies` are all UI/content libs — `@elevenlabs/react`, `clsx`, `date-fns`, `gray-matter`, `lucide-react`, `next`, `next-mdx-remote`, `next-themes`, `react`, `react-dom`, `tailwind-merge`. **Keep all of these.** None are backend. Do not remove them. `gray-matter` is build-time MDX — keep it.)

2. **No backend container / orchestration files exist in this repo to begin with.** Do not fabricate work. If you discover a `Dockerfile`, `docker-compose*.yml`, `Procfile`, `fly.toml`, `railway.json`, `render.yaml`, `.dockerignore`, `nginx.conf`, or similar that **does** exist at the time you run, delete it. Do not invent these files just to delete them.

3. **The UI must remain visually and behaviourally identical to the user.** Every form must still:
   - Validate input the same way.
   - Show the same loading / success / error states.
   - Produce the same user-visible success copy on submit.
   The only change the end user can perceive is that their submission is now stored locally (in `localStorage`) instead of being POSTed to a server. They must not see "API error", "404", "network error", or any console spam.

4. **No half-finished work.** If you start a step, finish it. If you delete a file, also delete every import of it and every reference in tests, configs, and docs. Run typecheck after every meaningful change.

5. **No new abstractions beyond what's needed.** One mock layer module. One localStorage helper. That's it. Do not invent a "service layer", "repository pattern", "MockBackendProvider context", or similar. Three call sites do not justify ceremony.

6. **No comments explaining the migration.** Do not write `// was POST /api/waitlist`, `// removed backend`, `// TODO: replace with real API`, or similar. The git history records the migration; the code should read as if it were always frontend-only.

7. **No backwards-compatibility shims.** Do not keep stub `route.ts` files that return 410. Do not re-export removed types from new locations. Delete cleanly.

---

## 2. EXECUTION ORDER (DO NOT REORDER)

### Step 1 — Create the mock persistence layer

Create exactly one new file: `src/lib/mock-store.ts`.

Requirements:

- Module-level guard: every public function must early-return safely when `typeof window === 'undefined'` (SSR, build, tests with jsdom disabled). Reads return `[]` / `null`; writes are silent no-ops. **Never throw on SSR.**
- Storage keys: use the literal strings `aivex:waitlist:v1` and `aivex:contact-submissions:v1`. Versioned suffix is mandatory — future schema changes are not your problem, but the namespace must be claimed now.
- Wrap every `localStorage.getItem` / `setItem` in `try/catch`. Quota errors, private-mode Safari, and disabled storage must degrade to "in-memory only for this tab" (use a module-scoped `Map` fallback). Never surface the error to the UI.
- Exports (exact names — the call sites depend on them):
  - `addWaitlistEntry(email: string): { ok: true; alreadyExists: boolean } | { ok: false; reason: string }`
    - Lowercases + trims email. Validates with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` and `length <= 254`.
    - De-duplicates by email; if already present, returns `{ ok: true, alreadyExists: true }` (matches the existing 409-equivalent UX).
    - On success, persists `{ email, createdAt: new Date().toISOString() }`.
  - `getWaitlistCount(): number` — replaces the current `GET /api/waitlist` count usage. Grep first; if no caller exists, **do not export it**. (Inventory says no caller exists today; verify before adding dead code.)
  - `addContactSubmission(input: { name: string; email: string; message: string; organization?: string; source?: string }): { ok: true } | { ok: false; reason: string }`
    - Same validation rules as the current `/api/contact` and `/api/chat-contact` routes: `name` required & ≤ 2000 chars; `email` required, ≤ 254, regex-valid; `message` required (≤ 2000) for the contact form, **but for `chat-agent` source `message` is allowed to be empty** — replicate the current asymmetry exactly. Re-read the two existing route files to confirm before writing the validator; do not paraphrase the rules from memory.
    - Appends to the JSONL-equivalent array under the contact key.
- Types: re-use `WaitlistEntry` and `ContactSubmission` from `src/types/index.ts`. Do not duplicate them. If those types reference fields no longer needed, leave them — they're harmless and the file is a public type barrel.

### Step 2 — Rewire the three call sites

For each of the three files below, replace the `fetch('/api/...', …)` block with a synchronous-ish call into `mock-store.ts`. Preserve the surrounding `useState` machinery, loading flags, and success/error copy exactly.

a. **`src/components/sections/WaitlistForm.tsx`**
   - Remove the `fetch` and `res.json()` block.
   - Call `addWaitlistEntry(email)`.
   - Map `{ ok: true, alreadyExists: false }` → success state with the existing "You're on the list!" copy.
   - Map `{ ok: true, alreadyExists: true }` → success state with the existing "You're already on the list — we'll be in touch." copy.
   - Map `{ ok: false }` → error state with `reason` as the message.
   - **Keep** `trackWaitlistSignup(email)` on success — it's analytics, not backend.
   - Optional: wrap the call in a `setTimeout(..., ~250ms)` or a `requestAnimationFrame` chain **only if** removing the await collapses the loading spinner so fast it visually flickers. If a single render cycle is enough, don't add artificial latency.

b. **`src/app/contact/page.tsx`**
   - Remove the `fetch` block.
   - Call `addContactSubmission({ name, email, message, organization? })`.
   - Map `{ ok: true }` → success state. Use the existing "Message Received" UI block as-is.
   - Map `{ ok: false }` → error state with `reason`.

c. **`src/components/chat/ChatWidget.tsx`**
   - The free `saveContactInfo` function (around line 19) currently `fetch`-es `/api/chat-contact`. Rewrite it to call `addContactSubmission({ name, email, message, source: 'chat-agent' })` and return the same `string` it currently returns (the ElevenLabs client-tool contract expects a string return). Preserve the success/failure copy.
   - **Do not touch** anything else in this file — the ElevenLabs websocket, reconnect logic, and session lifecycle are out of scope.

After each file edit, re-grep for `/api/` in `src/` to confirm the call site is gone.

### Step 3 — Delete the backend

In this order:

1. Delete `src/app/api/waitlist/route.ts`.
2. Delete `src/app/api/contact/route.ts`.
3. Delete `src/app/api/chat-contact/route.ts`.
4. Delete the now-empty `src/app/api/` directory (and any intermediate empty dirs).
5. Delete `data/waitlist.json`.
6. Delete `data/contact_submissions.jsonl`.
7. Delete the now-empty `data/` directory.
8. Open `src/app/robots.ts`. It currently has `disallow: ['/api/']`. Remove the `/api/` entry from the `disallow` list. If `disallow` becomes empty, drop the key entirely (don't ship `disallow: []`).
9. Re-grep the entire repo for the literal strings `/api/`, `process.cwd()`, `data/waitlist`, `contact_submissions`, `route.ts`, and any `import.*from ['"]fs` at request-time paths. Address every hit. Build-time MDX in `src/lib/mdx.ts` is allowed to keep `fs`; it is not request-time.

### Step 4 — Tests, types, scripts

1. Run `npm run typecheck`. Fix every error caused by your changes. Do not suppress with `@ts-ignore`.
2. Look in `__tests__/` and `e2e/` for any test that exercises `/api/waitlist`, `/api/contact`, or `/api/chat-contact`. If found:
   - Vitest unit tests of the route handlers → **delete the test files**. They test code that no longer exists.
   - Vitest tests of the form components that mock `global.fetch` → **rewrite** to assert against `localStorage` (or a `vi.mock('@/lib/mock-store', …)`) instead.
   - Playwright e2e tests that submit the forms → **keep** them and verify they still pass; they exercise the UI, which now persists locally.
3. Run `npm run test`. Run `npx playwright install --with-deps chromium && npm run test:e2e` only if Playwright was already set up and passing before you started. Do not introduce browser installs in environments where they were not previously working.

### Step 5 — Final verification

Produce, as the closing artifact of your work, a short report containing **exactly** these sections:

1. **Files deleted** — bullet list of every deleted path.
2. **Files created** — bullet list (should be exactly `src/lib/mock-store.ts`).
3. **Files modified** — bullet list with one-line justification each.
4. **Grep proofs** — paste the output of:
   - `grep -r "/api/" src/` (must show **zero** hits other than the unrelated `robots.ts` already-cleaned, blog/doc MDX content mentioning APIs in prose, or string literals in analytics events — call out each remaining hit and explain why it's not a backend reference).
   - `grep -rE "from ['\"]fs['\"]|require\\(['\"]fs['\"]\\)" src/` (must show **only** `src/lib/mdx.ts`).
   - `grep -r "process.cwd" src/` (must show **only** `src/lib/mdx.ts`).
5. **Typecheck result** — `npm run typecheck` output, must be clean.
6. **Build result** — `npm run build` output, must be clean. (Yes, run it. Static export is Agent 2's job; `next build` succeeding under the default config is yours.)
7. **Manual smoke** — three lines confirming you opened the dev server, submitted each form, and observed the success state plus the corresponding `localStorage` key populated in DevTools.

---

## 3. THINGS YOU MUST NOT DO

- Do **not** introduce a new HTTP client (axios, ky, swr, react-query). The whole point is to remove network calls; do not add a library that exists to make them.
- Do **not** add IndexedDB, Dexie, or any heavyweight client store. `localStorage` is sufficient for these three flat collections. The data is single-user, single-device, demo-grade by definition once the backend is gone.
- Do **not** add a "sync to backend later" hook, comment, or TODO. There is no later backend.
- Do **not** convert any RSC page to a client component "to make state easier". The blog and docs pages must remain server components consuming `src/lib/mdx.ts` so they prerender. Only the three form/chat files are client components, and they already are.
- Do **not** rename, restructure, or "tidy" unrelated files. No prettier-wide reformats. No ESLint autofix on the whole tree. Touch only what this prompt names.
- Do **not** alter `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, the `Makefile`, or any deploy-adjacent config. Those belong to Agent 2.
- Do **not** add `output: 'export'` to `next.config.mjs`. Agent 2 owns that decision and the redirect-removal that comes with it.
- Do **not** delete `gray-matter`, `next-mdx-remote`, `@elevenlabs/react`, or any current dependency.

---

## 4. PROTECTED SURFACES (DO NOT TOUCH)

- `src/lib/mdx.ts` — build-time MDX reader. Required for blog & docs prerendering. Its `fs` use is legitimate; do not "modernize" it.
- `content/blog/**` and `content/docs/**` — MDX source content. Untouched.
- `src/components/chat/ChatWidget.tsx` outside the `saveContactInfo` function — ElevenLabs session lifecycle is fragile and load-bearing.
- `src/lib/analytics.ts` and every `trackEvent*` / `trackWaitlistSignup` / `trackCTAClick` call site — analytics is client-side, optional, and not backend.
- `public/`, `src/app/sitemap.ts`, `src/app/robots.ts` (except the one `/api/` disallow line called out above).
- All UI primitives under `src/components/ui/`.

---

## 5. DEFINITION OF DONE

You are done when **all** of the following are simultaneously true:

1. `src/app/api/` and `data/` directories are gone.
2. `grep -r "/api/" src/` shows no fetch targets to a local API.
3. `npm run typecheck` passes with zero errors.
4. `npm run build` completes successfully under the **unchanged** `next.config.mjs`.
5. `npm run dev`, when probed in a browser, lets a user submit the waitlist form, the contact form, and provide contact info through the chat assistant — each one shows the success state, and the data appears in `localStorage` under `aivex:waitlist:v1` / `aivex:contact-submissions:v1`.
6. Your closing report is written in the exact 7-section format above.

Anything less is incomplete. Re-read this document before declaring done.
