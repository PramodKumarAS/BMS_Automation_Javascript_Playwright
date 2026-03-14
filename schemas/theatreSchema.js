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