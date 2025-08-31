import { Policy, type Quote } from "@/domain/entity";
import type {
  ICreatePolicyUseCaseOutput,
  IGetPolicyUseCaseOutput,
  SexType,
} from "@/domain/usecase";
import type { IInsurancePolicy } from "@/main/common/insurance-api-client";
import { randomUUID } from "node:crypto";

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

export function buildCreatePolicyInput(
  partnerId: string,
  policy: IInsurancePolicy,
  quotation: Quote
): Policy {
  return Policy.build({
    id: randomUUID(),
    policyId: policy.id,
    quotationId: quotation.quotationId,
    partnerId,
    sex: policy.sex as unknown as string,
    name: policy.name,
    dateOfBirth: policy.date_of_birth,
  });
}

export function buildPolicyResponseFromEntity(
  input: Policy
): ICreatePolicyUseCaseOutput {
  return {
    id: input.policyId,
    quotationId: input.quotationId,
    name: input.name,
    sex: input.sex as unknown as SexType,
    dateOfBirth: input.dateOfBirth,
  };
}

export function buildGetPolicyResponseFromEntity(
  input: Policy
): IGetPolicyUseCaseOutput {
  return {
    id: input.policyId,
    name: input.name,
    sex: input.sex as unknown as SexType,
    dateOfBirth: new Date(input.dateOfBirth),
  };
}
