import { CreateQuoteUseCaseImpl } from "@/application/usecase";
import db from "@/main/common/database";
import { INSURANCE_API_BASE_URL, INSURANCE_API_KEY } from "@/main/common/env";
import { InsuranceApiHttpClient } from "@/main/common/insurance-api-client";
import { PartnerRepository, QuoteRepository } from "@/main/repositories";
import { PrismaClient } from "@prisma/client";

export async function makeCreateQuoteUseCase(): Promise<CreateQuoteUseCaseImpl> {
  const insuranceApiHttpClient = new InsuranceApiHttpClient({
    apiBaseUrl: INSURANCE_API_BASE_URL,
    apiKey: INSURANCE_API_KEY,
  });

  await insuranceApiHttpClient.authenticate();

  return new CreateQuoteUseCaseImpl(
    new PartnerRepository(new PrismaClient()),
    new QuoteRepository(db),
    insuranceApiHttpClient
  );
}
