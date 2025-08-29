import { CreatePolicyController } from "@/application/controller";
import { JoiValidator } from "@/main/adapters";
import { makeCreatePolicyUseCase } from "../usecase";
import { createPolicyValidation } from "@/main/validators";

export async function makeCreatePolicyController(): Promise<CreatePolicyController> {
  return new CreatePolicyController(
    await makeCreatePolicyUseCase(),
    new JoiValidator(createPolicyValidation)
  );
}
