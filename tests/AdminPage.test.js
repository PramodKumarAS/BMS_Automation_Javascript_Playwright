import { test, expect } from '@playwright/test';
import { login } from '../ReusableMethods/Login';
import testData from '../testData.json';

test('Validate Admin Page', async ({ page }) => {
    const { email, password } = testData.Admins.Admin;
    await login(page,email,password);

    await expect(page.locator('h1')).toContainText('Admin Page');
    await expect(page.locator('div').filter({ hasText: /^Movies$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Theatres$/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Movie' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Poster' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Movie Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Description' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Duration' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Genre' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Language' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Release Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
});


test('Validate Add Movie Dialog Modal', async ({ page }) => {
    const { email, password } = testData.Admins.Admin;
    await login(page,email,password);

    await page.getByRole('button', { name: 'Add Movie' }).click();
    await expect(page.getByText('Add MovieMovie')).toBeVisible();
    await expect(page.getByLabel('Add Movie').getByText('Add Movie')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Movie Name$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Description$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Movie Duration \(in min\)$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Select Movie LanguageSelect Language$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Release Date$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Select Movie GenreSelect Movie$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Poster URL$/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit the Data' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();

    //After closing Modal should not be visible
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText('Add MovieMovie')).not.toBeVisible();

    //After Opening modal should be visible
    await page.getByRole('button', { name: 'Add Movie' }).click();
    await expect(page.getByText('Add MovieMovie')).toBeVisible();
});