import { CreateQuoteController } from "@/application/controller/create-quote";
import { makeCreateQuoteUseCase } from "../usecase";
import { JoiValidator } from "@/main/adapters";
import { createQuoteValidation } from "@/main/validators";

export async function makeCreateQuoteController(): Promise<CreateQuoteController> {
  return new CreateQuoteController(
    await makeCreateQuoteUseCase(),
    new JoiValidator(createQuoteValidation)
  );
}
