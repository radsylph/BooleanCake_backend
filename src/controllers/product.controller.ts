import { request } from "http";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { PCM } from "../config/container";

const ProductsModule = PCM.resolve("ProductModule");

interface BodyType {
	id: string;
	storage: number;
	name: string;
	price: number;
	expireDate: Date;
	category: string;
	image: string;
}

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

const GetInStock =async(request: FastifyRequest<{ Body: BodyType }>,
	reply: FastifyReply) =>{
		await ProductsModule.GetInStock(request,reply);
	}

	const GetNoCustom =async(request: FastifyRequest<{ Body: BodyType }>,
		reply: FastifyReply) =>{
			await ProductsModule.GetNoCustom(request,reply);
		}

const shutdown = async (request: FastifyRequest, reply: FastifyReply) => {
	await ProductsModule.shutdown(request, reply);
};

export {
	createProduct,
	deleteProduct,
	getProduct,
	updateProduct,
	getAllProducts,
	GetInStock,
	GetNoCustom,
	shutdown,
};
