import { test,expect } from "../../src/fixtures/api.fixture";
import { deleteMany,findMongoRecords, findMongoRecordsById, MongoConnect } from '../../src/utils/mongoDBHelper';
import {newTheatreData,updatedTheatreData} from '../../src/test-data/theatre.json';
import { ObjectId } from 'mongodb';
import { theatreSchema ,getTheatresSchema,theatresByOwnerSchema, updateTheatreSchema, deleteTheatreSchema} from '../../src/api/schemas/theatre.schema';
import validateSchema from '../../src/utils/schemaValidator.util';

let theatreName;

test.afterAll(async ()=>{
    await MongoConnect("test","theatres");
    await deleteMany("name",theatreName);
});

test('POST - Add Theatre API Schema Validation',async({api})=>{
    const authAPI =api.user;
    const theatreAPI =api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(newTheatreData,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);
    const theatreResponseData = await theatreResponse.json(); 

    theatreName =theatreResponseData.theatre.name;
    const valid = validateSchema(theatreSchema,theatreResponseData);
    expect(valid).toBe(true);
});

test('POST - Add Theatre API return 200 Success',{tag:["@smoke"]},async({api})=>{
    const authAPI = api.user;
    const theatreAPI = api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(newTheatreData,currentUserResponseData.user._id);
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

test('POST - Update Theatre API Schema Validation',async({api})=>{
    const authAPI = api.user;
    const theatreAPI = api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(newTheatreData,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);
    const theatreResponseData = await theatreResponse.json(); 
    const theatreId = theatreResponseData.theatre._id;
    
    const updatetheatreResponse = await theatreAPI.updateTheatre(theatreId,updatedTheatreData,currentUserResponseData.user._id);
    await expect(updatetheatreResponse.status()).toBe(200);
    const updatetheatreResponseData = await updatetheatreResponse.json(); 

    theatreName =updatetheatreResponseData.updatedTheatre.name;

    const valid = validateSchema(updateTheatreSchema,updatetheatreResponseData);
    expect(valid).toBe(true);
});

test('POST - Update Theatre API return 200 Success',async({api})=>{
    const authAPI = api.user;
    const theatreAPI = api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(newTheatreData,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);
    const theatreResponseData = await theatreResponse.json(); 
    const theatreId = theatreResponseData.theatre._id;
    
    const updatetheatreResponse = await theatreAPI.updateTheatre(theatreId,updatedTheatreData,currentUserResponseData.user._id);
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

test('POST - Delete Theatre API return 200 Success',async({api})=>{
    const authAPI = api.user;
    const theatreAPI = api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(newTheatreData,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);
    const theatreResponseData = await theatreResponse.json(); 
    const theatreId = theatreResponseData.theatre._id;
    
    const updatetheatreResponse = await theatreAPI.updateTheatre(theatreId,updatedTheatreData,currentUserResponseData.user._id);
    await expect(updatetheatreResponse.status()).toBe(200);
    const updatetheatreResponseData = await updatetheatreResponse.json(); 

    theatreName =updatetheatreResponseData.updatedTheatre.name;

    const deleteTheatreResponse = await theatreAPI.deleteTheatre(theatreId);
    await expect(deleteTheatreResponse.status()).toBe(200);
});

test('POST - Delete Theatre API Schema Validation',async({api})=>{
    const authAPI = api.user;
    const theatreAPI = api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();

    const theatreResponse = await theatreAPI.addTheatre(newTheatreData,currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);
    const theatreResponseData = await theatreResponse.json(); 
    const theatreId = theatreResponseData.theatre._id;
    
    const updatetheatreResponse = await theatreAPI.updateTheatre(theatreId,updatedTheatreData,currentUserResponseData.user._id);
    await expect(updatetheatreResponse.status()).toBe(200);
    const updatetheatreResponseData = await updatetheatreResponse.json(); 

    theatreName =updatetheatreResponseData.updatedTheatre.name;

    const deleteTheatreResponse = await theatreAPI.deleteTheatre(theatreId);
    await expect(deleteTheatreResponse.status()).toBe(200);
    const deletetheatreResponseData = await deleteTheatreResponse.json(); 

    const valid = validateSchema(deleteTheatreSchema,deletetheatreResponseData);
    expect(valid).toBe(true);
});

test('GET - Get all Theatres API Schema Validation',async({api})=>{
    const theatreAPI = api.theatre;

    const theatreResponse = await theatreAPI.getAllTheatres();
    await expect(theatreResponse.status()).toBe(200);

    const theatreResponseData = await theatreResponse.json();
    const valid = validateSchema(getTheatresSchema,theatreResponseData);
    expect(valid).toBe(true);
});

test('GET - Get all Theatres API return 200 Success',async({api})=>{
    const theatreAPI = api.theatre;

    const theatreResponse = await theatreAPI.getAllTheatres();
    await expect(theatreResponse.status()).toBe(200);

    const theareResponseData = await theatreResponse.json();
    expect(theareResponseData.success).toBe(true);
    expect(theareResponseData.message).toBe("Theatre fetched!");

    await MongoConnect("test","theatres");
    const mdb_MongoRecords = await findMongoRecords();
    expect(theareResponseData.allTheatres.length).toBe(mdb_MongoRecords.length);
});

test('GET - Get all Theatres by OwnerId API Schema Validation',async({api})=>{
    const authAPI = api.user;
    const theatreAPI = api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();
    
    const theatreResponse = await theatreAPI.getTheatresByOwnerId(currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);

    const theatreResponseData = await theatreResponse.json();

    const valid = validateSchema(theatresByOwnerSchema,theatreResponseData);
    expect(valid).toBe(true);
});

test('GET - Get all Theatres by OwnerId API returns 200 Success',async({api})=>{
    const authAPI = api.user;
    const theatreAPI = api.theatre;

    const currentUserResponse = await authAPI.getCurrentUser();
    await expect(currentUserResponse.status()).toBe(200);
    const currentUserResponseData = await currentUserResponse.json();
    
    const theatreResponse = await theatreAPI.getTheatresByOwnerId(currentUserResponseData.user._id);
    await expect(theatreResponse.status()).toBe(200);

    const theatreResponseData = await theatreResponse.json();

    await MongoConnect("test","theatres");
    const mdb_MongoRecords = await findMongoRecordsById("owner",new ObjectId(currentUserResponseData.user._id));
    await expect(theatreResponseData.allTheatres.length).toBe(mdb_MongoRecords.length);
});
