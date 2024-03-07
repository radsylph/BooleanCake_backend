export const CreateProductBodySchema = {
	$id: "CreateProductBody",
	type: "object",
	properties: {
		storage: { type: "number" },
		name: {
			type: "string",
		},
		price: { type: "number" },
		expireDate: { type: "string" },
		category: { type: "string" },
		image: { type: "string" },
		region: { type: "string" },
	},
	required: ["storage", "name", "expireDate", "category", "region", "price"],
};
