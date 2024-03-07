import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { RegionInterface } from "../interfaces/region.interface";

const RegionSchema = new mongoose.Schema<RegionInterface>({
	region: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	symbol: {
		type: String,
		required: true,
	},
});

const Region = mongoose.model("Region", RegionSchema);

export default Region;
