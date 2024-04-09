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
	owner: string;
	rider: string;
	location: string;
	status: string;
}

export interface LocationInterface {
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
