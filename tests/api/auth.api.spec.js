import { test, expect } from '../../src/fixtures/api.fixture';
import { AuthApiService } from '../../src/api/client/userService';
import { findMongoRecord, MongoConnect } from '../../src/utils/mongoDBHelper';
import { forgetPasswordSchema, getCurrentUserSchema, loginSchema, registerSchema, resetPasswordSchema } from '../../src/api/schemas/auth.schema';
import validateSchema from '../../src/utils/schemaValidator.util';

test('POST - Login API Schema validation',async({api})=>{
    const authAPI = await api.user;

    const loginResponse = await authAPI.login(process.env.USER_EMAIL,process.env.PASSWORD);
    await expect(loginResponse.status()).toBe(200);    
    const loginResponseData = await loginResponse.json();
    const valid = validateSchema(loginSchema,loginResponseData);
    expect(valid).toBe(true);
});

test('POST - Login API should return 200 Success for valid credentials',{tag:["@smoke"]},async({api})=>{
    const authApiService = await  api.user;
    const apiResponse = await authApiService.login(process.env.USER_EMAIL,process.env.PASSWORD);
    const data = await apiResponse.json();
   
    expect(apiResponse.status()).toBe(200);
    expect(data.success).toBe(true);
    expect(data.token).not.toBeNull();
    expect(data.message).toBe('Successfully logged in!');
});

test('POST - Login API should return 401 Unauthorized for Invalid credentials',async({api})=>{
    const authApiService = await api.user;
    const apiResponse = await authApiService.login("user@gmail.com","102806");
    const data = await apiResponse.json();

    expect(apiResponse.status()).toBe(401);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Invalid email or password');
});

test('POST - Register API Schema Validation',async({api})=>{
    const apiAuth = await api.user;

    const email = Math.random().toString(36).substring(2,10);
    const registerResponse=await apiAuth.register(`${email}@gmail.com`);
    expect(registerResponse.status()).toBe(201);
    const registerResponseData  = await registerResponse.json();

    const valid = validateSchema(registerSchema,registerResponseData);
    expect(valid).toBe(true);
});

test('POST - Register API should return 200 Success for valid Email',{tag:["@smoke"]},async({api})=>{
    const authAPI =  await api.user;
    const email = Math.random().toString(36).substring(2,10);
    const apiResponse=await authAPI.register(`${email}@gmail.com`);

    expect(apiResponse.status()).toBe(201)

    const data = await apiResponse.json();

    expect(data.success).toBe(true);
    expect(data.message).toBe('Registration is successful');
});

test('POST - Register API should return 400 Bad Request for Invalid Email Domain',async({api})=>{
    const apiAuth =  await api.user;
    const apiResponse = await apiAuth.register("pkUser@mail.com");
    expect(apiResponse.status()).toBe(400);

    const apiResponseData = await apiResponse.json();
    expect(apiResponseData.success).toBe(false);
    expect(apiResponseData.message).toBe("Only Gmail accounts are allowed");
});

test('POST - Foget Password API Schema Validation',async({api})=>{
    const apiAuth =  await api.user;
    const forgetPasswordResponse = await apiAuth.forgetPassword(process.env.USER_EMAIL);
    await expect(forgetPasswordResponse.status()).toBe(200);

    const forgetPasswordResponseData = await forgetPasswordResponse.json();

    const valid = validateSchema(forgetPasswordSchema,forgetPasswordResponseData);
    expect(valid).toBe(true);
});

test('POST - Forget Password API should return 200 Success for the Valid User',async({api})=>{
    const authAPI = await  api.user;

    const apiResponse = await authAPI.forgetPassword(process.env.USER_EMAIL);
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe("If the email exists, an OTP has been sent");
});

test('POST - Forget Password API should return 200 Success for Invalid User as well',async({api})=>{
    const apiAuth = await  api.user;
    const apiResponse = await apiAuth.forgetPassword("pkuser133@gmail.com");

    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe("If the email exists, an OTP has been sent");
});

test('POST - Forget Password API should return 400 for No Email Input',async({api})=>{
    const apiAuth =  await api.user;
    const apiResponse = await apiAuth.forgetPassword();

    await expect(apiResponse.status()).toBe(400);

    const data = await apiResponse.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe("Email is required");
});

test('POST - Reset Password API schema validation',async({api})=>{
    const apiAuth = await  api.user;
    await apiAuth.forgetPassword(process.env.USER_EMAIL);
   
    await MongoConnect("test","users");
    const mdbResposne = await findMongoRecord(process.env.USER_EMAIL);
   
    const resetPasswordResponse = await apiAuth.resetPassword(mdbResposne.otp,"14036");
    await expect(resetPasswordResponse.status()).toBe(200);

    const resetPasswordResponseData = await resetPasswordResponse.json();

    const valid = validateSchema(resetPasswordSchema,resetPasswordResponseData);
    expect(valid).toBe(true);
});

test('POST - Reset Password API should return 200 success for Valid User',async({api})=>{
    const apiAuth =  await api.user;
    await apiAuth.forgetPassword("pramodkumaras143@gmail.com");
   
    await MongoConnect("test","users");
    const mdbResposne = await findMongoRecord("pramodkumaras143@gmail.com");
   
    const apiResponse = await apiAuth.resetPassword(mdbResposne.otp,"140361234");
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    expect(data.status).toBe("success");
    expect(data.message).toBe("password reset successfully");

    const loginResponse = await apiAuth.login("pramodkumaras143@gmail.com",'140361234');
    await expect(loginResponse.status()).toBe(200);

    const loginResponseData = await loginResponse.json();
    expect(loginResponseData.success).toBe(true);
    expect(loginResponseData.token).not.toBeNull();
    expect(loginResponseData.message).toBe('Successfully logged in!');

    //Reset back to prev password 
    await apiAuth.forgetPassword("pramodkumaras143@gmail.com");
   
    await MongoConnect("test","users");
    const mdbResposneAg = await findMongoRecord("pramodkumaras143@gmail.com");
   
    const apiResponseAg = await apiAuth.resetPassword(mdbResposneAg.otp,"14036");
    await expect(apiResponseAg.status()).toBe(200);
});

test('POST - Reset Password should return 400 Bad Request for wrong Otp',async({api})=>{
    const apiAuth = await  api.user;
    const apiResponse = await apiAuth.resetPassword("1233","14333");
    await expect(apiResponse.status()).toBe(400);

    const data = await apiResponse.json();
    expect(data.status).toBe('failure');
    expect(data.message).toBe('OTP is wrong');
});

test('GET - Get Current User API should return 200 success for Valid User',{tag:["@smoke"]},async({api})=>{
    const apiAuth =  await api.user;
    const loginAPIResponse =await apiAuth.login(process.env.USER_EMAIL,process.env.PASSWORD);
    await expect(loginAPIResponse.status()).toBe(200);

    const loginData = await loginAPIResponse.json();
    const apiResponse = await apiAuth.getCurrentUser();
    await expect(apiResponse.status()).toBe(200);

    const data = await apiResponse.json();
    expect(data.success).toBe(true);
    expect(data.user._id).not.toBeNull();
    expect(data.user.name).toBe("UserPramod");
    expect(data.user.email).toBe(process.env.USER_EMAIL);
    expect(data.user.role).toBe("User");
});

test('GET - Get Current User API Schema Validation',async({api})=>{
    const apiAuth =  await api.user;
    const loginAPIResponse =await apiAuth.login(process.env.USER_EMAIL,process.env.PASSWORD);
    await expect(loginAPIResponse.status()).toBe(200);

    const loginData = await loginAPIResponse.json();
    const getCurrentUserResponse = await apiAuth.getCurrentUser();
    await expect(getCurrentUserResponse.status()).toBe(200);

    const getCurrentUserResponseData = await getCurrentUserResponse.json();

    const valid = validateSchema(getCurrentUserSchema,getCurrentUserResponseData);
    expect(valid).toBe(true);
});