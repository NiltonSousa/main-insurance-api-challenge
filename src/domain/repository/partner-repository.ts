import type { Partner } from "../entity";

export interface IPartnerRepository {
  create: (entity: Partner) => Promise<Partner>;
  findById: (id: string) => Promise<Partner | null>;
  findByCnpj: (cnpj: string) => Promise<Partner | null>;
}
