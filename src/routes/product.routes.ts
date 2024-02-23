import { create } from "domain";
import fastify from "fastify";
import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from "../controllers/product.controller";

// export const router = async (fastify: FastifyInstance, options: any) => {
// 	fastify.post("/test", test1).get("/test", test2).get("/test/:id", test3);
// 	fastify.post("/create", createproducts);
// };

function productsRouter(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
	done: () => void,
) {
	fastify.route({
		method: "GET",
		url: "/getall",
		handler: getAllProducts,
	});

	fastify.route({
		method: "PUT",
		url: "/update",
		handler: updateProduct,
	});
	fastify.route({
		method: "POST",
		url: "/create",
		handler: createProduct,
	});

	fastify.route({
		method: "POST",
		url: "/get",
		handler: getProduct,
	});

	fastify.route({
		method: "DELETE",
		url: "/delete/:id", // se le pone el id para que sepa que es un parametro
		handler: deleteProduct,
	});

	done();
}

export default productsRouter;
