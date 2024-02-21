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
                reply.code(401).send({ message: "No autorizado" });
            }
        }));
        fastify.route({
            method: "GET",
            url: "/cookie",
            handler: user_controllers_1.test6,
        });
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
        url: "/test",
        handler: user_controllers_1.test1,
    });
    fastify.route({
        method: "GET",
        url: "/test",
        handler: user_controllers_1.test2,
    });
    fastify.route({
        method: "GET",
        url: "/test/:id",
        handler: user_controllers_1.test3,
    });
    fastify.route({
        method: "POST",
        url: "/create",
        handler: user_controllers_1.createUser,
    });
    fastify.route({
        method: "GET",
        url: "/test4",
        handler: user_controllers_1.test4,
    });
    fastify.route({
        method: "GET",
        url: "/verify/:token",
        handler: user_controllers_1.verifyUser,
    });
    fastify.route({
        method: "POST",
        url: "/cookie",
        handler: user_controllers_1.test5,
    });
    // Mover la ruta "/cookie" (DELETE) fuera del bloque fastify.register
    fastify.route({
        method: "DELETE",
        url: "/cookie",
        handler: user_controllers_1.test7,
    });
    fastify.route({
        method: "POST",
        url: "/login",
        handler: user_controllers_1.loginUser,
    });
    done();
}
exports.default = userRouter;
