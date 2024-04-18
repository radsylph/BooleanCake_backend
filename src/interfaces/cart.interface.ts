export interface ShoppingCartInterface {
	owner: string;
	productsList: string[];
	totalPrice: number;
	totalItems: number;
}

export interface ShoppingCartRowsInterface {
	product: string;
	cart: string;
}
