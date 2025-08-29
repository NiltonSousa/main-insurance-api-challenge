import Fastify from "fastify";
import { createPartnerHandler, createQuoteHandler } from "./handlers";
const fastify = Fastify({
  logger: true,
});

fastify.post("/partners", createPartnerHandler);
fastify.post("/quotes", createQuoteHandler);

try {
  fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
