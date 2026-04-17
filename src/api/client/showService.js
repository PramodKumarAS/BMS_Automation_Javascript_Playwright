const BaseApiClient = require('./baseApiClient');

class ShowApiService extends BaseApiClient {

  async addShow(movieId,theatreId,showData){
    const endpoint = `${process.env.API_BASE_URL}/api/show/add-show`;

    return await this.post(
      endpoint,
      { movie:movieId, theatre:theatreId,...showData },
      { 'Content-Type': 'application/json' }
    );
  }

  async updateShow(id, showData) {
    const endpoint = `${process.env.API_BASE_URL}/api/show/update-show`;

    return await this.post(
      endpoint,
      { showId: id, ...showData },
      { 'Content-Type': 'application/json' }
    );
  }

  async deleteShow(id) {
    const endpoint = `${process.env.API_BASE_URL}/api/show/delete-show`;

    return await this.post(
      endpoint,
      { showId: id },
      { 'Content-Type': 'application/json' }
    );
  }

  async getAllShowsByTheatre(theatreId) {
    const endpoint = `${process.env.API_BASE_URL}/api/show/get-all-shows-by-theatre`;

    return await this.post(
      endpoint,
      { theatreId },
      { 'Content-Type': 'application/json' }
    );
  }  

  async getAllTheatresByMovie(movie) {
    const endpoint = `${process.env.API_BASE_URL}/api/show/get-all-theatres-by-movie`;

    return await this.post(
      endpoint,
      movie ,
      { 'Content-Type': 'application/json' }
    );
  }    

  async getShowById(showId) {
    const endpoint = `${process.env.API_BASE_URL}/api/show/get-show-by-id`;

    return await this.post(
      endpoint,
      { showId },
      { 'Content-Type': 'application/json' }
    );
  }

}

module.exports = ShowApiService;