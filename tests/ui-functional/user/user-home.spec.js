import { test, expect } from '../../../fixtures/auth.fixture';

test('Validate user home page', async ({ loggedInUserPage }) => {
    await expect(loggedInUserPage.bannerHeader).toBeVisible();
    await expect(loggedInUserPage.banner).toContainText('User');
    await expect(loggedInUserPage.searchBox).toBeVisible();

 
    await loggedInUserPage.openUserMenu();
    await expect(loggedInUserPage.profileLink).toBeVisible();
    await expect(loggedInUserPage.logoutLink).toBeVisible();
});

test('Validate user profile page',async({loggedInUserPage})=>{
    const profilePage =await loggedInUserPage.goToProfile();

    await expect(profilePage.userProfileImage).toBeVisible();
    await expect(profilePage.userName).toContainText("UserPramod");
    await expect(profilePage.userMail).toContainText("pkUser@gmail.com");
    await expect(profilePage.myBookings).toBeVisible();
    await expect(profilePage.settings).toBeVisible();
});

