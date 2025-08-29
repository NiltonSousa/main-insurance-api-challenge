import {
  ICreatePolicyUseCase,
  ICreatePolicyUseCaseInput,
  ICreatePolicyUseCaseOutput,
} from "@/domain/usecase";
import IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import { buildCreatePolicyResponse } from "../builder";

export class CreatePolicyUseCaseImpl implements ICreatePolicyUseCase {
  constructor(private readonly insuranceApiClient: IInsuranceApiHttpClient) {}

  async execute(
    input: ICreatePolicyUseCaseInput
  ): Promise<ICreatePolicyUseCaseOutput> {
    const policy = await this.insuranceApiClient.createPolicies({
      quotationId: input.quotationId,
      name: input.name,
      sex: input.sex,
      date_of_birth: input.dateOfBirth,
    });

    return buildCreatePolicyResponse(policy);
  }
}
