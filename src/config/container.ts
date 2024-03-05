import { asClass, asValue, createContainer } from "awilix";
import Product from "../models/product";
import User from "../models/user";
import ProductsModule from "../modules/product.module";
import UserModule from "../modules/user.module";

const UCM = createContainer(); //User Container Module

const PCM = createContainer();

UCM.register({
	UserModule: asClass(UserModule).singleton(),
	userModel: asValue(User),
});

PCM.register({
	ProductModule: asClass(ProductsModule).singleton(),
	ProductModel: asValue(Product),
});

export { UCM, PCM };
