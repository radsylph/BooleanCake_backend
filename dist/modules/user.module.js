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
const user_1 = __importDefault(require("../models/user"));
const generateToken_1 = require("../utils/generateToken");
const mail_1 = require("../utils/mail");
class UserModule {
    constructor() {
        console.log("UserModule loaded");
    }
    createUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_info = request.body;
            try {
                const existingEmail = yield user_1.default.findOne({ email: user_info.email });
                if (existingEmail) {
                    return reply.code(500).send({ message: "Email already in use" });
                }
                const exitingUsername = yield user_1.default.findOne({
                    username: user_info.username,
                });
                if (exitingUsername) {
                    return reply.code(500).send({ message: "Username already in use" });
                }
                const newUser = yield user_1.default.create(user_info);
                const token = (0, generateToken_1.generateToken1)();
                try {
                    (0, mail_1.emailRegistro)({
                        email: newUser.email,
                        nombre: newUser.name,
                        token: token,
                    });
                }
                catch (error) {
                    console.log(error);
                    return reply.code(500).send({ message: "Error sending email", error });
                }
                newUser.token = token;
                yield newUser.save();
                return reply.code(200).send({ message: "User created", data: newUser });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Error creating user", error });
            }
        });
    }
    verifyUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = request.params;
            try {
                console.log(token);
                console.log(typeof token);
                const user = yield user_1.default.findOne({ token: token });
                if (!user) {
                    return reply.code(404).send({ message: "User not found" });
                }
                user.token = null;
                user.verify = true;
                yield user.save();
                return reply.code(200).send({ message: "User verified", user });
            }
            catch (error) {
                return reply.code(500).send({ message: "Error verifying user", error });
            }
        });
    }
    test(request, reply) {
        try {
            const params = request.params;
            return reply.code(200).send({ message: "UserModule works" });
        }
        catch (error) {
            return reply
                .code(500)
                .send({ message: "Error testing UserModule", error });
        }
    }
}
exports.default = UserModule;
