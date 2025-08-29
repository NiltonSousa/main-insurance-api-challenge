import { CreateQuoteUseCaseImpl } from "@/application/usecase";
import { INSURANCE_API_BASE_URL, INSURANCE_API_KEY } from "@/main/common/env";
import { InsuranceApiHttpClient } from "@/main/common/insurance-api-client";

export async function makeCreateQuoteUseCase(): Promise<CreateQuoteUseCaseImpl> {
  const insuranceApiHttpClient = new InsuranceApiHttpClient({
    apiBaseUrl: INSURANCE_API_BASE_URL,
    apiKey: INSURANCE_API_KEY,
  });

  await insuranceApiHttpClient.authenticate();

  return new CreateQuoteUseCaseImpl(insuranceApiHttpClient);
}
