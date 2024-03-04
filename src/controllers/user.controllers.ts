import fastify from "fastify";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UCM } from "../config/container";
const userModule = UCM.resolve("UserModule");

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
	await userModule.createUser(request, reply);
};

const verifyUser = async (request: FastifyRequest, reply: FastifyReply) => {
	await userModule.verifyUser(request, reply);
};

const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
	await userModule.loginUser(request, reply);
};

const getUserInfo = async (request: FastifyRequest, reply: FastifyReply) => {
	await userModule.getUserInfo(request, reply);
};

const logOutUser = async (request: FastifyRequest, reply: FastifyReply) => {
	await userModule.logOutUser(request, reply);
};

const getSchemas = async (
	request: FastifyRequest,
	reply: FastifyReply,
	fastify: FastifyInstance,
) => {
	const schemas = fastify.getSchemas();
	await reply.code(200).send(schemas);
};

export {
	createUser,
	verifyUser,
	loginUser,
	getUserInfo,
	logOutUser,
	getSchemas,
};
