import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreatePartnerController } from "../factories/controller";
import { ICreatePartnerUseCaseInput } from "@/domain/usecase";

export async function createPartnerHandler(
  request: FastifyRequest<{ Body: ICreatePartnerUseCaseInput }>,
  reply: FastifyReply
) {
  try {
    const controller = makeCreatePartnerController();

    const input: ICreatePartnerUseCaseInput = {
      cnpj: request.body?.cnpj,
      name: request.body?.name,
    };

    const result = await controller.control(input);

    reply.send(result);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
