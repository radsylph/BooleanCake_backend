import mongoose from "mongoose";
import { ShoppingCartRowsInterface } from "../interfaces";

const ShoppingCartRowSchema = new mongoose.Schema<ShoppingCartRowsInterface>({
	product: {
		type: String,
		required: true,
		ref: "Product",
	},
	cart: {
		type: String,
		required: true,
		ref: "ShoppingCart",
	},
});

const ShoppingCartRow = mongoose.model(
	"ShoppingCartRow",
	ShoppingCartRowSchema,
);

export default ShoppingCartRow;
