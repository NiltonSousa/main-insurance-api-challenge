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
fastify.post("/partners/:partner_id/quotes", createQuoteHandler);
fastify.post("/partners/:partner_id/policies", createPolicyHandler);
fastify.get("/partners/:partner_id/policies/:policy_id", getPolicyHandler);

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
