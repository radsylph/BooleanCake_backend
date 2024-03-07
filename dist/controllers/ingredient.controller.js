"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIngredients = exports.getIngredientById = exports.deleteIngredient = exports.updateIngredient = exports.createIngredient = void 0;
const container_1 = require("../config/container");
const ingredientModule = container_1.ICM.resolve("IngridientModule");
const createIngredient = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredientModule.createIngredient(request, reply);
});
exports.createIngredient = createIngredient;
const updateIngredient = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredientModule.updateIngredient(request, reply);
});
exports.updateIngredient = updateIngredient;
const deleteIngredient = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredientModule.deleteIngredient(request, reply);
});
exports.deleteIngredient = deleteIngredient;
const getIngredientById = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredientModule.getIngredientById(request, reply);
});
exports.getIngredientById = getIngredientById;
const getAllIngredients = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredientModule.getAllIngredients(request, reply);
});
exports.getAllIngredients = getAllIngredients;
