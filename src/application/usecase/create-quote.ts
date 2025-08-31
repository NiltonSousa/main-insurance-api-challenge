import type {
  ICreateQuoteUseCaseInput,
  ICreateQuoteUseCase,
  ICreateQuoteUseCaseOutput,
} from "@/domain/usecase";
import type IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import { buildCreateQuoteInput, buildCreateQuoteResponse } from "../builder";
import type { IPartnerRepository, IQuoteRepository } from "@/domain/repository";

export class CreateQuoteUseCaseImpl implements ICreateQuoteUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly quoteRepository: IQuoteRepository,
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

    await this.quoteRepository.create(
      buildCreateQuoteInput(partner.id, quotation)
    );

    return buildCreateQuoteResponse(quotation);
  }
}
