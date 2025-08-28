import { Partner } from "../entity";

export interface IPartnerRepository {
  create(entity: Partner): Promise<Partner>;
  findByCnpj(cnpj: string): Promise<Partner | null>;
}
