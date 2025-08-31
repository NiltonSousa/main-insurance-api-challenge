import { PartnerRepository, QuoteRepository } from "@/main/repositories";
import db from "@/main/common/database";
import { mockPartnerEntity, mockQuoteEntity } from "@tests/mock";

describe("QuoteRepository", () => {
  const partnerEntityMocked = mockPartnerEntity();
  const partnerRepository = new PartnerRepository(db);

  const sut = new QuoteRepository(db);

  it("Should insert a quote successfuly and findById", async () => {
    const partnerEntity = await partnerRepository.create(partnerEntityMocked);

    const quoteInserted = await sut.create(
      mockQuoteEntity({ partnerId: partnerEntity.id })
    );

    const quoteFound = await sut.findByQuotationId(quoteInserted.quotationId);

    expect(quoteFound?.id).toEqual(quoteInserted.id);
  });

  it("should return null if quote not found with findById", async () => {
    const partnerEntity = await partnerRepository.create(partnerEntityMocked);
    const quoteInserted = await sut.create(
      mockQuoteEntity({ partnerId: partnerEntity.id })
    );
    const quoteFound = await sut.findByQuotationId(quoteInserted.id);

    expect(quoteFound).toBeNull();
  });
});
