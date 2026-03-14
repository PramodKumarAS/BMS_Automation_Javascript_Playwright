import { test, expect } from '@playwright/test';
import { AuthApiService } from '../../services/authAPI.service';
import Ajv from 'ajv';
import { findMongoRecord, findMongoRecordById, MongoConnect } from '../../services/mongoDB.service';

test('POST - Login API Schema validation',async({request})=>{
    const authAPI = new AuthApiService(request);

    const apiResponse = await authAPI.login(process.env.USER_EMAIL,process.env.PASSWORD);
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    
    const schema = {
    type: "object",
    required: ["success", "token", "message", "role"],
    properties: {
        success: { type: "boolean" },
        token: { type: "string" },
        message: { type: "string" },
        role: { type: "string", enum: ["User"] }
    },
    additionalProperties: false
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);   

    expect(valid).toBe(true);    
});

test('POST - Login API should return 200 Success for valid credentials',async({request})=>{
    const authApiService =new AuthApiService(request);
    const apiResponse = await authApiService.login(process.env.USER_EMAIL,process.env.PASSWORD);
    const data = await apiResponse.json();
   
    expect(apiResponse.status()).toBe(200);
    expect(data.success).toBe(true);
    expect(data.token).not.toBeNull();
    expect(data.message).toBe('Successfully logged in!');
});

test('POST - Login API should return 404 Not Found for Invalid credentials',async({request})=>{
    const authApiService =new AuthApiService(request);
    const apiResponse = await authApiService.login("user@gmail.com","102806");
    const data = await apiResponse.json();

    expect(apiResponse.status()).toBe(404);
    expect(data.success).toBe(false);
    expect(data.message).toBe('No user found');
});

test('POST - Register API Schema Validation',async({request})=>{
    const apiAuth = new AuthApiService(request);

    const apiResponse = await apiAuth.register('pkUser2@gmail.com');
    expect(apiResponse.status()).toBe(200);
    const data  = await apiResponse.json();

    const schema = {
        type:"object",
        required:["success", "message"],
        properties: {
        success: { type: "boolean" },
        message: { type: "string" }
        },
        additionalProperties: false
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBe(true);
});

test('POST - Register API should return 200 Success for valid Email',async({request})=>{
    const authAPI = new AuthApiService(request);
    const apiResponse=await authAPI.register("pkUser1@gmail.com");

    expect(apiResponse.status()).toBe(200)

    const data = await apiResponse.json();

    expect(data.success).toBe(true);
    expect(data.message).toBe('Registration is successfull');
});

test('POST - Register API should return 400 Bad Request for Invalid Email Domain',async({request})=>{
    const apiAuth = new AuthApiService(request);
    const apiResponse = await apiAuth.register("pkUser@mail.com");

    expect(apiResponse.status()).toBe(400);
});

test('POST - Foget Password API Schema Validation',async({request})=>{
    const apiAuth = new AuthApiService(request);
    const apiResponse = await apiAuth.forgetPassword(process.env.USER_EMAIL);
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();

    const schema = {
        type:"object",
        required:["status","message"],
        properties:{
            status:{type:"string"},
            message:{type:"string"}
        },
        additionalProperties:false
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);

    expect(valid).toBe(true);
});

test('POST - Forget Password API should return 200 Success for the Valid User',async({request})=>{
    const authAPI = new AuthApiService(request);

    const apiResponse = await authAPI.forgetPassword(process.env.USER_EMAIL);
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    expect(data.status).toBe("success");
    expect(data.message).toBe("otp sent to your email");
});

test('POST - Forget Password API should return 404 Not found error for Invalid User',async({request})=>{
    const apiAuth = new AuthApiService(request);
    const apiResponse = await apiAuth.forgetPassword("pkuser133@gmail.com");

    await expect(apiResponse.status()).toBe(404);

    const data = await apiResponse.json();
    expect(data.status).toBe("failure");
    expect(data.message).toBe("user not found for this email");
});

test('POST - Reset Password API schema validation',async({request})=>{
    const apiAuth = new AuthApiService(request);
    await apiAuth.forgetPassword(process.env.USER_EMAIL);
   
    await MongoConnect("test","users");
    const mdbResposne = await findMongoRecord(process.env.USER_EMAIL);
   
    const apiResponse = await apiAuth.resetPassword(mdbResposne.otp,"14036");
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();

    const schema={
        type:"object",
        required:["status","message"],
        properties:{
            status:{type:"string"},
            message:{type:"string"}
        },
        additionalProperties:false
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);

    expect(valid).toBe(true);
});

test('POST - Reset Password API should return 200 success for Valid User',async({request})=>{
    const apiAuth = new AuthApiService(request);
    await apiAuth.forgetPassword(process.env.USER_EMAIL);
   
    await MongoConnect("test","users");
    const mdbResposne = await findMongoRecord(process.env.USER_EMAIL);
   
    const apiResponse = await apiAuth.resetPassword(mdbResposne.otp,"14036");
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    expect(data.status).toBe("success");
    expect(data.message).toBe("password reset successfully");
});

test('POST - Reset Password should return 400 Bad Request for wrong Otp',async({request})=>{
    const apiAuth = new AuthApiService(request);
    const apiResponse = await apiAuth.resetPassword("1233","14333");
    await expect(apiResponse.status()).toBe(400);

    const data = await apiResponse.json();
    expect(data.status).toBe('failure');
    expect(data.message).toBe('OTP is wrong');
});

test('GET - Get Current User API should return 200 success for Valid User',async({request})=>{
    const apiAuth = new AuthApiService(request);
    const loginAPIResponse =await apiAuth.login(process.env.USER_EMAIL,process.env.PASSWORD);
    await expect(loginAPIResponse.status()).toBe(200);

    const loginData = await loginAPIResponse.json();
    const apiResponse = await apiAuth.getCurrentUser(loginData.token);
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    expect(data.success).toBe(true);
    expect(data.user._id).not.toBeNull();
    expect(data.user.name).toBe("UserPramod");
    expect(data.user.email).toBe(process.env.USER_EMAIL);
    expect(data.user.role).toBe("User");
});

test('GET - Get Current User API Schema Validation',async({request})=>{
    const apiAuth = new AuthApiService(request);
    const loginAPIResponse =await apiAuth.login(process.env.USER_EMAIL,process.env.PASSWORD);
    await expect(loginAPIResponse.status()).toBe(200);

    const loginData = await loginAPIResponse.json();
    const apiResponse = await apiAuth.getCurrentUser(loginData.token);
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();

    const schema = {
        type: "object",
        properties: {
            success: { type: "boolean" },
            user: {
            type: "object",
            properties: {
                _id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                role: { type: "string" },
                __v: { type: "number" }
            },
            required: ["_id", "name", "email", "role"]
            }
        },
        required: ["success", "user"]
    };

    const ajv = new Ajv();
    const validate= ajv.compile(schema);
    const valid = validate(data);

    expect(valid).toBe(true);
    
});

test('GET - Get current User API should return 401 Unauthorized for invalid token',async({request})=>{
    const apiAuth=new AuthApiService(request);
    const apiResponse = await apiAuth.getCurrentUser("");

    await expect(apiResponse.status()).toBe(401);
}); 