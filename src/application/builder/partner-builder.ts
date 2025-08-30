import { Partner } from "@/domain/entity";
import type { ICreatePartnerUseCaseInput } from "@/domain/usecase";
import { randomUUID } from "node:crypto";

export function buildCreatePartnerInput(
  input: ICreatePartnerUseCaseInput
): Partner {
  return Partner.build(randomUUID(), input.name, input.cnpj);
}
