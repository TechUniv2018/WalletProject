const Joi = require('joi');

const historyHeaderValidation = Joi.object({
  authorization: Joi.string(),
}).unknown();

module.exports = historyHeaderValidation;
