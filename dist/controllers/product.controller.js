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
exports.shutdown = exports.getAllProducts = exports.updateProduct = exports.getProduct = exports.deleteProduct = exports.createProduct = void 0;
const container_1 = require("../config/container");
const ProductsModule = container_1.PCM.resolve("ProductModule");
const createProduct = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductsModule.createProduct(request, reply);
});
exports.createProduct = createProduct;
const updateProduct = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductsModule.updateProduct(request, reply);
});
exports.updateProduct = updateProduct;
const getProduct = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductsModule.getProduct(request, reply);
});
exports.getProduct = getProduct;
const getAllProducts = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductsModule.getAllProducts(request, reply);
});
exports.getAllProducts = getAllProducts;
const deleteProduct = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductsModule.deleteProduct(request, reply);
});
exports.deleteProduct = deleteProduct;
const shutdown = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductsModule.shutdown(request, reply);
});
exports.shutdown = shutdown;
