import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces";
import User from "../models/user";
import { generateJWT, generateToken1 } from "../utils/generateToken";
import { emailRegistro, emailReset } from "../utils/mail";

class UserModule {
	constructor() {
		console.log("UserModule loaded");
	}

	async createUser(request: FastifyRequest, reply: FastifyReply) {
		const user_info: any = request.body;
		try {
			const existingEmail = await User.findOne({ email: user_info.email });
			if (existingEmail) {
				return reply.code(500).send({ message: "Email already in use" });
			}
			const exitingUsername = await User.findOne({
				username: user_info.username,
			});
			if (exitingUsername) {
				return reply.code(500).send({ message: "Username already in use" });
			}
			const newUser = await User.create(user_info);
			const token = generateToken1();
			try {
				emailRegistro({
					email: newUser.email,
					nombre: newUser.name,
					token: token,
				});
			} catch (error) {
				console.log(error);
				return reply.code(500).send({ message: "Error sending email", error });
			}
			newUser.token = token;
			await newUser.save();

			return reply.code(200).send({ message: "User created", data: newUser });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error creating user", error });
		}
	}

	async verifyUser(request: FastifyRequest, reply: FastifyReply) {
		const { token } = request.params as { token: string };
		try {
			console.log(token);
			console.log(typeof token);
			const user = await User.findOne({ token: token });
			if (!user) {
				return reply.code(404).send({ message: "User not found" });
			}
			user.token = null;
			user.verify = true;
			await user.save();
			return reply.code(200).send({ message: "User verified", user });
		} catch (error) {
			return reply.code(500).send({ message: "Error verifying user", error });
		}
	}

	test(request: FastifyRequest, reply: FastifyReply) {
		try {
			const params = request.params;
			return reply.code(200).send({ message: "UserModule works" });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error testing UserModule", error });
		}
	}
}

export default UserModule;
