import { CreatePartnerController } from "@/application/controller";
import { makeCreatePartnerUseCase } from "../usecase";
import { createPartnerValidation } from "@/main/validators";
import { JoiValidator } from "@/main/adapters";

export function makeCreatePartnerController(): CreatePartnerController {
  return new CreatePartnerController(
    makeCreatePartnerUseCase(),
    new JoiValidator(createPartnerValidation)
  );
}
