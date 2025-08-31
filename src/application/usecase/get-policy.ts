import type {
  IGetPolicyUseCase,
  IGetPolicyUseCaseInput,
  IGetPolicyUseCaseOutput,
} from "@/domain/usecase";
import type IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import {
  buildGetPolicyResponse,
  buildGetPolicyResponseFromEntity,
} from "../builder";
import type {
  IPartnerRepository,
  IPolicyRepository,
} from "@/domain/repository";

export class GetPolicyUseCaseImpl implements IGetPolicyUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly policyRepository: IPolicyRepository,
    private readonly insuranceApiClient: IInsuranceApiHttpClient
  ) {}

  async execute(
    input: IGetPolicyUseCaseInput
  ): Promise<IGetPolicyUseCaseOutput> {
    const partner = await this.partnerRepository.findById(input.partnerId);

    if (!partner) {
      throw new Error("Partner not found");
    }

    const existPolicy = await this.policyRepository.findById(input.policyId);

    if (existPolicy) {
      return buildGetPolicyResponseFromEntity(existPolicy);
    }

    const policy = await this.insuranceApiClient.getPoliciesById(
      input.policyId
    );

    if (!policy) {
      throw new Error("Policy not found");
    }

    return buildGetPolicyResponse(policy);
  }
}
