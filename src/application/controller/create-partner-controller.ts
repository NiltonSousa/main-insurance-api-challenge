import { Partner } from "@/domain/entity";
import {
  ICreatePartnerUseCase,
  ICreatePartnerUseCaseInput,
} from "@/domain/usecase";
import { IController } from "./controller";
import { JoiValidator } from "@/main/adapters";

export class CreatePartnerController
  implements IController<ICreatePartnerUseCaseInput, Partner>
{
  constructor(
    private readonly createPartnerUseCase: ICreatePartnerUseCase,
    private readonly validator: JoiValidator<unknown>
  ) {}

  async control(input: ICreatePartnerUseCaseInput): Promise<Partner> {
    const validation = this.validator.validate(input);

    if (validation.invalid) {
      throw new Error(validation.message);
    }

    return await this.createPartnerUseCase.execute(input);
  }
}
