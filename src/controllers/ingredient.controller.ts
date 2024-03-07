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

// async createProducts(request: FastifyRequest, reply: FastifyReply) {
//     const Products_info = request.body;
//     try {
//         const newProducts = await Products.create(Products_info);
//         await newProducts.save();
//         return reply
//             .code(202)
//             .send({ message: "Products created", data: newProducts });
//     } catch (error) {
//         console.log(error);
//         return reply
//             .code(500)
//             .send({ message: "Error creating Products", error });
//     }
// }

// export const createIngredient = async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const { name, price, stock, unitMeasure } = request.body as IngredientInterface;
//         const ingredient = new Ingredient({ name, price, stock, unitMeasure });
//         console.log("Yupi se creo el ingrediente");
//         await ingredient.save();
//         reply.code(201).send(ingredient);
//     } catch (error) {
//         reply.code(500).send({ error: 'Error creating the ingredient' });
//     }
// };

// export const updateIngredient = async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const params = request.params as { id: string };
//         const { id } = params;
//         const { name, price, stock, unitMeasure } = request.body as IngredientInterface;
//         const updatedIngredient = await Ingredient.findByIdAndUpdate(id, { name, price, stock, unitMeasure }, { new: true });
//         if (!updatedIngredient) {
//             reply.code(404).send({ error: 'Ingredient not found' });
//             return;
//         }
//         reply.send(updatedIngredient);
//     } catch (error) {
//         reply.code(500).send({ error: 'Error updating the ingredient' });
//     }
// };

// export const deleteIngredient = async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const params = request.params as { id: string };
//         const { id } = params;
//         const deletedIngredient = await Ingredient.findByIdAndDelete(id);
//         if (!deletedIngredient) {
//             reply.code(404).send({ error: 'Ingredient not found' });
//             return;
//         }
//         reply.send({ message: 'Ingredient deleted successfully' });
//     } catch (error) {
//         reply.code(500).send({ error: 'Error deleting the ingredient' });
//     }
// };

// export const getIngredientById = async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const params = request.params as { id: string };
//         const { id } = params;
//         const ingredient = await Ingredient.findById(id);
//         if (!ingredient) {
//             reply.code(404).send({ error: 'Ingredient not found' });
//             return;
//         }
//         reply.send(ingredient);
//     } catch (error) {
//         reply.code(500).send({ error: 'Error getting the ingredient' });
//     }
// };

// export const getAllIngredients = async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const ingredients = await Ingredient.find();
//         reply.send(ingredients);
//     } catch (error) {
//         reply.code(500).send({ error: 'Error getting ingredients' });
//     }
// };
