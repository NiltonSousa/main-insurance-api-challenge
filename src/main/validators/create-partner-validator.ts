import { isCNPJ } from "brazilian-values";
import joi from "joi";

export const createPartnerValidation = joi
  .object({
    name: joi.string().required(),
    cnpj: joi
      .string()
      .required()
      .custom((value: string, helpers) => {
        if (!isCNPJ(value)) {
          return helpers.message({
            custom: "'cnpj' must be a valid CNPJ number",
          });
        }

        return value;
      }),
  })
  .options({ allowUnknown: true });
