import type { Quote } from "../entity";

export interface IQuoteRepository {
  create: (entity: Quote) => Promise<Quote>;
  findByQuotationId: (id: string) => Promise<Quote | null>;
}
