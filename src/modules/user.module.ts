import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import jwt from "jsonwebtoken";
import { Document, Model } from "mongoose";
import { UserInterface } from "../interfaces";
//import User from "../models/user";
import {
	decryptToken,
	generateJWT,
	generateToken1,
} from "../utils/generateToken";
import { emailRegistro, emailReset } from "../utils/mail";

interface UserDocument extends Document, UserInterface {}

class UserModule {
	User: Model<UserDocument>;
	constructor({ userModel }: { userModel: Model<UserDocument> }) {
		this.User = userModel;
		console.log("UserModule loaded");
	}

	async createUser(
		request: FastifyRequest<{ Body: UserInterface }>,
		reply: FastifyReply,
	) {
		const { name, lastname, email, password, cellphone, role } = request.body;
		try {
			const existingEmail = await this.User.findOne({ email: email });
			if (existingEmail) {
				return reply.code(500).send({ message: "Email already in use" });
			}
			const existingCellphone = await this.User.findOne({
				cellphone: cellphone,
			});
			if (existingCellphone) {
				return reply.code(500).send({ message: "Cellphone already in use" });
			}
			const newUser = await this.User.create({
				name,
				lastname,
				email,
				password,
				cellphone,
				role,
			});
			const token = generateToken1(); //cambiarlo por otro para que tenga 5 digitos random y ya
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
			const user = await this.User.findOne({ token: token });
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

	async loginUser(
		request: FastifyRequest<{ Body: UserInterface }>,
		reply: FastifyReply,
	) {
		//const user_info: any = request.body;
		const { email, password } = request.body;

		try {
			const ExistingUser = await this.User.findOne({ email: email });
			if (!ExistingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			const validPassword = await bcrypt.compare(
				password,
				ExistingUser.password,
			);
			if (!validPassword) {
				return reply.code(500).send({ message: "Invalid password" });
			}
			if (!ExistingUser.verify) {
				return reply.code(500).send({ message: "The user is not verified" });
			}
			const token: string = generateJWT(ExistingUser._id as unknown as string);
			reply.setCookie("session", token, {
				path: "/",
				secure: false, //cambiar si vamos a usar https
				httpOnly: false,
				expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
				sameSite: "strict",
				signed: false,
			});
			reply.setCookie("role", ExistingUser.role, {
				path: "/",
				secure: false, //cambiar si vamos a usar https
				httpOnly: false,
				expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
				sameSite: "strict",
			});
			console.log(ExistingUser);
			return reply.code(200).send({
				message: "User logged in",
				user: ExistingUser,
				cookie: token,
				role: ExistingUser.role,
			});
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error logging in", error });
		}
	}

	async getUserInfo(request: FastifyRequest, reply: FastifyReply) {
		const cookieSession = request.cookies.session;
		try {
			const user_id: any = decryptToken(cookieSession);
			console.log(user_id.id);
			const userInfo = await this.User.findOne({ _id: user_id.id });
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

	async editUser(
		request: FastifyRequest<{ Body: UserInterface }>,
		reply: FastifyReply,
	) {
		const cookieSession = request.cookies.session;
		const user_id: any = decryptToken(cookieSession);
		const { name, lastname, email, cellphone, role } = request.body;
		try {
			const user = await this.User.findOne({ _id: user_id.id });
			if (!user) {
				return reply.code(404).send({ message: "User not found" });
			}
			user.name = name;
			user.lastname = lastname;
			user.email = email;
			user.cellphone = cellphone;
			user.role = role;
			await user.save();
			return reply.code(200).send({ message: "User updated", user });
		} catch (error) {
			return reply.code(500).send({ message: "Error updating user", error });
		}
	}
}

export default UserModule;
