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
  priceInCents: number;
  expireAt: string;
}

export interface ICreateQuoteUseCase {
  execute: (
    input: ICreateQuoteUseCaseInput
  ) => Promise<ICreateQuoteUseCaseOutput>;
}
