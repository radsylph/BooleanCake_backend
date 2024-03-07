"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsSchema = new mongoose_1.default.Schema({
    storage: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    expireDate: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: "",
    },
    region: {
        type: String,
        required: true,
    },
});
const Products = mongoose_1.default.model("Products", ProductsSchema);
exports.default = Products;
// {
//   "storage": 25,
//   "name": "torta de leche",
//   "expireDate": "2024-04-20",
//   "category": "tortas",
//   "region": "USA",
//   "price": 12
// }
