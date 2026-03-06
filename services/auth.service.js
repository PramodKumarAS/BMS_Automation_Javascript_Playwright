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
}

module.exports={AuthApiService};