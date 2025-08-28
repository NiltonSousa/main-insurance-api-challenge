import { Partner } from "@/domain/entity";
import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

export function mockPartnerEntity(overrides?: Partial<Partner>): Partner {
  return Partner.build(
    overrides?.id ?? randomUUID(),
    overrides?.name ?? faker.person.firstName(),
    overrides?.cnpj ?? faker.string.numeric(14)
  );
}
