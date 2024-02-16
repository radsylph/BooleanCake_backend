import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import User from "../user/models/user";
import { generateJWT, generateToken1 } from "../utils/generateToken";
import { emailRegistro, emailReset } from "../utils/mail";

class UserModule {
	constructor() {
		console.log("UserModule loaded");
	}

	async createUser(request: FastifyRequest, reply: FastifyReply) {
		const user_info = request.body;
		try {
			const newUser = await User.create(user_info);
			const token = generateJWT(newUser._id as any);
			newUser.token = token;
			await newUser.save();
			return reply
				.code(202)
				.send({ message: "User created", data: { newUser, token } });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error creating user", error });
		}
	}
}

export default UserModule;
