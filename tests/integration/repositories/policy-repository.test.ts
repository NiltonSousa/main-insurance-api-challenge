import {
  PartnerRepository,
  PolicyRepository,
  QuoteRepository,
} from "@/main/repositories";
import db from "@/main/common/database";
import {
  mockPartnerEntity,
  mockPolicyEntity,
  mockQuoteEntity,
} from "@tests/mock";
import type { Quote } from "@/domain/entity";
import { randomUUID } from "node:crypto";

describe("PolicyRepository", () => {
  let quoteEntityMocked: Quote;
  const partnerEntityMocked = mockPartnerEntity();
  const partnerRepository = new PartnerRepository(db);
  const quoteRepository = new QuoteRepository(db);

  const sut = new PolicyRepository(db);

  it("Should insert a policy successfuly and findByPolicyId", async () => {
    const partnerEntity = await partnerRepository.create(partnerEntityMocked);
    quoteEntityMocked = await quoteRepository.create(
      mockQuoteEntity({ partnerId: partnerEntity.id })
    );

    const policyInserted = await sut.create(
      mockPolicyEntity({
        partnerId: partnerEntity.id,
        quotationId: quoteEntityMocked.quotationId,
      })
    );

    const policyFound = await sut.findByPolicyId(policyInserted.policyId);

    expect(policyFound?.id).toEqual(policyInserted.id);
  });

  it("Should insert a policy successfuly and findByQuotationId", async () => {
    const partnerEntity = await partnerRepository.create(partnerEntityMocked);
    quoteEntityMocked = await quoteRepository.create(
      mockQuoteEntity({ partnerId: partnerEntity.id })
    );

    const policyInserted = await sut.create(
      mockPolicyEntity({
        partnerId: partnerEntity.id,
        quotationId: quoteEntityMocked.quotationId,
      })
    );

    const policyFound = await sut.findByQuotationId(policyInserted.quotationId);

    expect(policyFound?.id).toEqual(policyInserted.id);
  });

  it("should return null if policy not found with findById", async () => {
    const policyFound = await sut.findByPolicyId(randomUUID());

    expect(policyFound).toBeNull();
  });

  it("should return null if policy not found with findByQuotationId", async () => {
    const policyFound = await sut.findByQuotationId(randomUUID());

    expect(policyFound).toBeNull();
  });
});
