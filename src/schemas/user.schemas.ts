export const loginBodySchema = {
	$id: "LoginBody",
	type: "object",
	properties: {
		email: {
			type: "string",
			format: "email",
		},
		password: {
			type: "string",
			minLength: 8,
		},
	},
	required: ["email", "password"],
};

export const createUserBodySchema = {
	$id: "CreateBody",
	type: "object",
	properties: {
		name: { type: "string" },
		lastname: { type: "string" },
		email: {
			type: "string",
			format: "email",
		},
		password: {
			type: "string",
			minLength: 8,
			//pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$", //ver que pasa con la expresion regular
		},
		cellphone: { type: "string" },
		role: { type: "string", enum: ["admin", "user"] },
	},
	required: ["email", "password", "cellphone", "name", "lastname"],
};

export const verifyUserParamsSchema = {
	$id: "VerifyParams",
	type: "object",
	properties: { token: { type: "string" } },
	required: ["token"],
};
