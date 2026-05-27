import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Contact page — form completeness and submission
//
// smoke.spec.ts already covers: route load, h1, email field visible, Send
// button visible.  These tests cover the remaining form fields and the
// end-to-end submission flow, verifying that:
//   - A complete valid submission transitions to the success state
//   - The success state shows the correct copy and hides the form
//   - Submitting with required fields empty does not show the success state
// ---------------------------------------------------------------------------

test.describe('Contact page — form field completeness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('Name field is present', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible();
  });

  test('Organization field is present', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: /organization/i })).toBeVisible();
  });

  test('Message textarea is present', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: /message/i })).toBeVisible();
  });

  test('research inquiries disclaimer text is visible', async ({ page }) => {
    await expect(
      page.getByText(/research and analysis inquiries only/i)
    ).toBeVisible();
  });
});

test.describe('Contact page — form submission', () => {
  test('shows Message Received heading on valid submission', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('textbox', { name: /name/i }).fill('Jane Smith');
    await page.getByRole('textbox', { name: /email/i }).fill('jane@vcfirm.com');
    await page.getByRole('textbox', { name: /message/i }).fill(
      'We are evaluating AIVEX for our quantitative research pipeline.'
    );
    await page.getByRole('button', { name: /Send Message/i }).click();

    await expect(page.getByRole('heading', { name: /Message Received/i })).toBeVisible({
      timeout: 5000,
    });
  });

  test('success state shows thank-you copy', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('textbox', { name: /name/i }).fill('Investor Demo');
    await page.getByRole('textbox', { name: /email/i }).fill('demo@fund.com');
    await page.getByRole('textbox', { name: /message/i }).fill('Demo submission.');
    await page.getByRole('button', { name: /Send Message/i }).click();

    await expect(page.getByText(/Thank you for your interest in AIVEX/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test('success state hides the form', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('textbox', { name: /name/i }).fill('Test User');
    await page.getByRole('textbox', { name: /email/i }).fill('test@test.com');
    await page.getByRole('textbox', { name: /message/i }).fill('Test message content.');
    await page.getByRole('button', { name: /Send Message/i }).click();

    await expect(page.getByRole('heading', { name: /Message Received/i })).toBeVisible({
      timeout: 5000,
    });
    // Form should be replaced by the success panel — not visible alongside it
    await expect(page.getByRole('button', { name: /Send Message/i })).not.toBeVisible();
  });

  test('form remains visible and no success shown when required fields are empty', async ({ page }) => {
    await page.goto('/contact');
    // Click submit without filling required fields — HTML5 required prevents submit
    await page.getByRole('button', { name: /Send Message/i }).click();
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Message Received/i })).not.toBeVisible();
  });
});
