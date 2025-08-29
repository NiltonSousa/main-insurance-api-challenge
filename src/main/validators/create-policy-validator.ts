import joi from "joi";

export const createPolicyValidation = joi
  .object({
    partnerId: joi.string().required(),
    quotationId: joi.string().required(),
    name: joi.string().required(),
    sex: joi.string().valid("m", "M", "f", "F", "n", "N").required(),
    dateOfBirth: joi.string().required(),
  })
  .options({ allowUnknown: true });
