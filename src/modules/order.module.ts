import bcrypt from "bcrypt";
import { decrypt } from "dotenv";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { Document, Model } from "mongoose";
import {
	LocationInterface,
	OrderInterface,
	OrderInterfaceExtended,
	ProductsInterface,
	UserInterface,
} from "../interfaces";

import { decryptToken } from "../utils/generateToken";
import { emailOrder, emailRegistro } from "../utils/mail";
//interface orderDocument extends Document, OrderInterface {}
interface userDocument extends Document, UserInterface {}
interface orderDocument extends Document, OrderInterface {}
interface locationDocument extends Document, LocationInterface {}

class OrderModule {
	private Order: Model<orderDocument>;
	private User: Model<userDocument>;
	private Location: Model<locationDocument>;

	constructor({
		OrderModel,
		UserModel,
		LocationModel,
	}: {
		OrderModel: Model<orderDocument>;
		UserModel: Model<userDocument>;
		LocationModel: Model<locationDocument>;
	}) {
		this.Order = OrderModel;
		this.User = UserModel;
		this.Location = LocationModel;

		console.log("OrderModule loaded");
	}

	async createOrder(
		request: FastifyRequest<{ Body: OrderInterfaceExtended }>,
		reply: FastifyReply,
	): Promise<Response> {
		const { latitude, longitude, address } = request.body;
		const userCookie = request.cookies.session;
		try {
			const user_id: any = decryptToken(userCookie);

			const existingUser = await this.User.findById(user_id.id).exec();
			if (!existingUser) {
				return reply.code(404).send({ message: "User not found" });
			}

			const Location = await this.Location.create({
				latitude,
				longitude,
				address,
			});

			const newOrder = await this.Order.create({
				owner: user_id.id,
				location: Location._id,
				status: "pending",
			});

			const userInfo = await this.User.findById(user_id.id);
			try {
				emailOrder({
					email: userInfo.email,
					nombre: userInfo.name,
					status: "pending",
				});
				return reply.code(201).send(newOrder);
			} catch (error) {
				console.log(error);
				return reply.code(500).send({ message: "Error sending email", error });
			}
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error creating order", error });
		}
	}

	async assignRider(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		const riderCookie = request.cookies.session;
		try {
			const user_id: any = decryptToken(riderCookie);
			const existingUser = await this.User.findById(user_id.id).exec();
			if (!existingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			const existingOrder = await this.Order.findById(id)
				.populate("owner", "location")
				.exec();
			if (!existingOrder) {
				return reply.code(404).send({ message: "Order not found" });
			}
			if (existingOrder.status === "delivered") {
				return reply.code(400).send({ message: "Order already delivered" });
			}

			const order = await this.Order.findByIdAndUpdate(id, {
				rider: user_id.id,
				status: "in progress",
			});
			emailOrder({});
			return reply.code(200).send({ message: "Rider asigned", order });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error asing rider", error });
		}
	}

	async getOrderDetails(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		try {
			const order = await this.Order.findById(id).populate("location").exec();
			return reply.code(200).send({ message: "Orden found", order });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error getting order", error });
		}
	}

	async updateOrder(
		request: FastifyRequest<{ Body: OrderInterface }>,
		reply: FastifyReply,
	) {
		const { id } = request.params as { id: string };
		const { status } = request.body;
		const userCookie = request.cookies.session;
		try {
			const user_id: any = decryptToken(userCookie);
			const existingUser = await this.User.findById(user_id.id).exec();
			if (!existingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			const existingOrder = await this.Order.findById(id).exec();
			if (!existingOrder) {
				return reply.code(404).send({ message: "Order not found" });
			}
			if (existingOrder.status === "delivered") {
				return reply.code(400).send({ message: "Order already delivered" });
			}
			const order = await this.Order.findByIdAndUpdate(id, {
				status,
				rider: user_id.id,
			});
			return reply.code(200).send({ message: "Order updated", order });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error updating order", error });
		}
	}

	async getAllOrders(request: FastifyRequest, reply: FastifyReply) {
		try {
			const orders = await this.Order.find()
				.populate("owner", "location")
				.exec();
			return reply.code(200).send(orders);
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error getting orders", error });
		}
	}

	async getUserOrders(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		try {
			const userOrders = await this.Order.find({ owner: id });
			return reply.code(200).send(userOrders);
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error getting orders", error });
		}
	}

	async testEmail(
		request: FastifyRequest<{ Body: UserInterface }>,
		reply: FastifyReply,
	) {
		console.log(request.body);
		const { email, name } = request.body;
		try {
			emailOrder({ email, nombre: name, status: "pending" });
			return reply.code(200).send({ message: "Email sent" });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error sending email", error });
		}
	}

	async completeOrder(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		try {
			const order = await this.Order.findByIdAndUpdate(id, {
				status: "delivered",
			});
			return reply.code(200).send(order);
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error updating order", error });
		}
	}

	async testRider(request: FastifyRequest, reply: FastifyReply) {
		try {
			return reply.send({ message: "You are admin or rider" });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error", error });
		}
	}
}

export default OrderModule;
