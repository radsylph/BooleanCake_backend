import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { ProductsInterface } from "../interfaces/products.interface";

const ProductsSchema = new mongoose.Schema<ProductsInterface>({
	storage: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	expireDate: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
});

const Products = mongoose.model("Products", ProductsSchema);

export default Products;
