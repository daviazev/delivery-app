const Joi = require('joi');

const loginFieldsValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const adminPostUser = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(12).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  loginFieldsValidation,
  adminPostUser,
};
