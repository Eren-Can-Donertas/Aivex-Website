import { test, expect } from '@playwright/test';

// Default language is Turkish, so header/footer labels are the TR strings.

test.describe('Header navigation — link clicks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Products navigates to /products', async ({ page }) => {
    await page.getByRole('link', { name: 'Ürünler' }).first().click();
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Research navigates to /research', async ({ page }) => {
    await page.getByRole('link', { name: 'Araştırma' }).first().click();
    await expect(page).toHaveURL(/\/research/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Roadmap navigates to /roadmap', async ({ page }) => {
    await page.getByRole('link', { name: 'Yol Haritası' }).first().click();
    await expect(page).toHaveURL(/\/roadmap/);
  });

  test('Founders navigates to /founders', async ({ page }) => {
    await page.getByRole('link', { name: 'Kurucular' }).first().click();
    await expect(page).toHaveURL(/\/founders/);
  });

  test('Request Demo CTA navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Demo Talep Et' }).first().click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('clicking the AIVEX logo returns to homepage', async ({ page }) => {
    await page.goto('/research');
    await page.getByRole('link', { name: /Aivex — home/i }).first().click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Hero CTAs', () => {
  test('primary hero CTA navigates to /products', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Ürünleri keşfet/i }).first().click();
    await expect(page).toHaveURL(/\/products/);
  });
});

// ---------------------------------------------------------------------------
// Mobile menu — the hamburger opens a nav drawer and NEVER a demo modal.
// ---------------------------------------------------------------------------

test.describe('Mobile navigation drawer', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hamburger opens a nav drawer, not a demo request', async ({ page }) => {
    await page.goto('/');
    // Contact form should not appear just because we opened the menu.
    await page.getByRole('button', { name: /Menü|Menu/i }).click();
    await expect(page.getByRole('link', { name: 'Ürünler' })).toBeVisible();
    // No form field visible — the demo request was not triggered.
    expect(await page.getByRole('textbox').count()).toBe(0);
  });

  test('demo request is an explicit action inside the drawer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Menü|Menu/i }).click();
    await page.getByRole('link', { name: 'Demo Talep Et' }).click();
    await expect(page).toHaveURL(/\/contact/);
  });
});

// ---------------------------------------------------------------------------
// Footer navigation
// ---------------------------------------------------------------------------

test.describe('Footer navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer Contact link navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: 'İletişim' }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('footer Privacy link navigates to /legal/privacy', async ({ page }) => {
    await page.getByRole('link', { name: 'Gizlilik Politikası' }).click();
    await expect(page).toHaveURL(/\/legal\/privacy/);
  });
});
