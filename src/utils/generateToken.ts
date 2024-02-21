import crypto from "crypto";
import dotenv from "dotenv"; // se importa el modulo de dotenv
import jwt from "jsonwebtoken"; // se importa el modulo de jsonwebtoken
dotenv.config({ path: ".env" }); // se cargan las variables de entorno

const generateToken1 = (): string => {
	// funcion para crear un token aleatorio de 10 caracteres
	const token = crypto.randomBytes(10).toString("hex");
	console.log(token);
	return token;
};

const generateJWT = (id: string): string => {
	// funcion para crear un token con jwt
	return jwt.sign({ id }, process.env.SECRET_COOKIE as string, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const decryptToken = (token: string) => {
	// funcion para desencriptar el token
	return jwt.verify(token, process.env.SECRET_COOKIE);
};

/*const generateToken2 = () => {
  let x = Math.random().toString(36).substring(2, 15) + Date.now().toString(32);
  console.log(x);
  return x;
};*/ //otra funcion para crear un token aleatorio por si acaso

export { generateToken1, generateJWT, decryptToken };
