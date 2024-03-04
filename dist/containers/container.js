"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UCM = void 0;
const awilix_1 = require("awilix");
const user_1 = __importDefault(require("../models/user"));
const user_module_1 = __importDefault(require("../modules/user.module"));
const UCM = (0, awilix_1.createContainer)(); //User Container Module
exports.UCM = UCM;
UCM.register({
    UserModule: (0, awilix_1.asClass)(user_module_1.default).singleton(),
    userModel: (0, awilix_1.asValue)(user_1.default),
});
