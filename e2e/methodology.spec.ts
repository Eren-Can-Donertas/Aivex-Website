import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Methodology page — investor-critical content depth
//
// smoke.spec.ts already covers: route load, h1, Confidence Scoring,
// Governor Gating.  These tests cover the remaining sections that an investor
// or analyst expects to find when evaluating AIVEX's research rigour.
// ---------------------------------------------------------------------------

test.describe('Methodology page — content completeness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/methodology');
  });

  test('page title includes Methodology', async ({ page }) => {
    await expect(page).toHaveTitle(/Methodology/i);
  });

  test('Research Framework badge is visible', async ({ page }) => {
    await expect(page.getByText('Research Framework')).toBeVisible();
  });

  test('Evaluation-First Design section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Evaluation-First Design/i })).toBeVisible();
  });

  test('Signal Governance section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Signal Governance/i })).toBeVisible();
  });

  test('Cooldown Logic subsection is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Cooldown Logic/i })).toBeVisible();
  });

  test('Data Quality Principles section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Data Quality Principles/i })).toBeVisible();
  });

  test('Research Disclaimers section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Research Disclaimers/i })).toBeVisible();
  });

  test('disclaimer box states AIVEX is not a registered investment advisor', async ({ page }) => {
    await expect(
      page.getByText(/not a registered investment advisor/i)
    ).toBeVisible();
  });

  test('all main methodology sections are rendered — no blank content', async ({ page }) => {
    // Ensures the prose block is not empty and the page didn't silently drop content
    const headings = page.getByRole('heading');
    const count = await headings.count();
    // h1 + at least 4 h2/h3 sections
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
