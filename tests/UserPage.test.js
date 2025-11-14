import {test,expect} from '@playwright/test';
import { login } from '../ReusableMethods/Login';
import testData from '../testData.json' assert { type: "json" }; // ES Module import
import { MongoConnect,findMongoRecord } from '../ReusableMethods/Mongo';

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

    test('Validate Booking a Show', async ({ page }) => {
        const {name} = testData.movies;
        const {email} = testData.users;
      
        await MongoConnect("test", "theatres");
        const TheatreRecord = await findMongoRecord();

        await MongoConnect("test", "shows");
        const showRecord = await findMongoRecord();

        await page.getByRole('textbox', { name: 'Type here to search for movies' }).click();
        await page.getByRole('textbox', { name: 'Type here to search for movies' }).fill(name);
        await expect(page.locator('div').filter({ hasText: /^Avengers: Endgame$/ }).nth(3)).toBeVisible();
        await page.getByRole('img', { name: 'Movie Poster' }).click();


        await page.getByPlaceholder('default size').fill('2025-11-11');
        await expect(page.getByRole('button', { name: 'Book Show - 10:00 AM' })).toBeVisible();
        await page.getByRole('button', { name: 'Book Show - 10:00 AM' }).click();

        await expect(page.locator('h1')).toHaveText(name);
        await expect(page.getByText('Theatre:')).toHaveText(`${TheatreRecord.name}, ${TheatreRecord.address}`);
        await expect(page.getByText('Show Name:')).toHaveText(showRecord.name);
        await expect(page.getByText('Date & Time:')).toHaveText(showRecord.date);
        await expect(page.getByText('Ticket Price:')).toHaveText(showRecord.ticketPrice);
        await expect(page.getByText('Total Seats:')).toHaveText(showRecord.totalSeats);
        await expect(page.getByText('Available Seats:')).toHaveText(showRecord.totalSeats -showRecord.totalSeats);//
        await expect(page.locator('div').filter({ hasText: /^Screen this side, you will be watching in this direction$/ })).toBeVisible();

        await page.getByRole('button', { name: '1', exact: true }).click();
        await page.getByRole('button', { name: '2', exact: true }).click();
        await page.getByRole('button', { name: '11', exact: true }).click();
        await page.getByRole('button', { name: '12', exact: true }).click();

        await expect(page.getByText('Selected Seats:')).toHaveText("1,2,11,12");
        await expect(page.getByText('Total Price:')).toHaveText(showRecord.ticketPrice*4);
        await expect(page.getByRole('button', { name: 'Pay Now' })).toBeVisible();

        await page.getByRole('button', { name: 'Pay Now' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Email' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Email' }).fill(email);
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('4242424242424242');
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'MM / YY' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'MM / YY' }).fill('12 / 28');
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'CVC' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'CVC' }).fill('123');
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByText('TEST MODEPay $400.').click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByText('TEST MODEPay $400.').click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('button', { name: 'Pay $' }).click();
    });
});