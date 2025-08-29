import {
  ICreatePolicyUseCase,
  ICreatePolicyUseCaseInput,
  ICreatePolicyUseCaseOutput,
} from "@/domain/usecase";
import IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import { buildCreatePolicyResponse } from "../builder";
import { IPartnerRepository } from "@/domain/repository";

export class CreatePolicyUseCaseImpl implements ICreatePolicyUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly insuranceApiClient: IInsuranceApiHttpClient
  ) {}

  async execute(
    input: ICreatePolicyUseCaseInput
  ): Promise<ICreatePolicyUseCaseOutput> {
    const partner = await this.partnerRepository.findById(input.partnerId);

    if (!partner) {
      throw new Error("Partner not found");
    }

    const policy = await this.insuranceApiClient.createPolicies({
      quotationId: input.quotationId,
      name: input.name,
      sex: input.sex,
      date_of_birth: input.dateOfBirth,
    });

    return buildCreatePolicyResponse(policy);
  }
}
