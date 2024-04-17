"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("@fastify/awilix");
const cookie_1 = require("@fastify/cookie");
const cors_1 = __importDefault(require("@fastify/cors"));
const session_1 = require("@fastify/session");
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const database_1 = __importDefault(require("./config/database"));
const ingredient_routes_1 = __importDefault(require("./routes/ingredient.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const region_routes_1 = __importDefault(require("./routes/region.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_schema_1 = require("./schemas/product.schema");
const user_schemas_1 = require("./schemas/user.schemas");
dotenv_1.default.config({ path: ".env" }); // se cargan las variables de entorno
const server = (0, fastify_1.default)({ logger: true }); // se crea el servidor y se pone el logger
server.register(cookie_1.fastifyCookie, {
    // se registra el plugin de las cookies
    secret: process.env.SECRET_COOKIE, // se pone el secreto de las cookies
});
server.register(session_1.fastifySession, {
    // se registra el plugin de las sesiones
    cookieName: "sessionId", // se pone el nombre de la cookie (no es obligatoriamente le nombre de la cookie que va a usar el navegador para la autentificacion)
    secret: process.env.SECRET_COOKIE, // se pone el secreto de la cookie
});
server.register(cors_1.default, {
    origin: "http://localhost:5173", // Permite todas las origenes
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Permite estos métodos
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"], // Permite estos encabezados
    credentials: true, // Permite cookies
});
server.register(awilix_1.fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
});
server.register(user_routes_1.default, { prefix: "api/v1/user" }); // se registra el router de los usuarios con le prefijo
server.register(product_routes_1.default, { prefix: "api/v1/product" }); // se registra el router de los productos con le prefijo
server.register(ingredient_routes_1.default, { prefix: "api/v1/ingredient" });
server.register(region_routes_1.default, { prefix: "api/v1/region" });
server.register(order_routes_1.default, { prefix: "api/v1/order" });
server.addSchema(user_schemas_1.loginBodySchema); // se añade el esquema del login
server.addSchema(user_schemas_1.createUserBodySchema); // se añade el esquema del crear usuario
server.addSchema(user_schemas_1.verifyUserParamsSchema); // se añade el esquema de verificar usuario
server.addSchema(product_schema_1.CreateProductBodySchema); // se añade el esquema de crear producto
const port = process.env.PORT; // se obtiene el puerto del archivo
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // se crea la funcion asincrona para iniciar el servidor
    try {
        try {
            // el try de la base de datos
            database_1.default.on("error", (err) => {
                console.error("Error Connecting to the database because :", err);
            });
            database_1.default.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
                console.log("Connected to the database successfully!");
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        // el catch de la base de datos
        console.log(error);
        process.exit(1);
    }
    try {
        // el try del servidor
        yield server.listen({ port: port || 3000, host: "0.0.0.0" }, (address) => {
            server.log.info(`server listening on ${address}`);
        });
    }
    catch (error) {
        // el catch del servidor
        server.log.error(error);
        process.exit(1);
    }
});
start(); // se inicia el servidor
