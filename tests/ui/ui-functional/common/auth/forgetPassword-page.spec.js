import { test,expect } from "../../../../../src/fixtures/pages.fixture";

test('User Should see required fields on forget password page',{tag:["@smoke"]}, async ({ forgetPasswordPage }) => {
    await expect(forgetPasswordPage.forgetPasswordHeading).toBeVisible();
    await expect(forgetPasswordPage.emailTextbox).toBeVisible();
    await expect(forgetPasswordPage.sendOtpButton).toBeVisible();
    await expect(forgetPasswordPage.loginHereLink).toBeVisible();
  });

test('User should navigate to login page after clicking on loing link on forget password page', async ({ forgetPasswordPage }) => {
    await forgetPasswordPage.loginHereLink.click();

    await expect(forgetPasswordPage.page).toHaveURL(/\/login/);
});