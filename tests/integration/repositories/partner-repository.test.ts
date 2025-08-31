import { PartnerRepository } from "@/main/repositories";
import { randomUUID } from "node:crypto";
import db from "@/main/common/database";
import { mockPartnerEntity } from "@tests/mock";

describe("PartnerRepository", () => {
  const sut = new PartnerRepository(db);

  it("Should insert a partner successfuly and findById", async () => {
    const partnerInserted = await sut.create(mockPartnerEntity());

    const partnerFound = await sut.findById(partnerInserted.id);

    expect(partnerFound?.id).toEqual(partnerInserted.id);
  });

  it("should insert a partner successfuly and findByCnpj ", async () => {
    const partnerInserted = await sut.create(mockPartnerEntity());

    const partnerFound = await sut.findByCnpj(partnerInserted.cnpj);

    expect(partnerFound?.cnpj).toEqual(partnerInserted.cnpj);
  });

  it("should return null if partner not found with findById", async () => {
    const partnerFound = await sut.findById(randomUUID());

    expect(partnerFound).toBeNull();
  });

  it("should return null if partner not found with findByCnpj", async () => {
    const partnerFound = await sut.findByCnpj("00000000000000");

    expect(partnerFound).toBeNull();
  });
});
