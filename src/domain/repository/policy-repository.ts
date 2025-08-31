import type { Policy } from "../entity";

export interface IPolicyRepository {
  create: (entity: Policy) => Promise<Policy>;
  findById: (id: string) => Promise<Policy | null>;
}
