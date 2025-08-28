import { mock, MockProxy } from "jest-mock-extended";
import { IPartnerRepository } from "@/domain/repository";
import {
  ICreatePartnerUseCase,
  ICreatePartnerUseCaseInput,
} from "@/domain/usecase";
import { CreatePartnerUseCaseImpl } from "@/application/usecase";
import { mockPartnerEntity } from "@tests/mock/domain";

describe("CreatePartnersUseCase", () => {
  let sut: ICreatePartnerUseCase;
  let partnerRepository: MockProxy<IPartnerRepository>;

  beforeAll(() => {
    partnerRepository = mock();
    sut = new CreatePartnerUseCaseImpl(partnerRepository);
  });

  it("Should throw an errow if partner cnpj already exists", async () => {
    const cnpj = "cnpj";

    partnerRepository.findByCnpj.mockResolvedValue(mockPartnerEntity({ cnpj }));

    const sutPromise = sut.execute({
      name: "test name",
      cnpj,
    } as ICreatePartnerUseCaseInput);

    await expect(sutPromise).rejects.toThrow(
      new Error("Partner with this CNPJ already exists")
    );
  });
});
