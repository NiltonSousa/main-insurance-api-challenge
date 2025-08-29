export type SexType = ["m/M", "f/F", "n/N"];

export interface ICreateQuoteUseCaseInput {
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
  execute(input: ICreateQuoteUseCaseInput): Promise<ICreateQuoteUseCaseOutput>;
}
