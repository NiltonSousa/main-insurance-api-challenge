import { mock, type MockProxy } from "jest-mock-extended";
import type { IPartnerRepository } from "@/domain/repository";
import type IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import type {
  ICreateQuoteUseCase,
  ICreateQuoteUseCaseInput,
  SexType,
} from "@/domain/usecase";
import { CreateQuoteUseCaseImpl } from "@/application/usecase";
import { mockInsuranceQuotation, mockPartnerEntity } from "@tests/mock";

describe("CreateQuoteUseCase", () => {
  let partnerRepository: MockProxy<IPartnerRepository>;
  let insuranceApiClient: MockProxy<IInsuranceApiHttpClient>;
  let sut: ICreateQuoteUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    partnerRepository = mock<IPartnerRepository>();
    insuranceApiClient = mock<IInsuranceApiHttpClient>();
    sut = new CreateQuoteUseCaseImpl(partnerRepository, insuranceApiClient);
  });

  it("Should throw an error if partner does not exist", async () => {
    const input: ICreateQuoteUseCaseInput = {
      partnerId: "p-1",
      age: 35,
      sex: "M" as unknown as SexType,
    };

    partnerRepository.findById.mockResolvedValue(null);

    await expect(sut.execute(input)).rejects.toThrow("Partner not found");
    expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    expect(partnerRepository.findById).toHaveBeenCalledWith(input.partnerId);
    expect(insuranceApiClient.createQuotations).not.toHaveBeenCalled();
  });

  it("Should create a quote successfully", async () => {
    const input: ICreateQuoteUseCaseInput = {
      partnerId: "p-1",
      age: 35,
      sex: "M" as unknown as SexType,
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());

    const apiQuotation = mockInsuranceQuotation();

    insuranceApiClient.createQuotations.mockResolvedValue(apiQuotation);

    const result = await sut.execute(input);

    expect(insuranceApiClient.createQuotations).toHaveBeenCalledTimes(1);
    expect(insuranceApiClient.createQuotations).toHaveBeenCalledWith({
      age: input.age,
      sex: input.sex,
    });

    expect(result).toBeDefined();
  });

  it("Should throw an error if API fails", async () => {
    const input: ICreateQuoteUseCaseInput = {
      partnerId: "p-1",
      age: 28,
      sex: "F" as unknown as SexType,
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());

    const err = new Error("API error");

    insuranceApiClient.createQuotations.mockRejectedValue(err);

    await expect(sut.execute(input)).rejects.toThrow("API error");
    expect(insuranceApiClient.createQuotations).toHaveBeenCalled();
  });
});
