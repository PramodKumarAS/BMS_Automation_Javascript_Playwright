export const paymentBookingSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    data: { 
      type: "string" // Stripe Payment Intent ID
    }
  },
  required: ["success", "message", "data"]
};

export const bookingSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },

    data: {
      type: "object",
      properties: {
        _id: { type: "string" },

        show: { type: "string" },   // show ID
        user: { type: "string" },   // user ID

        seats: {
          type: "array",
          items: { type: "number" }
        },

        transactionId: {
          type: "string",
          pattern: "^pi_" // Stripe payment intent
        },

        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },

        __v: { type: "number" }
      },

      required: ["_id", "show", "user", "seats", "transactionId"]
    }
  },

  required: ["success", "message", "data"]
};

export const getBookingsSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },

    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },

          show: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              date: { type: "string", format: "date-time" },
              time: { type: "string" },

              movie: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  movieName: { type: "string" },
                  description: { type: "string" },
                  duration: { type: "number" },
                  genre: { type: "string" },
                  language: { type: "string" },
                  releaseDate: { type: "string", format: "date-time" },
                  poster: { type: "string" },
                  __v: { type: "number" }
                },
                required: ["_id", "movieName"]
              },

              ticketPrice: { type: "number" },
              totalSeats: { type: "number" },

              bookedSeats: {
                type: "array",
                items: { type: "number" }
              },

              theatre: { type: "string" }, // ID here (not object)

              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              __v: { type: "number" }
            },
            required: ["_id", "name", "movie"]
          },

          user: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
              role: { type: "string" },
              otp: { type: "string" },
              otpExpiry: { type: "string", format: "date-time" },
              __v: { type: "number" }
            },
            required: ["_id", "email"]
          },

          seats: {
            type: "array",
            items: { type: "number" }
          },

          transactionId: {
            type: "string",
            pattern: "^pi_"
          },

          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          __v: { type: "number" }
        },

        required: ["_id", "show", "user", "seats", "transactionId"]
      }
    }
  },

  required: ["success", "message", "data"]
};