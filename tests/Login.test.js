import { test, expect } from '@playwright/test';

test.describe.parallel('Login Tests', () => {

  test('Login page UI validation', async ({ page }) => {
    await page.goto('https://bookmyshow0101.netlify.app/login');

    // Verify heading
    await expect(page.getByRole('heading')).toContainText('🎬 BookMyShow');

    // Verify form fields
    await expect(page.locator('form')).toContainText('Email');
    await expect(page.locator('form')).toContainText('Password');

    // Verify buttons & links
    await expect(page.getByRole('button')).toContainText('Login');
    await expect(page.getByRole('paragraph')).toContainText('New user?');
    await expect(page.getByRole('paragraph')).toContainText('Register');
    await expect(page.getByRole('paragraph')).toContainText('Forgot Password?');

    // Click Login without credentials
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate error messages
    await expect(page.locator('#email_help')).toContainText('Please enter your email!');
    await expect(page.getByText('Please enter your password!')).toBeVisible();

    // Validate carousels
    await expect(page.getByRole('img', { name: 'carousel-left' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'carousel-right' })).toBeVisible();

    // Validate Register and Forgot Password pages
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page.getByRole('heading', { name: 'Register to BookMyShow' })).toBeVisible();
    await page.getByRole('link', { name: 'Login now' }).click();
    await page.getByRole('link', { name: 'Forgot Password?' }).click();
    await expect(page.getByRole('heading', { name: 'Forget Password' })).toBeVisible();
  });

  test('Login and Validate User Page', async ({ page }) => {
    await page.goto('https://bookmyshow0101.netlify.app/login');
    await page.getByRole('textbox', { name: '* Email' }).fill('pkUser@gmail.com');
    await page.getByRole('textbox', { name: '* Password' }).fill('14036');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('h2')).toContainText('🎬 Book Our Show');
    await expect(page.getByRole('textbox', { name: 'Type here to search for movies' })).toBeVisible();

    await expect(page.getByRole('banner')).toContainText('UserPramod');
    await page.getByText('UserPramod').click();
    await expect(page.getByText('My Profile')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  });

});
