// schemas/auth.schema.js

const loginSchema = {
  type: "object",
  required: ["success", "token", "message", "role"],
  properties: {
    success: { type: "boolean" },
    token: { type: "string" },
    message: { type: "string" },
    role: { type: "string", enum: ["User"] }
  },
  additionalProperties: false
};

const registerSchema = {
  type: "object",
  required: ["success", "message"],
  properties: {
    success: { type: "boolean" },
    message: { type: "string" }
  },
  additionalProperties: false
};

const forgetPasswordSchema = {
  type: "object",
  required: ["status", "message"],
  properties: {
    status: { type: "string" },
    message: { type: "string" }
  },
  additionalProperties: false
};

const resetPasswordSchema = {
  type: "object",
  required: ["status", "message"],
  properties: {
    status: { type: "string" },
    message: { type: "string" }
  },
  additionalProperties: false
};

const getCurrentUserSchema = {
  type: "object",
  required: ["success", "user"],
  properties: {
    success: { type: "boolean" },
    user: {
      type: "object",
      required: ["_id", "name", "email", "role"],
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        role: { type: "string" },
        __v: { type: "number" }
      }
    }
  }
};

module.exports = {
  loginSchema,
  registerSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  getCurrentUserSchema
};