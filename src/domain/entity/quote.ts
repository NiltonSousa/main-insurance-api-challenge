export interface QuoteProps {
  id: string;
  quotationId: string;
  partnerId: string;
  age: number;
  sex: string;
  price: number;
  expireAt: string;
}

export class Quote {
  constructor(
    public id: string,
    public quotationId: string,
    public partnerId: string,
    public age: number,
    public sex: string,
    public price: number,
    public expireAt: string
  ) {}

  static build(props: QuoteProps): Quote {
    const { id, quotationId, partnerId, age, sex, price, expireAt } = props;
    return new Quote(id, quotationId, partnerId, age, sex, price, expireAt);
  }
}
