import {movieData,updateMovieData} from "../../src/test-data/movie.json";
import { deleteMany, MongoConnect } from '../../src/utils/mongoDBHelper';
import validateSchema from '../../src/utils/schemaValidator.util';
import {deleteMovieSchema, getAllMoviesSchema, movieSchema,updateMovieSchema} from '../../src/api/schemas/movie.schema';
import { test,expect } from "../../src/fixtures/api.fixture";

test.afterAll(async ()=>{
    await MongoConnect("test","movies");
    await deleteMany("movieName",movieData.movieName);
});

test('POST - Add Movie API Schema Validation',async({api})=>{
    const movieAPI = await api.movie;
    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    const valid = validateSchema(movieSchema,movieResponseData);
    expect(valid).toBe(true);
});

test('POST - Add Movie API return 200 Success',{tag:["@smoke"]},async ({api})=>{
    const movieAPI = await api.movie;
    const movieResponse = await movieAPI.addMovie(movieData);
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

test('POST - Update Movie API Schema Validation',async({api})=>{
    const movieAPI = await api.movie;
    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    expect(movieResponseData.success).toBe(true);
    expect(movieResponseData.message).toBe("Movie is added");

    const updateMovieResponse = await movieAPI.updateMovie(movieResponseData.movie._id,updateMovieData);
    await expect(updateMovieResponse.status()).toBe(200);
    const updateMovieResposneData = await updateMovieResponse.json();

    const valid = validateSchema(updateMovieSchema,updateMovieResposneData)
    expect(valid).toBe(true);
});

test('POST - Update Movie API return 200 Success',async({api})=>{
    const movieAPI = await api.movie;
    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    expect(movieResponseData.success).toBe(true);
    expect(movieResponseData.message).toBe("Movie is added");

    const updateMovieResponse = await movieAPI.updateMovie(movieResponseData.movie._id,updateMovieData);
    await expect(updateMovieResponse.status()).toBe(200);
    const updateMovieResposneData = await updateMovieResponse.json();
    expect(updateMovieResposneData.success).toBe(true);
    expect(updateMovieResposneData.message).toBe("Movie is updated");
    expect(updateMovieResposneData.updatedMovie.movieName).toBe(updateMovieData.movieName);
    expect(updateMovieResposneData.updatedMovie.description).toBe(updateMovieData.description);
    expect(updateMovieResposneData.updatedMovie.duration).toBe(updateMovieData.duration);
    expect(updateMovieResposneData.updatedMovie.genre).toBe(updateMovieData.genre);
    expect(updateMovieResposneData.updatedMovie.language).toBe(updateMovieData.language);
    expect(updateMovieResposneData.updatedMovie.releaseDate.split("T")[0]).toBe(updateMovieData.releaseDate);
    expect(updateMovieResposneData.updatedMovie.poster).toBe(updateMovieData.poster);
    expect(updateMovieResposneData.updatedMovie._id).not.toBe(null);
});

test('GET - Get All Movies API Schema Validation',async({api})=>{
    const movieAPI = await api.movie;

    const movieResponse = await movieAPI.getAllMovies();
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    const valid = validateSchema(getAllMoviesSchema,movieResponseData);
    expect(valid).toBe(true);
});

test('GET - Get All Movies API returns new Added Movie',async({api})=>{
    const movieAPI = await api.movie;
    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);

    const allMovieResponse = await movieAPI.getAllMovies();
    await expect(allMovieResponse.status()).toBe(200);
    const allMovieResponseData = await allMovieResponse.json();

    expect(allMovieResponseData.success).toBe(true);
    expect(allMovieResponseData.message).toBe("Movies fetched!");

    const newlyAddedMovieResponseData = await allMovieResponseData.movies.find(movie=> movie.movieName===movieData.movieName);
    expect(newlyAddedMovieResponseData.movieName).toBe(movieData.movieName);
    expect(newlyAddedMovieResponseData.description).toBe(movieData.description);
    expect(newlyAddedMovieResponseData.duration).toBe(movieData.duration);
    expect(newlyAddedMovieResponseData.genre).toBe(movieData.genre);
    expect(newlyAddedMovieResponseData.language).toBe(movieData.language);
    expect(newlyAddedMovieResponseData.releaseDate.split("T")[0]).toBe(movieData.releaseDate);
    expect(newlyAddedMovieResponseData.poster).toBe(movieData.poster);
    expect(newlyAddedMovieResponseData._id).not.toBe(null);
});

test('GET - Get Movie By ID API Schema Validation',async({api})=>{
    const movieAPI = await api.movie;
    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    const getMovieResponse = await movieAPI.getMovieById(movieResponseData.movie._id);
    await expect(getMovieResponse.status()).toBe(200);
    const getMovieResponseData = await getMovieResponse.json();

    const valid = validateSchema(movieSchema,getMovieResponseData);
    expect(valid).toBe(true);
});

test('GET - Get Movie By ID API returns new Added Movie',async({api})=>{
    const movieAPI = await api.movie;
    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json();

    const getMovieResponse = await movieAPI.getMovieById(movieResponseData.movie._id);
    await expect(getMovieResponse.status()).toBe(200);
    const getMovieResponseData = await getMovieResponse.json();

    expect(getMovieResponseData.success).toBe(true);
    expect(getMovieResponseData.message).toBe("Movies fetched!");

    expect(getMovieResponseData.movie.movieName).toBe(movieData.movieName);
    expect(getMovieResponseData.movie.description).toBe(movieData.description);
    expect(getMovieResponseData.movie.duration).toBe(movieData.duration);
    expect(getMovieResponseData.movie.genre).toBe(movieData.genre);
    expect(getMovieResponseData.movie.language).toBe(movieData.language);
    expect(getMovieResponseData.movie.releaseDate.split("T")[0]).toBe(movieData.releaseDate);
    expect(getMovieResponseData.movie.poster).toBe(movieData.poster);
    expect(getMovieResponseData.movie._id).not.toBe(null);
});

test('POST - Delete Movie API Schema Validation',async({api})=>{
    const movieAPI = api.movie;

    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json(); 
    const movieId = movieResponseData._id;

    const deletemovieResponse = await movieAPI.deleteMovie(movieId);
    await expect(deletemovieResponse.status()).toBe(200);
    const deletemovieResponseData = await deletemovieResponse.json(); 

    const valid = validateSchema(deleteMovieSchema,deletemovieResponseData);
    expect(valid).toBe(true);
});

test('POST - Delete Movie API return 200 Success',async({api})=>{
    const movieAPI = api.movie;

    const movieResponse = await movieAPI.addMovie(movieData);
    await expect(movieResponse.status()).toBe(200);
    const movieResponseData = await movieResponse.json(); 
    const movieId = movieResponseData._id;

    const deletemovieResponse = await movieAPI.deleteMovie(movieId);
    await expect(deletemovieResponse.status()).toBe(200);
    const deletemovieResponseData = await deletemovieResponse.json(); 
});
