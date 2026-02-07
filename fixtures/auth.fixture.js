import {test as base} from "@playwright/test";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/user-home.page";
import PartnerPage from "../pages/partner-home.page";
import AdminHomePage from "../pages/admin-home.page";

export const test=base.extend({
    loggedInUserPage:async ({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.USER_EMAIL,process.env.PASSWORD);
        await use(new HomePage(page));
    },

    loggedInPartnerPage:async ({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
        await use(new PartnerPage(page));
    },

    loggedInAdminPage:async ({page},use)=>{
       const loginPage = new LoginPage(page);
       await loginPage.login(process.env.ADMIN_EMAIL,process.env.PASSWORD);
       await use(new AdminHomePage(page));
    }
});

export {expect} from "@playwright/test";    