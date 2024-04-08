import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const parentSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  reminder: Joi.boolean().required().default(true),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const intakeSchema = Joi.object({
  childId: Joi.number().required(),
  foodId: Joi.number().required(),
  mealTime: Joi.date().required(),
  amount: Joi.number().required(),
});

export const updateIntakeSchema = Joi.object({
  mealTime: Joi.date().required(),
  amount: Joi.number().required(),
});

export const childSchema = Joi.object({
  name: Joi.string().required(),
  birthDate: Joi.date().required(),
  height: Joi.number().required(),
  weight: Joi.number().required(),
});
