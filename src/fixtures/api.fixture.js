import {test as base} from "@playwright/test";
import { UserApiService } from "../api/client/userService";
import MovieApiService from "../api/client/movieService";
import ShowApiService from "../api/client/showService";
import TheatreApiService from "../api/client/theatreService";
import BookApiService from "../api/client/bookService";

export const test=base.extend({
    api:async({request},use)=>{
        const response = await request.post(`${process.env.API_BASE_URL}/api/user/login`,{
            data:{
                email:process.env.USER_EMAIL,
                password:process.env.PASSWORD
            }
        });

        const {token} =await response.json();

        await use({
            user:new UserApiService(request,token),
            movie:new MovieApiService(request,token),
            show:new ShowApiService(request,token),
            theatre:new TheatreApiService(request,token),
            book:new BookApiService(request,token)
        })
    },
});

export {expect} from "@playwright/test";    