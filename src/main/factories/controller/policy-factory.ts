import {
  CreatePolicyController,
  GetPolicyController,
} from "@/application/controller";
import { JoiValidator } from "@/main/adapters";
import { makeCreatePolicyUseCase, makeGetPolicyUseCase } from "../usecase";
import { createPolicyValidation } from "@/main/validators";

export async function makeCreatePolicyController(): Promise<CreatePolicyController> {
  return new CreatePolicyController(
    await makeCreatePolicyUseCase(),
    new JoiValidator(createPolicyValidation)
  );
}

export async function makeGetPolicyController(): Promise<GetPolicyController> {
  return new GetPolicyController(
    await makeGetPolicyUseCase(),
    new JoiValidator(createPolicyValidation)
  );
}
