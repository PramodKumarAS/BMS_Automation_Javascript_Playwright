import {test,expect} from '@playwright/test';
import { login } from '../ReusableMethods/Login';
import testData from '../testData.json' assert { type: "json" }; // ES Module import

test.describe.parallel('User Tests',()=>{

    test('Validate Searching Movie',async({page})=>{
        const { email, password } = testData.users.User;
        await login(page,email,password);

        //Search movie with Full Movie Name
        let movieName_withFullName ='Avengers: Endgame';
        await page.waitForTimeout(2000); // wait 2 seconds
        await expect(page.getByRole('textbox', { name: 'Type here to search for movies' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Type here to search for movies' }).fill(movieName_withFullName);
        await expect(page.getByRole('img', { name: 'Movie Poster' })).toBeVisible();
        await expect(page.locator('h3')).toContainText(movieName_withFullName);

        //Search movie with Prefix
        let movieName_withPrefix ='av';
        await page.getByRole('textbox', { name: 'Type here to search for movies' }).fill(movieName_withPrefix);
        await expect(page.getByRole('main')).toContainText(movieName_withPrefix);
        await expect(page.getByRole('main')).toContainText(movieName_withPrefix);
        await expect(page.getByRole('main')).toContainText(movieName_withPrefix);
    });

    test('Validate Single movie', async ({ page }) => {
        const { email, password } = testData.users.User;
        await login(page,email,password);

        await page.locator('.cursor-pointer').first().click();
        await expect(page.locator('h1')).toContainText('Avengers: Endgame');
        await expect(page.getByRole('main')).toContainText('Language: English');
        await expect(page.getByRole('main')).toContainText('Genre: Action');
        await expect(page.getByRole('main')).toContainText('Release Date: Oct 8th 2025');
        await expect(page.getByRole('main')).toContainText('Duration: 126 Minutes');
        await expect(page.locator('div').filter({ hasText: /^Choose the date:$/ })).toBeVisible();
        await expect(page.getByRole('main')).toContainText('Currently, no theatres available for this movie!');
        await expect(page.getByRole('img', { name: 'Movie Poster' })).toBeVisible();
    });

    test('Validate My Profile', async ({ page }) => {
        const { email, password } = testData.users.User;
        await login(page,email,password);

        await page.getByRole('menuitem', { name: 'user UserPramod' }).click();
        await page.getByText('My Profile').click();
        await expect(page.getByRole('main')).toContainText('UserPramod');
        await expect(page.getByRole('main')).toContainText('pkUser@gmail.com');
        await expect(page.locator('img')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^My Bookings$/ }).first()).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Settings$/ }).first()).toBeVisible();
    });

});