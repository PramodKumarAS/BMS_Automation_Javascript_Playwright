import { chromium } from "@playwright/test";
import LoginPage from "../ui/pages/login.page";
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

export default async function globalSetup() {
    console.log('--- global setup running ---');

    // create folder if not exists
    const dir = path.resolve('src/auth/storageStates');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const browser = await chromium.launch();

    async function saveState(email, password, filePath) {
        const context = await browser.newContext({ baseURL: process.env.UI_BASE_URL });
        const page = await context.newPage();
       
        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);
        await page.waitForFunction(() => window.localStorage.getItem('token') !== null);
        await context.storageState({ path: path.resolve(filePath) });
        await context.close();
    }

    await saveState(process.env.USER_EMAIL,    process.env.PASSWORD, 'src/auth/storageStates/userState.json');
    await saveState(process.env.PARTNER_EMAIL, process.env.PASSWORD, 'src/auth/storageStates/partnerState.json');
    await saveState(process.env.ADMIN_EMAIL,   process.env.PASSWORD, 'src/auth/storageStates/adminState.json');

    await browser.close();

    console.log('--- global setup complete ---');
}