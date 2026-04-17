class BaseApiClient{
    constructor(request,token){
        this.request=request;
        this.token = token;
    }

    getHeaders(extraHeaders = {}) {
        return {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...extraHeaders
        };
    }

    async post(endpoint,data,headers={}){
  
        const response =  await this.request.post(endpoint,{
            data:data,
            headers:this.getHeaders(headers)
        });
        
        return response;
    }

    async get(endpoint,headers={}){
        const response = await this.request.get(endpoint,{
            headers:this.getHeaders(headers)
        });

        return response;
    }
}

module.exports = BaseApiClient;