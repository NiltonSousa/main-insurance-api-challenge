import { Partner } from "@/domain/entity";
import {
  ICreatePartnerUseCase,
  ICreatePartnerUseCaseInput,
} from "@/domain/usecase";
import { IPartnerRepository } from "src/domain/repository";
import { buildCreatePartnerInput } from "../builder";

export class CreatePartnerUseCaseImpl implements ICreatePartnerUseCase {
  constructor(private readonly partnerRepository: IPartnerRepository) {}

  async execute(input: ICreatePartnerUseCaseInput): Promise<Partner> {
    const partnerExists = await this.partnerRepository.findByCnpj(input.cnpj);

    if (partnerExists) {
      throw new Error("Partner with this CNPJ already exists");
    }

    const createdPartner = await this.partnerRepository.create(
      buildCreatePartnerInput(input)
    );

    return createdPartner;
  }
}
