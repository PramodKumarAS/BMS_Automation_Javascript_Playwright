import {test,expect} from '@playwright/test';
import {TheatreApiService} from '../../services/theatreAPI.service';
import { AuthApiService } from '../../services/authAPI.service';
import { deleteMany, MongoConnect } from '../../services/mongoDB.service';
import theatreData from '../../test-data/theatre.json';
import { theatreSchema } from '../../schemas/theatreSchema';
import Ajv from 'ajv';
import addFormats from "ajv-formats";

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

    const theareResponse = await theatreAPI.addTheatre(authResonseData.token,theatreData,currentUserResponseData.user._id);
    await expect(theareResponse.status()).toBe(200);
    const theareResponseData = await theareResponse.json(); 

    theatreName =theareResponseData.theatre.name;
    
    expect(theareResponseData.success).toBe(true);
    expect(theareResponseData.message).toBe("Theatre Added!");
    expect(theareResponseData.theatre.name).toBe(theatreData.name);
    expect(theareResponseData.theatre.address).toBe(theatreData.address);
    expect(theareResponseData.theatre.email).toBe(theatreData.email);
    expect(theareResponseData.theatre.phone).toBe(theatreData.phone);
    expect(theareResponseData.theatre.owner).toBe(currentUserResponseData.user._id);
    expect(theareResponseData.theatre.isActive).toBe(false);
    expect(theareResponseData.theatre._id).not.toBeNull();
    expect(theareResponseData.theatre.updatedAt).toBeTruthy();
    expect(theareResponseData.theatre.updatedAt).toBeTruthy();
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

    const theareResponse = await theatreAPI.addTheatre(authResonseData.token,theatreData,currentUserResponseData.user._id);
    await expect(theareResponse.status()).toBe(200);
    const theareResponseData = await theareResponse.json(); 

    theatreName =theareResponseData.theatre.name;

    const ajv = new Ajv();
    addFormats(ajv);   // enables date-time, email, etc.

    const validate = ajv.compile(theatreSchema);
    const valid = validate(theareResponseData);
    expect(valid).toBe(true);
});