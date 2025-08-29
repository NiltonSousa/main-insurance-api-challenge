import { SexType } from ".";

export interface ICreatePolicyUseCaseInput {
  partnerId: string;
  quotationId: string;
  name: string;
  sex: SexType;
  dateOfBirth: string;
}

export interface ICreatePolicyUseCaseOutput {
  quotationId: string;
  id: string;
  name: string;
  sex: SexType;
  dateOfBirth: string;
}

export interface ICreatePolicyUseCase {
  execute(
    input: ICreatePolicyUseCaseInput
  ): Promise<ICreatePolicyUseCaseOutput>;
}
