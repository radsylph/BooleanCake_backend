import fastify from "fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import UserModule from "../../modules/user.module";


const userModule = new UserModule();

const test1 = async (request: FastifyRequest, reply: FastifyReply) => {
	const params = request.body;
	try {
		return reply.code(200).send({ message: "hello", data: params });
	} catch (error) {
		return reply.code(500).send({ message: "error" });
	}
};

const test2 = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		return reply.code(200).send({ message: "hello" });
	} catch (error) {
		return reply.code(500).send({ message: "error" });
	}
};

const test3 = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const params = request.params;
		return reply.code(200).send({ params: params });
	} catch (error) {
		return reply.code(500).send({ message: "error" });
	}
};

const test4 = async (request: FastifyRequest, reply: FastifyReply) => {
	userModule.test(request, reply);
};

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
	await userModule.createUser(request, reply);
};

const verifyUser = async (request: FastifyRequest, reply: FastifyReply) => {
	await userModule.verifyUser(request, reply);
}

export { test1, test2, test3, createUser ,test4, verifyUser};
