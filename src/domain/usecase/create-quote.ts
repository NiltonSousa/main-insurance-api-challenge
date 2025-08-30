import type { SexType } from ".";

export interface ICreateQuoteUseCaseInput {
  partnerId: string;
  age: number;
  sex: SexType;
}

export interface ICreateQuoteUseCaseOutput {
  id: string;
  age: number;
  sex: SexType;
  price: string;
  expireAt: Date;
}

export interface ICreateQuoteUseCase {
  execute: (
    input: ICreateQuoteUseCaseInput
  ) => Promise<ICreateQuoteUseCaseOutput>;
}
