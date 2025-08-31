import { Policy } from "@/domain/entity";
import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

export function mockPolicyEntity(overrides?: Partial<Policy>): Policy {
  return Policy.build({
    id: overrides?.id ?? randomUUID(),
    policyId: overrides?.policyId ?? randomUUID(),
    quotationId: overrides?.quotationId ?? randomUUID(),
    partnerId: overrides?.partnerId ?? randomUUID(),
    name: overrides?.name ?? faker.person.firstName(),
    sex: overrides?.sex ?? ("F" as unknown as string),
    dateOfBirth: overrides?.dateOfBirth ?? "1990-01-01",
  });
}
