import { FastifyReply, FastifyRequest } from "fastify";
import {
  makeCreatePolicyController,
  makeGetPolicyController,
} from "../factories/controller";
import {
  ICreatePolicyUseCaseInput,
  IGetPolicyUseCaseInput,
} from "@/domain/usecase";

export async function createPolicyHandler(
  request: FastifyRequest<{
    Body: ICreatePolicyUseCaseInput;
    Params: { "partner-id": string };
  }>,
  reply: FastifyReply
): Promise<any> {
  try {
    const controller = await makeCreatePolicyController();

    const input: ICreatePolicyUseCaseInput = {
      partnerId: request.params["partner-id"],
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

export async function getPolicyHandler(
  request: FastifyRequest<{
    Params: { "partner-id": string; "policy-id": string };
  }>,
  reply: FastifyReply
): Promise<any> {
  try {
    const controller = await makeGetPolicyController();

    const input: IGetPolicyUseCaseInput = {
      partnerId: request.params["partner-id"],
      policyId: request.params["policy-id"],
    };

    const response = controller.control(input);

    reply.send(response);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
