import { request } from "http";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { RCM } from "../config/container";

const RegionModule = RCM.resolve("RegionModule");

const getRegions = async (request: FastifyRequest, reply: FastifyReply) => {
	await RegionModule.getRegions(request, reply);
};

export { getRegions };
