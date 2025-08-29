import Fastify from "fastify";
import { createPartnerHandler } from "./handlers";
const fastify = Fastify({
  logger: true,
});

fastify.post("/partners", createPartnerHandler);

try {
  fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
