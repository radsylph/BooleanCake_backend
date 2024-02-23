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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIngredients = exports.getIngredientById = exports.deleteIngredient = exports.updateIngredient = exports.createIngredient = void 0;
const ingredient_1 = __importDefault(require("../models/ingredient"));
/*
async createProducts(request: FastifyRequest, reply: FastifyReply) {
    const Products_info = request.body;
    try {
        const newProducts = await Products.create(Products_info);
        await newProducts.save();
        return reply
            .code(202)
            .send({ message: "Products created", data: newProducts });
    } catch (error) {
        console.log(error);
        return reply
            .code(500)
            .send({ message: "Error creating Products", error });
    }
}
*/
const createIngredient = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock, unitMeasure } = request.body;
        const ingredient = new ingredient_1.default({ name, price, stock, unitMeasure });
        console.log("Yupi se creo el ingrediente");
        yield ingredient.save();
        reply.code(201).send(ingredient);
    }
    catch (error) {
        reply.code(500).send({ error: 'Error creating the ingredient' });
    }
});
exports.createIngredient = createIngredient;
const updateIngredient = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = request.params;
        const { id } = params;
        const { name, price, stock, unitMeasure } = request.body;
        const updatedIngredient = yield ingredient_1.default.findByIdAndUpdate(id, { name, price, stock, unitMeasure }, { new: true });
        if (!updatedIngredient) {
            reply.code(404).send({ error: 'Ingredient not found' });
            return;
        }
        reply.send(updatedIngredient);
    }
    catch (error) {
        reply.code(500).send({ error: 'Error updating the ingredient' });
    }
});
exports.updateIngredient = updateIngredient;
const deleteIngredient = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = request.params;
        const { id } = params;
        const deletedIngredient = yield ingredient_1.default.findByIdAndDelete(id);
        if (!deletedIngredient) {
            reply.code(404).send({ error: 'Ingredient not found' });
            return;
        }
        reply.send({ message: 'Ingredient deleted successfully' });
    }
    catch (error) {
        reply.code(500).send({ error: 'Error deleting the ingredient' });
    }
});
exports.deleteIngredient = deleteIngredient;
const getIngredientById = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = request.params;
        const { id } = params;
        const ingredient = yield ingredient_1.default.findById(id);
        if (!ingredient) {
            reply.code(404).send({ error: 'Ingredient not found' });
            return;
        }
        reply.send(ingredient);
    }
    catch (error) {
        reply.code(500).send({ error: 'Error getting the ingredient' });
    }
});
exports.getIngredientById = getIngredientById;
const getAllIngredients = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = yield ingredient_1.default.find();
        reply.send(ingredients);
    }
    catch (error) {
        reply.code(500).send({ error: 'Error getting ingredients' });
    }
});
exports.getAllIngredients = getAllIngredients;
