import {
  CreatePolicyUseCaseImpl,
  GetPolicyUseCaseImpl,
} from "@/application/usecase";
import db from "@/main/common/database";
import { INSURANCE_API_BASE_URL, INSURANCE_API_KEY } from "@/main/common/env";
import { InsuranceApiHttpClient } from "@/main/common/insurance-api-client";
import {
  PartnerRepository,
  PolicyRepository,
  QuoteRepository,
} from "@/main/repositories";

export async function makeCreatePolicyUseCase(): Promise<CreatePolicyUseCaseImpl> {
  const insuranceApiHttpClient = new InsuranceApiHttpClient({
    apiBaseUrl: INSURANCE_API_BASE_URL,
    apiKey: INSURANCE_API_KEY,
  });

  await insuranceApiHttpClient.authenticate();

  return new CreatePolicyUseCaseImpl(
    new PartnerRepository(db),
    new QuoteRepository(db),
    new PolicyRepository(db),
    insuranceApiHttpClient
  );
}

export async function makeGetPolicyUseCase(): Promise<GetPolicyUseCaseImpl> {
  const insuranceApiHttpClient = new InsuranceApiHttpClient({
    apiBaseUrl: INSURANCE_API_BASE_URL,
    apiKey: INSURANCE_API_KEY,
  });

  await insuranceApiHttpClient.authenticate();

  return new GetPolicyUseCaseImpl(
    new PartnerRepository(db),
    new PolicyRepository(db),
    insuranceApiHttpClient
  );
}
