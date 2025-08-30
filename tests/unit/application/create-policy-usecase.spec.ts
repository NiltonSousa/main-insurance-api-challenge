import { mock, type MockProxy } from "jest-mock-extended";
import type { IPartnerRepository } from "@/domain/repository";
import type IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import type {
  ICreatePolicyUseCase,
  ICreatePolicyUseCaseInput,
  SexType,
} from "@/domain/usecase";
import { CreatePolicyUseCaseImpl } from "@/application/usecase";
import { mockInsurancePolicy, mockPartnerEntity } from "@tests/mock";

describe("CreatePolicyUseCase", () => {
  let partnerRepository: MockProxy<IPartnerRepository>;
  let insuranceApiClient: MockProxy<IInsuranceApiHttpClient>;
  let sut: ICreatePolicyUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    partnerRepository = mock<IPartnerRepository>();
    insuranceApiClient = mock<IInsuranceApiHttpClient>();
    sut = new CreatePolicyUseCaseImpl(partnerRepository, insuranceApiClient);
  });

  it("Should throw an error if partner does not exist", async () => {
    const input: ICreatePolicyUseCaseInput = {
      partnerId: "p-1",
      quotationId: "q-1",
      name: "Alice",
      sex: "F" as unknown as SexType,
      dateOfBirth: "1990-01-01",
    };

    partnerRepository.findById.mockResolvedValue(null);

    await expect(sut.execute(input)).rejects.toThrow("Partner not found");
    expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    expect(partnerRepository.findById).toHaveBeenCalledWith(input.partnerId);
    expect(insuranceApiClient.createPolicies).not.toHaveBeenCalled();
  });

  it("Should create a policy successfully", async () => {
    const input: ICreatePolicyUseCaseInput = {
      partnerId: "p-1",
      quotationId: "q-1",
      name: "Alice",
      sex: "F" as unknown as SexType,
      dateOfBirth: "1990-01-01",
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());

    const insurancePolicy = mockInsurancePolicy();

    insuranceApiClient.createPolicies.mockResolvedValue(insurancePolicy);

    const result = await sut.execute(input);

    expect(insuranceApiClient.createPolicies).toHaveBeenCalledTimes(1);
    expect(insuranceApiClient.createPolicies).toHaveBeenCalledWith({
      quotation_id: input.quotationId,
      name: input.name,
      sex: input.sex,
      date_of_birth: input.dateOfBirth,
    });

    expect(result).toBeDefined();
  });

  it("Should throw an error if API fails", async () => {
    const input: ICreatePolicyUseCaseInput = {
      partnerId: "p-1",
      quotationId: "q-1",
      name: "Alice",
      sex: "F" as unknown as SexType,
      dateOfBirth: "1990-01-01",
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());

    const httpError = new Error("API unavailable");
    insuranceApiClient.createPolicies.mockRejectedValue(httpError);

    await expect(sut.execute(input)).rejects.toThrow("API unavailable");
    expect(insuranceApiClient.createPolicies).toHaveBeenCalled();
  });
});
