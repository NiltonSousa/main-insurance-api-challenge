import { SexType } from ".";

export interface ICreatePolicyUseCaseInput {
  quotationId: string;
  name: string;
  sex: SexType;
  dateOfBirth: Date;
}

export interface ICreatePolicyUseCaseOutput {
  quotationId: string;
  id: string;
  name: string;
  sex: SexType;
  dateOfBirth: Date;
}

export interface ICreatePolicyUseCase {
  execute(
    input: ICreatePolicyUseCaseInput
  ): Promise<ICreatePolicyUseCaseOutput>;
}
