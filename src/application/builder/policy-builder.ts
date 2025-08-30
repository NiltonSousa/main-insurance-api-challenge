import type {
  ICreatePolicyUseCaseOutput,
  IGetPolicyUseCaseOutput,
} from "@/domain/usecase";
import type { IInsurancePolicy } from "@/main/common/insurance-api-client";

export function buildCreatePolicyResponse(
  input: IInsurancePolicy
): ICreatePolicyUseCaseOutput {
  return {
    id: input.id,
    quotationId: input.quotation_id,
    name: input.name,
    sex: input.sex,
    dateOfBirth: input.date_of_birth,
  };
}

export function buildGetPolicyResponse(
  input: IInsurancePolicy
): IGetPolicyUseCaseOutput {
  return {
    id: input.id,
    name: input.name,
    sex: input.sex,
    dateOfBirth: new Date(input.date_of_birth),
  };
}
