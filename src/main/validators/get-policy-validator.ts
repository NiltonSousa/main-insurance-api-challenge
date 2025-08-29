import joi from "joi";

export const getPolicyValidation = joi
  .object({
    partnerId: joi.string().required(),
    policyId: joi.string().required(),
  })
  .options({ allowUnknown: true });
