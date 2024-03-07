import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { ProductsInterface } from "../interfaces/product.interface";

const ProductsSchema = new mongoose.Schema<ProductsInterface>({
	storage: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	expireDate: {
		type: Date,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false,
		default: "",
	},
	region: {
		type: String,
		required: true,
	},
});

const Products = mongoose.model("Products", ProductsSchema);

export default Products;
// {
//   "storage": 25,
//   "name": "torta de leche",
//   "expireDate": "2024-04-20",
//   "category": "tortas",
//   "region": "USA",
//   "price": 12
// }