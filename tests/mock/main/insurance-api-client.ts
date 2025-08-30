import type { SexType } from "@/domain/usecase";
import type {
  IInsurancePolicy,
  IInsuranceQuotation,
} from "@/main/common/insurance-api-client";
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

export function mockInsuranceQuotation(): IInsuranceQuotation {
  return {
    id: randomUUID(),
    age: faker.number.int({ min: 18, max: 65 }),
    sex: "F" as unknown as SexType,
    price: faker.number.int({ min: 100, max: 1000 }).toString(),
    expire_at: faker.date.future(),
  };
}
