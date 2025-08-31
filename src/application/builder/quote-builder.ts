import { Quote } from "@/domain/entity";
import type { ICreateQuoteUseCaseOutput } from "@/domain/usecase";
import type { IInsuranceQuotation } from "@/main/common/insurance-api-client";
import { randomUUID } from "node:crypto";

export function buildCreateQuoteResponse(
  input: IInsuranceQuotation
): ICreateQuoteUseCaseOutput {
  return {
    id: input.id,
    age: input.age,
    sex: input.sex,
    priceInCents: Math.round(input.price),
    expireAt: input.expire_at,
  };
}

export function buildCreateQuoteInput(
  partnerId: string,
  quotation: IInsuranceQuotation
): Quote {
  return Quote.build({
    id: randomUUID(),
    quotationId: quotation.id,
    partnerId,
    age: quotation.age,
    sex: quotation.sex as unknown as string,
    price: Math.round(quotation.price),
    expireAt: quotation.expire_at,
  });
}
