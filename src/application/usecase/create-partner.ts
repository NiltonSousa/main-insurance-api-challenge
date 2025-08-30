import type { Partner } from "@/domain/entity";
import type {
  ICreatePartnerUseCase,
  ICreatePartnerUseCaseInput,
} from "@/domain/usecase";
import type { IPartnerRepository } from "src/domain/repository";
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
