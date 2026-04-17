const BaseApiClient = require('./baseApiClient');

class TheatreApiService extends BaseApiClient {

  async addTheatre(theatreData, ownerID) {
    const endpoint = `${process.env.API_BASE_URL}/api/theatre/add-theatre`;

    return await this.post(
      endpoint,
      {
        ...theatreData,
        owner: ownerID
      },
      { 'Content-Type': 'application/json' }
    );
  }

  async getAllTheatres() {
    const endpoint = `${process.env.API_BASE_URL}/api/theatre/get-all-theatre`;

    return await this.get(
      endpoint,
      { 'Content-Type': 'application/json' }
    );
  }

  async getTheatresByOwnerId(ownerID) {
    const endpoint = `${process.env.API_BASE_URL}/api/theatre/get-theatres-ByOwner/${ownerID}`;

    return await this.get(
      endpoint,
      { 'Content-Type': 'application/json' }
    );
  }

  async updateTheatre(id, theatreData, ownerID) {
    const endpoint = `${process.env.API_BASE_URL}/api/theatre/update-theatre`;

    return await this.post(
      endpoint,
      {
        _id: id,
        ...theatreData,
        owner: ownerID
      },
      { 'Content-Type': 'application/json' }
    );
  }

  async deleteTheatre(id) {
    const endpoint = `${process.env.API_BASE_URL}/api/theatre/delete-theatre`;

    return await this.post(
      endpoint,
      { _id: id },
      { 'Content-Type': 'application/json' }
    );
  }
}

module.exports = TheatreApiService;