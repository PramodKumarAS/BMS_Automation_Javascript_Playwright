import { test,expect } from "../../src/fixtures/api.fixture";
import {showData,updatedShowData} from "../../src/test-data/show.json";
import { deleteSchema, getAllTheatresByMovieSchema, getShowByIdSchema, getshowSchema, showSchema, UpdateShowSchema } from "../../src/api/schemas/show.schema";
import { deleteMongoRecordsById, findMongoRecordsById, MongoConnect } from "../../src/utils/mongoDBHelper";
import validateSchema from "../../src/utils/schemaValidator.util";

let movieId ;
let theatreId;

test.beforeAll(async()=>{
    await MongoConnect('test','movies');
    const mdb_movie = await findMongoRecordsById("movieName","Friends");
    movieId=mdb_movie[0]._id;
    movieId=movieId.toString();

    await MongoConnect('test','theatres');
    const mdb_theatre = await findMongoRecordsById("name","PVR");
    theatreId=mdb_theatre[0]._id;
    theatreId=theatreId.toString();
});

test.afterEach(async()=>{
    await MongoConnect("test","shows");
    await deleteMongoRecordsById("movie",movieId);
});

test('POST - Add Show API Schema Validation',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json(); 

    const valid = validateSchema(showSchema,showResponseData);
    expect(valid).toBe(true);
});

test('POST - Add Show API return 200 Success',{tag:["@smoke"]},async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json(); 

    expect(showResponseData.success).toBe(true);
    expect(showResponseData.message).toBe("show Added!");

    expect(showResponseData.show.name).toBe(showData.name);
    expect(showResponseData.show.date.split('T')[0]).toBe(showData.date);
    expect(showResponseData.show.time).toBe(showData.time);
    expect(showResponseData.show.movie).toBe(movieId);
    expect(showResponseData.show.ticketPrice).toBe(parseInt(showData.ticketPrice));
    expect(showResponseData.show.totalSeats).toBe(parseInt(showData.totalSeats));
    expect(showResponseData.show.theatre).toBe(theatreId);
    expect(showResponseData.show._id).not.toBe(null);
    expect(showResponseData.show.createdAt).not.toBe(null);
    expect(showResponseData.show.updatedAt).not.toBe(null);
});

test('POST - Update Show API Schema Validation',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json(); 

    const updatedShow = {theatre:theatreId,movie:movieId,...updatedShowData};
    const updateShowResponse = await showAPI.updateShow(showResponseData.show._id,updatedShow);
    await expect(updateShowResponse.status()).toBe(200);
    const updateShowResponseData = await updateShowResponse.json(); 

    const valid = validateSchema(UpdateShowSchema,updateShowResponseData);
    expect(valid).toBe(true);
});

test('POST - Update Show API return 200 Success',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json(); 

    const updatedShow = {theatre:theatreId,movie:movieId,...updatedShowData};
    const updateShowResponse = await showAPI.updateShow(showResponseData.show._id,updatedShow);
    await expect(updateShowResponse.status()).toBe(200);
    const updateShowResponseData = await updateShowResponse.json(); 
    expect(updateShowResponseData.success).toBe(true);
    expect(updateShowResponseData.message).toBe("The show has been updated!");
    expect(updateShowResponseData.updatedShow.name).toBe(updatedShowData.name);
    expect(updateShowResponseData.updatedShow.date.split('T')[0]).toBe(updatedShowData.date);
    expect(updateShowResponseData.updatedShow.time).toBe(updatedShowData.time);
    expect(updateShowResponseData.updatedShow.movie).toBe(updatedShow.movie);
    expect(updateShowResponseData.updatedShow.ticketPrice).toBe(updatedShowData.ticketPrice);
    expect(updateShowResponseData.updatedShow.totalSeats).toBe(updatedShowData.totalSeats);
    expect(updateShowResponseData.updatedShow.theatre).toBe(updatedShow.theatre);
    expect(updateShowResponseData.updatedShow.createdAt).not.toBe(null);
    expect(updateShowResponseData.updatedShow.updatedAt).not.toBe(null);
    expect(updateShowResponseData.updatedShow._id).not.toBe(null);  
});

test('POST - Delete Show API Schema Validation',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json(); 

    const deletedShowResponse = await showAPI.deleteShow(showResponseData.show._id);
    await expect(deletedShowResponse.status()).toBe(200);
    const deletedShowResponseData = await deletedShowResponse.json();

    const valid = validateSchema(deleteSchema,deletedShowResponseData);
    expect(valid).toBe(true);
});

test('POST - Delete Show API return 200 Success',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json(); 

    const deletedShowResponse = await showAPI.deleteShow(showResponseData.show._id);
    await expect(deletedShowResponse.status()).toBe(200);
    const deletedShowResponseData = await deletedShowResponse.json();

    expect(deletedShowResponseData.success).toBe(true);
    expect(deletedShowResponseData.message).toBe("The show has been deleted!");
});

test('GET - Get All Shows By Theatre API Schema Validation',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    const showsByTheatreResponseData = await showsByTheatreResponse.json();
    const valid = validateSchema(getshowSchema,showsByTheatreResponseData);
    expect(valid).toBe(true);
});

test('GET - Get All Shows By Theatre API return 200 Success',async({api})=>{
    const showAPI =api.show;
    const updatedShowData = {...showData,name: `show-${Date.now()}`};

    const showResponse = await showAPI.addShow(movieId,theatreId,updatedShowData);
    await expect(showResponse.status()).toBe(200);

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);
    const showsByTheatreResponseData = await showsByTheatreResponse.json();

    await expect(showsByTheatreResponseData.success).toBe(true);
    await expect(showsByTheatreResponseData.message).toBe('All shows fetched (past shows updated to today IST)');

    const addedShow = showsByTheatreResponseData.shows.find(show=>show.name===updatedShowData.name);
    expect(addedShow.name).toBe(updatedShowData.name);
    expect(addedShow.date.split('T')[0]).toBe(new Date().toISOString().split('T')[0]);
    expect(addedShow.time).toBe(updatedShowData.time);
    expect(addedShow.movie._id).toBe(movieId);
    expect(addedShow.ticketPrice).toBe(parseInt(updatedShowData.ticketPrice));
    expect(addedShow.totalSeats).toBe(parseInt(updatedShowData.totalSeats));
    expect(addedShow.theatre).toBe(theatreId);
    expect(addedShow._id).not.toBe(null);
    expect(addedShow.createdAt).not.toBe(null);
    expect(addedShow.updatedAt).not.toBe(null);
});

test('GET - Get All Theatres By Movie API Schema Validation',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const theatresByMovieResponse = await showAPI.getAllTheatresByMovie({movie:movieId, date:new Date().toISOString().split("T")[0]});
    const theatresByMovieResponseData = await theatresByMovieResponse.json();

    const valid = validateSchema(getAllTheatresByMovieSchema,theatresByMovieResponseData);
    expect(valid).toBe(true);
});

test('GET - Get All Theatres By Movie API return 200 Success',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json();

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const theatresByMovieResponse = await showAPI.getAllTheatresByMovie({movie:movieId, date:new Date().toISOString().split("T")[0]});
    const theatresByMovieResponseData = await theatresByMovieResponse.json();

    expect(theatresByMovieResponseData.success).toBe(true);
    expect(theatresByMovieResponseData.message).toBe('All theatres fetched!');
    expect(theatresByMovieResponseData.data[0]._id).toBe(theatreId);
    expect(theatresByMovieResponseData.data[0].shows[0]._id).not.toBe(showResponseData._id);
    expect(theatresByMovieResponseData.data[0].shows[0].name).toBe(showData.name);
    expect(theatresByMovieResponseData.data[0].shows[0].date.split('T')[0]).toBe(new Date().toISOString().split('T')[0]);
    expect(theatresByMovieResponseData.data[0].shows[0].time).toBe(showData.time);
    expect(theatresByMovieResponseData.data[0].shows[0].movie).toBe(movieId);
    expect(theatresByMovieResponseData.data[0].shows[0].ticketPrice).toBe(parseInt(showData.ticketPrice));
    expect(theatresByMovieResponseData.data[0].shows[0].totalSeats).toBe(parseInt(showData.totalSeats));
    expect(theatresByMovieResponseData.data[0].shows[0].theatre._id).toBe(theatreId);
    expect(theatresByMovieResponseData.data[0].shows[0].createdAt).not.toBe(null);
    expect(theatresByMovieResponseData.data[0].shows[0].updatedAt).not.toBe(null);
});

test('GET - Get Show By Id API Schema Validation',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json();

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const showByIdResponse = await showAPI.getShowById(showResponseData.show._id);
    const showByIdResponseData = await showByIdResponse.json();
    const valid = validateSchema(getShowByIdSchema,showByIdResponseData);
    expect(valid).toBe(true);
});

test('GET - Get Show By Id API return 200 Success',async({api})=>{
    const showAPI =api.show;
    const showResponse = await showAPI.addShow(movieId,theatreId,showData);
    await expect(showResponse.status()).toBe(200);
    const showResponseData = await showResponse.json();

    const showsByTheatreResponse = await showAPI.getAllShowsByTheatre(theatreId);
    await expect(showsByTheatreResponse.status()).toBe(200);

    const showByIdResponse = await showAPI.getShowById(showResponseData.show._id);
    const showByIdResponseData = await showByIdResponse.json();
    expect(showByIdResponseData.data._id).not.toBe(null);
    expect(showByIdResponseData.data.name).toBe(showData.name);
    expect(showByIdResponseData.data.date.split('T')[0]).toBe(new Date().toISOString().split('T')[0]);
    expect(showByIdResponseData.data.time).toBe(showData.time);
    expect(showByIdResponseData.data.movie._id).toBe(movieId);
    expect(showByIdResponseData.data.ticketPrice).toBe(parseInt(showData.ticketPrice));
    expect(showByIdResponseData.data.totalSeats).toBe(parseInt(showData.totalSeats));
    expect(showByIdResponseData.data.theatre._id).toBe(theatreId);
    expect(showByIdResponseData.data.createdAt).not.toBe(null);
    expect(showByIdResponseData.data.updatedAt).not.toBe(null);
});
