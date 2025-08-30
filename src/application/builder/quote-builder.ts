import type { ICreateQuoteUseCaseOutput } from "@/domain/usecase";
import type { IInsuranceQuotation } from "@/main/common/insurance-api-client";

export function buildCreateQuoteResponse(
  input: IInsuranceQuotation
): ICreateQuoteUseCaseOutput {
  return {
    id: input.id,
    age: input.age,
    sex: input.sex,
    price: input.price,
    expireAt: input.expire_at,
  };
}
