/**
 * e2e/product.spec.ts
 *
 * Investor-critical coverage for /product.
 * Verifies the key claims that a prospective investor or partner reads:
 *   - How It Works pipeline steps
 *   - Key Differentiators (audit trails, confidence scoring, etc.)
 *   - Roadmap section
 *   - No console errors
 *   - Mobile layout integrity
 */

import { test, expect } from '@playwright/test';

test.describe('/product page — investor-critical content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/product');
  });

  // ── Structure ──────────────────────────────────────────────────────────

  test('page title includes AIVEX or Product', async ({ page }) => {
    await expect(page).toHaveTitle(/AIVEX|Product/i);
  });

  test('main heading "What AIVEX Does" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /What AIVEX Does/i })).toBeVisible();
  });

  // ── How It Works pipeline ──────────────────────────────────────────────

  test('"How It Works" section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /How It Works/i })).toBeVisible();
  });

  test('pipeline step "Ingest" is present', async ({ page }) => {
    await expect(page.getByText(/Ingest/i)).toBeVisible();
  });

  test('pipeline step "Analyze" is present', async ({ page }) => {
    await expect(page.getByText(/Analyze/i)).toBeVisible();
  });

  test('pipeline step "Compose" is present', async ({ page }) => {
    await expect(page.getByText(/Compose/i)).toBeVisible();
  });

  test('pipeline step "Govern & Emit" is present', async ({ page }) => {
    await expect(page.getByText(/Govern/i)).toBeVisible();
  });

  // ── Key Differentiators ────────────────────────────────────────────────

  test('"Key Differentiators" section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Key Differentiators/i })).toBeVisible();
  });

  test('Audit trails differentiator is present', async ({ page }) => {
    await expect(page.getByText(/Audit trails/i)).toBeVisible();
  });

  test('Confidence scoring differentiator is present', async ({ page }) => {
    await expect(page.getByText(/Confidence scoring/i)).toBeVisible();
  });

  test('24\/7 supervision differentiator is present', async ({ page }) => {
    await expect(page.getByText(/24\/7 supervision/i)).toBeVisible();
  });

  test('Research compliance differentiator is present', async ({ page }) => {
    await expect(page.getByText(/Research compliance/i)).toBeVisible();
  });

  test('Multi-source consensus differentiator is present', async ({ page }) => {
    await expect(page.getByText(/Multi-source consensus/i)).toBeVisible();
  });

  // ── Roadmap ────────────────────────────────────────────────────────────

  test('"Roadmap" section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Roadmap/i })).toBeVisible();
  });

  // ── No errors ─────────────────────────────────────────────────────────

  test('no unhandled console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/product');
    expect(errors).toHaveLength(0);
  });

  // ── Mobile ────────────────────────────────────────────────────────────

  test('main heading is visible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/product');
    await expect(page.getByRole('heading', { name: /What AIVEX Does/i })).toBeVisible();
  });

  test('"How It Works" section is visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/product');
    await expect(page.getByRole('heading', { name: /How It Works/i })).toBeVisible();
  });
});
