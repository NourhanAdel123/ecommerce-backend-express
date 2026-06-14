import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  email: Joi.string()
    .email()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  phone: Joi.string(),
  role: Joi.string(),
}).required();
