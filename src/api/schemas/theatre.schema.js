export const theatreSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    theatre: {
      type: "object",
      properties: {
        name: { type: "string" },
        address: { type: "string" },
        phone: { type: "number" },
        email: { type: "string" },
        owner: { type: "string" },
        isActive: { type: "boolean" },
        _id: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        __v: { type: "number" }
      },
      required: [
        "name",
        "address",
        "phone",
        "email",
        "owner",
        "isActive",
        "_id",
        "createdAt",
        "updatedAt",
        "__v"
      ]
    }
  },
  required: ["success", "message", "theatre"]
};

export const getTheatresSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    allTheatres: {
      type: "array",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          address: { type: "string" },
          phone: { type: "number" },
          email: { type: "string" },
          owner: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
              role: { type: "string" },
              __v: { type: "number" },
              otp: { type: "string" },
              otpExpiry: { type: "string", format: "date-time" }
            },
            required: ["_id", "name", "email", "password", "role"]
          },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          __v: { type: "number" }
        },
        required: [
          "_id",
          "name",
          "address",
          "phone",
          "email",
          "owner",
          "isActive",
          "createdAt",
          "updatedAt",
          "__v"
        ]
      }
  },
  required: ["success", "message", "allTheatres"]
};


export const theatresByOwnerSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    allTheatres: {
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
          __v: { type: "number" }
        },
        required: [
          "_id",
          "name",
          "address",
          "phone",
          "email",
          "owner",
          "isActive",
          "createdAt",
          "updatedAt",
          "__v"
        ]
      }
    }
  },
  required: ["success", "message", "allTheatres"]
};

export const updateTheatreSchema = {
  type: "object",
  required: ["success", "message", "updatedTheatre"],
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    updatedTheatre: {
      type: "object",
      required: [
        "_id",
        "name",
        "address",
        "phone",
        "email",
        "owner",
        "isActive",
        "createdAt",
        "updatedAt",
        "__v"
      ],
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        address: { type: "string" },
        phone: { type: "number" },
        email: { type: "string", format: "email" },
        owner: { type: "string" },
        isActive: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        __v: { type: "number" }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

export const deleteTheatreSchema = {
  type: "object",
  required: ["success", "message", "deletedTheatre"],
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    deletedTheatre: {
      type: "object",
      required: [
        "_id",
        "name",
        "address",
        "phone",
        "email",
        "owner",
        "isActive",
        "createdAt",
        "updatedAt",
        "__v"
      ],
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        address: { type: "string" },
        phone: { type: "number" },
        email: { type: "string", format: "email" },
        owner: { type: "string" },
        isActive: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        __v: { type: "number" }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};