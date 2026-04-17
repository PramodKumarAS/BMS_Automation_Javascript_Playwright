import {test,expect} from '../../../src/fixtures/pages.fixture'
import { deleteMongoRecords, deleteOne, findMongoRecordsById, MongoConnect, updateMongoRecordToEmptyArray, updateOne } from '../../../src/utils/mongoDBHelper';
import movieData from '../../../src/test-data/movie.json';
import {showData} from '../../../src/test-data/show.json';
import userData from '../../../src/test-data/user.json';
import formatDateWithOrdinal from '../../../src/utils/time.util';
import ShowApiService from '../../../src/api/client/showService';

let movieId ;
let theatreId;

test.beforeAll(async()=>{
    await MongoConnect('test','movies');
    const mdb_movie = await findMongoRecordsById("movieName",movieData.movies.name);
    movieId=mdb_movie[0]._id;
    movieId=movieId.toString();

    await MongoConnect('test','theatres');
    const mdb_theatre = await findMongoRecordsById("name","PVR");
    theatreId=mdb_theatre[0]._id;
    theatreId=theatreId.toString();
});

test.afterAll(async ()=>{
    await MongoConnect('test','bookings');
    await deleteMongoRecords();

    await MongoConnect('test','shows');
    await deleteOne("name",showData.name);
});

test('User should be able to book a ticket for a move e2e', async({loginPage,homePage,movieDetailsPage,bookingDetailsPage,stripeCheckoutPage,request})=>{
    await loginPage.login(process.env.USER_EMAIL,process.env.PASSWORD);
    const movieName = movieData.movies.name;

    await homePage.searchBox.fill(movieName);
    await homePage.openMovie(movieName);

    await movieDetailsPage.chooseTheDate();

    let isBookShowButtonExists = true;

    try {
        await movieDetailsPage.bookShowButton.waitFor({
            state: 'visible',
            timeout: 5000   
        });
    } catch {
        isBookShowButtonExists = false;
    }    

    if (!isBookShowButtonExists) {
        const token = await loginPage.page.evaluate(() => {
            return localStorage.getItem("token");
        });
        
        const showApi = new ShowApiService(request,token);
        const showResponse = await showApi.addShow(movieId,theatreId,showData);

        await expect(showResponse.status()).toBe(200);

        const showsByTheatreResponse = await showApi.getAllShowsByTheatre(theatreId);
        await expect(showsByTheatreResponse.status()).toBe(200);
        
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
    await expect(bookingDetailsPage.page).toHaveURL(/\/User/,{timeout:50000});
    await bookingDetailsPage.page.goto(bookedUrl);

    await expect(bookingDetailsPage.selectedSeat(10)).toHaveClass(/booked/,{timeout:50000});
    await expect(bookingDetailsPage.selectedSeat(11)).toHaveClass(/booked/);
    await expect(bookingDetailsPage.showName).toContainText("Avengers Show");
    await expect(bookingDetailsPage.showDateTime).toContainText(formatDateWithOrdinal(new Date()));
    await expect(bookingDetailsPage.showTicketPrice).toContainText("Rs. 1500/-");
    await expect(bookingDetailsPage.showTotalSeats).toContainText("100");
    await expect(bookingDetailsPage.showAvailableSeats).toContainText("98");
});