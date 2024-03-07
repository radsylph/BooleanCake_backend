"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICM = exports.PCM = exports.UCM = void 0;
const awilix_1 = require("awilix");
const ingredient_1 = __importDefault(require("../models/ingredient"));
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
const ingredient_module_1 = __importDefault(require("../modules/ingredient.module"));
const product_module_1 = __importDefault(require("../modules/product.module"));
const user_module_1 = __importDefault(require("../modules/user.module"));
const UCM = (0, awilix_1.createContainer)(); //User Container Module
exports.UCM = UCM;
const PCM = (0, awilix_1.createContainer)(); //Product Container Module
exports.PCM = PCM;
const ICM = (0, awilix_1.createContainer)(); //Invoice Container Module
exports.ICM = ICM;
UCM.register({
    UserModule: (0, awilix_1.asClass)(user_module_1.default).singleton(),
    userModel: (0, awilix_1.asValue)(user_1.default),
});
PCM.register({
    ProductModule: (0, awilix_1.asClass)(product_module_1.default).singleton(),
    ProductModel: (0, awilix_1.asValue)(product_1.default),
});
ICM.register({
    IngridientModule: (0, awilix_1.asClass)(ingredient_module_1.default).singleton(),
    IngredientModel: (0, awilix_1.asValue)(ingredient_1.default),
});
