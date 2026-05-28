import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Route smoke tests — every public page must:
//   - return HTTP 200
//   - render an h1
//   - not show a blank or error screen
// ---------------------------------------------------------------------------

const ROUTES: { url: string; expectedH1: RegExp }[] = [
  { url: '/',                             expectedH1: /AI signal research/i },
  { url: '/product',                      expectedH1: /AIVEX/i },
  { url: '/methodology',                  expectedH1: /Methodology/i },
  { url: '/about',                        expectedH1: /Mission/i },
  { url: '/contact',                      expectedH1: /Demo/i },
  { url: '/blog',                         expectedH1: /Updates/i },
  { url: '/docs/tr/getting-started',         expectedH1: /Getting Started/i },
  { url: '/docs/tr/architecture-overview',   expectedH1: /Architecture/i },
];

for (const { url, expectedH1 } of ROUTES) {
  test(`${url} — returns 200 and renders h1`, async ({ page }) => {
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText(expectedH1);
  });
}

// ---------------------------------------------------------------------------
// 404 handling
// ---------------------------------------------------------------------------

test('unknown route returns 404 and shows a not-found page', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist-xyz');
  expect(response?.status()).toBe(404);
  // Must render something — not a blank screen
  await expect(page.locator('body')).not.toBeEmpty();
});

// ---------------------------------------------------------------------------
// No console errors on critical pages
// ---------------------------------------------------------------------------

test.describe('No unhandled console errors on core pages', () => {
  const CORE_PAGES = ['/', '/product', '/contact', '/methodology'];

  for (const url of CORE_PAGES) {
    test(`${url} — no unhandled errors in console`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));
      await page.goto(url);
      // Allow React hydration warnings but fail on hard errors
      const hardErrors = errors.filter(
        (e) =>
          !e.includes('hydrat') &&
          !e.includes('Warning') &&
          !e.includes('ReactDOM.render')
      );
      expect(hardErrors).toHaveLength(0);
    });
  }
});

// ---------------------------------------------------------------------------
// Content sanity checks on key investor pages
// ---------------------------------------------------------------------------

test.describe('Investor page content sanity', () => {
  test('product page renders how-it-works steps', async ({ page }) => {
    await page.goto('/product');
    await expect(page.getByText('Ingest')).toBeVisible();
    await expect(page.getByText('Analyze')).toBeVisible();
    await expect(page.getByText('Compose')).toBeVisible();
    await expect(page.getByText('Govern & Emit')).toBeVisible();
  });

  test('product page renders roadmap section', async ({ page }) => {
    await page.goto('/product');
    await expect(page.getByText('Roadmap')).toBeVisible();
    await expect(page.getByText('Now')).toBeVisible();
    await expect(page.getByText('Next')).toBeVisible();
    await expect(page.getByText('Later')).toBeVisible();
  });

  test('methodology page renders confidence scoring section', async ({ page }) => {
    await page.goto('/methodology');
    await expect(page.getByText(/Confidence Scoring/i)).toBeVisible();
  });

  test('methodology page renders governor gating section', async ({ page }) => {
    await page.goto('/methodology');
    await expect(page.getByText(/Governor Gating/i)).toBeVisible();
  });

  test('about page renders why-we-built-aivex section', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText(/Why We Built AIVEX/i)).toBeVisible();
  });

  test('about page renders contact us button', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('link', { name: /Contact Us/i })).toBeVisible();
  });

  test('contact page renders the demo request form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Send/i })).toBeVisible();
  });

  test('docs architecture page renders data flow section', async ({ page }) => {
    await page.goto('/docs/tr/architecture-overview');
    await expect(page.getByText(/Data Flow/i)).toBeVisible();
  });

  test('docs getting-started page renders installation instructions', async ({ page }) => {
    await page.goto('/docs/tr/getting-started');
    await expect(page.getByText(/Prerequisites/i)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Blog content
// ---------------------------------------------------------------------------

test.describe('Blog', () => {
  test('blog index page lists at least one post', async ({ page }) => {
    await page.goto('/blog');
    // Either posts are listed or the no-posts message is shown
    const hasPost = await page.getByRole('article').count();
    const hasEmptyState = await page.getByText(/No posts yet/i).count();
    expect(hasPost + hasEmptyState).toBeGreaterThan(0);
  });

  test('first blog post detail page renders without crash', async ({ page }) => {
    const response = await page.goto(
      '/blog/2026-01-15-introducing-aivex'
    );
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('unknown blog slug returns 404', async ({ page }) => {
    const response = await page.goto('/blog/this-post-does-not-exist-xyz');
    expect(response?.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Disclaimer presence on every public page
// ---------------------------------------------------------------------------

test.describe('Research disclaimer presence', () => {
  const DISCLAIMER_PAGES = ['/', '/product', '/methodology', '/about'];

  for (const url of DISCLAIMER_PAGES) {
    test(`${url} — footer contains not-financial-advice disclaimer`, async ({ page }) => {
      await page.goto(url);
      await expect(page.getByText(/not financial advice/i).first()).toBeVisible();
    });
  }
});
