import {test as base} from "@playwright/test";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/user-home.page";

export const test=base.extend({
    loggedInUserPage:async ({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.USER_EMAIL,process.env.PASSWORD);
        await use(new HomePage(page));
    },
});

export {expect} from "@playwright/test";    