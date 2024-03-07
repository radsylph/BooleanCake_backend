import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { Document, Model } from "mongoose";
import { RegionInterface } from "../interfaces/region.interface";

interface RegionDocument extends Document, RegionInterface {}

class RegionModule {
	Region: Model<RegionDocument>;
	constructor({ RegionModel }: { RegionModel: Model<RegionDocument> }) {
		this.Region = RegionModel;
		console.log("RegionModule loaded");
	}

	async getRegions(request: FastifyRequest, reply: FastifyReply) {
		try {
			const AllRegions = await this.Region.find({});
			return reply
				.code(202)
				.send({ message: "Regions Finded", data: AllRegions });
		} catch (error) {
			console.log(error);
			return reply.code(500).send({ message: "Error Finding Regions", error });
		}
	}
}

export default RegionModule;
