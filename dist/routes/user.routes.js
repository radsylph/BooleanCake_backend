"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controllers_1 = require("../controllers/user.controllers");
function userRouter(fastify, opts, done) {
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
    done();
}
exports.default = userRouter;
