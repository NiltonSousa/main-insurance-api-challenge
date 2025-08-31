import { mock, type MockProxy } from "jest-mock-extended";
import type {
  IPartnerRepository,
  IPolicyRepository,
} from "@/domain/repository";
import type IInsuranceApiHttpClient from "@/main/common/insurance-api-client";
import type {
  IGetPolicyUseCase,
  IGetPolicyUseCaseInput,
} from "@/domain/usecase";
import { GetPolicyUseCaseImpl } from "@/application/usecase";
import { mockInsurancePolicy, mockPartnerEntity } from "@tests/mock";
import { mockPolicyEntity } from "@tests/mock/domain/policy";

describe("GetPolicyUseCase", () => {
  let partnerRepository: MockProxy<IPartnerRepository>;
  let policyRepository: MockProxy<IPolicyRepository>;
  let insuranceApiClient: MockProxy<IInsuranceApiHttpClient>;
  let sut: IGetPolicyUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    partnerRepository = mock<IPartnerRepository>();
    policyRepository = mock<IPolicyRepository>();
    insuranceApiClient = mock<IInsuranceApiHttpClient>();
    sut = new GetPolicyUseCaseImpl(
      partnerRepository,
      policyRepository,
      insuranceApiClient
    );
  });

  it("Should throw an error if partner does not exist", async () => {
    const input: IGetPolicyUseCaseInput = {
      partnerId: "p-1",
      policyId: "pol-1",
    };

    partnerRepository.findById.mockResolvedValue(null);

    await expect(sut.execute(input)).rejects.toThrow("Partner not found");
    expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    expect(partnerRepository.findById).toHaveBeenCalledWith(input.partnerId);
    expect(insuranceApiClient.getPoliciesById).not.toHaveBeenCalled();
  });

  it("Should retrieve a policy if it already exists on database", async () => {
    const input: IGetPolicyUseCaseInput = {
      partnerId: "p-1",
      policyId: "pol-1",
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());
    policyRepository.findById.mockResolvedValue(mockPolicyEntity());

    const result = await sut.execute(input);

    expect(insuranceApiClient.getPoliciesById).not.toHaveBeenCalled();

    expect(result).toBeDefined();
  });

  it("Should retrieve a policy successfully", async () => {
    const input: IGetPolicyUseCaseInput = {
      partnerId: "p-1",
      policyId: "pol-1",
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());

    const insurancePolicy = mockInsurancePolicy({ id: input.policyId });

    insuranceApiClient.getPoliciesById.mockResolvedValue(insurancePolicy);

    const result = await sut.execute(input);

    expect(insuranceApiClient.getPoliciesById).toHaveBeenCalledTimes(1);
    expect(insuranceApiClient.getPoliciesById).toHaveBeenCalledWith(
      input.policyId
    );

    expect(result).toBeDefined();
  });

  it("Should throw an error if policy does not exist", async () => {
    const input: IGetPolicyUseCaseInput = {
      partnerId: "p-1",
      policyId: "pol-1",
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());

    insuranceApiClient.getPoliciesById.mockResolvedValue(null);

    const sutPromise = sut.execute(input);

    await expect(sutPromise).rejects.toThrow("Policy not found");
  });

  it("Should throw an error if API fails", async () => {
    const input: IGetPolicyUseCaseInput = {
      partnerId: "p-1",
      policyId: "pol-1",
    };

    partnerRepository.findById.mockResolvedValue(mockPartnerEntity());

    const httpError = new Error("API unavailable");
    insuranceApiClient.getPoliciesById.mockRejectedValue(httpError);

    await expect(sut.execute(input)).rejects.toThrow("API unavailable");
    expect(insuranceApiClient.getPoliciesById).toHaveBeenCalled();
  });
});
