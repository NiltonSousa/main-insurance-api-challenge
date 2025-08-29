import { SexType } from "@/domain/usecase";
import { INSURANCE_API_BASE_URL } from "./env";

export interface ICreateQuotationsInput {
  age: number;
  sex: SexType;
}

export interface IInsuranceQuotation {
  id: string;
  age: number;
  sex: SexType;
  price: string;
  expire_at: Date;
}

export interface ICreatePoliciesInput {
  quotation_id: string;
  name: string;
  sex: SexType;
  date_of_birth: Date;
}

export interface IInsurancePolicy {
  id: string;
  quotation_id: string;
  name: string;
  sex: SexType;
  date_of_birth: string;
}

export interface IInsuranceApiHttpClient {
  createQuotations(input: ICreateQuotationsInput): Promise<IInsuranceQuotation>;
  createPolicies(input: ICreatePoliciesInput): Promise<IInsurancePolicy>;
  getPoliciesById(id: string): Promise<IInsurancePolicy | null>;
}

interface IToken {
  access_token: string;
}

interface RequestOptions {
  method: string;
  headers: Headers;
  body?: string;
}

export interface IInsuranceApiAuthentication {
  apiKey: string;
  apiBaseUrl: string;
}

export class InsuranceApiHttpClient implements IInsuranceApiHttpClient {
  private accessToken: string | null = null;

  constructor(private readonly authentication: IInsuranceApiAuthentication) {}

  async authenticate(): Promise<void> {
    const newCredentials = await this.generateInsuranceCredentials();

    this.accessToken = newCredentials.access_token;
  }

  private async generateInsuranceCredentials(): Promise<IToken> {
    const { apiKey, apiBaseUrl } = this.authentication;
    const url = `${apiBaseUrl}/api/auth`;

    const request = {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
      },
    };

    const response = await fetch(url, request);

    const responseBody = await response.json();

    return responseBody as IToken;
  }

  async createQuotations(
    input: ICreateQuotationsInput
  ): Promise<IInsuranceQuotation> {
    const url = `${INSURANCE_API_BASE_URL}/api/quotations`;

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(input),
    };

    // this.logger.info(`Requesting kyc result from URL [${url}]`);

    const response = await fetch(url, request);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<IInsuranceQuotation>;
  }

  async createPolicies(input: ICreatePoliciesInput): Promise<IInsurancePolicy> {
    const url = `${INSURANCE_API_BASE_URL}/api/policies`;

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(input),
    };

    // this.logger.info(`Requesting kyc result from URL [${url}]`);

    const response = await fetch(url, request);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<IInsurancePolicy>;
  }

  async getPoliciesById(id: string): Promise<IInsurancePolicy> {
    const url = `${INSURANCE_API_BASE_URL}/api/policies/${id}`;

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    });

    const request: RequestOptions = {
      method: "GET",
      headers,
    };

    // this.logger.info(`Requesting kyc result from URL [${url}]`);

    const response = await fetch(url, request);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<IInsurancePolicy>;
  }
}

export default IInsuranceApiHttpClient;
