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
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const database_1 = __importDefault(require("./config/database"));
// import userRouter from "./user/routes/user.routes";
const user_routes_1 = __importDefault(require("./user/routes/user.routes"));
dotenv_1.default.config({ path: ".env" });
const server = (0, fastify_1.default)({ logger: true });
server.register(user_routes_1.default, { prefix: "api/v1/user" });
const port = process.env.PORT;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
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
        console.log(error);
        process.exit(1);
    }
    try {
        yield server.listen({ port: port || 3000, host: "0.0.0.0" }, (address) => {
            server.log.info(`server listening on ${address}`);
        });
    }
    catch (error) {
        server.log.error(error);
        process.exit(1);
    }
});
start();
