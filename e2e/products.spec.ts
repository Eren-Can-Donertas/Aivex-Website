import { test, expect } from '@playwright/test';

// Products portfolio and detail pages. Default language is Turkish.

test.describe('/products — portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('renders the five research products', async ({ page }) => {
    await expect(page.getByText('Haber Zekâsı')).toBeVisible();
    await expect(page.getByText('Grafik Zekâsı')).toBeVisible();
    await expect(page.getByText('Şirket Zekâsı')).toBeVisible();
    await expect(page.getByText('Metrikler ve Doğrulama')).toBeVisible();
    await expect(page.getByText('Model Ufuk Laboratuvarı')).toBeVisible();
  });

  test('shows honest status labels, not false availability claims', async ({ page }) => {
    await expect(page.getByText('Geliştiriliyor').first()).toBeVisible();
    await expect(page.getByText('Deneysel').first()).toBeVisible();
  });

  test('a product card links to its detail page', async ({ page }) => {
    await page.getByRole('link', { name: /Haber Zekâsı/i }).first().click();
    await expect(page).toHaveURL(/\/products\/news-intelligence/);
    await expect(page.locator('h1')).toContainText(/Haber Zekâsı/i);
  });
});

test.describe('/products/[slug] — detail brief', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products/chart-intelligence');
  });

  test('renders the research-brief sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Genel Bakış/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Neyi gözlemler/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Nasıl çalışır/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Örnek çıktı/i })).toBeVisible();
  });

  test('example output is labelled illustrative / not investment advice', async ({ page }) => {
    await expect(page.getByText(/Örnek çıktı — yatırım tavsiyesi değildir/i).first()).toBeVisible();
  });

  test('contact CTA navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: /Aivex ile iletişime geç/i }).click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
