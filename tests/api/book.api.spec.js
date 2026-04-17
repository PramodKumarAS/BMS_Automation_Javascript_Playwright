import { bookingSchema, getBookingsSchema, paymentBookingSchema } from '../../src/api/schemas/book.schema';
import { test, expect } from '../../src/fixtures/api.fixture';
import {paymentDetails} from '../../src/test-data/book.json'
import validateSchema from '../../src/utils/schemaValidator.util';
import { deleteMongoRecords, deleteMongoRecordsById, findMongoRecordsById, MongoConnect } from "../../src/utils/mongoDBHelper";
import {showData} from "../../src/test-data/show.json";

let movieId ;
let theatreId;

test.beforeAll(async()=>{
    await MongoConnect('test','movies');
    const mdb_movie = await findMongoRecordsById("movieName","F1");
    movieId=mdb_movie[0]._id;
    movieId=movieId.toString();

    await MongoConnect('test','theatres');
    const mdb_theatre = await findMongoRecordsById("name","PVR");
    theatreId=mdb_theatre[0]._id;
    theatreId=theatreId.toString();
});

test.afterAll(async()=>{
    await MongoConnect("test","shows");
    await deleteMongoRecordsById("movie",movieId);
    await MongoConnect("test","bookings");
    await deleteMongoRecords();
});

test('POST - Make Payment API Schema Validation',async({api})=>{
    const bookAPI = await api.book;

    const paymentResponse = await bookAPI.makePayment(paymentDetails);
    await expect(paymentResponse.status()).toBe(200);

    const paymentResponseData = await paymentResponse.json();

    const valid = validateSchema(paymentBookingSchema,paymentResponseData);
    expect(valid).toBe(true);
});

test('POST - Make Payment API return 200 Success',async({api})=>{
    const bookAPI = await api.book;

    const paymentResponse = await bookAPI.makePayment(paymentDetails);
    await expect(paymentResponse.status()).toBe(200);

    const paymentResponseData = await paymentResponse.json();
    expect(paymentResponseData.success).toBe(true);
    expect(paymentResponseData.message).toBe("Payment & booking successful!");
    expect(paymentResponseData.data).not.toBe(null);
});

test('POST - Book Show API Schema Validation',async({api})=>{
    const authAPI =  await api.user;
    const showAPI =api.show;
    const bookAPI = await api.book;

    const authResponse = await authAPI.getCurrentUser();
    await expect(authResponse.status()).toBe(200);
    const authResponseData =await authResponse.json();

    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json();

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const paymentResponse = await bookAPI.makePayment(paymentDetails);
    await expect(paymentResponse.status()).toBe(200);

    const paymentResponseData = await paymentResponse.json();
    const bookingResponse = await bookAPI.bookShow({seats:[10],show:showResponseData.show._id,transactionId:paymentResponseData.data,user:authResponseData.user._id});
    await expect(bookingResponse.status()).toBe(200);

    const bookingResponseData = await bookingResponse.json();

    const valid = validateSchema(bookingSchema,bookingResponseData);
    expect(valid).toBe(true);
});

test('POST - Book Show API return 200 Success',async({api})=>{
    const authAPI =  await api.user;
    const showAPI =api.show;
    const bookAPI = await api.book;

    const authResponse = await authAPI.getCurrentUser();
    await expect(authResponse.status()).toBe(200);
    const authResponseData =await authResponse.json();

    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json();

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const paymentResponse = await bookAPI.makePayment(paymentDetails);
    await expect(paymentResponse.status()).toBe(200);

    const paymentResponseData = await paymentResponse.json();
    const bookingResponse = await bookAPI.bookShow({seats:[10],show:showResponseData.show._id,transactionId:paymentResponseData.data,user:authResponseData.user._id});
    await expect(bookingResponse.status()).toBe(200);

    const bookingResponseData = await bookingResponse.json();
    expect(bookingResponseData.success).toBe(true);
    expect(bookingResponseData.message).toBe("Booking successful!");
    expect(bookingResponseData.data.show).toBe(showResponseData.show._id);
    expect(bookingResponseData.data.user).toBe(authResponseData.user._id);
    expect(bookingResponseData.data.seats).toStrictEqual([10]);
    expect(bookingResponseData.data.transactionId).toBe(paymentResponseData.data);
    expect(bookingResponseData.data.createdAt).not.toBe(null);
    expect(bookingResponseData.data.updatedAt).not.toBe(null);
});

test('GET - Get All Bookings API Schema Validation',async({api})=>{
    const authAPI =  await api.user;
    const showAPI =api.show;
    const bookAPI = await api.book;

    const authResponse = await authAPI.getCurrentUser();
    await expect(authResponse.status()).toBe(200);
    const authResponseData =await authResponse.json();

    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json();

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const paymentResponse = await bookAPI.makePayment(paymentDetails);
    await expect(paymentResponse.status()).toBe(200);

    const paymentResponseData = await paymentResponse.json();
    const bookingResponse = await bookAPI.bookShow({seats:[10],show:showResponseData.show._id,transactionId:paymentResponseData.data,user:authResponseData.user._id});
    await expect(bookingResponse.status()).toBe(200);

    const allBookingsResponse = await bookAPI.getAllBookings();
    await expect(allBookingsResponse.status()).toBe(200);
    const allBookingsResponseData =await allBookingsResponse.json();

    const valid = validateSchema(getBookingsSchema,allBookingsResponseData);
    expect(valid).toBe(true);
});

test('GET - Get All Bookings API return 200 Success',async({api})=>{
    const authAPI =  await api.user;
    const showAPI =api.show;
    const bookAPI = await api.book;

    const authResponse = await authAPI.getCurrentUser();
    await expect(authResponse.status()).toBe(200);
    const authResponseData =await authResponse.json();

    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json();

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const paymentResponse = await bookAPI.makePayment(paymentDetails);
    await expect(paymentResponse.status()).toBe(200);

    const paymentResponseData = await paymentResponse.json();
    const bookingResponse = await bookAPI.bookShow({seats:[10],show:showResponseData.show._id,transactionId:paymentResponseData.data,user:authResponseData.user._id});
    await expect(bookingResponse.status()).toBe(200);

    const allBookingsResponse = await bookAPI.getAllBookings();
    await expect(allBookingsResponse.status()).toBe(200);
    const allBookingsResponseData =await allBookingsResponse.json();

    expect(allBookingsResponseData.success).toBe(true);
    expect(allBookingsResponseData.message).toBe("Bookings fetched!");
    expect(allBookingsResponseData.data[0]._id).not.toBe(null);
    expect(allBookingsResponseData.data[0].show._id).toBe(showResponseData.show._id);
    expect(allBookingsResponseData.data[0].user._id).toBe(authResponseData.user._id);
    expect(allBookingsResponseData.data[0].seats).toStrictEqual([10]);
    expect(allBookingsResponseData.data[0].transactionId).toBe(paymentResponseData.data);
    expect(allBookingsResponseData.data[0].createdAt).not.toBe(null);
    expect(allBookingsResponseData.data[0].updatedAt).not.toBe(null);
});