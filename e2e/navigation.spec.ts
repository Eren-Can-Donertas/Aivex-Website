import { test, expect } from '@playwright/test';

test.describe('Header navigation — link clicks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking Product navigates to /product', async ({ page }) => {
    await page.getByRole('link', { name: 'Product' }).click();
    await expect(page).toHaveURL(/\/product/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('clicking Methodology navigates to /methodology', async ({ page }) => {
    await page.getByRole('link', { name: 'Methodology' }).click();
    await expect(page).toHaveURL(/\/methodology/);
    await expect(page.locator('h1')).toContainText('Methodology');
  });

  test('clicking Blog navigates to /blog', async ({ page }) => {
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('clicking About navigates to /about', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('h1')).toContainText('Mission');
  });

  test('clicking Request Demo CTA navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Request Demo' }).first().click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('clicking the AIVEX logo from About returns to homepage', async ({ page }) => {
    await page.goto('/about');
    // Logo link — first anchor whose text matches AIVEX
    await page.getByRole('link', { name: /^AIVEX$/i }).first().click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Footer navigation — link hrefs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer Overview link navigates to /product', async ({ page }) => {
    await page.getByRole('link', { name: 'Overview' }).click();
    await expect(page).toHaveURL(/\/product/);
  });

  test('footer About link navigates to /about', async ({ page }) => {
    // Footer About is distinct from header About — use last() to get footer
    await page.getByRole('link', { name: 'About' }).last().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('footer Contact link navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('footer Methodology link navigates to /methodology', async ({ page }) => {
    // "Methodology" appears in both header nav and footer
    const footerMethodology = page.getByRole('link', { name: 'Methodology' }).last();
    await footerMethodology.click();
    await expect(page).toHaveURL(/\/methodology/);
  });
});

test.describe('In-page hero CTAs', () => {
  test('View Docs in hero navigates to /docs/getting-started', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /View Docs/i }).click();
    await expect(page).toHaveURL(/\/docs\/getting-started/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Request Demo in hero section navigates to /contact', async ({ page }) => {
    await page.goto('/');
    // The hero CTA is the first Request Demo link on the page
    await page.getByRole('link', { name: /Request Demo/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });
});

// ---------------------------------------------------------------------------
// Missing header nav flows
// ---------------------------------------------------------------------------

test.describe('Header navigation — Docs link', () => {
  test('clicking Docs navigates to /docs/getting-started', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/\/docs\/getting-started/);
    await expect(page.locator('h1')).toContainText(/Getting Started/i);
  });
});

// ---------------------------------------------------------------------------
// About page CTA click-throughs
// Smoke tests verify the CTAs are visible; these verify they navigate correctly.
// ---------------------------------------------------------------------------

test.describe('About page — CTA navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('Contact Us button navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: /Contact Us/i }).click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText(/Demo/i);
  });

  test('Read the Docs button navigates to /docs/getting-started', async ({ page }) => {
    await page.getByRole('link', { name: /Read the Docs/i }).click();
    await expect(page).toHaveURL(/\/docs\/getting-started/);
    await expect(page.locator('h1')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Footer navigation — Docs link (not previously covered)
// ---------------------------------------------------------------------------

test.describe('Footer navigation — Docs link', () => {
  test('footer Docs link navigates to /docs/getting-started', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Docs' }).last().click();
    await expect(page).toHaveURL(/\/docs\/getting-started/);
  });
});
