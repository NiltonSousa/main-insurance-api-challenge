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
      return partnerExists;
    }

    const createdPartner = await this.partnerRepository.create(
      buildCreatePartnerInput(input)
    );

    return createdPartner;
  }
}
