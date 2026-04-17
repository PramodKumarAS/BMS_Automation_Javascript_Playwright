import {test as base} from "@playwright/test";
import LoginPage from "../ui/pages/login.page";
import HomePage from "../ui/pages/user-home.page";
import PartnerPage from "../ui/pages/partner-home.page";
import AdminHomePage from "../ui/pages/admin-home.page";

export const test=base.extend({
    loginAsUser:async ({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.USER_EMAIL,process.env.PASSWORD);
        await use(new HomePage(page));
    },

    loginAsPartner:async ({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
        await use(new PartnerPage(page));
    },

    loginAsAdmin:async ({page},use)=>{
       const loginPage = new LoginPage(page);
       await loginPage.login(process.env.ADMIN_EMAIL,process.env.PASSWORD);
       await use(new AdminHomePage(page));
    },    
});

export {expect} from "@playwright/test";    