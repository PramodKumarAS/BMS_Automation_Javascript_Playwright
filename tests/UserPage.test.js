import {test,expect} from '@playwright/test';
import { login } from '../ReusableMethods/Login';
import testData from '../testData.json' assert { type: "json" }; 
import { MongoConnect,deleteMongoRecords,findMongoRecordOne,findMongoRecordById,findMongoRecordByShowId, updateMongoRecordToEmptyArray } from '../ReusableMethods/Mongo';
import { formatUIDate } from '../ReusableMethods/TimeFormat';

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

test('Validate User Booking a Show E2E', async ({ page }) => {
        const { password } = testData.users.User;
        const logginMail = testData.users.User.email;
        await login(page,logginMail,password);


        await MongoConnect("test", "shows");
        const showRecord = await findMongoRecordOne();
        const showdate = formatUIDate(showRecord.date); 
        const MovieId = showRecord.movie?.toString().replace("ObjectId(", "").replace(")", "").replace(/"/g, "");
        const theatreId = showRecord.theatre?.toString().replace("ObjectId(", "").replace(")", "").replace(/"/g, "");
        const showId = showRecord._id?.toString().replace("ObjectId(", "").replace(")", "").replace(/"/g, "");

        await MongoConnect("test", "movies");
        const movieRecord = await findMongoRecordById(MovieId);

        await MongoConnect("test", "theatres");
        const theatreRecord = await findMongoRecordById(theatreId);
        
        await page.getByRole('textbox', { name: 'Type here to search for movies' }).click();
        await page.getByRole('textbox', { name: 'Type here to search for movies' }).fill(movieRecord.movieName);
        await expect(page.locator('div').filter({ hasText: new RegExp(`^${movieRecord.movieName}$`) }).nth(3)).toBeVisible();
        await page.getByRole('img', { name: 'Movie Poster' }).click();

        await page.getByPlaceholder('default size').fill('2025-11-18');
        await expect(page.getByRole('button', { name: 'Book Show - 10:00 AM' })).toBeVisible();
        await page.getByRole('button', { name: 'Book Show - 10:00 AM' }).click();

        await expect(page.locator('h1')).toHaveText(movieRecord.movieName);
        await expect(page.getByText('Theatre:')).toHaveText(`Theatre: ${theatreRecord.name}, ${theatreRecord.address}`);
        await expect(page.locator("//h3[span[contains(., 'Show Name:')]]")).toHaveText(`Show Name: ${showRecord.name}`);
        await expect(page.locator("//h3[span[contains(., 'Show Name:')]]")).toHaveText(`Show Name: ${showRecord.name}`);
        await expect(page.locator("//h3[span[contains(., 'Date & Time:')]]")).toHaveText(`Date & Time: ${showdate} at ${showRecord.time} AM`);
        await expect(page.locator("//h3[span[contains(., 'Date & Time:')]]")).toHaveText(`Date & Time: ${showdate} at ${showRecord.time} AM`);
        await expect(page.locator("//h3[span[contains(., 'Ticket Price:')]]")).toHaveText(`Ticket Price: Rs. ${showRecord.ticketPrice.toString()}/-`);
        await expect(page.locator("//h3[span[contains(., 'Total Seats:')]]")).toContainText(`Total Seats: ${showRecord.totalSeats.toString()}`);
        await expect(page.locator("//h3[span[contains(., 'Available Seats:')]]")).toContainText(`Available Seats: ${showRecord.totalSeats.toString()}`);//
        await expect(page.locator('div').filter({ hasText: /^Screen this side, you will be watching in this direction$/ })).toBeVisible();

        await page.getByRole('button', { name: '1', exact: true }).click();
        await page.getByRole('button', { name: '2', exact: true }).click();
        await page.getByRole('button', { name: '11',exact: true }).click();
        await page.getByRole('button', { name: '12',exact: true }).click();

        await expect(page.getByText('Selected Seats:')).toHaveText("Selected Seats: 1, 2, 11, 12");
        await expect(page.getByText('Total Price:')).toHaveText(`Total Price: Rs. ${showRecord.ticketPrice * 4}`);
        await expect(page.getByRole('button', { name: 'Pay Now' })).toBeVisible();

        await page.getByRole('button', { name: 'Pay Now' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Email' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Email' }).fill(logginMail);
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('4242424242424242');
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'MM / YY' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'MM / YY' }).fill('12 / 28');
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'CVC' }).click();
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'CVC' }).fill('123');
        await page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('button', { name: 'Pay $' }).click();
        
        //After Booking Wait for it to return to home page
        await page.getByRole('textbox', { name: 'Type here to search for movies' })
        .waitFor({ state: 'visible', timeout: 20000 });
       
        //After Booking Validate in Mongo as well
        await MongoConnect("test", "bookings");
        const bookingsRecord =await findMongoRecordByShowId(showId);

        await expect(bookingsRecord.show.toString()).toBe(showId);
        await expect(bookingsRecord.seats).toEqual([1, 2, 11, 12]);
        const createdTime = new Date(bookingsRecord.createdAt).getTime();
        const updatedTime = new Date(bookingsRecord.updatedAt).getTime();
        const now = Date.now();
        expect(createdTime).toBeGreaterThan(now - 30000);
        expect(updatedTime).toBeGreaterThan(now - 30000);

        //Delete the Booking records 
        await MongoConnect("test", "bookings");
        await deleteMongoRecords();

        //Update the BookedSeats to empty
        await MongoConnect("test", "shows");
        await updateMongoRecordToEmptyArray(showId,"bookedSeats");
});