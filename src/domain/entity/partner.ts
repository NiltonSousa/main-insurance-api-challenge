export class Partner {
  constructor(
    public id: string,
    public name: string,
    public cnpj: string
  ) {}

  static build(id: string, name: string, cnpj: string): Partner {
    return new Partner(id, name, cnpj);
  }
}
