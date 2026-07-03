import { test, expect } from '@playwright/test';

// Research reports index and detail pages. Default language is Turkish.

test.describe('/research — reports index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research');
  });

  test('page title includes Research/Araştırma', async ({ page }) => {
    await expect(page).toHaveTitle(/Research|Araştırma/i);
  });

  test('renders report cards', async ({ page }) => {
    const articles = await page.getByRole('article').count();
    expect(articles).toBeGreaterThan(0);
  });

  test('a report links to its detail page', async ({ page }) => {
    await page.getByRole('link', { name: /Raporu oku/i }).first().click();
    await expect(page).toHaveURL(/\/research\//);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('/research/[slug] — report detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/explainability-validation');
  });

  test('renders abstract and key findings', async ({ page }) => {
    await expect(page.getByText(/Özet/i).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Temel bulgular/i })).toBeVisible();
  });

  test('renders an engineering-research disclaimer', async ({ page }) => {
    await expect(page.getByText(/mühendislik-araştırma raporu/i)).toBeVisible();
  });
});

test.describe('/roadmap — maturity stages', () => {
  test('renders the four maturity stages', async ({ page }) => {
    await page.goto('/roadmap');
    await expect(page.getByRole('heading', { name: /^Temel$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Devam Ediyor/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Sıradaki/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Uzun Vadeli Araştırma/i })).toBeVisible();
  });
});

test.describe('/founders — team', () => {
  test('renders the three founders and no fabricated LinkedIn link', async ({ page }) => {
    await page.goto('/founders');
    await expect(page.getByText('Eren Can Dönertaş')).toBeVisible();
    await expect(page.getByText('Enes Kerem Göksu')).toBeVisible();
    await expect(page.getByText('Koray Şenyüzlü')).toBeVisible();
    // Koray has no verified LinkedIn; a "not listed" note is shown instead.
    await expect(page.getByText(/LinkedIn belirtilmedi/i)).toBeVisible();
  });
});
