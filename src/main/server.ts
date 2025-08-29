import Fastify from "fastify";
import { createPartnerHandler, createQuoteHandler } from "./handlers";
import { createPolicyHandler } from "./handlers/policy-handler";

const fastify = Fastify({
  logger: true,
});

fastify.post("/partners", createPartnerHandler);
fastify.post("/quotes", createQuoteHandler);
fastify.post("/policies", createPolicyHandler);

try {
  fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
