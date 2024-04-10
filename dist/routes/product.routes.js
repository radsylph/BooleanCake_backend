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
const product_controller_1 = require("../controllers/product.controller");
// export const router = async (fastify: FastifyInstance, options: any) => {
// 	fastify.post("/test", test1).get("/test", test2).get("/test/:id", test3);
// 	fastify.post("/create", createproducts);
// };
function productsRouter(fastify, opts, done) {
    fastify.register((fastify, opts, done) => __awaiter(this, void 0, void 0, function* () {
        yield fastify.addHook("preHandler", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const sessionCookie = request.cookies.session;
            const roleCookie = request.cookies.role;
            if (!sessionCookie ||
                sessionCookie === "" ||
                request.cookies.session === "") {
                reply.code(401).send({ message: "Not Authorized" });
            }
            if (roleCookie !== "admin" || roleCookie === undefined || !roleCookie) {
                reply.code(401).send({ message: "Not Authorized" });
            }
        }));
        fastify.route({
            method: "PUT",
            url: "/update/:id",
            handler: product_controller_1.updateProduct,
            schema: { body: { $ref: "CreateProductBody" } },
        });
        fastify.route({
            method: "POST",
            url: "/create",
            handler: product_controller_1.createProduct,
            schema: { body: { $ref: "CreateProductBody" } },
        });
        fastify.route({
            method: "DELETE",
            url: "/delete/:id", // se le pone el id para que sepa que es un parametro
            handler: product_controller_1.deleteProduct,
        });
        done();
    }));
    fastify.route({
        method: "GET",
        url: "/getall/:region",
        handler: product_controller_1.getAllProducts,
    });
    fastify.route({
        method: "GET",
        url: "/get/:id",
        handler: product_controller_1.getProduct,
    });
    fastify.route({
        method: "GET",
        url: "/getinstock/:region",
        handler: product_controller_1.GetInStock
    });
    fastify.route({
        method: "GET",
        url: "/getnocustom/:region",
        handler: product_controller_1.GetNoCustom
    });
    fastify.route({
        method: "GET",
        url: "/shutdown",
        handler: product_controller_1.shutdown,
    });
    done();
}
exports.default = productsRouter;
