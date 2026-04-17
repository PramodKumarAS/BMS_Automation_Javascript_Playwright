import { request } from '@playwright/test';
import fs from 'fs';

export default async function globalSetup() {
    console.log("🔥 GLOBAL SETUP RUNNING");
  const requestContext = await request.newContext();

  const response = await requestContext.post(
    'https://bookmyshow-ihmd.onrender.com/api/user/login',
    {
      data: {
        email: "pkUser@gmail.com",
        password: "14036"
      }
    }
  );

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  const responseBody  = await response.json();

  const storageState = {
    cookies:[],
    origins:[
        {
            origin:"https://bookmyshow-ihmd.onrender.com",
            localStorage:[
                {
                    name:"token",
                    value:responseBody.token
                }
            ]
        }
    ]
  };

  fs.writeFileSync('authState.json', JSON.stringify(storageState, null, 2));
  await requestContext.dispose();
}