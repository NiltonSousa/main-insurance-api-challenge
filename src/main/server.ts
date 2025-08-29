import Fastify from "fastify";
import {
  createPartnerHandler,
  createPolicyHandler,
  createQuoteHandler,
  getPolicyHandler,
} from "./handlers";

const fastify = Fastify({
  logger: true,
});

fastify.post("/partners", createPartnerHandler);
fastify.post("/partners/:partner-id/quotes", createQuoteHandler);
fastify.post("/partners/:partner-id/policies", createPolicyHandler);
fastify.get("/partners/:partner-id/policies/:policy-id", getPolicyHandler);

try {
  fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
