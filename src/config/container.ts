import { asClass, asValue, createContainer } from "awilix";
import Ingredient from "../models/ingredient";
import Product from "../models/product";
import User from "../models/user";
import IngredientModule from "../modules/ingredient.module";
import ProductsModule from "../modules/product.module";
import UserModule from "../modules/user.module";

const UCM = createContainer(); //User Container Module

const PCM = createContainer(); //Product Container Module

const ICM = createContainer(); //Invoice Container Module

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

export { UCM, PCM, ICM };
