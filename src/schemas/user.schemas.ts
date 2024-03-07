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
			pattern: "/^(?=.*W).{8,}$/",
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
