import { test,expect } from "../../../../../fixtures/auth.fixture";

test('User should see required Register fields and login link on Register page',async ({registerPage})=>{
    await expect(registerPage.heading).toBeVisible();
    await expect(registerPage.fullName).toBeVisible();
    await expect(registerPage.email).toBeVisible();
    await expect(registerPage.password).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
    await expect(registerPage.loginLink).toBeVisible();
    await expect(registerPage.registerAsAdminRadioButton).toBeVisible();
    await expect(registerPage.registerAsPartnerRadioButton).toBeVisible();
});

test('User should navigate to login page after clicking on login link on register page',async({registerPage})=>{
    await registerPage.loginLink.click(); 

    await expect(registerPage.page).toHaveURL(/\/login/);
});

test('User should see required field error message for empty input', async({registerPage})=>{
    await registerPage.fullName.fill("");
    await registerPage.email.fill("");
    await registerPage.password.fill("");
    await registerPage.registerButton.click();

    await expect(registerPage.fullNameErrorMessage).toBeVisible();
    await expect(registerPage.emailErrorMessage).toBeVisible();
    await expect(registerPage.passwordErrorMessage).toBeVisible();
});
