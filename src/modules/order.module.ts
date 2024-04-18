import bcrypt from "bcrypt";
import { decrypt } from "dotenv";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { Document, Model } from "mongoose";
import {
	LocationInterface,
	OrderInterface,
	OrderInterfaceExtended,
	OrderRowInterface,
	ProductsInterface,
	ShoppingCartInterface,
	ShoppingCartRowsInterface,
	UserInterface,
} from "../interfaces";

import { execSync } from "child_process";
import { decryptToken } from "../utils/generateToken";
import { emailOrder, emailRegistro } from "../utils/mail";
//interface orderDocument extends Document, OrderInterface {}
interface userDocument extends Document, UserInterface {}
interface orderDocument extends Document, OrderInterface {}
interface locationDocument extends Document, LocationInterface {}
interface productDocument extends Document, ProductsInterface {}
interface ShoppingCartDocument extends Document, ShoppingCartInterface {}
interface shoppingCartRowDocument extends Document, ShoppingCartRowsInterface {}
interface orderRowDocument extends Document, OrderRowInterface {}

class OrderModule {
	private Order: Model<orderDocument>;
	private User: Model<userDocument>;
	private Location: Model<locationDocument>;
	private ShoppingCart: Model<ShoppingCartDocument>;
	private ShoppingCartRow: Model<shoppingCartRowDocument>;
	private Product: Model<productDocument>;
	private OrderRow: Model<orderRowDocument>;

	constructor({
		OrderModel,
		UserModel,
		LocationModel,
		ShoppingCartModel,
		ShoppingCartRowModel,
		ProductModel,
		OrderRowModel,
	}: {
		OrderModel: Model<orderDocument>;
		UserModel: Model<userDocument>;
		LocationModel: Model<locationDocument>;
		ShoppingCartModel: Model<ShoppingCartDocument>;
		ShoppingCartRowModel: Model<shoppingCartRowDocument>;
		ProductModel: Model<productDocument>;
		OrderRowModel: Model<orderRowDocument>;
	}) {
		this.Order = OrderModel;
		this.User = UserModel;
		this.Location = LocationModel;
		this.ShoppingCart = ShoppingCartModel;
		this.ShoppingCartRow = ShoppingCartRowModel;
		this.Product = ProductModel;
		this.Order = OrderModel;
		this.OrderRow = OrderRowModel;
		console.log("OrderModule loaded");
	}

	async addToCart(
		request: FastifyRequest<{
			Params: ShoppingCartRowsInterface;
			Body: {
				quantity: number;
			};
		}>,
		reply: FastifyReply,
	): Promise<Response> {
		const { product } = request.params;
		const userCookie = request.cookies.session;
		const { quantity } = request.body;
		try {
			const user_id: any = decryptToken(userCookie);
			const existingUser = await this.User.findById(user_id.id).exec();
			if (!existingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			let existingCart = await this.ShoppingCart.findOne({
				owner: user_id.id,
			}).exec();
			if (!existingCart) {
				existingCart = await this.ShoppingCart.create({
					owner: user_id.id,
					totalPrice: "0",
					totalItems: 0,
				});
				await existingCart.save();
			}
			const existingProduct = await this.Product.findById(product).exec();
			if (!existingProduct) {
				return reply.code(404).send({ message: "Product not found" });
			}
			if (existingProduct.stock === 0) {
				return reply.code(400).send({ message: "Product out of stock" });
			}
			if (quantity > existingProduct.stock) {
				return reply
					.code(400)
					.send({ message: "Not enough stock of that product" });
			}
			// const existingCartRow = await this.ShoppingCartRow.findOne({
			// 	cart: existingCart._id,
			// 	product,
			// }).exec();
			// const newCartRow = await this.ShoppingCartRow.create({
			// 	cart: existingCart._id,
			// 	product,
			// });

			// const productAdded = await this.Product.findByIdAndUpdate(product, {
			// 	stock: existingProduct.stock - quantity,
			// });
			for (let i = 0; i < quantity; i++) {
				await this.ShoppingCart.findByIdAndUpdate(existingCart._id, {
					$push: {
						productsList: product,
					},
					$inc: {
						totalItems: 1,
						totalPrice: existingProduct.price,
					},
				}).exec();
			}
			const addedNewCartProduct = await this.ShoppingCart.findOne({
				owner: user_id.id,
			})
				.populate("productsList")
				.exec();
			return reply.code(200).send({
				message: "Product added to the cart",
				product,
				addedNewCartProduct,
			});
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error creating Cart", error });
		}
	}

	async removeFromCart(
		request: FastifyRequest<{
			Params: ShoppingCartRowsInterface;
			Querystring: {
				quantity: number;
			};
			Body: {
				quantity: number;
			};
		}>,
		reply: FastifyReply,
	) {
		const { product } = request.params;
		const userCookie = request.cookies.session;
		//const { quantity } = request.body;
		try {
			const user_id: any = decryptToken(userCookie);
			const existingUser = await this.User.findById(user_id.id).exec();
			if (!existingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			const existingCart = await this.ShoppingCart.findOne({
				owner: user_id.id,
			}).exec();
			if (!existingCart) {
				return reply.code(404).send({ message: "Cart not found" });
			}
			const existingProduct = await this.Product.findById(product).exec();
			if (!existingProduct) {
				return reply.code(404).send({ message: "Product not found" });
			}

			// const existingCartRow = await this.ShoppingCartRow.findOne({
			// 	cart: existingCart._id,
			// 	product,
			// }).exec();
			// if (!existingCartRow) {
			// 	return reply.code(404).send({ message: "Product not found in cart" });
			// }

			// const deletedCartProduct = await this.ShoppingCartRow.findByIdAndDelete(
			// 	existingCartRow._id,
			// ).exec();
			const existingCartProducts = existingCart.productsList;
			if (!existingCartProducts.includes(product)) {
				return reply.code(404).send({ message: "Product not found in cart" });
			}
			const productIndex = existingCartProducts.indexOf(product);
			existingCartProducts.splice(productIndex, 1);
			const updatedCart = await this.ShoppingCart.findByIdAndUpdate(
				existingCart._id,
				{
					productsList: existingCartProducts,
					$inc: {
						totalItems: -1,
						totalPrice: -existingProduct.price,
					},
				},
			).exec();

			return reply.code(200).send({
				message: "Product deleted from cart",
				updatedCart,
			});
		} catch (error) {
			return reply.code(500).send({ message: "Error deleting product", error });
		}
	}

	async getCart(request: FastifyRequest, reply: FastifyReply) {
		const userCookie = request.cookies.session;
		try {
			const user_id: any = decryptToken(userCookie);
			const existingUser = await this.User.findById(user_id.id).exec();
			if (!existingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			const existingCart = await this.ShoppingCart.findOne({
				owner: user_id.id,
			})
				.populate("productsList")
				.exec();
			if (!existingCart) {
				return reply.code(404).send({ message: "You don't have a Cart" });
			}
			// const cartProducts = await this.ShoppingCartRow.find({
			// 	cart: existingCart._id,
			// })
			// 	.populate("product")
			// 	.exec();
			return reply.code(200).send(existingCart);
		} catch (error) {
			return reply.code(500).send({ message: "Error getting cart", error });
		}
	}

	//cambiar la logica para que tambien cree un producto con los atributos de la orden
	async buyCart(
		request: FastifyRequest<{
			Body: OrderInterfaceExtended;
			Params: {
				cart: string;
			};
		}>,
		reply: FastifyReply,
	): Promise<Response> {
		const {
			isExpress,
			isDelivery,
			deliveryDate,
			deliveryHour,
			latitude,
			longitude,
			isFav,
			address,
			cardNumber,
		} = request.body;
		const userCookie = request.cookies.session;
		try {
			const user_id: any = decryptToken(userCookie);
			const existingUser = await this.User.findById(user_id.id).exec();
			if (!existingUser) {
				return reply.code(404).send({ message: "User not found" });
			}
			const existingCart = await this.ShoppingCart.findOne({
				owner: user_id.id,
			}).exec();
			if (!existingCart) {
				return reply.code(404).send({ message: "Cart not found" });
			}
			let locationId = null;
			if (isDelivery) {
				const Location = await this.Location.create({
					latitude,
					longitude,
					address,
					isFav,
				});
				locationId = Location._id;
			}

			const cartProducts = await this.ShoppingCart.findOne({
				owner: user_id.id,
			}).exec();

			const newOrder = await this.Order.create({
				owner: user_id.id,
				status: "pending",
				totalPrice: existingCart.totalPrice,
				isExpress: !!isExpress,
				isDelivery: !!isDelivery,
				deliveryDate: isDelivery ? deliveryDate : null,
				deliveryHour: isDelivery ? deliveryHour : null,
				location: locationId,
				productsList: cartProducts.productsList,
			});

			// const cartProducts = await this.ShoppingCartRow.find({
			// 	cart: existingCart._id,
			// }).exec();
			// if (!cartProducts) {
			// 	return reply.code(404).send({ message: "Cart is empty" });
			// }

			// const orderProducts = cartProducts.map(async (product: any) => {
			// 	await this.ShoppingCartRow.findByIdAndDelete(product._id);
			// 	await this.OrderRow.create({
			// 		product: product.product,
			// 		order: newOrder._id,
			// 	});
			// });

			const deletedCart = await this.ShoppingCart.findOneAndDelete(
				user_id.id,
			).exec();
			const userInfo = await this.User.findById(user_id.id);
			try {
				emailOrder({
					email: userInfo.email,
					nombre: userInfo.name,
					status: "pending",
				});
			} catch (error) {
				console.log(error);
				return reply.code(500).send({ message: "Error sending email", error });
			}
			return reply.code(201).send({ message: "Order created", deletedCart });
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
