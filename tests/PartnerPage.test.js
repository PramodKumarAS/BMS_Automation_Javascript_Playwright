import { test, expect } from '@playwright/test';
import { login } from '../ReusableMethods/Login';
import testData from '../testData.json';

test('Validate Partner Page', async ({ page }) => {
    const { email, password } = testData.Partners.Partner;
    await login(page,email,password);
 
    await expect(page.locator('h1')).toContainText('Partner Page');
    await expect(page.getByRole('button', { name: 'Add Theatre' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Theatres' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Theatre' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Address' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Phone Number' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'edit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'delete' })).toBeVisible();
    await expect(page.getByRole('button', { name: '+ Shows' })).toBeVisible();
});

test('Validate Add Theatre Modal', async ({ page }) => {
    const { email, password } = testData.Partners.Partner;
    await login(page,email,password);

    await expect(page.getByRole('button', { name: 'Add Theatre' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Theatre' }).click();
    await expect(page.getByText('Add TheatreTheatre')).toBeVisible();
    await expect(page.getByLabel('Add Theatre')).toContainText('Add Theatre');
    await expect(page.locator('div').filter({ hasText: /^Theatre Name$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Theatre Address$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Email$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Phone Number$/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit the Data' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
});

import { test, expect } from '@playwright/test';

test('Validate Add Theatre Record', async ({ page }) => {
    const { email, password } = testData.Partners.Partner;
    await login(page,email,password);

    await expect(page.getByRole('button', { name: 'Add Theatre' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Theatre' }).click();
    await page.getByRole('textbox', { name: '* Theatre Name' }).click();
    await page.getByRole('textbox', { name: '* Theatre Name' }).fill('PVR Inox');
    await page.getByRole('textbox', { name: '* Theatre Address' }).click();
    await page.getByRole('textbox', { name: '* Theatre Address' }).fill('1st main road,opposite to church stree, Bangalore');
    await page.getByRole('textbox', { name: '* Email' }).click();
    await page.getByRole('textbox', { name: '* Email' }).fill('pramodkumaras@gmail.com');
    await page.getByRole('spinbutton', { name: '* Phone Number' }).click();
    await page.getByRole('spinbutton', { name: '* Phone Number' }).fill('8970880953');
    await page.getByRole('button', { name: 'Submit the Data' }).click();
    await expect(page.locator('tbody')).toContainText('PVR Inox');
    await expect(page.locator('tbody')).toContainText('1st main road,opposite to church stree, Bangalore');
    await expect(page.locator('tbody')).toContainText('8970880953');
    await expect(page.locator('tbody')).toContainText('pramodkumaras@gmail.com');
    await expect(page.locator('tbody')).toContainText('Pending/ Blocked');
    await expect(page.getByRole('button', { name: 'edit' }).nth(1)).toBeVisible();
    await expect(page.getByRole('button', { name: 'delete' }).nth(1)).toBeVisible();
});

test('Validate Delete Theatre', async ({ page }) => {
    const { email, password } = testData.Partners.Partner;
    await login(page,email,password);
 
    await page.getByRole('button', { name: 'delete' }).nth(1).click();
 
    //Validate Delete Dialog Modal
    await expect(page.getByRole('dialog').locator('div').nth(1)).toBeVisible();
    await expect(page.getByText('Are you sure you want to')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'No' })).toBeVisible();
    await page.getByRole('button', { name: 'No' }).click();
    await expect(page.getByRole('dialog').locator('div').nth(1)).not.toBeVisible();

    await page.getByRole('button', { name: 'delete' }).nth(1).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.locator('tbody')).not.toContainText('PVR Inox');
    await expect(page.locator('tbody')).not.toContainText('1st main road,opposite to church stree, Bangalore');
    await expect(page.locator('tbody')).not.toContainText('8970880953');
    await expect(page.locator('tbody')).not.toContainText('pramodkumaras@gmail.com');
    await expect(page.locator('tbody')).not.toContainText('Pending/ Blocked');
});