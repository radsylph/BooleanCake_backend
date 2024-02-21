import fastify from "fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import UserModule from "../modules/user.module";

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

const test5 = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const cookie: string = "volaro";
		reply.setCookie("session", cookie);
		return reply.code(200).send({ message: "cookie" });
	} catch (error) {
		return reply.code(500).send({ message: "error" });
	}
};

const test6 = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const cookie = request.cookies.session;
		return reply.code(200).send({ message: cookie });
	} catch (error) {
		return reply.code(500).send({ message: "error" });
	}
};

const test7 = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		//reply.setCookie("session", "", { expires: new Date(0) });
		reply.clearCookie("session");
		return reply.code(200).send({ message: "Cookie destruida" });
	} catch (error) {
		return reply.code(500).send({ message: "error" });
	}
};

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

export {
	test1,
	test2,
	test3,
	test4,
	test5,
	test6,
	test7,
	createUser,
	verifyUser,
	loginUser,
	getUserInfo,
	logOutUser,
};
