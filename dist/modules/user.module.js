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
const bcrypt_1 = __importDefault(require("bcrypt"));
//import User from "../models/user";
const generateToken_1 = require("../utils/generateToken");
const mail_1 = require("../utils/mail");
class UserModule {
    constructor({ userModel }) {
        this.User = userModel;
        console.log("UserModule loaded");
    }
    createUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, email, password, cellphone, role } = request.body;
            try {
                const existingEmail = yield this.User.findOne({ email: email });
                if (existingEmail) {
                    return reply.code(500).send({ message: "Email already in use" });
                }
                const existingCellphone = yield this.User.findOne({
                    cellphone: cellphone,
                });
                if (existingCellphone) {
                    return reply.code(500).send({ message: "Cellphone already in use" });
                }
                const newUser = yield this.User.create({
                    name,
                    lastname,
                    email,
                    password,
                    cellphone,
                    role,
                });
                const token = (0, generateToken_1.generateToken1)(); //cambiarlo por otro para que tenga 5 digitos random y ya
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
                const user = yield this.User.findOne({ token: token });
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
    loginUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            //const user_info: any = request.body;
            const { email, password } = request.body;
            try {
                const ExistingUser = yield this.User.findOne({ email: email });
                if (!ExistingUser) {
                    return reply.code(404).send({ message: "User not found" });
                }
                const validPassword = yield bcrypt_1.default.compare(password, ExistingUser.password);
                if (!validPassword) {
                    return reply.code(500).send({ message: "Invalid password" });
                }
                if (!ExistingUser.verify) {
                    return reply.code(500).send({ message: "The user is not verified" });
                }
                const token = (0, generateToken_1.generateJWT)(ExistingUser._id);
                reply.setCookie("session", token, {
                    path: "/",
                    secure: false, //cambiar si vamos a usar https
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
                    sameSite: "strict",
                });
                console.log(ExistingUser);
                return reply.code(200).send({
                    message: "User logged in",
                    user: ExistingUser,
                });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Error logging in", error });
            }
        });
    }
    getUserInfo(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookieSession = request.cookies.session;
            try {
                const user_id = (0, generateToken_1.decryptToken)(cookieSession);
                console.log(user_id.id);
                const userInfo = yield this.User.findOne({ _id: user_id.id });
                if (!userInfo) {
                    return reply.code(404).send({ message: "User not found" });
                }
                return reply.code(200).send({ message: "User found", userInfo });
            }
            catch (error) {
                return reply.code(500).send({ message: "Error getting user", error });
            }
        });
    }
    logOutUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                reply.setCookie("session", "", {
                    expires: new Date(0),
                    path: "/", // Asegúrate de especificar la misma ruta que usaste cuando creaste la cookie
                });
                return reply.code(200).send({ message: "User logged out" });
            }
            catch (error) {
                return reply.code(500).send({ message: "Error logging out", error });
            }
        });
    }
}
exports.default = UserModule;
