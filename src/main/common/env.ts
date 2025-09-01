import { configDotenv } from "dotenv";

configDotenv();

export const INSURANCE_API_BASE_URL =
  process.env.INSURANCE_API_BASE_URL ?? "http://localhost:3000";
export const INSURANCE_API_KEY =
  process.env.INSURANCE_API_KEY ?? "default_api_key";
export const REQUIRED_API_KEY =
  process.env.REQUIRED_API_KEY ?? "default_api_key";
