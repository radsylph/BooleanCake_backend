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
    updateIngredient,
    getAllIngredients,
    getIngredientById
} from "../controllers/ingredient.controller";


function ingredientRouter(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
	done: () => void,
) {

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
		url: "/getAll",
		handler: getAllIngredients,
	});

	fastify.route({
		method: "GET",
		url: "/:id",
		handler: getIngredientById,
	});

	done();
}

export default ingredientRouter;
