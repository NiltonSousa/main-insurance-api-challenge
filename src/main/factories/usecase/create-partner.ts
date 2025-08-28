import { CreatePartnerUseCaseImpl } from "@/application/usecase";
import { PartnerRepository } from "@/main/repositories";
import { PrismaClient } from "@prisma/client";

export function makeCreatePartnerUseCase(): CreatePartnerUseCaseImpl {
  return new CreatePartnerUseCaseImpl(new PartnerRepository(new PrismaClient()));
}