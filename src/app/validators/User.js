const Joi = require('joi');

module.exports = {
  body: {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6),
    telephone: Joi.string()
      .max(16),
  },
};
