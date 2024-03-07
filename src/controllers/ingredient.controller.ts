import { FastifyReply, FastifyRequest } from "fastify";
import { ICM } from "../config/container";
import { IngredientInterface } from "../interfaces";
import Ingredient from "../models/ingredient";
const ingredientModule = ICM.resolve("IngridientModule");

const createIngredient = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await ingredientModule.createIngredient(request, reply);
};

const updateIngredient = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await ingredientModule.updateIngredient(request, reply);
};

const deleteIngredient = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await ingredientModule.deleteIngredient(request, reply);
};

const getIngredientById = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await ingredientModule.getIngredientById(request, reply);
};

const getAllIngredients = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await ingredientModule.getAllIngredients(request, reply);
};

export {
	createIngredient,
	updateIngredient,
	deleteIngredient,
	getIngredientById,
	getAllIngredients,
};
