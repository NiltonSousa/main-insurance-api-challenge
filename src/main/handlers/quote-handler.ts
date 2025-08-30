import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateQuoteController } from "../factories/controller";
import type { ICreateQuoteUseCaseInput } from "@/domain/usecase";

export async function createQuoteHandler(
  request: FastifyRequest<{
    Body: ICreateQuoteUseCaseInput;
    Params: { partner_id: string };
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const controller = await makeCreateQuoteController();

    const input: ICreateQuoteUseCaseInput = {
      partnerId: request.params.partner_id,
      age: request.body.age,
      sex: request.body.sex,
    };

    const response = await controller.control(input);

    reply.send(response);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
