"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_controller_1 = require("../controllers/products.controller");
// export const router = async (fastify: FastifyInstance, options: any) => {
// 	fastify.post("/test", test1).get("/test", test2).get("/test/:id", test3);
// 	fastify.post("/create", createproducts);
// };
function productsRouter(fastify, opts, done) {
    fastify.route({
        method: "POST",
        url: "/test",
        handler: products_controller_1.test1,
    });
    fastify.route({
        method: "GET",
        url: "/test",
        handler: products_controller_1.test2,
    });
    fastify.route({
        method: "GET",
        url: "/test/:id",
        handler: products_controller_1.test3,
    });
    fastify.route({
        method: "POST",
        url: "/create",
        handler: products_controller_1.createProducts,
    });
    done();
}
exports.default = productsRouter;
