import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces";
import User from "../models/user";
import {
	decryptToken,
	generateJWT,
	generateToken1,
} from "../utils/generateToken";
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

	async loginUser(request: FastifyRequest, reply: FastifyReply) {
		const user_info: any = request.body;
		console.log(user_info);
		try {
			const ExistingUser = await User.findOne({ email: user_info.email });
			if (!ExistingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			const validPassword = await bcrypt.compare(
				user_info.password,
				ExistingUser.password,
			);
			if (!validPassword) {
				return reply.code(500).send({ message: "Invalid password" });
			}
			if (!ExistingUser.verify) {
				return reply.code(500).send({ message: "User not verified" });
			}
			const token: string = generateJWT(ExistingUser._id as unknown as string);
			reply.setCookie("session", token, {
				path: "/",
				secure: false, //cambiar si vamos a usar https
				httpOnly: true,
				expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
				sameSite: "strict",
			});
			return reply.code(200).send({
				message: "User logged in",
				user: ExistingUser,
			});
		} catch (error) {
			return reply.code(500).send({ message: "Error logging in", error });
		}
	}

	async getUserInfo(request: FastifyRequest, reply: FastifyReply) {
		const cookieSession = request.cookies.session;
		try {
			const user_id: any = decryptToken(cookieSession);
			console.log(user_id.id);
			const userInfo = await User.findOne({ _id: user_id.id });
			if (!userInfo) {
				return reply.code(404).send({ message: "User not found" });
			}
			return reply.code(200).send({ message: "User found", userInfo });
		} catch (error) {
			return reply.code(500).send({ message: "Error getting user", error });
		}
	}

	async logOutUser(request: FastifyRequest, reply: FastifyReply) {
		try {
			reply.setCookie("session", "", {
				expires: new Date(0),
				path: "/", // Asegúrate de especificar la misma ruta que usaste cuando creaste la cookie
			});
			return reply.code(200).send({ message: "User logged out" });
		} catch (error) {
			return reply.code(500).send({ message: "Error logging out", error });
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
