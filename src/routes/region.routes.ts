import { create } from "domain";
import fastify from "fastify";
import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import { getRegions } from "../controllers/region.controller";

function RegionRouter(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
	done: () => void,
) {
	fastify.route({
		method: "GET",
		url: "/get",
		handler: getRegions,
	});

	done();
}

export default RegionRouter;
