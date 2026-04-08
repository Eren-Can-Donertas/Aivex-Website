import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Content presence ──────────────────────────────────────────────────────

  test('page title includes AIVEX', async ({ page }) => {
    await expect(page).toHaveTitle(/AIVEX/i);
  });

  test('h1 contains the AI signal research headline', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('AI signal research');
  });

  test('hero subheadline mentions modular AI system', async ({ page }) => {
    await expect(page.getByText(/modular AI system/i)).toBeVisible();
  });

  test('research preview badge is visible', async ({ page }) => {
    await expect(page.getByText(/Research Preview/i)).toBeVisible();
  });

  // ── CTA buttons ───────────────────────────────────────────────────────────

  test('Request Demo CTA is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Request Demo/i }).first()).toBeVisible();
  });

  test('View Docs CTA is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /View Docs/i })).toBeVisible();
  });

  test('Request Demo CTA points to /contact', async ({ page }) => {
    const href = await page
      .getByRole('link', { name: /Request Demo/i })
      .first()
      .getAttribute('href');
    expect(href).toBe('/contact');
  });

  // ── Navigation bar ────────────────────────────────────────────────────────

  test('navigation links are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Product' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Methodology' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('theme toggle button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Toggle theme/i })).toBeVisible();
  });

  // ── Module cards ──────────────────────────────────────────────────────────

  test('Modular Signal Architecture section is visible', async ({ page }) => {
    await expect(page.getByText('Modular Signal Architecture')).toBeVisible();
  });

  test('all six module cards are present', async ({ page }) => {
    await expect(page.getByText('News Signal')).toBeVisible();
    await expect(page.getByText('Chart Signal')).toBeVisible();
    await expect(page.getByText('Metrics Signal')).toBeVisible();
    await expect(page.getByText('Signal Engine')).toBeVisible();
    await expect(page.getByText('Governor')).toBeVisible();
    await expect(page.getByText('Eye (API)')).toBeVisible();
  });

  // ── Architecture diagram ──────────────────────────────────────────────────

  test('System Architecture section is visible', async ({ page }) => {
    await expect(page.getByText('System Architecture')).toBeVisible();
  });

  // ── Trust section ─────────────────────────────────────────────────────────

  test('Built on Three Principles section is visible', async ({ page }) => {
    await expect(page.getByText('Built on Three Principles')).toBeVisible();
  });

  // ── Waitlist form ─────────────────────────────────────────────────────────

  test('Get Early Access section is visible', async ({ page }) => {
    await expect(page.getByText('Get Early Access')).toBeVisible();
  });

  test('waitlist email input is present', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: /email address/i })).toBeVisible();
  });

  test('Join Waitlist button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Join Waitlist/i })).toBeVisible();
  });

  test('waitlist form accepts a valid email and shows success', async ({ page }) => {
    await page.getByRole('textbox', { name: /email address/i }).fill('investor@vc.com');
    await page.getByRole('button', { name: /Join Waitlist/i }).click();
    await expect(page.getByText(/on the list|already on/i)).toBeVisible({ timeout: 5000 });
  });

  test('waitlist form shows validation error for invalid email', async ({ page }) => {
    await page.getByRole('textbox', { name: /email address/i }).fill('notvalid');
    await page.getByRole('button', { name: /Join Waitlist/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
    await expect(page.getByText(/on the list/i)).not.toBeVisible();
  });

  // ── Footer ────────────────────────────────────────────────────────────────

  test('footer renders the not-financial-advice disclaimer', async ({ page }) => {
    await expect(page.getByText(/not financial advice/i).first()).toBeVisible();
  });
});

test.describe('Home page — mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14

  test('h1 is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Join Waitlist button is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /Join Waitlist/i })).toBeVisible();
  });
});
