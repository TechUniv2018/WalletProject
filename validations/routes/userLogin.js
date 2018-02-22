const Joi = require('joi');

const loginPayloadValidation = Joi.object({
  userName: Joi.string()
    .min(5)
    .max(15)
    .regex(/^[a-z][a-z0-9_]*$/i)
    .example('John_Doe'),
  password: Joi.string()
    .min(4)
    .max(20)
    .example('password'),
});

module.exports = loginPayloadValidation;
