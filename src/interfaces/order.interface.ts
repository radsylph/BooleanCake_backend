import { StringExpressionOperatorReturningBoolean } from "mongoose";

export interface OrderInterface {
	// owner: string;
	// rider: string;
	// location: string;
	// flavor: string;
	// capes: number;
	// size: string;
	// decoration: string;
	// filling: string;
	// reference: string;
	// status: string;
	serial: number;
	owner: string;
	rider: string;
	location: string;
	status: string;
	totalPrice: number;
	isExpress: boolean;
	isDelivery: boolean;
}

export interface LocationInterface {
	order: string;
	user: string;
	isFav: boolean;
	latitude: string;
	longitude: string;
	address: string;
}

export interface OrderInterfaceExtended extends OrderInterface {
	_id: string;
	latitude: string;
	longitude: string;
	address: string;
}
