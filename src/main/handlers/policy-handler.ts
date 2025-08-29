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
    Params: { partner_id: string };
  }>,
  reply: FastifyReply
): Promise<any> {
  try {
    const controller = await makeCreatePolicyController();

    const input: ICreatePolicyUseCaseInput = {
      partnerId: request.params["partner_id"],
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
    Params: { partner_id: string; policy_id: string };
  }>,
  reply: FastifyReply
): Promise<any> {
  try {
    console.log("Request params:", request.params);
    const controller = await makeGetPolicyController();

    const input: IGetPolicyUseCaseInput = {
      partnerId: request.params["partner_id"],
      policyId: request.params["policy_id"],
    };

    const response = controller.control(input);

    reply.send(response);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
