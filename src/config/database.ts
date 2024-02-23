import fastifyMongo from "@fastify/mongodb";
import dotenv from "dotenv";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

// const dbconnector = async (fastify: FastifyInstance, options: any) => {
// 	fastify.register(fastifyMongo, {
// 		url: process.env.MONGO_URL,
// 	});
// };

// export default fastifyPlugin(dbconnector);

mongoose.connect(process.env.MONGO_URL as string);

const db = mongoose.connection;

export default db;
