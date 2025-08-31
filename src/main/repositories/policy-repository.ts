import { Policy } from "@/domain/entity";
import type { IPolicyRepository } from "@/domain/repository";
import type { PrismaClient } from "@prisma/client";

export class PolicyRepository implements IPolicyRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(entity: Policy): Promise<Policy> {
    const policy = await this.client.policy.create({
      data: {
        policyId: entity.policyId,
        quotationId: entity.quotationId,
        partnerId: entity.partnerId,
        name: entity.name,
        sex: entity.sex,
        dateOfBirth: entity.dateOfBirth,
      },
    });

    const { id, policyId, quotationId, partnerId, name, sex, dateOfBirth } =
      policy;

    return Policy.build({
      id,
      policyId,
      quotationId,
      partnerId,
      name,
      sex,
      dateOfBirth,
    });
  }

  async findById(policyId: string): Promise<Policy | null> {
    const policy = await this.client.policy.findUnique({
      where: {
        policyId,
      },
    });

    if (!policy) return null;

    const { id, quotationId, partnerId, name, sex, dateOfBirth } = policy;

    return Policy.build({
      id,
      policyId,
      quotationId,
      partnerId,
      name,
      sex,
      dateOfBirth,
    });
  }
}
