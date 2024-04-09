import { timeStamp } from "console";
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
		enum: ["tortas", "cupcakes", "brownie"],
		required: true,
	},
	image: {
		type: String,
		required: false,
		default: "",
	},
	region: {
		type: String,
		required: false,
	},
	isPersonalized: {
		type: Boolean,
		required: true,
		default: false,
	},
	flavor: {
		type: String,
		required: false,
		default: "",
	},
	capes: {
		type: Number,
		required: false,
		default: null,
	},
	size: {
		type: String,
		required: false,
		default: "",
	},
	decoration: {
		type: String,
		required: false,
		default: "",
	},
	filling: {
		type: String,
		required: false,
		default: "",
	},
	reference: {
		type: String,
		required: false,
		default: "",
	},
	orderDetails: {
		ref: "order",
		type: String,
		required: false,
		default: "",
	},
});

const Products = mongoose.model("Products", ProductsSchema);

export default Products;
