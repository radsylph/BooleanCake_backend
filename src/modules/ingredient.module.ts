import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { Document, Model } from "mongoose";
import { IngredientInterface, ProductsInterface } from "../interfaces";
import Ingredient from "../models/ingredient";
import { generateJWT, generateToken1 } from "../utils/generateToken";
import { emailRegistro, emailReset } from "../utils/mail";

interface IngredientDocument extends Document, IngredientInterface {}

class IngredientModule {
	Ingridient: Model<IngredientDocument>;
	constructor({
		IngredientModel,
	}: { IngredientModel: Model<IngredientDocument> }) {
		this.Ingridient = IngredientModel;
		console.log("IngredientModule loaded");
	}

	async createIngredient(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { name, price, stock, unitMeasure } =
			request.body as IngredientInterface;

		try {
			const newIngredient = await this.Ingridient.create({
				name,
				price,
				stock,
				unitMeasure,
			});
			await newIngredient.save();
			return reply
				.code(202)
				.send({ message: "Ingredient created", data: newIngredient });
		} catch (error) {
			console.log(error);
			return reply
				.code(500)
				.send({ message: "Error creating Ingredient", error });
		}
	}

	async updateIngredient(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { id } = request.params as { id: string };
		const { name, price, stock, unitMeasure } =
			request.body as IngredientInterface;
		try {
			const ExistingIngrient = await this.Ingridient.findById(id);
			if (!ExistingIngrient) {
				return reply.code(404).send({ message: "Ingredient not found" });
			}
			const updatedIngredient = await this.Ingridient.findByIdAndUpdate({
				name,
				price,
				stock,
				unitMeasure,
			});
			return reply
				.code(202)
				.send({ message: "Ingredient updated", data: updatedIngredient });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error updating Ingredient", error });
		}
	}

	async deleteIngredient(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { id } = request.params as { id: string };
		try {
			const deletedIngredient = await this.Ingridient.findByIdAndDelete(id);
			if (!deletedIngredient) {
				return reply.code(404).send({ message: "Ingredient not found" });
			}
			return reply
				.code(202)
				.send({ message: "Ingredient deleted", data: deletedIngredient });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error deleting Ingredient", error });
		}
	}

	async getAllIngridients(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		try {
			const ingredients = await this.Ingridient.find();
			return reply
				.code(200)
				.send({ message: "ingridients founds", data: ingredients });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error getting ingredients", error });
		}
	}

	async getIngridientById(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { id } = request.params as { id: string };
		try {
			const ingredient = await this.Ingridient.findById(id);
			if (!ingredient) {
				return reply.code(404).send({ message: "Ingredient not found" });
			}
			return reply
				.code(200)
				.send({ message: "Ingredient found", data: ingredient });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error getting ingredient", error });
		}
	}
}

export default IngredientModule;
