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

test('Validate Add Theatre Record', async ({ page }) => {
    const { email, password } = testData.Partners.Partner;
    await login(page,email,password);
    
    const { name,address,mail,phoneNumber } = testData.newTheatre;

    // Get count of existing theatre records before adding
    const rowsBefore = await page.locator('tbody tr').count();

    // Add new theatre
    await page.getByRole('button', { name: 'Add Theatre' }).click();
    await page.getByRole('textbox', { name: '* Theatre Name' }).click();
    await page.getByRole('textbox', { name: '* Theatre Name' }).fill(name);
    await page.getByRole('textbox', { name: '* Theatre Address' }).click();
    await page.getByRole('textbox', { name: '* Theatre Address' }).fill(address);
    await page.getByRole('textbox', { name: '* Email' }).click();
    await page.getByRole('textbox', { name: '* Email' }).fill(mail);
    await page.getByRole('spinbutton', { name: '* Phone Number' }).click();
    await page.getByRole('spinbutton', { name: '* Phone Number' }).fill(phoneNumber);
    await page.getByRole('button', { name: 'Submit the Data' }).click();

    //Validate Added Record
    await expect(page.locator('tbody')).toContainText(name);
    await expect(page.locator('tbody')).toContainText(address);
    await expect(page.locator('tbody')).toContainText(mail);
    await expect(page.locator('tbody')).toContainText(phoneNumber);
    await expect(page.locator('tbody')).toContainText('Pending/ Blocked');

    // Get count of theatre records after adding
    const rowsAfter = await page.locator('tbody tr').count(); 

    // Assert that the row count has increased by 1
    expect(rowsAfter).toBe(rowsBefore + 1); 
});

test('Validate Delete Dialog Modal', async ({ page }) => {
    const { email, password } = testData.Partners.Partner;
    await login(page,email,password);
 
    await page.getByRole('button', { name: 'delete' }).nth(1).click();
 
    await expect(page.getByRole('dialog').locator('div').nth(1)).toBeVisible();
    await expect(page.getByText('Are you sure you want to')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'No' })).toBeVisible();
    await page.getByRole('button', { name: 'No' }).click();
    await expect(page.getByRole('dialog').locator('div').nth(1)).not.toBeVisible();
});

test('Validate Delete Theatre Record', async ({ page }) => {
    const { email, password } = testData.Partners.Partner;
    await login(page, email, password);

    const { name, address, mail, phoneNumber } = testData.newTheatre;

    // Locate the row containing the theatre name and Check if the record exists
    const theatreRow = page.locator('tbody tr', { hasText: name });
    const rowCount = await theatreRow.count();
    if (rowCount === 0) {
        throw new Error(`Assertion Failed: Record "${name}" is not there`);
    }

    // Click the delete button within that row
    await theatreRow.getByRole('button', { name: 'delete' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    // Validate the record is deleted
    await expect(page.locator('tbody')).not.toContainText(name);
    await expect(page.locator('tbody')).not.toContainText(address);
    await expect(page.locator('tbody')).not.toContainText(phoneNumber);
    await expect(page.locator('tbody')).not.toContainText(mail);
});