import type {
  IGetPolicyUseCase,
  IGetPolicyUseCaseInput,
  IGetPolicyUseCaseOutput,
} from "@/domain/usecase";
import type { JoiValidator } from "@/main/adapters";
import type { IController } from "./controller";

export class GetPolicyController
  implements IController<IGetPolicyUseCaseInput, IGetPolicyUseCaseOutput>
{
  constructor(
    private readonly getPolicyUseCase: IGetPolicyUseCase,
    private readonly validator: JoiValidator<unknown>
  ) {}

  async control(
    input: IGetPolicyUseCaseInput
  ): Promise<IGetPolicyUseCaseOutput> {
    const validation = this.validator.validate(input);

    if (validation.invalid) {
      throw new Error(validation.message);
    }

    return await this.getPolicyUseCase.execute(input);
  }
}
