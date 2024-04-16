import { create } from "domain";
import { METHODS } from "http";
import fastify from "fastify";
import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import {
	GetInStock,
	GetNoCustom,
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	shutdown,
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
	fastify.register(async (fastify, opts, done) => {
		await fastify.addHook(
			"preHandler",
			async (request: FastifyRequest, reply: FastifyReply) => {
				const sessionCookie = request.cookies.session;
				const roleCookie = request.cookies.role;
				if (
					!sessionCookie ||
					sessionCookie === "" ||
					request.cookies.session === ""
				) {
					reply.code(401).send({ message: "Not Authorized" });
				}
				if (roleCookie !== "admin" || roleCookie === undefined || !roleCookie) {
					reply.code(401).send({ message: "Not Authorized" });
				}
			},
		);

		fastify.route({
			method: "PUT",
			url: "/update/:id",
			handler: updateProduct,
			schema: { body: { $ref: "CreateProductBody" } },
		});
		fastify.route({
			method: "POST",
			url: "/create",
			handler: createProduct,
			schema: { body: { $ref: "CreateProductBody" } },
		});

		fastify.route({
			method: "DELETE",
			url: "/delete/:id", // se le pone el id para que sepa que es un parametro
			handler: deleteProduct,
		});

		fastify.route({
			method: "GET",
			url: "/testCookie",
			handler: (request, reply) => {
				const cookie1 = request.cookies.session;
				const cookie2 = request.cookies.role;
				reply.code(200).send({ cookie1, cookie2 });
			},
		});

		done();
	});
	fastify.route({
		method: "GET",
		url: "/getall/:region",
		handler: getAllProducts,
	});

	fastify.route({
		method: "GET",
		url: "/get/:id",
		handler: getProduct,
	});

	fastify.route({
		method: "GET",
		url: "/getinstock/:region",
		handler: GetInStock,
	});

	fastify.route({
		method: "GET",
		url: "/getnocustom/:region",
		handler: GetNoCustom,
	});

	fastify.route({
		method: "GET",
		url: "/shutdown",
		handler: shutdown,
	});

	done();
}

export default productsRouter;
