"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserParamsSchema = exports.createUserBodySchema = exports.loginBodySchema = void 0;
exports.loginBodySchema = {
    $id: "LoginBody",
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
        },
        password: {
            type: "string",
            minLength: 8,
        },
    },
    required: ["email", "password"],
};
exports.createUserBodySchema = {
    $id: "CreateBody",
    type: "object",
    properties: {
        name: { type: "string" },
        lastname: { type: "string" },
        email: {
            type: "string",
            format: "email",
        },
        password: {
            type: "string",
            minLength: 8,
            pattern: "/^(?=.*W).{8,}$/",
        },
        cellphone: { type: "string" },
        role: { type: "string", enum: ["admin", "user"] },
    },
    required: ["email", "password", "cellphone", "name", "lastname"],
};
exports.verifyUserParamsSchema = {
    $id: "VerifyParams",
    type: "object",
    properties: { token: { type: "string" } },
    required: ["token"],
};
