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
		url: "/createIngredient",
		handler: createIngredient,
	});    

	fastify.route({
		method: "DELETE",
		url: "/deleteIngredient/:id",
		handler: deleteIngredient,
	});

	fastify.route({
		method: "PUT",
		url: "/updateIngredient/:id",
		handler: updateIngredient,
	});

	fastify.route({
		method: "GET",
		url: "/getAllIngredients",
		handler: getAllIngredients,
	});

	fastify.route({
		method: "GET",
		url: "/getIngredient/:id",
		handler: getIngredientById,
	});

	done();
}

export default ingredientRouter;
