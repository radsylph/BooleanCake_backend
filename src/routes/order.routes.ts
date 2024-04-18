import fastify, {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import {
	addToCart,
	assignRider,
	buyCart,
	createOrder,
	getAllOrders,
	getCart,
	getOrderDetails,
	getUserOrders,
	removeFromCart,
	testEmail1,
	testRider,
	updateOrder,
} from "../controllers/order.controller";

function orderRouter(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
	done: () => void,
) {
	fastify.register(async (fastify, opts, done) => {
		await fastify.addHook(
			"preHandler",
			async (request: FastifyRequest, reply: FastifyReply) => {
				const sessionCookie = request.cookies.session;
				if (
					!sessionCookie ||
					sessionCookie === "" ||
					request.cookies.session === ""
				) {
					reply.code(401).send({ message: "Not Authorized" });
				}
			},
		);
		fastify.route({
			method: "POST",
			url: "/testEmail",
			handler: testEmail1,
		});
		fastify.route({
			method: "POST",
			url: "/cart/:product",
			handler: addToCart,
		});
		fastify.route({
			method: "DELETE",
			url: "/cart/:product",
			handler: removeFromCart,
		});
		fastify.route({
			method: "GET",
			url: "/cart",
			handler: getCart,
		});
		fastify.route({
			method: "POST",
			url: "/cart/buy",
			handler: buyCart,
		});
		// fastify.route({
		// 	method: "POST",
		// 	url: "/",
		// 	handler: createOrder,
		// });
		// fastify.route({
		// 	method: "GET",
		// 	url: "/",
		// 	handler: getAllOrders,
		// });
		fastify.route({
			method: "GET",
			url: "/user/:id",
			handler: getUserOrders,
		});
		fastify.route({
			method: "GET",
			url: "/:id",
			handler: getOrderDetails,
		});
		done();
	});

	fastify.register(async (fastify, opts, done) => {
		await fastify.addHook(
			"preHandler",
			async (request: FastifyRequest, reply: FastifyReply) => {
				const roleCookie = request.cookies.role;
				if (
					(roleCookie !== "admin" && roleCookie !== "rider") ||
					roleCookie === undefined ||
					!roleCookie
				) {
					reply.code(401).send({ message: "Not Authorized" });
				}
			},
		);
		fastify.route({
			method: "GET",
			url: "/testrider",
			handler: testRider,
		});

		fastify.route({
			method: "POST",
			url: "/rider/:id",
			handler: assignRider,
		});

		fastify.route({
			method: "PUT",
			url: "/:id",
			handler: updateOrder,
		});
		done();
	});
	done();
}

export default orderRouter;
