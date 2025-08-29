import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePolicyController } from "../factories/controller";
import { ICreatePolicyUseCaseInput } from "@/domain/usecase";

export async function createPolicyHandler(
  request: FastifyRequest<{ Body: ICreatePolicyUseCaseInput }>,
  reply: FastifyReply
): Promise<any> {
  try {
    const controller = await makeCreatePolicyController();

    const input: ICreatePolicyUseCaseInput = {
      quotationId: request.body?.quotationId,
      name: request.body?.name,
      sex: request.body?.sex,
      dateOfBirth: request.body?.dateOfBirth,
    };

    const response = controller.control(input);

    reply.send(response);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
