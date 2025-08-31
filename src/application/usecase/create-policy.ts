import type {
  ICreatePolicyUseCase,
  ICreatePolicyUseCaseInput,
  ICreatePolicyUseCaseOutput,
} from "@/domain/usecase";
import type IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import {
  buildCreatePolicyInput,
  buildCreatePolicyResponse,
  buildPolicyResponseFromEntity,
} from "../builder";
import type {
  IPartnerRepository,
  IPolicyRepository,
  IQuoteRepository,
} from "@/domain/repository";

export class CreatePolicyUseCaseImpl implements ICreatePolicyUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly quoteRepository: IQuoteRepository,
    private readonly policyRepository: IPolicyRepository,
    private readonly insuranceApiClient: IInsuranceApiHttpClient
  ) {}

  async execute(
    input: ICreatePolicyUseCaseInput
  ): Promise<ICreatePolicyUseCaseOutput> {
    const partner = await this.partnerRepository.findById(input.partnerId);

    if (!partner) {
      throw new Error("Partner not found");
    }

    const quotation = await this.quoteRepository.findByQuotationId(
      input.quotationId
    );

    if (!quotation) {
      throw new Error("Quotation not found");
    }

    const existPolicyWithQuotationId =
      await this.policyRepository.findByQuotationId(quotation.quotationId);

    if (existPolicyWithQuotationId) {
      return buildPolicyResponseFromEntity(existPolicyWithQuotationId);
    }

    const policy = await this.insuranceApiClient.createPolicies({
      quotation_id: input.quotationId,
      name: input.name,
      sex: input.sex,
      date_of_birth: input.dateOfBirth,
    });

    await this.policyRepository.create(
      buildCreatePolicyInput(partner.id, policy, quotation)
    );

    return buildCreatePolicyResponse(policy);
  }
}
