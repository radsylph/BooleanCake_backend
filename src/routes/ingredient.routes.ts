import { create } from "domain";
import fastify from "fastify";
import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import {
	createIngredient,
	deleteIngredient,
	getAllIngredients,
	getIngredientById,
	updateIngredient,
} from "../controllers/ingredient.controller";

function ingredientRouter(
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
			method: "POST",
			url: "/",
			handler: createIngredient,
		});

		fastify.route({
			method: "DELETE",
			url: "/:id",
			handler: deleteIngredient,
		});

		fastify.route({
			method: "PUT",
			url: "/:id",
			handler: updateIngredient,
		});

		fastify.route({
			method: "GET",
			url: "/",
			handler: getAllIngredients,
		});

		fastify.route({
			method: "GET",
			url: "/:id",
			handler: getIngredientById,
		});

		done();
	});

	done();
}

export default ingredientRouter;
