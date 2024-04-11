import mongoose from "mongoose";
import { OrderRowInterface } from "../interfaces";

const OrderRowSchema = new mongoose.Schema<OrderRowInterface>({
	product: {
		type: String,
		required: true,
		ref: "Product",
	},
	order: {
		type: String,
		required: true,
		ref: "Order",
	},
});

const OrderRow = mongoose.model("OrderRow", OrderRowSchema);

export default OrderRow;
