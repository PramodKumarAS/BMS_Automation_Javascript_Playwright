import {test as base} from "@playwright/test";
import LoginPage from "../ui/pages/login.page";
import HomePage from "../ui/pages/user-home.page";
import PartnerPage from "../ui/pages/partner-home.page";
import AdminHomePage from "../ui/pages/admin-home.page";
import path from 'path';

export const test=base.extend({
    loginAsUser:async ({browser },use)=>{
        const context = await browser.newContext({
            storageState: path.resolve('src/auth/storageStates/userState.json')
        });
        const page = await context.newPage();
        await page.goto('/user');  
        await use(new HomePage(page));
        await context.close();
    },

    loginAsPartner:async ({browser},use)=>{
        const context = await browser.newContext({
            storageState: path.resolve('src/auth/storageStates/partnerState.json')
        });
        const page = await context.newPage();
        await page.goto('/partner');  
        await use(new PartnerPage(page));
        await context.close();
    },

    loginAsAdmin:async ({browser},use)=>{
        const context = await browser.newContext({
            storageState: path.resolve('src/auth/storageStates/adminState.json')
        });
        const page = await context.newPage();
        await page.goto('/admin');  
        await use(new AdminHomePage(page));
        await context.close();
    },    
});

export {expect} from "@playwright/test";    