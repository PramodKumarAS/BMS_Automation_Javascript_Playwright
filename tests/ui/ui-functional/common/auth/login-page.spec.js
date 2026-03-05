import { test,expect } from "../../../../../fixtures/auth.fixture";

test('User should see login inputs,Register link and Forgot password link on login page',async({loginPage})=>{   
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
    await expect(loginPage.forgotPasswordButton).toBeVisible();
    await expect(loginPage.leftCarouselImage).toBeVisible();
    await expect(loginPage.rightCarouselImage).toBeVisible();
});

test('User should see error message for invalid credentials on login page',async({loginPage})=>{
    await loginPage.login("invalid@gmail.com","invalidPassword");
    await expect(loginPage.errorMessageForInvalidCred).toBeVisible();
});

test('User should see field validation error message for empty credentials',async({loginPage})=>{
    await loginPage.login("","");

    await expect(loginPage.emailFieldErrorMessage).toBeVisible();
    await expect(loginPage.passwordFieldErrorMessage).toBeVisible();
});

test('User should navigate to Register page after clicking on Register link on login page',async({loginPage})=>{
    await loginPage.registerLink.click(); 

    await expect(loginPage.page).toHaveURL(/\/register/);
});

test('User should navigate to Forgot password page after clicking on Forgot password link on login page',async({loginPage})=>{
    await loginPage.forgotPasswordButton.click(); 

    await expect(loginPage.page).toHaveURL(/\/forget/);
});