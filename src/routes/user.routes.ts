import { create } from "domain";
import fastify from "fastify";
import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import {
	createUser,
	getUserInfo,
	logOutUser,
	loginUser,
	test1,
	test2,
	test3,
	test4,
	test5,
	test6,
	test7,
	verifyUser,
} from "../controllers/user.controllers";

function userRouter(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
	done: () => void,
) {
	fastify.register(async (fastify, opts, done) => {
		await fastify.addHook("preHandler", async (request, reply) => {
			const sessionCookie = request.cookies.session;
			if (
				!sessionCookie ||
				sessionCookie === "" ||
				request.cookies.session === ""
			) {
				reply.code(401).send({ message: "No autorizado" });
			}
		});
		fastify.route({
			method: "GET",
			url: "/cookie",
			handler: test6,
		});

		fastify.route({
			method: "GET",
			url: "/info",
			handler: getUserInfo,
		});

		fastify.route({
			method: "DELETE",
			url: "/logout",
			handler: logOutUser,
		});

		done();
	});

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
		handler: createUser,
	});

	fastify.route({
		method: "GET",
		url: "/test4",
		handler: test4,
	});

	fastify.route({
		method: "GET",
		url: "/verify/:token",
		handler: verifyUser,
	});

	fastify.route({
		method: "POST",
		url: "/cookie",
		handler: test5,
	});

	// Mover la ruta "/cookie" (DELETE) fuera del bloque fastify.register
	fastify.route({
		method: "DELETE",
		url: "/cookie",
		handler: test7,
	});

	fastify.route({
		method: "POST",
		url: "/login",
		handler: loginUser,
	});

	done();
}

export default userRouter;
