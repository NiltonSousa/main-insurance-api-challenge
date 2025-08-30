import type { FastifyReply, FastifyRequest } from "fastify";
import {
  makeCreatePolicyController,
  makeGetPolicyController,
} from "../factories/controller";
import type {
  ICreatePolicyUseCaseInput,
  IGetPolicyUseCaseInput,
  SexType,
} from "@/domain/usecase";

export interface ICreatePolicyRequestBody {
  quotation_id: string;
  name: string;
  sex: string;
  date_of_birth: string;
}

export async function createPolicyHandler(
  request: FastifyRequest<{
    Body: ICreatePolicyRequestBody;
    Params: { partner_id: string };
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const controller = await makeCreatePolicyController();

    const input: ICreatePolicyUseCaseInput = {
      partnerId: request.params.partner_id,
      quotationId: request.body.quotation_id,
      name: request.body.name,
      sex: request.body.sex as unknown as SexType,
      dateOfBirth: request.body.date_of_birth,
    };

    const response = await controller.control(input);

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
): Promise<void> {
  try {
    console.log("Request params:", request.params);
    const controller = await makeGetPolicyController();

    const input: IGetPolicyUseCaseInput = {
      partnerId: request.params.partner_id,
      policyId: request.params.policy_id,
    };

    const response = await controller.control(input);

    reply.send(response);
  } catch (error: unknown) {
    reply
      .status(500)
      .send({ message: (error as Error).message || "Internal server error" });
  }
}
