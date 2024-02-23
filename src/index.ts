import cookie from "@fastify/cookie";
import { fastifyCookie } from "@fastify/cookie";
import { fastifySession } from "@fastify/session";
import dotenv from "dotenv";
import fastify from "fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import db from "./config/database";
import productsRouter from "./routes/product.routes";
import userRouter from "./routes/user.routes";
import ingredientRouter from "./routes/ingredient.routes";

dotenv.config({ path: ".env" }); // se cargan las variables de entorno

const server = fastify({ logger: true }); // se crea el servidor y se pone el logger

server.register(fastifyCookie, {
	// se registra el plugin de las cookies
	secret: process.env.SECRET_COOKIE as unknown as string, // se pone el secreto de las cookies
});

server.register(fastifySession, {
	// se registra el plugin de las sesiones
	cookieName: "sessionId", // se pone el nombre de la cookie (no es obligatoriamente le nombre de la cookie que va a usar el navegador para la autentificacion)
	secret: process.env.SECRET_COOKIE as unknown as string, // se pone el secreto de la cookie
});

server.register(userRouter, { prefix: "api/v1/user" }); // se registra el router de los usuarios con le prefijo
server.register(productsRouter, { prefix: "api/v1/product" }); // se registra el router de los productos con le prefijo
server.register(ingredientRouter, { prefix: "api/v1/ingredient" });

const port: number = process.env.PORT as unknown as number; // se obtiene el puerto del archivo

const start = async () => {
	// se crea la funcion asincrona para iniciar el servidor
	try {
		try {
			// el try de la base de datos
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
		// el catch de la base de datos
		console.log(error);
		process.exit(1);
	}

	try {
		// el try del servidor
		await server.listen({ port: port || 3000, host: "0.0.0.0" }, (address) => {
			server.log.info(`server listening on ${address}`);
		});
	} catch (error) {
		// el catch del servidor
		server.log.error(error);
		process.exit(1);
	}
};

start(); // se inicia el servidor
