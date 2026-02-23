import {request as playwrightRequest} from '@playwright/test';

class APIHelper{

    async createContext(){
        return await playwrightRequest.newContext({
            baseURL:"https://bookmyshow-ihmd.onrender.com"
        });
    }

    async login(apiContext){
        const res = await apiContext.post('/api/user/login',{
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                email:process.env.USER_EMAIL,
                password:process.env.PASSWORD
            }
        });

        return await res.json();
    }

    async getShow(apiContext,token,showId){
        const res = await apiContext.post('/api/show/get-show-by-id',{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            data:{showId}
        });

        return await res.json();
    }
}

export default APIHelper;