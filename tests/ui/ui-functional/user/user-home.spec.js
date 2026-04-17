import { test,expect } from "../../../../src/fixtures/auth.fixture";
import data from "../../../../src/test-data/user.json";

test('User should see search movie box and user menu on the home page',{tag:["@smoke"]}, async ({ loginAsUser }) => {
    await expect(loginAsUser.bannerHeader).toBeVisible();
    await expect(loginAsUser.banner).toContainText('User');
    await expect(loginAsUser.searchBox).toBeVisible();

    await loginAsUser.openUserMenu();
    await expect(loginAsUser.profileLink).toBeVisible();
    await expect(loginAsUser.logoutLink).toBeVisible();
});

test('User should see profile information and settings on the user profie page',async({loginAsUser})=>{
    const {userName,email} =data.users.User;
    const profilePage =await loginAsUser.goToProfile();
    
    await expect(profilePage.userProfileImage).toBeVisible();
    await expect(profilePage.userName).toContainText(userName);
    await expect(profilePage.userMail).toContainText(email);
    await expect(profilePage.myBookings).toBeVisible();
    await expect(profilePage.settings).toBeVisible();
});