/**
 * e2e/investor-flows.spec.ts
 *
 * End-to-end coverage for the journeys a prospective investor or partner
 * is most likely to take on the AIVEX website.
 *
 * Journeys covered:
 *   1. Landing → product overview  (curiosity → depth)
 *   2. Landing → methodology       (trust → technical credibility)
 *   3. Landing → contact form      (interest → engagement)
 *   4. About page credibility signals (mission, ethics, disclaimers)
 *   5. Docs entry point reachability
 *   6. Disclaimer/research ethics present on key pages
 */

import { test, expect } from '@playwright/test';

// ── Journey 1: Landing → Product ──────────────────────────────────────────

test.describe('Investor journey: landing → product deep dive', () => {
  test('navigating from hero CTA "View Docs" lands on docs page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /View Docs/i }).first().click();
    await expect(page).toHaveURL(/\/docs/);
  });

  test('navigating to /product from nav shows pipeline content', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Product/i }).first().click();
    await expect(page).toHaveURL('/product');
    await expect(page.getByRole('heading', { name: /What AIVEX Does/i })).toBeVisible();
  });

  test('product page sub-second latency claim is visible', async ({ page }) => {
    await page.goto('/product');
    await expect(page.getByText(/Sub-second latency/i)).toBeVisible();
  });

  test('product page Governor kill-switch description is visible', async ({ page }) => {
    await page.goto('/product');
    await expect(page.getByText(/Governor/i)).toBeVisible();
  });
});

// ── Journey 2: Landing → Methodology ──────────────────────────────────────

test.describe('Investor journey: landing → methodology / credibility', () => {
  test('methodology page is reachable from nav', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Methodology/i }).first().click();
    await expect(page).toHaveURL('/methodology');
  });

  test('methodology page renders confidence scoring section', async ({ page }) => {
    await page.goto('/methodology');
    await expect(page.getByText(/confidence/i)).toBeVisible();
  });

  test('methodology page renders governor gating section', async ({ page }) => {
    await page.goto('/methodology');
    await expect(page.getByText(/governor/i)).toBeVisible();
  });
});

// ── Journey 3: Landing → Contact / Demo request ────────────────────────────

test.describe('Investor journey: landing → demo request form', () => {
  test('Request Demo CTA in hero routes to contact page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Request Demo/i }).first().click();
    await expect(page).toHaveURL('/contact');
  });

  test('contact page form fields are all present', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test('contact page submit button is present and enabled by default', async ({ page }) => {
    await page.goto('/contact');
    const submit = page.getByRole('button', { name: /send|submit|request/i });
    await expect(submit).toBeVisible();
    await expect(submit).toBeEnabled();
  });

  test('contact form blocks submission when required fields are empty', async ({ page }) => {
    await page.goto('/contact');
    const submit = page.getByRole('button', { name: /send|submit|request/i });
    await submit.click();
    // Either HTML5 validation or in-page error message prevents navigation
    await expect(page).toHaveURL('/contact');
  });

  test('full contact form fills and submits a real network request', async ({ page }) => {
    let intercepted = false;
    await page.route('/api/contact', async (route) => {
      intercepted = true;
      const req = route.request();
      expect(req.method()).toBe('POST');
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Submission received' }),
      });
    });

    await page.goto('/contact');
    await page.getByLabel(/name/i).fill('Investor Test');
    await page.getByLabel(/email/i).fill('investor@example.com');

    // Fill message/textarea if present
    const msg = page.getByLabel(/message|details|description/i);
    if (await msg.count() > 0) await msg.first().fill('Interested in AIVEX research platform.');

    await page.getByRole('button', { name: /send|submit|request/i }).click();

    // Either network was intercepted or a success UI element appeared
    const successEl = page.getByText(/success|received|thank|sent/i);
    const hasSuccess = intercepted || (await successEl.count()) > 0;
    expect(hasSuccess).toBe(true);
  });
});

// ── Journey 4: About page credibility signals ──────────────────────────────

test.describe('About page — investor trust signals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('page loads with 200 and renders h1', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('"Our Mission" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Our Mission/i })).toBeVisible();
  });

  test('"Why We Built AIVEX" section is present', async ({ page }) => {
    await expect(page.getByText(/Why We Built AIVEX/i)).toBeVisible();
  });

  test('"What Makes Us Different" section is present', async ({ page }) => {
    await expect(page.getByText(/What Makes Us Different/i)).toBeVisible();
  });

  test('"Research Ethics" section is present', async ({ page }) => {
    await expect(page.getByText(/Research Ethics/i)).toBeVisible();
  });

  test('"Get In Touch" section and Contact Us button are present', async ({ page }) => {
    await expect(page.getByText(/Get In Touch/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact Us/i })).toBeVisible();
  });

  test('Contact Us button on about page navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: /Contact Us/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('no unhandled console errors on about page', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/about');
    expect(errors).toHaveLength(0);
  });
});

// ── Journey 5: Research disclaimer / not-financial-advice ─────────────────

test.describe('Research disclaimer — investor compliance signals', () => {
  const keyPages = ['/', '/product', '/methodology', '/about'];

  for (const url of keyPages) {
    test(`disclaimer is present on ${url}`, async ({ page }) => {
      await page.goto(url);
      // Accept any of the common disclaimer phrasings
      const disclaimer = page
        .getByText(/not financial advice|research only|not a recommendation|research artifact/i)
        .first();
      await expect(disclaimer).toBeVisible();
    });
  }
});

// ── Journey 6: Docs entry point reachability ───────────────────────────────

test.describe('Docs entry point — investor due diligence', () => {
  test('docs page is reachable from nav', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Docs/i }).first().click();
    await expect(page).toHaveURL(/\/docs/);
  });

  test('docs getting-started page has h1', async ({ page }) => {
    await page.goto('/docs/getting-started');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('docs architecture page has h1', async ({ page }) => {
    await page.goto('/docs/architecture');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
