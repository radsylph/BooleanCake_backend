import { request } from "http";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import Products from "../models/product";
import productsModule from "../modules/product.module";

interface BodyType {
	id: string;
	storage: number;
	name: string;
	price: number;
	expireDate: Date;
	category: string;
	image: string;
}

const ProductsModule = new productsModule();

const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
	await ProductsModule.createProduct(request, reply);
};

const updateProduct = async (
	request: FastifyRequest<{ Body: BodyType }>,
	reply: FastifyReply,
) => {
	await ProductsModule.updateProduct(request, reply);
};

const getProduct = async (
	request: FastifyRequest<{ Body: BodyType }>,
	reply: FastifyReply,
) => {
	await ProductsModule.getProduct(request, reply);
};

const getAllProducts = async (
	request: FastifyRequest<{ Body: BodyType }>,
	reply: FastifyReply,
) => {
	await ProductsModule.getAllProducts(request, reply);
};

const deleteProduct = async (
	request: FastifyRequest<{ Body: BodyType }>,
	reply: FastifyReply,
) => {
	await ProductsModule.deleteProduct(request, reply);
};

export {
	createProduct,
	deleteProduct,
	getProduct,
	updateProduct,
	getAllProducts,
};
