import { Quote } from "@/domain/entity";
import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

export function mockQuoteEntity(overrides?: Partial<Quote>): Quote {
  return Quote.build({
    id: overrides?.id ?? randomUUID(),
    quotationId: overrides?.quotationId ?? randomUUID(),
    partnerId: overrides?.partnerId ?? randomUUID(),
    age: overrides?.age ?? faker.number.int({ min: 18, max: 65 }),
    sex: overrides?.sex ?? ("F" as unknown as string),
    price: overrides?.price ?? faker.number.int({ min: 100, max: 1000 }),
    expireAt: overrides?.expireAt ?? faker.date.future().toISOString(),
  });
}
