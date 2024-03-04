"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ingredient_controller_1 = require("../controllers/ingredient.controller");
function ingredientRouter(fastify, opts, done) {
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
        url: "/getAll",
        handler: ingredient_controller_1.getAllIngredients,
    });
    fastify.route({
        method: "GET",
        url: "/:id",
        handler: ingredient_controller_1.getIngredientById,
    });
    done();
}
exports.default = ingredientRouter;
