import { OrderInterface } from "./order.interface";

export interface ProductsInterface {
	stock: number;
	name: string;
	price: number;
	expireDate: Date;
	category: string;
	image: string;
	region: string;
	isPersonalized: boolean;
	flavor: string | null;
	capes: number | null;
	size: string | null;
	decoration: string | null;
	filling: string | null;
	reference: string | null;
}

