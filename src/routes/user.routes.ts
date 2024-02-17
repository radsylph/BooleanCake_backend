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
	test1,
	test2,
	test3,
	test4,
	verifyUser,
} from "../controllers/user.controllers";

function userRouter(
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

	done();
}

export default userRouter;
