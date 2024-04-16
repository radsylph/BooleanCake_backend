"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCM = exports.RCM = exports.ICM = exports.PCM = exports.UCM = void 0;
const awilix_1 = require("awilix");
const models_1 = require("../models");
const modules_1 = require("../modules");
const UCM = (0, awilix_1.createContainer)(); //User Container Module
exports.UCM = UCM;
const PCM = (0, awilix_1.createContainer)(); //Product Container Module
exports.PCM = PCM;
const ICM = (0, awilix_1.createContainer)(); //Invoice Container Module
exports.ICM = ICM;
const RCM = (0, awilix_1.createContainer)(); //Region Container Module
exports.RCM = RCM;
const OCM = (0, awilix_1.createContainer)(); //Order Container Module
exports.OCM = OCM;
UCM.register({
    UserModule: (0, awilix_1.asClass)(modules_1.UserModule).singleton(),
    userModel: (0, awilix_1.asValue)(models_1.User),
});
PCM.register({
    ProductModule: (0, awilix_1.asClass)(modules_1.ProductsModule).singleton(),
    ProductModel: (0, awilix_1.asValue)(models_1.Product),
});
ICM.register({
    IngridientModule: (0, awilix_1.asClass)(modules_1.IngredientModule).singleton(),
    IngredientModel: (0, awilix_1.asValue)(models_1.Ingredient),
});
RCM.register({
    RegionModule: (0, awilix_1.asClass)(modules_1.RegionModule).singleton(),
    RegionModel: (0, awilix_1.asValue)(models_1.Region),
});
OCM.register({
    OrderModule: (0, awilix_1.asClass)(modules_1.OrderModule).singleton(),
    OrderModel: (0, awilix_1.asValue)(models_1.Order),
    OrderRowModel: (0, awilix_1.asValue)(models_1.OrderRow),
    UserModel: (0, awilix_1.asValue)(models_1.User),
    ProductModel: (0, awilix_1.asValue)(models_1.Product),
    ShoppingCartModel: (0, awilix_1.asValue)(models_1.ShoppingCart),
    ShoppingCartRowModel: (0, awilix_1.asValue)(models_1.ShoppingCartRow),
    LocationModel: (0, awilix_1.asValue)(models_1.Location),
});
