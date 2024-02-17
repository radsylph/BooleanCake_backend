"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const user_controllers_1 = require("../controllers/user.controllers");
// export  const userRouter = async (fastify: FastifyInstance, options: any) => {
// 	fastify.post("/test", test1).get("/test", test2).get("/test/:id", test3);
// 	fastify.post("/create", createUser);
// };
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
    done();
}
exports.userRouter = userRouter;
