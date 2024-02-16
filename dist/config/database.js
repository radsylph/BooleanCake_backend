"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: ".env" });
// const dbconnector = async (fastify: FastifyInstance, options: any) => {
// 	fastify.register(fastifyMongo, {
// 		url: process.env.MONGO_URL,
// 	});
// };
// export default fastifyPlugin(dbconnector);
mongoose_1.default.connect(process.env.MONGO_URL);
const db = mongoose_1.default.connection;
exports.default = db;
