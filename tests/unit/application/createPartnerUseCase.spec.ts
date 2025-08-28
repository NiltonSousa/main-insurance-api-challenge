import { mock, MockProxy } from "jest-mock-extended";
import { IPartnerRepository } from "src/domain/repository";
import {
  ICreatePartnerUseCase,
  ICreatePartnerUseCaseInput,
} from "src/domain/usecase";

describe("CreatePartnersUseCase", () => {
  let sut: ICreatePartnerUseCase;
  let partnerRepository: MockProxy<IPartnerRepository>;

  beforeAll(() => {
    partnerRepository = mock();
    sut = new CreatePartnersUseCase(partnerRepository);
  });

  it("Should throw an errow if partner properties are not provided", async () => {
    const sutPromise = sut.execute({} as ICreatePartnerUseCaseInput);

    await expect(sutPromise).rejects.toThrow(
      new Error("Missing required partner properties")
    );
  });
});
