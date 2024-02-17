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
				.code(200)
				.send({ message: "User created", data: newUser });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error creating user", error });
		}
	}

	async verifyUser(request: FastifyRequest, reply: FastifyReply) {
		const token = request.params;
		try {
			const user = await User.findOne({token: token});
			if(!user){
				return reply.code(404).send({message: "User not found"});
			}
			user.token = null;
			user.verify = true;
			await user.save();
			return reply.code(200).send({message: "User verified"});
		} catch (error) {
			return reply.code(500).send({ message: "Error verifying user", error });
		}
	}

	test(request: FastifyRequest, reply: FastifyReply) {
		try {
			const params = request.params;
			return reply.code(200).send({ message: "UserModule works" });	
		} catch (error) {
			return reply.code(500).send({ message: "Error testing UserModule", error });
		}
	}

}

export default UserModule;
