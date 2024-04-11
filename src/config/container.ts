import { asClass, asValue, createContainer } from "awilix";
import {
	Ingredient,
	Location,
	Order,
	OrderRow,
	Product,
	Region,
	ShoppingCart,
	ShoppingCartRow,
	User,
} from "../models";
import {
	IngredientModule,
	OrderModule,
	ProductsModule,
	RegionModule,
	UserModule,
} from "../modules";

const UCM = createContainer(); //User Container Module

const PCM = createContainer(); //Product Container Module

const ICM = createContainer(); //Invoice Container Module

const RCM = createContainer(); //Region Container Module

const OCM = createContainer(); //Order Container Module

UCM.register({
	UserModule: asClass(UserModule).singleton(),
	userModel: asValue(User),
});

PCM.register({
	ProductModule: asClass(ProductsModule).singleton(),
	ProductModel: asValue(Product),
});

ICM.register({
	IngridientModule: asClass(IngredientModule).singleton(),
	IngredientModel: asValue(Ingredient),
});

RCM.register({
	RegionModule: asClass(RegionModule).singleton(),
	RegionModel: asValue(Region),
});

OCM.register({
	OrderModule: asClass(OrderModule).singleton(),
	OrderModel: asValue(Order),
	OrderRowModel: asValue(OrderRow),
	UserModel: asValue(User),
	ProductModel: asValue(Product),
	ShoppingCartModel: asValue(ShoppingCart),
	ShoppingCartRowModel: asValue(ShoppingCartRow),
	LocationModel: asValue(Location),
});

export { UCM, PCM, ICM, RCM, OCM };
