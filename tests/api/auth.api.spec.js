import { test, expect } from '@playwright/test';
import { AuthApiService } from '../../services/auth.service';

test('Login API should return 200 Success for valid credentials',async({request})=>{
    const authApiService =new AuthApiService(request);
    const apiResponse = await authApiService.login(process.env.USER_EMAIL,process.env.PASSWORD);
    const data = await apiResponse.json();
   
    expect(apiResponse.status()).toBe(200);
    expect(data.success).toBe(true);
    expect(data.token).not.toBeNull();
    expect(data.message).toBe('Successfully logged in!');
});

test('Login API should return 404 Not Found for Invalid credentials',async({request})=>{
    const authApiService =new AuthApiService(request);
    const apiResponse = await authApiService.login("user@gmail.com","102836");
    const data = await apiResponse.json();

    expect(apiResponse.status()).toBe(404);
    expect(data.success).toBe(false);
    expect(data.message).toBe('No user found');
});