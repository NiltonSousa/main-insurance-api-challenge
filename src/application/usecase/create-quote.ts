import {
  ICreateQuoteUseCaseInput,
  ICreateQuoteUseCase,
  ICreateQuoteUseCaseOutput,
} from "@/domain/usecase";
import IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import { buildCreateQuoteResponse } from "../builder";
import { IPartnerRepository } from "@/domain/repository";

export class CreateQuoteUseCaseImpl implements ICreateQuoteUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly insuranceApiClient: IInsuranceApiHttpClient
  ) {}

  async execute(
    input: ICreateQuoteUseCaseInput
  ): Promise<ICreateQuoteUseCaseOutput> {
    const partner = await this.partnerRepository.findById(input.partnerId);

    if (!partner) {
      throw new Error("Partner not found");
    }

    const quotation = await this.insuranceApiClient.createQuotations({
      age: input.age,
      sex: input.sex,
    });

    return buildCreateQuoteResponse(quotation);
  }
}
