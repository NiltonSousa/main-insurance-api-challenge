import type { Quote } from "../entity";

export interface IQuoteRepository {
  create: (entity: Quote) => Promise<Quote>;
  findById: (id: string) => Promise<Quote | null>;
}
