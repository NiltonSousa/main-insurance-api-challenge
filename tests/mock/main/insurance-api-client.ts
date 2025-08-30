import type { SexType } from "@/domain/usecase";
import type { IInsurancePolicy } from "@/main/common/insurance-api-client";
import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";

export function mockInsurancePolicy(
  overrides?: Partial<IInsurancePolicy>
): IInsurancePolicy {
  return {
    id: overrides?.id ?? randomUUID(),
    quotation_id: overrides?.quotation_id ?? randomUUID(),
    name: overrides?.name ?? faker.person.firstName(),
    sex: overrides?.sex ?? ("F" as unknown as SexType),
    date_of_birth: overrides?.date_of_birth ?? "1990-01-01",
  };
}
