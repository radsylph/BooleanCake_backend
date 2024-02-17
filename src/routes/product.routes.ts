import { create } from "domain";
import fastify from "fastify";
import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import {
	createProducts,
	test1,
	test2,
	test3,
} from "../controllers/products.controller";

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
		method: "POST",
		url: "/test",
		handler: test1,
	});

	fastify.route({
		method: "GET",
		url: "/test",
		handler: test2,
	});

	fastify.route({
		method: "GET",
		url: "/test/:id",
		handler: test3,
	});

	fastify.route({
		method: "POST",
		url: "/create",
		handler: createProducts,
	});

	done();
}

export default productsRouter;
