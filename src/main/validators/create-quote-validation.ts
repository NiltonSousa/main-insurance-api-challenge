import joi from "joi";

export const createQuoteValidation = joi
  .object({
    age: joi.number().required(),
    sex: joi.string().valid("m", "M", "f", "F", "n", "N").required(),
  })
  .options({ allowUnknown: true });
