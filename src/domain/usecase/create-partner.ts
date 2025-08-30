import type { Partner } from "../entity";

export interface ICreatePartnerUseCaseInput {
  name: string;
  cnpj: string;
}

export interface ICreatePartnerUseCase {
  execute: (input: ICreatePartnerUseCaseInput) => Promise<Partner>;
}
