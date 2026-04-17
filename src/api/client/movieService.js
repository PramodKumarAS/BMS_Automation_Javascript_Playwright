const BaseApiClient = require('./baseApiClient');

class MovieApiService extends BaseApiClient {

  async addMovie(movieData) {
    const endpoint = `${process.env.API_BASE_URL}/api/movie/add-movie`;

    return await this.post(
      endpoint,
      { ...movieData },
      { 'Content-Type': 'application/json' }
    );
  }

  async updateMovie(id, movieData) {
    const endpoint = `${process.env.API_BASE_URL}/api/movie/update-movie`;

    return await this.post(
      endpoint,
      { movieId: id, ...movieData },
      { 'Content-Type': 'application/json' }
    );
  }

  async deleteMovie(id) {
    const endpoint = `${process.env.API_BASE_URL}/api/movie/delete-movie`;

    return await this.post(
      endpoint,
      { _id: id },
      { 'Content-Type': 'application/json' }
    );
  }

  async getAllMovies() {
    const endpoint = `${process.env.API_BASE_URL}/api/movie/get-all-movies`;

    return await this.get(
      endpoint,
      { 'Content-Type': 'application/json' }
    );
  }

  async getMovieById(id) {
    const endpoint = `${process.env.API_BASE_URL}/api/movie/${id}`;

    return await this.get(
      endpoint,
      { 'Content-Type': 'application/json' }
    );
  }
}

module.exports = MovieApiService;