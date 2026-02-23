import {test,expect} from '../../fixtures/auth.fixture'
import { deleteMongoRecords, MongoConnect, updateMongoRecordToEmptyArray, updateOne } from '../../services/mongo.service';
import movieData from '../../test-data/movie.json';
import userData from '../../test-data/user.json';
import APIHelper from '../../services/apiHelper.service';
import formatDateWithOrdinal from '../../utils/time.util';

let bookingId;

test.afterAll(async ()=>{
    await MongoConnect('test','bookings');
    await deleteMongoRecords();

    await MongoConnect('test','shows');
    await updateMongoRecordToEmptyArray(bookingId,"bookedSeats");
});

test('User should be able to book a ticket for a move e2e', async({loggedInUserPage,movieDetailsPage,bookingDetailsPage,stripeCheckoutPage})=>{
    const homePage = await loggedInUserPage;
    const movieName = movieData.movies.name;

    await homePage.searchBox.fill(movieName);
    await homePage.openMovie(movieName);

    await movieDetailsPage.chooseTheDate();

    let isBookShowButtonExists = true;

    try {
        await movieDetailsPage.bookShowButton.waitFor({
            state: 'visible',
            timeout: 5000   // wait up to 5 seconds
        });
    } catch {
        isBookShowButtonExists = false;
    }    

    if (!isBookShowButtonExists) {
        await MongoConnect('test','shows');
        await updateOne('697c1c7f0476ba2e220e7476','date',new Date());
        bookingDetailsPage.page.reload({ waitUntil: 'load' });
    }

    await movieDetailsPage.bookShowButton.click();

    await bookingDetailsPage.selectSeatNumber(10);
    await bookingDetailsPage.selectSeatNumber(11);
    await bookingDetailsPage.payNowButton.click();

    await stripeCheckoutPage.email.fill(userData.users.User.email);
    await stripeCheckoutPage.cardnumber.fill("4242424242424242");
    await stripeCheckoutPage.cardExpireDate.fill("12 / 35");
    await stripeCheckoutPage.cvc.fill("124");
    await stripeCheckoutPage.payButton.click();

    const bookedUrl = bookingDetailsPage.page.url();
    const urls=bookedUrl.split('/');
    bookingId=urls[urls.length-1];

    await expect(bookingDetailsPage.page).toHaveURL(/\/User/,{timeout:15000});
    await bookingDetailsPage.page.goto(bookedUrl);

    await expect(bookingDetailsPage.selectedSeat(10)).toHaveClass(/booked/,{timeout:15000});
    await expect(bookingDetailsPage.selectedSeat(11)).toHaveClass(/booked/);
    await expect(bookingDetailsPage.showName).toContainText("Avengers Show");
    await expect(bookingDetailsPage.showDateTime).toContainText(formatDateWithOrdinal(new Date()));
    await expect(bookingDetailsPage.showTicketPrice).toContainText("Rs. 1000/-");
    await expect(bookingDetailsPage.showTotalSeats).toContainText("250");
    await expect(bookingDetailsPage.showAvailableSeats).toContainText("248");
    
    const apiHelper = new APIHelper();
    const apiContext= await apiHelper.createContext();
    const login = await apiHelper.login(apiContext);
    const show = await apiHelper.getShow(apiContext,login.token,bookingId);

    await expect(show.success).toEqual(true);
    await expect(show.message).toEqual('Show fetched!');
    await expect(show.data._id).toEqual(bookingId);
    await expect(show.data.name).toEqual('Avengers Show');
    await expect(show.data.date.split('T')[0]).toEqual(new Date().toISOString().split('T')[0]);
    await expect(show.data.time).toEqual('10:00');
    await expect(show.data.movie.movieName).toEqual(movieName);
    await expect(show.data.bookedSeats).toEqual([ 10, 11 ]);
    await expect(show.data.theatre.name).toEqual('PVR');

    await apiContext.dispose();
});