class TheatreApiService{
    constructor(request){
        this.request=request;
    }

    async addTheatre(token,theatreData,ownerID){
        const endPoint = `${process.env.API_BASE_URL}/api/theatre/add-theatre`;

        try {
            
        } catch (error) {
            
        }
        const response = await this.request.post(endPoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            },
            data:{
                ...theatreData,
                owner:ownerID,
            }        
        });

        return response;
    }

    async getAllTheatres(token){
         const endPoint = `${process.env.API_BASE_URL}/api/theatre/get-all-theatre`;

         const response = await this.request.get(endPoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            }
         });

         return response;
    }

    async getTheatresByOwnerId(token,ownerID){
         const endPoint = `${process.env.API_BASE_URL}/api/theatre/get-theatres-ByOwner/${ownerID}`;

         const response = await this.request.get(endPoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            }
         });

         return response;
    }

    async updateTheatre(token,id){
         const endPoint = `${process.env.API_BASE_URL}/api/theatre/update-theatre`;
         
         const response = await this.request.post(endPoint,{
               headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            },
            data:{
                _id:id,
                address:"Bangalore, Whitefield",
                email:"pramodkumaras143@gmail.com",
                name:"PVP Inox",
                phone:"8709919992"
            }        
         });

         return response;
    }

    async deleteTheatre(token,id){
          const endPoint = `${process.env.API_BASE_URL}/api/theatre/delete-theatre`;

         const response = await this.request.delete(endPoint,{
               headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            },
            data:{
                _id:id
            }        
         });

         return response;

    }
}

module.exports={TheatreApiService};