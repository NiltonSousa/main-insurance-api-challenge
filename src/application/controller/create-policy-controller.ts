import type {
  ICreatePolicyUseCase,
  ICreatePolicyUseCaseInput,
  ICreatePolicyUseCaseOutput,
} from "@/domain/usecase";
import type { JoiValidator } from "@/main/adapters";
import type { IController } from "./controller";

export class CreatePolicyController
  implements IController<ICreatePolicyUseCaseInput, ICreatePolicyUseCaseOutput>
{
  constructor(
    private readonly createPolicyUseCase: ICreatePolicyUseCase,
    private readonly validator: JoiValidator<unknown>
  ) {}

  async control(
    input: ICreatePolicyUseCaseInput
  ): Promise<ICreatePolicyUseCaseOutput> {
    const validation = this.validator.validate(input);

    if (validation.invalid) {
      throw new Error(validation.message);
    }

    return await this.createPolicyUseCase.execute(input);
  }
}
