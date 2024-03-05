"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controllers_1 = require("../controllers/user.controllers");
function userRouter(fastify, opts, done) {
    fastify.register((fastify, opts, done) => __awaiter(this, void 0, void 0, function* () {
        yield fastify.addHook("preHandler", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const sessionCookie = request.cookies.session;
            if (!sessionCookie ||
                sessionCookie === "" ||
                request.cookies.session === "") {
                reply.code(401).send({ message: "Not Authorized" });
            }
        }));
        fastify.route({
            method: "GET",
            url: "/info",
            handler: user_controllers_1.getUserInfo,
        });
        fastify.route({
            method: "DELETE",
            url: "/logout",
            handler: user_controllers_1.logOutUser,
        });
        done();
    }));
    fastify.route({
        method: "POST",
        url: "/create",
        handler: user_controllers_1.createUser,
        schema: {
            body: { $ref: "CreateBody#" },
        },
    });
    fastify.route({
        method: "GET",
        url: "/verify/:token",
        handler: user_controllers_1.verifyUser,
    });
    fastify.route({
        method: "POST",
        url: "/login",
        handler: user_controllers_1.loginUser,
        schema: {
            body: { $ref: "LoginBody#" },
        },
    });
    fastify.route({
        method: "GET",
        url: "/schemas",
        handler: (request, reply) => (0, user_controllers_1.getSchemas)(request, reply, fastify),
    });
    done();
}
exports.default = userRouter;
