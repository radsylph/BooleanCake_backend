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
const ingredient_controller_1 = require("../controllers/ingredient.controller");
function ingredientRouter(fastify, opts, done) {
    fastify.register((fastify, opts, done) => __awaiter(this, void 0, void 0, function* () {
        yield fastify.addHook("preHandler", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const sessionCookie = request.cookies.session;
            const roleCookie = request.cookies.role;
            if (!sessionCookie ||
                sessionCookie === "" ||
                request.cookies.session === "") {
                reply.code(401).send({ message: "Not Authorized" });
            }
            if (roleCookie !== "admin" || roleCookie === undefined || !roleCookie) {
                reply.code(401).send({ message: "Not Authorized" });
            }
        }));
        fastify.route({
            method: "POST",
            url: "/",
            handler: ingredient_controller_1.createIngredient,
        });
        fastify.route({
            method: "DELETE",
            url: "/:id",
            handler: ingredient_controller_1.deleteIngredient,
        });
        fastify.route({
            method: "PUT",
            url: "/:id",
            handler: ingredient_controller_1.updateIngredient,
        });
        fastify.route({
            method: "GET",
            url: "/",
            handler: ingredient_controller_1.getAllIngredients,
        });
        fastify.route({
            method: "GET",
            url: "/:id",
            handler: ingredient_controller_1.getIngredientById,
        });
        done();
    }));
    done();
}
exports.default = ingredientRouter;
