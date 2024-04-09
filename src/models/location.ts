import mongoose from "mongoose";
import { LocationInterface } from "../interfaces/order.interface";

const LocationSchema = new mongoose.Schema<LocationInterface>({
	latitude: {
		type: String,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: false,
		default: "none",
	},
});

const Location = mongoose.model("Location", LocationSchema);

export default Location;
