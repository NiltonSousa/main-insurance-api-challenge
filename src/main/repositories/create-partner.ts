import { Partner } from "@/domain/entity";
import { IPartnerRepository } from "@/domain/repository";
import { PrismaClient } from "@prisma/client";

export class PartnerRepository implements IPartnerRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(entity: Partner): Promise<Partner> {
    const partner = await this.client.partner.create({
      data: {
        name: entity.name,
        cnpj: entity.cnpj,
      }
    })

    return Partner.build(partner.id, partner.name, partner.cnpj);
  }

  async findByCnpj(cnpj: string): Promise<Partner | null> {
    const partner = await this.client.partner.findUnique({
      where: {
        cnpj
      }
    })

    if (!partner) return null;

    return Partner.build(partner.id, partner.name, partner.cnpj);
  }
}
