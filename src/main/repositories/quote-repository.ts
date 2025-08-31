import { Quote } from "@/domain/entity";
import type { IQuoteRepository } from "@/domain/repository";
import type { PrismaClient } from "@prisma/client";

export class QuoteRepository implements IQuoteRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(entity: Quote): Promise<Quote> {
    const quote = await this.client.quote.create({
      data: {
        quotationId: entity.quotationId,
        partnerId: entity.partnerId,
        age: entity.age,
        sex: entity.sex,
        price: entity.price,
        expireAt: entity.expireAt,
      },
    });

    const { id, quotationId, partnerId, age, sex, price, expireAt } = quote;

    return Quote.build({
      id,
      quotationId,
      partnerId,
      age,
      sex,
      price,
      expireAt,
    });
  }

  async findById(quotationId: string): Promise<Quote | null> {
    const quote = await this.client.quote.findUnique({
      where: {
        quotationId,
      },
    });

    if (!quote) return null;

    const { id, partnerId, age, sex, price, expireAt } = quote;

    return Quote.build({
      id,
      quotationId,
      partnerId,
      age,
      sex,
      price,
      expireAt,
    });
  }
}
