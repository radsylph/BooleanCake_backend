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
class ProductsModule {
    constructor({ ProductModel }) {
        this.Product = ProductModel;
        console.log("ProductModule loaded");
    }
    createProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Products_info = request.body;
            try {
                const newProducts = yield this.Product.create(Products_info);
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
    updateProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product_id = request.params;
            const Product_Changes = request.body;
            try {
                console.log(Product_id.id);
                const existingProduct = yield this.Product.findById(Product_id.id);
                if (!existingProduct) {
                    return reply
                        .code(404)
                        .send({ message: "Product not found", data: Product_id });
                }
                const ProductDetails = yield this.Product.findByIdAndUpdate(Product_id.id, {
                    stock: Product_Changes.stock,
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
    deleteProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product_id = request.params; // se sacara el id (el parametro de la url)
            try {
                const deleteProduct = yield this.Product.findOneAndDelete({
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
            const Product_id = request.params;
            try {
                const ProductDetails = yield this.Product.find({
                    _id: Product_id.id,
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
            const regionDetail = request.params;
            try {
                const AllProducts = yield this.Product.find({
                    region: regionDetail.region,
                });
                return reply
                    .code(202)
                    .send({ message: "Products Finded", data: AllProducts });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Error Finding Product", error });
            }
        });
    }
    shutdown(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            process.exit(1);
        });
    }
}
exports.default = ProductsModule;
