class AuthApiService{
    constructor(request){
        this.request=request;
    }

    
    async login(email,password){
        const endpoint = `${process.env.API_BASE_URL}/api/user/login`;
  
        const response =  await this.request.post(endpoint,{
            headers:{
                'Content-Type':'application/json'
            },            
            data:{
                email:email,
                password:password
            }
        });

        return response;
    }

    async register(email){
        const endpoint = `${process.env.API_BASE_URL}/api/user/register`;

        const response = await this.request.post(endpoint,{
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                email:email,
                name:"Pramod Kumar A S",
                password:"12344"
            }
        });

        return response;
    }

    async forgetPassword(email){
        const endpoint = `${process.env.API_BASE_URL}/api/user/forgetpassword`;

        const response = await this.request.post(endpoint,{
            headers:{
                'Content-Type':'application/json'                
            },
            data:{
                email:email
            }
        });

        return response;
    }

    async resetPassword(otp,password){
        const endpoint = `${process.env.API_BASE_URL}/api/user/resetpassword`;

        const response = await this.request.post(endpoint,{
            headers:{
                'Content-Type':'application/json'                
            },
            data:{
                otp:otp,
                password:password
            }
        });

        return response;
    }

    async getCurrentUser(token){
        const endpoint = `${process.env.API_BASE_URL}/api/user/get-currentUser`;

        const response = await this.request.get(endpoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            }
        });

        return response;
    }
}

module.exports={
    AuthApiService
};