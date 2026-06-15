import Joi from "joi";

export const userSchema = Joi.object({
  oldPassword: Joi.string().required(),
  password: Joi.string().not(Joi.ref("oldPassword")).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
}).required();
