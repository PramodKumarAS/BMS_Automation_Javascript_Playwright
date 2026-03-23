import {test,expect} from '@playwright/test';
import { AuthApiService } from '../../services/authAPI.service';
import { MovieAPIService } from '../../services/movieAPI.service';
import {movieData} from '../../test-data/movie.json';
import { deleteMany, MongoConnect, updateOne } from '../../services/mongoDB.service';
import validateSchema from '../../utils/schemaValidator.util';
import {movieSchema} from '../../schemas/movie.schema';

test.afterAll(async ()=>{
    await MongoConnect("test","movies");
    await deleteMany("movieName",movieData.movieName);
});

test('POST - Add Movie API Schema Validation',async({request})=>{
    const authAPI = new AuthApiService(request);
    const authResponse = await authAPI.login(process.env.ADMIN_EMAIL,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const movieAPI = new MovieAPIService(request);
    const movieResponse = await movieAPI.addMovie(authResonseData.token,movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    const valid = validateSchema(movieSchema,movieResponseData);
    expect(valid).toBe(true);
});

test('POST - Add Movie API return 200 Success',async ({request})=>{
    const authAPI = new AuthApiService(request);
    const authResponse = await authAPI.login(process.env.ADMIN_EMAIL,process.env.PASSWORD);
    await expect(authResponse.status()).toBe(200);
    const authResonseData = await authResponse.json();

    const movieAPI = new MovieAPIService(request);
    const movieResponse = await movieAPI.addMovie(authResonseData.token,movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    expect(movieResponseData.success).toBe(true);
    expect(movieResponseData.message).toBe("Movie is added");
    expect(movieResponseData.movie.movieName).toBe(movieData.movieName);
    expect(movieResponseData.movie.description).toBe(movieData.description);
    expect(movieResponseData.movie.duration).toBe(movieData.duration);
    expect(movieResponseData.movie.genre).toBe(movieData.genre);
    expect(movieResponseData.movie.language).toBe(movieData.language);
    expect(movieResponseData.movie.releaseDate.split("T")[0]).toBe(movieData.releaseDate);
    expect(movieResponseData.movie.poster).toBe(movieData.poster);
    expect(movieResponseData.movie._id).not.toBe(null);
});