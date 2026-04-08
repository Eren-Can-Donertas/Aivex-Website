import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Docs pages — investor-critical architecture and getting-started content
//
// smoke.spec.ts already covers: route loads, h1s, "Data Flow" on architecture
// page, "Prerequisites" on getting-started.  These tests verify the additional
// depth that an investor or technical evaluator expects when reading AIVEX docs,
// plus smoke coverage for the four module-specific doc pages.
// ---------------------------------------------------------------------------

test.describe('Docs — architecture overview content depth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/architecture-overview');
  });

  test('page title includes Architecture', async ({ page }) => {
    await expect(page).toHaveTitle(/Architecture/i);
  });

  test('Design Principles section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Design Principles/i })).toBeVisible();
  });

  test('module isolation principle is mentioned', async ({ page }) => {
    await expect(page.getByText(/Module isolation/i)).toBeVisible();
  });

  test('fault tolerance principle is mentioned', async ({ page }) => {
    await expect(page.getByText(/Fault tolerance/i)).toBeVisible();
  });

  test('Process Architecture section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Process Architecture/i })).toBeVisible();
  });
});

test.describe('Docs — getting started content depth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/getting-started');
  });

  test('page title includes Getting Started', async ({ page }) => {
    await expect(page).toHaveTitle(/Getting Started/i);
  });

  test('Installation section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Installation/i })).toBeVisible();
  });

  test('Environment Configuration section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Environment Configuration/i })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Module doc pages — load without error
// These pages are linked from the docs sidebar and may be visited during
// technical due-diligence.  A single content check per page is sufficient
// to detect a blank render or routing failure.
// ---------------------------------------------------------------------------

test.describe('Docs — module pages load correctly', () => {
  const MODULE_PAGES: { url: string; expectedContent: RegExp }[] = [
    { url: '/docs/modules/signal-engine',  expectedContent: /Signal Engine/i },
    { url: '/docs/modules/atomic-signals', expectedContent: /Atomic/i },
    { url: '/docs/modules/governor',       expectedContent: /Governor/i },
    { url: '/docs/modules/watchdog',       expectedContent: /Watchdog/i },
  ];

  for (const { url, expectedContent } of MODULE_PAGES) {
    test(`${url} — loads and renders expected content`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      // Verify page-specific content to catch silent blank renders
      await expect(page.getByText(expectedContent).first()).toBeVisible();
    });
  }
});
