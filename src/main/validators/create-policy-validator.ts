import joi from "joi";

export const createPolicyValidation = joi
  .object({
    partnerId: joi.string().required(),
    quotation_id: joi.string().required(),
    name: joi.string().required(),
    sex: joi.string().valid("m", "M", "f", "F", "n", "N").required(),
    date_of_birth: joi.date().required(),
  })
  .options({ allowUnknown: true });
