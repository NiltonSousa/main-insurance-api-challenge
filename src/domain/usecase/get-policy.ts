import type { SexType } from ".";

export interface IGetPolicyUseCaseInput {
  partnerId: string;
  policyId: string;
}

export interface IGetPolicyUseCaseOutput {
  id: string;
  name: string;
  sex: SexType;
  dateOfBirth: Date;
}

export interface IGetPolicyUseCase {
  execute: (input: IGetPolicyUseCaseInput) => Promise<IGetPolicyUseCaseOutput>;
}
