import { Partner } from "../entity";

export interface IPartnerRepository {
  create(name: string, cnpj: string): Promise<Partner>;
  findById(id: string): Promise<Partner | null>;
}
