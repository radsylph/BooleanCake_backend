import { OrderInterface } from "./order.interface";

export interface ProductsInterface {
	storage: number;
	name: string;
	price: number;
	expireDate: Date;
	category: string;
	image: string;
	region: string;
	isPersonalized: boolean;
	flavor: string;
	capes: number | null;
	size: string;
	decoration: string;
	filling: string;
	reference: string;
	orderDetails: string;
}
