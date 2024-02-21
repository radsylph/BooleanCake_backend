"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptToken = exports.generateJWT = exports.generateToken1 = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv")); // se importa el modulo de dotenv
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // se importa el modulo de jsonwebtoken
dotenv_1.default.config({ path: ".env" }); // se cargan las variables de entorno
const generateToken1 = () => {
    // funcion para crear un token aleatorio de 10 caracteres
    const token = crypto_1.default.randomBytes(10).toString("hex");
    console.log(token);
    return token;
};
exports.generateToken1 = generateToken1;
const generateJWT = (id) => {
    // funcion para crear un token con jwt
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_COOKIE, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
exports.generateJWT = generateJWT;
const decryptToken = (token) => {
    // funcion para desencriptar el token
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_COOKIE);
};
exports.decryptToken = decryptToken;
