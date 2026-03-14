class ShowApiService{
    constructor(request){
        this.request=request;
    }

    
    async getShow(showId,token){
        const endpoint = `${process.env.API_BASE_URL}/api/show/get-show-by-id`;
  
        const response =  await this.request.post(endpoint,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            data:{showId}
        });

        return response.json();
    }
}

module.exports={ShowApiService};