import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateQuoteController } from "../factories/controller";
import { ICreateQuoteUseCaseInput } from "@/domain/usecase";

export async function createQuoteHandler(
  request: FastifyRequest<{ Body: ICreateQuoteUseCaseInput }>,
  reply: FastifyReply
): Promise<any> {
  try {
    const controller = await makeCreateQuoteController();

    const input: ICreateQuoteUseCaseInput = {
      age: request.body?.age,
      sex: request.body?.sex,
    };
    const response = controller.control(input);

    reply.send(response);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
