import dotenv from "dotenv";
import fastify from "fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import db from "./config/database";
import userRouter from "./user/routes/user.routes";

dotenv.config({ path: ".env" });

const server = fastify({ logger: true });

server.register(userRouter, { prefix: "api/v1/user" });

const port: number = process.env.PORT as unknown as number;

const start = async () => {
	try {
		try {
			db.on("error", (err) => {
				console.error("Error Connecting to the database because :", err);
			});

			db.once("open", async () => {
				console.log("Connected to the database successfully!");
			});
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		process.exit(1);
	}

	try {
		await server.listen({ port: port || 3000, host: "0.0.0.0" }, (address) => {
			server.log.info(`server listening on ${address}`);
		});
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};

start();
