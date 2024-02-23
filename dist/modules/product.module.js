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
const product_1 = __importDefault(require("../models/product"));
class ProductsModule {
    constructor() {
        console.log("ProductsModule loaded");
    }
    createProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Products_info = request.body;
            try {
                const newProducts = yield product_1.default.create(Products_info);
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
    deleteProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product_id = request.params; // se sacara el id (el parametro de la url)
            try {
                const deleteProduct = yield product_1.default.findOneAndDelete({
                    _id: Product_id.id, // se busca el producto por el id(Product_id es un objecto con el id adentro, por eso se pone Product_id.id)
                });
                if (!deleteProduct) {
                    //validacion por si el id no existe y de error 404
                    return reply
                        .code(404)
                        .send({ message: "Product not found", data: Product_id });
                }
                return reply
                    .code(202)
                    .send({ message: "Product deleted", data: Product_id });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Error Deleting Product", error });
            }
        });
    }
    getProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product_id = request.body.id;
            try {
                const ProductDetails = yield product_1.default.find({
                    _id: Product_id,
                });
                return reply
                    .code(202)
                    .send({ message: "Product Finded", data: ProductDetails });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Error Finding Product", error });
            }
        });
    }
    getAllProducts(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AllProducts = yield product_1.default.find({});
                return reply
                    .code(202)
                    .send({ message: "Product Finded", data: AllProducts });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Error Finding Product", error });
            }
        });
    }
    updateProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product_Changes = request.body;
            try {
                const ProductDetails = yield product_1.default.findByIdAndUpdate(Product_Changes.id, {
                    storage: Product_Changes.storage,
                    name: Product_Changes.name,
                    price: Product_Changes.price,
                    expireDate: Product_Changes.expireDate,
                    category: Product_Changes.category,
                    image: Product_Changes.image,
                });
                return reply
                    .code(202)
                    .send({ message: "Product Updated", data: ProductDetails });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Error Updating Product", error });
            }
        });
    }
}
exports.default = ProductsModule;
