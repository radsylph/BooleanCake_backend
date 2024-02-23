import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import Products from "../models/product";
import { generateJWT, generateToken1 } from "../utils/generateToken";
import { emailRegistro, emailReset } from "../utils/mail";

interface BodyType {
	id: string;
	storage: number;
	name: string;
	price: number;
	expireDate: Date;
	category: string;
	image: string;
}

class ProductsModule {
	constructor() {
		console.log("ProductsModule loaded");
	}

	async createProduct(request: FastifyRequest, reply: FastifyReply) {
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

	async updateProduct(
		request: FastifyRequest<{ Body: BodyType }>,
		reply: FastifyReply,
	) {
		const Product_id: any = request.params;
		const Product_Changes = request.body;

		try {
			console.log(Product_id.id);
			const existingProduct = await Products.findById(Product_id.id);
			if (!existingProduct) {
				return reply
					.code(404)
					.send({ message: "Product not found", data: Product_id });
			}
			const ProductDetails = await Products.findByIdAndUpdate(Product_id.id, {
				storage: Product_Changes.storage,
				name: Product_Changes.name,
				price: Product_Changes.price,
				expireDate: Product_Changes.expireDate,
				category: Product_Changes.category,
				image: Product_Changes.image,
			});
			return reply
				.code(202)
				.send({ message: "Product Updated", data: ProductDetails });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error Updating Product", error });
		}
	}

	async deleteProduct(
		request: FastifyRequest<{ Body: BodyType }>,
		reply: FastifyReply,
	) {
		const Product_id: any = request.params; // se sacara el id (el parametro de la url)
		try {
			const deleteProduct = await Products.findOneAndDelete({
				_id: Product_id.id, // se busca el producto por el id(Product_id es un objecto con el id adentro, por eso se pone Product_id.id)
			});
			if (!deleteProduct) {
				//validacion por si el id no existe y de error 404
				return reply
					.code(404)
					.send({ message: "Product not found", data: Product_id });
			}

			return reply
				.code(202)
				.send({ message: "Product deleted", data: Product_id });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error Deleting Product", error });
		}
	}

	async getProduct(
		request: FastifyRequest<{ Body: BodyType }>,
		reply: FastifyReply,
	) {
		const Product_id = request.body.id;
		try {
			const ProductDetails = await Products.find({
				_id: Product_id,
			});
			return reply
				.code(202)
				.send({ message: "Product Finded", data: ProductDetails });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error Finding Product", error });
		}
	}

	async getAllProducts(
		request: FastifyRequest<{ Body: BodyType }>,
		reply: FastifyReply,
	) {
		try {
			const AllProducts = await Products.find({});
			return reply
				.code(202)
				.send({ message: "Product Finded", data: AllProducts });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error Finding Product", error });
		}
	}
}

export default ProductsModule;
