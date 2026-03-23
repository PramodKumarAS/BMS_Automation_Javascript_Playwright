class MovieAPIService{
    constructor(request){
        this.request=request;
    }

    async addMovie(token,movieData){
        const endPoint = `${process.env.API_BASE_URL}/api/movie/add-movie`;

        const response = await this.request.post(endPoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            },
            data:{
                ...movieData,
            }                    
        });

        return response;
    }

    async updateMovie(token,id,movieData){
        const endPoint = `${process.env.API_BASE_URL}/api/movie/update-movie`;

        const response = await this.request.post(endPoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            },
            data:{
                _id:id,
                ...movieData,
            }                    
        });

        return response;
    }    

    async deleteMovie(token,id){
          const endPoint = `${process.env.API_BASE_URL}/api/movie/delete-movie`;

         const response = await this.request.post(endPoint,{
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

    async getAllMovies(token){
         const endPoint = `${process.env.API_BASE_URL}/api/movie/get-all-movie`;

         const response = await this.request.get(endPoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            }
         });

         return response;
    }   

   async getMovieById(token,ID){
         const endPoint = `${process.env.API_BASE_URL}/api/movie/${ID}`;

         const response = await this.request.get(endPoint,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`            
            }
         });

         return response;
    }    
}

module.exports={MovieAPIService};