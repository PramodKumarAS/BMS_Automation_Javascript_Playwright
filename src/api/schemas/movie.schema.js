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

export const updateMovieSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    updatedMovie: {
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
  required: ["success", "message", "updatedMovie"]
};

export const getAllMoviesSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    movies: {
      type: "array",
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
  required: ["success", "message", "movies"]
};

export const deleteMovieSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" }
  },
  required: ["success", "message"]
};