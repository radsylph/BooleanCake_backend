"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
// export const router = async (fastify: FastifyInstance, options: any) => {
// 	fastify.post("/test", test1).get("/test", test2).get("/test/:id", test3);
// 	fastify.post("/create", createproducts);
// };
function productsRouter(fastify, opts, done) {
    fastify.route({
        method: "GET",
        url: "/getall",
        handler: product_controller_1.getAllProducts,
    });
    fastify.route({
        method: "PUT",
        url: "/update/:id",
        handler: product_controller_1.updateProduct,
    });
    fastify.route({
        method: "POST",
        url: "/create",
        handler: product_controller_1.createProduct,
    });
    fastify.route({
        method: "POST",
        url: "/get",
        handler: product_controller_1.getProduct,
    });
    fastify.route({
        method: "DELETE",
        url: "/delete/:id", // se le pone el id para que sepa que es un parametro
        handler: product_controller_1.deleteProduct,
    });
    done();
}
exports.default = productsRouter;
