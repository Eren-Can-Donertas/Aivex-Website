import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Contact page — form completeness and real-network submission
//
// smoke.spec.ts already covers: route load, h1, email field visible, Send
// button visible.  These tests cover the remaining form fields and the
// end-to-end submission flow, verifying that:
//   - The form sends a real POST to /api/contact (not a simulated setTimeout)
//   - A successful 200/201 response transitions to the success state
//   - A server-side error response shows the error banner with the message
//   - An invalid email shows an error (server-side validation path)
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

test.describe('Contact page — form submission (real network)', () => {
  test('posts to /api/contact and shows Message Received on success', async ({ page }) => {
    // Intercept the POST and return a controlled success response
    let intercepted = false;
    let requestBody: Record<string, unknown> = {};

    await page.route('/api/contact', async (route) => {
      const req = route.request();
      expect(req.method()).toBe('POST');
      requestBody = JSON.parse(req.postData() ?? '{}');
      intercepted = true;
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Submission received' }),
      });
    });

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

    expect(intercepted).toBe(true);
    expect(requestBody['name']).toBe('Jane Smith');
    expect(requestBody['email']).toBe('jane@vcfirm.com');
  });

  test('success state shows thank-you copy', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Submission received' }),
      })
    );

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
    await page.route('/api/contact', (route) =>
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Submission received' }),
      })
    );

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

  test('server error response shows error banner with server message', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'A valid email address is required.' }),
      })
    );

    await page.goto('/contact');
    await page.getByRole('textbox', { name: /name/i }).fill('Jane Smith');
    await page.getByRole('textbox', { name: /email/i }).fill('jane@vcfirm.com');
    await page.getByRole('textbox', { name: /message/i }).fill('Hello.');
    await page.getByRole('button', { name: /Send Message/i }).click();

    await expect(
      page.getByText(/A valid email address is required\./i)
    ).toBeVisible({ timeout: 5000 });
    // Form must remain visible — user should be able to correct and retry
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
  });

  test('network failure shows fallback error message', async ({ page }) => {
    await page.route('/api/contact', (route) => route.abort('failed'));

    await page.goto('/contact');
    await page.getByRole('textbox', { name: /name/i }).fill('Jane Smith');
    await page.getByRole('textbox', { name: /email/i }).fill('jane@vcfirm.com');
    await page.getByRole('textbox', { name: /message/i }).fill('Hello.');
    await page.getByRole('button', { name: /Send Message/i }).click();

    await expect(
      page.getByText(/network error/i)
    ).toBeVisible({ timeout: 5000 });
  });
});
