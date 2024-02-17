import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

const usuarioSchema = new mongoose.Schema<UserInterface>(
	{
		name: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: (value: string) => {
					return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zAZ0-9-]+)*$/.test(
						value,
					);
				},
				message: "Agrega un correo válido",
			},
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: "image.png",
			required: false,
		},
		cellphone: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		token: {
			type: String,
			default: null,
		},
		verify: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

usuarioSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

usuarioSchema.methods.verificarPassword = async function (password: string) {
	const result = await bcrypt.compare(password, this.password);
	console.log(result);
	return result;
};

const User = mongoose.model("User", usuarioSchema);

export default User;
