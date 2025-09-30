import { test, expect } from '@playwright/test';

test('Login page validation', async ({ page }) => {
  // Step 1: Navigate
  await page.goto('https://bookmyshow0101.netlify.app/login');

  // Step 2: Verify heading
  await expect(page.getByRole('heading')).toContainText('🎬 BookMyShow');

  // Step 3: Verify form fields
  await expect(page.locator('form')).toContainText('Email');
  await expect(page.locator('form')).toContainText('Password');

  // Step 4: Verify buttons & links
  await expect(page.getByRole('button')).toContainText('Login');
  await expect(page.getByRole('paragraph')).toContainText('New user?');
  await expect(page.getByRole('paragraph')).toContainText('Register');
  await expect(page.getByRole('paragraph')).toContainText('Forgot Password?');

  // Step 5: Click Login without credentials
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 6: Validate error messages
  await expect(page.locator('#email_help')).toContainText('Please enter your email!');
  await expect(page.getByText('Please enter your password!')).toBeVisible();
});
