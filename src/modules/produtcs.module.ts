import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import Products from "../user/models/products";
import { generateJWT, generateToken1 } from "../utils/generateToken";
import { emailRegistro, emailReset } from "../utils/mail";

class ProductsModule {
	constructor() {
		console.log("ProductsModule loaded");
	}

	async createProducts(request: FastifyRequest, reply: FastifyReply) {
		const Products_info = request.body;
		try {
			const newProducts = await Products.create(Products_info);
			await newProducts.save();
			return reply
				.code(202)
				.send({ message: "Products created", data: newProducts });
		} catch (error) {
			console.log(error);
			return reply
				.code(500)
				.send({ message: "Error creating Products", error });
		}
	}
}

export default ProductsModule;
