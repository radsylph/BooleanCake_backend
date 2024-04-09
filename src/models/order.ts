import mongoose from "mongoose";
import { OrderInterface } from "../interfaces/order.interface";

const OrderSchema = new mongoose.Schema<OrderInterface>({
	owner: {
		type: String,
		ref: "User",
		required: true,
	},
	rider: {
		type: String,
		ref: "User",
		required: true,
		default: "none",
	},
	location: {
		type: String,
		ref: "Location",
		required: true,
		default: "none",
	},
	status: {
		type: String,
		enum: ["pending", "in progress", "ready", "delivered"],
		default: "pending",
		required: true,
	},
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
