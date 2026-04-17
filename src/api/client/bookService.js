const BaseApiClient = require("./baseApiClient");

class BookApiService extends BaseApiClient{
  async bookShow(showData) {
    const endpoint = `${process.env.API_BASE_URL}/api/book/book-show`;

    return await this.post(
      endpoint,
      { ...showData },
      { 'Content-Type': 'application/json' }
    );
  }

  async makePayment(paymentData) {
    const endpoint = `${process.env.API_BASE_URL}/api/book/make-payment`;

    return await this.post(
      endpoint,
      { ...paymentData },
      { 'Content-Type': 'application/json' }
    );
  }

  async getAllBookings() {
    const endpoint = `${process.env.API_BASE_URL}/api/book/get-all-bookings`;

    return await this.get(
      endpoint,
      { 'Content-Type': 'application/json' }
    );
  }     
}

module.exports = BookApiService