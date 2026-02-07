import { test, expect } from '../../../fixtures/auth.fixture';
import data from "../../../test-data/user.json";

test('User should see search movie box and user menu on the home page', async ({ loggedInUserPage }) => {
    await expect(loggedInUserPage.bannerHeader).toBeVisible();
    await expect(loggedInUserPage.banner).toContainText('User');
    await expect(loggedInUserPage.searchBox).toBeVisible();
 
    await loggedInUserPage.openUserMenu();
    await expect(loggedInUserPage.profileLink).toBeVisible();
    await expect(loggedInUserPage.logoutLink).toBeVisible();
});

test('User should see profile information and settings on the user profie page',async({loggedInUserPage})=>{
    const {userName,email} =data.users.User;

    const profilePage =await loggedInUserPage.goToProfile();

    await expect(profilePage.userProfileImage).toBeVisible();
    await expect(profilePage.userName).toContainText(userName);
    await expect(profilePage.userMail).toContainText(email);
    await expect(profilePage.myBookings).toBeVisible();
    await expect(profilePage.settings).toBeVisible();
});