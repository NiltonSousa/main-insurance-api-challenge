import type {
  ICreateQuoteUseCase,
  ICreateQuoteUseCaseInput,
  ICreateQuoteUseCaseOutput,
} from "@/domain/usecase";
import type { JoiValidator } from "@/main/adapters";
import type { IController } from "./controller";

export class CreateQuoteController
  implements IController<ICreateQuoteUseCaseInput, ICreateQuoteUseCaseOutput>
{
  constructor(
    private readonly createQuoteUseCase: ICreateQuoteUseCase,
    private readonly validator: JoiValidator<unknown>
  ) {}

  async control(
    input: ICreateQuoteUseCaseInput
  ): Promise<ICreateQuoteUseCaseOutput> {
    const validation = this.validator.validate(input);

    if (validation.invalid) {
      throw new Error(validation.message);
    }

    return await this.createQuoteUseCase.execute(input);
  }
}
