import mongoose from "mongoose";
import { OrderInterface } from "../interfaces/order.interface";

const OrderSchema = new mongoose.Schema<OrderInterface>(
	{
		serial: {
			type: Number,
			required: true,
			default: 0,
		},
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
			required: false,
			default: "none",
		},
		status: {
			type: String,
			enum: ["pending", "in progress", "ready", "delivered"],
			default: "pending",
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		isExpress: {
			type: Boolean,
			required: true,
			default: false,
		},
		isDelivery: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveryDate: {
			type: Date,
			required: false,
			default: new Date(),
		},
		deliveryHour: {
			type: String,
			required: false,
			default: "none",
		},
	},
	{
		timestamps: true,
	},
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
