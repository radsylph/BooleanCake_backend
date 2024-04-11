import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import {
	createUser,
	editUser,
	getSchemas,
	getUserInfo,
	logOutUser,
	loginUser,
	verifyUser,
} from "../controllers/user.controllers";

function userRouter(
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
			method: "GET",
			url: "/info",
			handler: getUserInfo,
		});

		fastify.route({
			method: "DELETE",
			url: "/logout",
			handler: logOutUser,
		});

		fastify.route({
			method: "PUT",
			url: "/update",
			handler: editUser,
		});

		done();
	});
	fastify.route({
		method: "POST",
		url: "/",
		handler: createUser,
		schema: {
			body: { $ref: "CreateBody#" },
		},
	});
	fastify.route({
		method: "GET",
		url: "/verify/:token",
		handler: verifyUser,
	});
	fastify.route({
		method: "POST",
		url: "/login",
		handler: loginUser,
		schema: {
			body: { $ref: "LoginBody#" },
		},
	});
	fastify.route({
		method: "GET",
		url: "/schemas",
		handler: (request, reply) => getSchemas(request, reply, fastify),
	});

	done();
}

export default userRouter;
