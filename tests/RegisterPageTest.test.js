import { test, expect } from '@playwright/test';
import testData from '../testData.json' assert { type: "json" };
import { MongoConnect,findMongoRecord } from '../ReusableMethods/Mongo';

test('Validate Register Page', async ({ page }) => {
    await page.goto('https://bookmyshow0101.netlify.app/login');
    await page.getByRole('link', { name: 'Register' }).click();
  
    await expect(page.getByText('Register to BookMyShowCreate your account in just a few stepsFull')).toBeVisible();
    await expect(page.getByRole('heading')).toContainText('Register to BookMyShow');
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email').first()).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByText('Register as an Admin?')).toBeVisible();
    await expect(page.getByText('Register as a Partner?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login now' })).toBeVisible();
});

test('Validate Create new user', async ({ page }) => {
    await page.goto('https://bookmyshow0101.netlify.app/login');

    const {name,email,password} = testData.newUser;

    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: '* Full Name' }).click();
    await page.getByRole('textbox', { name: '* Full Name' }).fill(name);
    await page.getByRole('textbox', { name: '* Email' }).click();
    await page.getByRole('textbox', { name: '* Email' }).fill(email);
    await page.getByRole('textbox', { name: '* Password' }).click();
    await page.getByRole('textbox', { name: '* Password' }).fill(password);
    await page.locator('#isAdmin').getByText('No').click();
    await page.locator('#isPartner').getByText('No').click();
    await page.getByRole('button', { name: 'Register' }).click();

    //Validate Registered User in Mongo      
    await MongoConnect("test", "users");
    const record = await findMongoRecord(email);

    expect(record.name).toBe(name);
    expect(record.email).toBe(email);
    expect(record.password).not.toBe(password);

});