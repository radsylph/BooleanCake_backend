import { timeStamp } from "console";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { ProductsInterface } from "../interfaces/product.interface";

const ProductsSchema = new mongoose.Schema<ProductsInterface>({
	stock: {
		type: Number,
		required: true,
		default: 1,
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
		//enum: ["tortas", "cupcakes", "brownies"],
		required: true,
		default: "tortas",
	},
	image: {
		type: String,
		required: false,
		default: null,
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
		default: null,
	},
	capes: {
		type: Number,
		required: false,
		default: null,
	},
	size: {
		type: String,
		required: false,
		default: null,
	},
	decoration: {
		type: String,
		required: false,
		default: null,
	},
	filling: {
		type: String,
		required: false,
		default: null,
	},
	reference: {
		type: String,
		required: false,
		default: null,
	},
});
const Products = mongoose.model("Products", ProductsSchema);

// ProductsSchema.pre("save", const trigger = async (next) => {
// 	// const lastSerial = this.serial + 1;
// 	// this.serial = lastSerial;
	
	
// 	next();

// });

export default Products;
