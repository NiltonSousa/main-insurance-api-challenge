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

  it("Should be idempontent if partner already exists", async () => {
    const cnpj = "cnpj";

    partnerRepository.findByCnpj.mockResolvedValue(mockPartnerEntity({ cnpj }));

    const response = await sut.execute({
      name: "test name",
      cnpj,
    } as ICreatePartnerUseCaseInput);

    await expect(response).toEqual(mockPartnerEntity({ cnpj }));
    expect(partnerRepository.findByCnpj).toHaveBeenCalled();
    expect(partnerRepository.create).not.toHaveBeenCalled();
  });

  it("Should create a partner successfully", async () => {
    const input: ICreatePartnerUseCaseInput = {
      name: "test name",
      cnpj: "cnpj",
    };

    const mockedPartnerEntity = mockPartnerEntity({
      ...input,
      id: "partnerId",
    });

    partnerRepository.findByCnpj.mockResolvedValue(null);
    partnerRepository.create.mockResolvedValue(mockedPartnerEntity);

    const partner = await sut.execute(input);

    expect(partner.id).toEqual(mockedPartnerEntity.id);
    expect(partnerRepository.create).toHaveBeenCalled();
  });
});
