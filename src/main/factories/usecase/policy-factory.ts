import { CreatePolicyUseCaseImpl } from "@/application/usecase";
import { INSURANCE_API_BASE_URL, INSURANCE_API_KEY } from "@/main/common/env";
import { InsuranceApiHttpClient } from "@/main/common/insurance-api-client";
import { PartnerRepository } from "@/main/repositories";
import { PrismaClient } from "@prisma/client";

export async function makeCreatePolicyUseCase(): Promise<CreatePolicyUseCaseImpl> {
  const insuranceApiHttpClient = new InsuranceApiHttpClient({
    apiBaseUrl: INSURANCE_API_BASE_URL,
    apiKey: INSURANCE_API_KEY,
  });

  await insuranceApiHttpClient.authenticate();

  return new CreatePolicyUseCaseImpl(
    new PartnerRepository(new PrismaClient()),
    insuranceApiHttpClient
  );
}
