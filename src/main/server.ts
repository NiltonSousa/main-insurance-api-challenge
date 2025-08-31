import Fastify from "fastify";
import {
  createPartnerHandler,
  createPolicyHandler,
  createQuoteHandler,
  getPolicyHandler,
} from "./handlers";
import { REQUIRED_API_KEY } from "./common";

const fastify = Fastify({
  logger: true,
});

fastify.addHook("preHandler", async (request, reply) => {
  // opcional: permitir rotas públicas aqui
  const apiKey = request.headers["x-api-key"];
  if (!REQUIRED_API_KEY || apiKey !== REQUIRED_API_KEY) {
    return await reply.code(401).send({ message: "Unauthorized" });
  }
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
