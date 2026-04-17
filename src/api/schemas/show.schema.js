export const showSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    show: {
      type: "object",
      properties: {
        name: { type: "string" },
        date: {
          type: "string",
          format: "date-time"
        },
        time: { type: "string" },
        movie: { type: "string" }, // ObjectId reference
        ticketPrice: { type: "number" },
        totalSeats: { type: "number" },
        bookedSeats: {
          type: "array",
          items: {} // empty array now, can refine later if structure known
        },
        theatre: { type: "string" }, // ObjectId reference
        _id: { type: "string" },
        createdAt: {
          type: "string",
          format: "date-time"
        },
        updatedAt: {
          type: "string",
          format: "date-time"
        },
        __v: { type: "number" }
      },
      required: [
        "name",
        "date",
        "time",
        "movie",
        "ticketPrice",
        "totalSeats",
        "bookedSeats",
        "theatre",
        "_id",
        "createdAt",
        "updatedAt",
        "__v"
      ]
    }
  },
  required: ["success", "message", "show"]
};

export const UpdateShowSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    updatedShow: {
      type: "object",
      properties: {
        name: { type: "string" },
        date: {
          type: "string",
          format: "date-time"
        },
        time: { type: "string" },
        movie: { type: "string" }, // ObjectId reference
        ticketPrice: { type: "number" },
        totalSeats: { type: "number" },
        bookedSeats: {
          type: "array",
          items: {} // empty array now, can refine later if structure known
        },
        theatre: { type: "string" }, // ObjectId reference
        _id: { type: "string" },
        createdAt: {
          type: "string",
          format: "date-time"
        },
        updatedAt: {
          type: "string",
          format: "date-time"
        },
        __v: { type: "number" }
      },
      required: [
        "name",
        "date",
        "time",
        "movie",
        "ticketPrice",
        "totalSeats",
        "bookedSeats",
        "theatre",
        "_id",
        "createdAt",
        "updatedAt",
        "__v"
      ]
    }
  },
  required: ["success", "message", "updatedShow"]
};

export const deleteSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" }
  },
  required: ["success", "message"]
};

export const getshowSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },

    shows: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          date: { type: "string", format: "date" },
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
            required: ["_id", "movieName"],
            additionalProperties: true
          },

          ticketPrice: { type: "number" },
          totalSeats: { type: "number" },

          bookedSeats: {
            type: "array",
          },

          theatre: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          __v: { type: "number" }
        },
        required: [
          "_id",
          "name",
          "date",
          "time",
          "movie",
          "ticketPrice",
          "totalSeats",
          "theatre",
          "createdAt",
          "updatedAt"
        ],
        additionalProperties: true
      }
    }
  },
  required: ["success", "message", "shows"],
  additionalProperties: true
};

export const getAllTheatresByMovieSchema = {
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
          name: { type: "string" },
          address: { type: "string" },
          phone: { type: "number" },
          email: { type: "string" },
          owner: { type: "string" },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          __v: { type: "number" },

          shows: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                name: { type: "string" },
                date: { type: "string", format: "date-time" },
                time: { type: "string" },
                movie: { type: "string" },
                ticketPrice: { type: "number" },
                totalSeats: { type: "number" },

                bookedSeats: {
                  type: "array",
                  items: { type: "string" } // can change if seat structure evolves
                },

                theatre: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                    address: { type: "string" },
                    phone: { type: "number" },
                    email: { type: "string" },
                    owner: { type: "string" },
                    isActive: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                    __v: { type: "number" }
                  },
                  required: ["_id", "name"]
                },

                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
                __v: { type: "number" }
              },
              required: ["_id", "name", "date", "time"]
            }
          }
        },
        required: ["_id", "name", "shows"]
      }
    }
  },
  required: ["success", "message", "data"]
};

export const getShowByIdSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },

    data: {
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
          items: { type: "string" }
        },

        theatre: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            address: { type: "string" },
            phone: { type: "number" },
            email: { type: "string" },
            owner: { type: "string" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            __v: { type: "number" }
          },
          required: ["_id", "name"]
        },

        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        __v: { type: "number" }
      },

      required: ["_id", "name", "date", "time", "movie", "theatre"]
    }
  },

  required: ["success", "message", "data"]
};