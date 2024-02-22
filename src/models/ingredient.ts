import mongoose from "mongoose";
import { IngredientInterface } from "../interfaces/ingredient.interface";

const IngredientSchema = new mongoose.Schema<IngredientInterface>({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	unitMeasure: {
		type: String,
		required: true,
	},
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

export default Ingredient;
