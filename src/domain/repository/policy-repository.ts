import type { Policy } from "../entity";

export interface IPolicyRepository {
  create: (entity: Policy) => Promise<Policy>;
  findByQuotationId: (id: string) => Promise<Policy | null>;
  findByPolicyId: (id: string) => Promise<Policy | null>;
}
