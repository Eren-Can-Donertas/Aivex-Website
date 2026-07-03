import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Route smoke tests — every public page must:
//   - return HTTP 200
//   - render an h1
//   - not show a blank or error screen
// The default language is Turkish, so h1 assertions use TR copy where the
// heading is localized.
// ---------------------------------------------------------------------------

const ROUTES: { url: string; expectedH1: RegExp }[] = [
  { url: '/', expectedH1: /sinyal/i },
  { url: '/products', expectedH1: /portföy|portfolio/i },
  { url: '/products/news-intelligence', expectedH1: /Haber Zekâsı|News Intelligence/i },
  { url: '/research', expectedH1: /rapor|report/i },
  { url: '/research/chart-runtime-intelligence', expectedH1: /Grafik|Chart/i },
  { url: '/roadmap', expectedH1: /yol haritası|roadmap/i },
  { url: '/founders', expectedH1: /ekip|team|Aivex/i },
  { url: '/contact', expectedH1: /demo/i },
  { url: '/blog', expectedH1: /Not|Note/i },
  { url: '/legal/privacy', expectedH1: /Gizlilik|Privacy/i },
  { url: '/legal/terms', expectedH1: /Şartlar|Terms/i },
  { url: '/docs/tr/getting-started', expectedH1: /Getting Started|Başlangıç/i },
];

for (const { url, expectedH1 } of ROUTES) {
  test(`${url} — returns 200 and renders h1`, async ({ page }) => {
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toContainText(expectedH1);
  });
}

// ---------------------------------------------------------------------------
// Legacy route redirects
// ---------------------------------------------------------------------------

test.describe('Legacy redirects', () => {
  test('/product redirects to /products', async ({ page }) => {
    await page.goto('/product');
    await expect(page).toHaveURL(/\/products$/);
  });
  test('/about redirects to /founders', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/founders$/);
  });
  test('/methodology redirects to /research', async ({ page }) => {
    await page.goto('/methodology');
    await expect(page).toHaveURL(/\/research$/);
  });
});

// ---------------------------------------------------------------------------
// 404 handling
// ---------------------------------------------------------------------------

test('unknown route returns 404 and shows a not-found page', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist-xyz');
  expect(response?.status()).toBe(404);
  await expect(page.locator('body')).not.toBeEmpty();
});

// ---------------------------------------------------------------------------
// No unhandled console errors on core pages
// ---------------------------------------------------------------------------

test.describe('No unhandled console errors on core pages', () => {
  const CORE_PAGES = ['/', '/products', '/research', '/roadmap', '/founders', '/contact'];

  for (const url of CORE_PAGES) {
    test(`${url} — no unhandled errors in console`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));
      await page.goto(url);
      const hardErrors = errors.filter(
        (e) => !e.includes('hydrat') && !e.includes('Warning') && !e.includes('ReactDOM.render'),
      );
      expect(hardErrors).toHaveLength(0);
    });
  }
});

// ---------------------------------------------------------------------------
// Blog content
// ---------------------------------------------------------------------------

test.describe('Blog', () => {
  test('blog index page lists posts or shows an empty state', async ({ page }) => {
    await page.goto('/blog');
    const hasPost = await page.getByRole('article').count();
    const hasEmptyState = await page.getByText(/gönderi yok|No posts/i).count();
    expect(hasPost + hasEmptyState).toBeGreaterThan(0);
  });

  test('a blog post detail page renders without crash', async ({ page }) => {
    const response = await page.goto('/blog/2026-04-15-why-one-signal-is-not-enough');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('unknown blog slug returns 404', async ({ page }) => {
    const response = await page.goto('/blog/this-post-does-not-exist-xyz');
    expect(response?.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Disclaimer presence in the footer on every public page
// ---------------------------------------------------------------------------

test.describe('Not-financial-advice disclaimer presence', () => {
  const PAGES = ['/', '/products', '/research', '/roadmap', '/founders'];

  for (const url of PAGES) {
    test(`${url} — footer contains a not-advice disclaimer`, async ({ page }) => {
      await page.goto(url);
      await expect(page.getByText(/tavsiyesi değildir|not financial/i).first()).toBeVisible();
    });
  }
});
