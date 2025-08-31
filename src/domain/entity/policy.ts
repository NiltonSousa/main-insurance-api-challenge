export interface PolicyProps {
  id: string;
  policyId: string;
  partnerId: string;
  quotationId: string;
  name: string;
  sex: string;
  dateOfBirth: string;
}

export class Policy {
  constructor(
    public id: string,
    public policyId: string,
    public quotationId: string,
    public partnerId: string,
    public name: string,
    public sex: string,
    public dateOfBirth: string
  ) {}

  static build(props: PolicyProps): Policy {
    const { id, policyId, partnerId, quotationId, name, sex, dateOfBirth } =
      props;
    return new Policy(
      id,
      policyId,
      quotationId,
      partnerId,
      name,
      sex,
      dateOfBirth
    );
  }
}
