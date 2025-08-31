import { CreatePartnerUseCaseImpl } from "@/application/usecase";
import { PartnerRepository } from "@/main/repositories";
import db from "@/main/common/database";

export function makeCreatePartnerUseCase(): CreatePartnerUseCaseImpl {
  return new CreatePartnerUseCaseImpl(new PartnerRepository(db));
}
