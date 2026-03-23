export const movieSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },

    message: { type: "string" },

    movie: {
      type: "object",
      properties: {
        movieName: { type: "string" },

        description: { type: "string" },

        duration: { type: "number" },

        genre: { type: "string" },

        language: { type: "string" },

        releaseDate: {
          type: "string",
          format: "date-time"
        },

        poster: { type: "string" },

        _id: { type: "string" },

        __v: { type: "number" }
      },
      required: [
        "movieName",
        "description",
        "duration",
        "genre",
        "language",
        "releaseDate",
        "poster",
        "_id",
        "__v"
      ]
    }
  },
  required: ["success", "message", "movie"]
};