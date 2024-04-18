import mongoose from "mongoose";
import { ShoppingCartInterface } from "../interfaces";

const ShoppingCartSchema = new mongoose.Schema<ShoppingCartInterface>({
	owner: {
		type: String,
		required: true,
		ref: "User",
	},
	productsList: {
		type: [String],
		required: true,
		default: [],
		refPath: "Product",
	},
	totalPrice: {
		type: Number,
		required: true,
		default: 0,
	},
	totalItems: {
		type: Number,
		required: true,
		default: 0,
	},
});

const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);

export default ShoppingCart;
