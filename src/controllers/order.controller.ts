import { FastifyReply, FastifyRequest } from "fastify";
import { OCM } from "../config/container";
import { OrderInterface } from "../interfaces";
import Order from "../models/order";

const orderModule = OCM.resolve("OrderModule");

const createOrder = async (request: FastifyRequest, reply: FastifyReply) => {
	await orderModule.createOrder(request, reply);
};

const getAllOrders = async (request: FastifyRequest, reply: FastifyReply) => {
	await orderModule.getAllOrders(request, reply);
};

const getUserOrders = async (request: FastifyRequest, reply: FastifyReply) => {
	await orderModule.getUserOrders(request, reply);
};

const testEmail1 = async (request: FastifyRequest, reply: FastifyReply) => {
	await orderModule.testEmail(request, reply);
};

const getOrderDetails = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await orderModule.getOrderDetails(request, reply);
};

const testRider = async (request: FastifyRequest, reply: FastifyReply) => {
	await orderModule.testRider(request, reply);
};

const updateOrder = async (request: FastifyRequest, reply: FastifyReply) => {
	await orderModule.updateOrder(request, reply);
};

export {
	createOrder,
	getAllOrders,
	getUserOrders,
	testEmail1,
	getOrderDetails,
	testRider,
	updateOrder,
};
