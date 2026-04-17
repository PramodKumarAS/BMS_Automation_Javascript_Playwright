const BaseApiClient = require("./baseApiClient");

class UserApiService extends BaseApiClient{
    
    async login(email,password){
        const endpoint = `${process.env.API_BASE_URL}/api/user/login`;
  
        const response =  await this.post(
            endpoint,
            {email,password},
            {'Content-Type':'application/json'}            
        );

        return response;
    }

    async register(email){
        const endpoint = `${process.env.API_BASE_URL}/api/user/register`;

        const response = await this.post(
            endpoint,
            {
                email:email,
                name:"Pramod Kumar A S",
                password:"123441As!"
            },
            {'Content-Type':'application/json'}            
        );

        return response;
    }

    async forgetPassword(email){
        const endpoint = `${process.env.API_BASE_URL}/api/user/forgetpassword`;

        const response = await this.post(
            endpoint,
            { email:email },
            {'Content-Type':'application/json'}            
        );

        return response;
    }

    async resetPassword(otp,password){
        const endpoint = `${process.env.API_BASE_URL}/api/user/resetpassword`;

        const response = await this.post(
            endpoint,
            { otp:otp,password:password },
            {'Content-Type':'application/json'}            
        );

        return response;
    }

    async getCurrentUser(){
        const endpoint = `${process.env.API_BASE_URL}/api/user/get-currentUser`;

        const response = await this.get(
            endpoint,
            {'Content-Type':'application/json'}            
        );

        return response;
    }
}

module.exports={
    UserApiService
};