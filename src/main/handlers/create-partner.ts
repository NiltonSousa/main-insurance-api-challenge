import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreatePartnerController } from "../factories/controller";
import { ICreatePartnerUseCaseInput } from "@/domain/usecase";

export function createPartnerHandler(
  request: FastifyRequest<{ Body: ICreatePartnerUseCaseInput }>,
  reply: FastifyReply
) {
  const controller = makeCreatePartnerController();

  const input: ICreatePartnerUseCaseInput = {
    cnpj: request.body?.cnpj,
    name: request.body?.name,
  };

  const result = controller.control(input);

  reply.send(result);
}
