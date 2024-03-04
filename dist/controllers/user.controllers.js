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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemas = exports.logOutUser = exports.getUserInfo = exports.loginUser = exports.verifyUser = exports.createUser = void 0;
const container_1 = require("../config/container");
const userModule = container_1.UCM.resolve("UserModule");
const createUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModule.createUser(request, reply);
});
exports.createUser = createUser;
const verifyUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModule.verifyUser(request, reply);
});
exports.verifyUser = verifyUser;
const loginUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModule.loginUser(request, reply);
});
exports.loginUser = loginUser;
const getUserInfo = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModule.getUserInfo(request, reply);
});
exports.getUserInfo = getUserInfo;
const logOutUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModule.logOutUser(request, reply);
});
exports.logOutUser = logOutUser;
const getSchemas = (request, reply, fastify) => __awaiter(void 0, void 0, void 0, function* () {
    const schemas = fastify.getSchemas();
    yield reply.code(200).send(schemas);
});
exports.getSchemas = getSchemas;
