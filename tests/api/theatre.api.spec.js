import {test,expect} from '@playwright/test';
import {TheatreApiService} from '../../services/theatreAPI.service';
import { AuthApiService } from '../../services/authAPI.service';
import { deleteMany, findMongoRecord, findMongoRecordById, findMongoRecords, findMongoRecordsById, MongoConnect } from '../../services/mongoDB.service';
import {newTheatreData,updatedTheatreData} from '../../test-data/theatre.json';
import { theatreSchema ,getTheatresSchema,theatresByOwnerSchema} from '../../schemas/theatreSchema';
import Ajv from 'ajv';
import addFormats from "ajv-formats";
import { ObjectId } from 'mongodb';

let theatreName;

test.afterAll(async ()=>{
    await MongoConnect("test","theatres");
    await deleteMany("name",theatreName);
});

test('POST - Add Theatre API return 200 Success',async({request})=>{
    const authAPI = new AuthApiService(request);
    const theatreAPI = new TheatreApiService(request);

    const authResponse =await authAPI.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const currentUserResponse = await authAPI.getCurrentUser(authResonseData.token);
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(authResonseData.token,newTheatreData,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);
    const theatreResponseData = await theatreResponse.json(); 

    theatreName =theatreResponseData.theatre.name;
    
    expect(theatreResponseData.success).toBe(true);
    expect(theatreResponseData.message).toBe("Theatre Added!");
    expect(theatreResponseData.theatre.name).toBe(newTheatreData.name);
    expect(theatreResponseData.theatre.address).toBe(newTheatreData.address);
    expect(theatreResponseData.theatre.email).toBe(newTheatreData.email);
    expect(theatreResponseData.theatre.phone).toBe(newTheatreData.phone);
    expect(theatreResponseData.theatre.owner).toBe(currentUserResponseData.user._id);
    expect(theatreResponseData.theatre.isActive).toBe(false);
    expect(theatreResponseData.theatre._id).not.toBeNull();
    expect(theatreResponseData.theatre.updatedAt).toBeTruthy();
    expect(theatreResponseData.theatre.updatedAt).toBeTruthy();
});

test('POST - Add Theatre API Schema Validation',async({request})=>{
    const authAPI = new AuthApiService(request);
    const theatreAPI = new TheatreApiService(request);

    const authResponse =await authAPI.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const currentUserResponse = await authAPI.getCurrentUser(authResonseData.token);
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(authResonseData.token,theatreData,currentUserResponseData.user._id);
    await expect(theareResponse.status()).toBe(200);
    const theareResponseData = await theareResponse.json(); 

    theatreName =theareResponseData.theatre.name;

    const ajv = new Ajv();
    addFormats(ajv);   // enables date-time, email, etc.

    const validate = ajv.compile(theatreSchema);
    const valid = validate(theareResponseData);
    expect(valid).toBe(true);
});

test('GET - Get all Theatres API return 200 Success',async({request})=>{
    const authApiService = new AuthApiService(request);
    const authResponse =await authApiService.login(process.env.PARTNER_ADMIN,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const theatreAPIService = new TheatreApiService(request);
    const theatreResponse = await theatreAPIService.getAllTheatres(authResonseData.token);
    await expect(theatreResponse.status()).toBe(200);

    const theareResponseData = await theatreResponse.json();
    expect(theareResponseData.success).toBe(true);
    expect(theareResponseData.message).toBe("Theatre fetched!");

    await MongoConnect("test","theatres");
    const mdb_MongoRecords = await findMongoRecords();
    expect(theareResponseData.allTheatres.length).toBe(mdb_MongoRecords.length);
});

test('GET - Get all Theatres API Schema Validation',async({request})=>{
    const authApiService = new AuthApiService(request);
    const authResponse =await authApiService.login(process.env.PARTNER_ADMIN,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const theatreAPIService = new TheatreApiService(request);
    const theatreResponse = await theatreAPIService.getAllTheatres(authResonseData.token);
    await expect(theatreResponse.status()).toBe(200);

    const theareResponseData = await theatreResponse.json();

    const ajv = new Ajv();
    addFormats(ajv);   // enables date-time, email, etc.
    const validate = ajv.compile(getTheatresSchema);

    const valid = validate(theareResponseData);
    expect(valid).toBe(true);

});

test('GET - Get all Theatres by OwnerId API returns 200 Success',async({request})=>{
    const authApiService = new AuthApiService(request);
    const authResponse =await authApiService.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const currentUserResponse = await authApiService.getCurrentUser(authResonseData.token);
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();
    
    const theatreAPIService = new TheatreApiService(request);
    const theatreResponse = await theatreAPIService.getTheatresByOwnerId(authResonseData.token,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);

    const theatreResponseData = await theatreResponse.json();

    await MongoConnect("test","theatres");
    const mdb_MongoRecords = await findMongoRecordsById("owner",new ObjectId(currentUserResponseData.user._id));
    await expect(theatreResponseData.allTheatres.length).toBe(mdb_MongoRecords.length);
});

test('GET - Get all Theatres by OwnerId API Schema Validation',async({request})=>{
    const authApiService = new AuthApiService(request);
    const authResponse =await authApiService.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const currentUserResponse = await authApiService.getCurrentUser(authResonseData.token);
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();
    
    const theatreAPIService = new TheatreApiService(request);
    const theatreResponse = await theatreAPIService.getTheatresByOwnerId(authResonseData.token,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);

    const theatreResponseData = await theatreResponse.json();

    const ajv = new Ajv();
    const validate = ajv.compile(theatresByOwnerSchema);
    const valid = validate(theatreResponseData);

    expect(valid).toBe(true);
});

test('POST - Update Theatre API return 200 Success',async({request})=>{
    const authAPI = new AuthApiService(request);
    const theatreAPI = new TheatreApiService(request);

    const authResponse =await authAPI.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const currentUserResponse = await authAPI.getCurrentUser(authResonseData.token);
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(authResonseData.token,newTheatreData,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);
    const theatreResponseData = await theatreResponse.json(); 
    const theatreId = theatreResponseData.theatre._id;
    
    const updatetheatreResponse = await theatreAPI.updateTheatre(authResonseData.token,theatreId,updatedTheatreData,currentUserResponseData.user._id);
    await expect(updatetheatreResponse.status()).toBe(200);
    const updatetheatreResponseData = await updatetheatreResponse.json(); 

    theatreName =updatetheatreResponseData.updatedTheatre.name;

    expect(updatetheatreResponseData.success).toBe(true);
    expect(updatetheatreResponseData.message).toBe("Theatre updated!");
    expect(updatetheatreResponseData.updatedTheatre.name).toBe(updatedTheatreData.name);
    expect(updatetheatreResponseData.updatedTheatre.address).toBe(updatedTheatreData.address);
    expect(updatetheatreResponseData.updatedTheatre.email).toBe(updatedTheatreData.email);
    expect(updatetheatreResponseData.updatedTheatre.phone).toBe(updatedTheatreData.phone);
    expect(updatetheatreResponseData.updatedTheatre.owner).toBe(currentUserResponseData.user._id);
    expect(updatetheatreResponseData.updatedTheatre.isActive).toBe(false);
    expect(updatetheatreResponseData.updatedTheatre._id).not.toBeNull();
    expect(updatetheatreResponseData.updatedTheatre.updatedAt).toBeTruthy();
    expect(updatetheatreResponseData.updatedTheatre.updatedAt).toBeTruthy();
});