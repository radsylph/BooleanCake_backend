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
const products_1 = __importDefault(require("../user/models/products"));
class ProductsModule {
    constructor() {
        console.log("ProductsModule loaded");
    }
    createProducts(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Products_info = request.body;
            try {
                const newProducts = yield products_1.default.create(Products_info);
                yield newProducts.save();
                return reply
                    .code(202)
                    .send({ message: "Products created", data: newProducts });
            }
            catch (error) {
                console.log(error);
                return reply
                    .code(500)
                    .send({ message: "Error creating Products", error });
            }
        });
    }
}
exports.default = ProductsModule;
